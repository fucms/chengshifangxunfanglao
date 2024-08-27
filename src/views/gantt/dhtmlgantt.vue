<template>
    <div ref="gantt" class="left-container"></div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt';
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"
export default {
    name: "gantt",
    props: {
        tasks: {
            type: Object,
            default() {
                return {
                    data: [
                        { id: 1, text: 'Task #1', start_date: '2020-01-17', duration: 3, progress: 0.6 },
                        { id: 2, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4 }
                    ],
                    links: [
                        { id: 1, source: 1, target: 2, type: '0' }
                    ]
                }
            }
        }
    },
    mounted: function () {
        gantt.config.xml_date = "%Y-%m-%d";
        gantt.init(this.$refs.gantt);
        gantt.parse(this.$props.tasks);

        //自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
        gantt.config.autosize = true;
        //定义日期编辑器
        var dateEditor = gantt.config.editor_types.date;
        gantt.config.editor_types.end_date = gantt.mixin({
            set_value: function (value, id, column, node) {
                var correctedValue = gantt.date.add(value, -1, "day");
                return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
            },
            get_value: function (id, column, node) {
                var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
                return gantt.date.add(selectedValue, 1, "day");
            },
        }, dateEditor);
        //定义各种编辑器及类型
        var textEditor = { type: "text", map_to: "text" };
        var colorEditor = { type: "color", map_to: "color" };
        var progressEditor = { type: "text", map_to: "progress" };
        var startDateEditor = { type: "date", map_to: "start_date" };
        var endDateEditor = { type: "date", map_to: "end_date" };
        // var priorityEditor = { type: "select", map_to: "priority", options: gantt.serverList("priority") };
        var durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };
        //设置甘特图中各个列相关配置
        gantt.config.columns = [
            {
                name: 'text',
                /*height:'40',*/
                label: '项目名称',
                editor: textEditor,
                resize: true,
                tree: true,
                width: '130',

            },
            // {
            //     name: "add",
            //     label: "",
            //     width: 30
            // },
            // {
            //     name: 'priority',
            //     align: "center",
            //     label: "优先级",
            //     width: 50,
            //     editor: priorityEditor,
            //     resize: true,
            // },
            {
                name: "color",
                align: "center",
                label: "颜色",
                width: 40,
                editor: colorEditor,
                resize: true,
            },

            {
                name: 'start_date',
                label: '项目开始时间',
                align: "center",
                editor: startDateEditor,
                resize: true,
                tree: false,
                width: '100',
            },
            {
                name: 'end_date',
                label: '项目结束时间',
                width: 100,
                align: 'center',
                editor: endDateEditor,
                resize: true,
            },

            {
                name: 'sDuration',
                label: '任务期',
                align: "center",
                editor: durationEditor,
                resize: true,
                tree: false,
                width: '55',
                template: function (obj) {
                    return obj.duration + '天'
                },
                hide: false
            },
            {
                name: 'progress',
                label: '项目进度',
                align: "center",
                tree: false,
                editor: progressEditor,
                resize: true,
                width: '50',
            },
        ];
        //配置日期格式
        gantt.templates.task_end_date = function (date) {
            return gantt.templates.task_date(new Date(date.valueOf() - 1));
        };
        var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
        gantt.templates.grid_date_format = function (date, column) {
            if (column === "end_date") {
                return gridDateToStr(new Date(date.valueOf() - 1));
            } else {
                return gridDateToStr(date);
            }
        }

        //配置甘特图容器中的行列滚动条
        gantt.config.layout = {
            css: "gantt_container",
            cols: [
                {
                    width: 430,
                    min_width: 430,
                    rows: [{
                        view: "grid",
                        scrollX: "gridScroll",
                        scrollable: true,
                        scrollY: "scrollVer"
                    },
                    {
                        view: "scrollbar",
                        id: "gridScroll",
                        group: "horizontal"
                    }
                    ]
                },
                {
                    resizer: true,
                    width: 1
                },
                {
                    rows: [{
                        view: "timeline",
                        scrollX: "scrollHor",
                        scrollY: "scrollVer"
                    },
                    {
                        view: "scrollbar",
                        id: "scrollHor",
                        group: "horizontal"
                    }
                    ]
                },
                {
                    view: "scrollbar",
                    id: "scrollVer"
                }
            ]
        };
        //配置颜色编辑器提供颜色选择
        gantt.config.editor_types.color = {
            show: function (id, column, config, placeholder) {
                var html = "<div><input type='color' name=''" + column.name + "></div>";
                placeholder.innerHTML = html;
            },
            hide: function () {
            },
            set_value: function (value, id, column, node) {
                this.get_input(node).value = value;
            },
            get_value: function (id, column, node) {
                return this.get_input(node).value || "";
            },
            is_changed: function (value, id, column, node) {
                var input = this.get_input(node);
                return input.value !== value;
            },
            get_input: function (node) {
                return node.querySelector("input");
            },
            is_valid: function (value, id, column, node) {
                var input = this.get_input(node);
                return !!input.value;
            },
            focus: function (node) {
                var input = this.get_input(node);
                input.focus();
            }
        }
        //配置时间规模，右上方日历
        gantt.config.subscales = [{
            unit: "year",
            step: 1,
            format: "%Y",
            template: weekScaleTemplate,
        },

        {
            unit: "day",
            step: 1,
            format: "%D",
            template: daysStyle,
        }
        ];

        // 初始化
        gantt.init(this.$refs.gantt)
        // 数据解析
        gantt.parse(this.tasks)

        //设置任务条进度内容
        gantt.templates.progress_text = function (start, end, task) {
            return "<div style='text-align:left;color:#fff;padding-left:20px'>" + Math.round(task.progress) +
                "% </div>";
        };
        //任务条显示内容
        gantt.templates.task_text = function (start, end, task) {
            return "<div style='text-align:center;color:#fff'>" + task.text + '(' + task.duration + '天)' +
                "</div>";
        }
        //任务条上的文字大小 以及取消border自带样式
        gantt.templates.task_class = function (start, end, item) {
            return item.$level == 0 ? 'firstLevelTask' : 'secondLevelTask'
        }
        //gantt图任务悬浮窗位置
        gantt.config.tooltip_offset_x = 10;
        gantt.config.tooltip_offset_y = 30;
        //激活列表展开、折叠功能
        gantt.config.open_split_tasks = true;
        //创建新事件通过点击”+“打开灯箱
        gantt.config.details_on_create = true;
        //甘特图图表宽度自适应
        gantt.config.autofit = true;
        //用户可以通过拖拽调整行高
        gantt.config.resize_rows = true;
        //图标项目栏可以任意拖拽
        gantt.config.order_branch = true;
        gantt.config.order_branch_free = true;
        //新增空白列后新增项目
        gantt.config.placeholder_task = true;
        //图标刷新后位置不变
        gantt.config.preserve_scroll = true;
        gantt.config.round_dnd_dates = true;
        //设置甘特图表头高度
        gantt.config.scale_height = 100;
        //是否显示依赖连线(取消)
        gantt.config.show_links = true;
        //点击表头可排序
        gantt.config.sort = true;
        //允许拖放
        gantt.config.drag_project = true;
        // 初始化
        gantt.init(this.$refs.gantt)
        // 数据解析
        gantt.parse(this.tasks)
        //表格列宽自适应
        gantt.config.autofit = true;
        //r任务或者连线拖拽到浏览器屏幕外时，自动触发滚动效果
        gantt.config.autoscroll = true;
        //时间轴图表中，任务条形图的高度
        gantt.config.task_height = 28
        //时间轴图表中，甘特图的高度
        gantt.config.row_height = 36
        //时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状。
        gantt.config.show_task_cells = true
        //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度
        gantt.config.fit_tasks = true;
        gantt.config.min_column_width = 40;
        gantt.config.auto_types = true;
        gantt.config.xml_date = "%Y-%m-%d";
        gantt.config.scale_unit = "month";
        gantt.config.step = 1;
        gantt.config.date_scale = "%Y年%M";
        gantt.config.start_on_monday = true;
        gantt.config.scale_height = 90;
        gantt.config.autoscroll = true;
        gantt.config.calendar_property = "start_date";
        gantt.config.calendar_property = "sPend";
        gantt.config.readonly = true;
        // 初始化
        gantt.init(this.$refs.gantt)
        // 数据解析
        gantt.parse(this.tasks)
        gantt.i18n.setLocale('cn');
        // 初始化
        gantt.init(this.$refs.gantt)
        // 数据解析
        gantt.parse(this.tasks)
    }
}
</script>

<style scoped lang="scss">
/*@import "dhtmlx-gantt/codebase/dhtmlxgantt.css"*/
.left-container {
    height: 600px;
}

.firstLevelTask {
    border: none;

    .gantt_task_content {
        font-size: 13px;
    }
}

.secondLevelTask {
    border: none;
}


.weekend {
    background: #f4f7f4 !important;
}

.gantt_selected .weekend {
    background: #f7eb91 !important;
}


.thirdLevelTask {
    border: 2px solid #da645d;
    color: #da645d;
    background: #da645d;
}

.milestone-default {
    border: none;
    background: rgba(0, 0, 0, 0.45);
}

.milestone-unfinished {
    border: none;
    background: #5692f0;
}

.milestone-finished {
    border: none;
    background: #84bd54;
}

.milestone-canceled {
    border: none;
    background: #da645d;
}

html,
body {
    margin: 0px;
    padding: 0px;
    height: 100%;
    overflow: hidden;
}

.task-color-cell {
    margin: 10%;
    width: 20px;
    height: 20px;
    border: 1px solid #cecece;
    display: inline-block;
    border-radius: 20px;
}

.container {
    height: 100%;
    width: 100%;
    position: relative;

    .gantt_grid_head_cell {
        padding-left: 20px;
        text-align: left !important;
        font-size: 14px;
        color: #333;
    }

    .select-wrap {
        position: absolute;
        top: 25px;
        z-index: 99;
        width: 90px;
        left: 180px;

        .el-input__inner {
            border: none;
        }
    }

    .parent {
        .gantt_tree_icon {
            &.gantt_folder_open {
                // background-image: url(../../../../assets/icons/tree-table.svg) !important;
            }

            &.gantt_folder_closed {
                // background-image: url(../../../../assets/icons/documentation.svg) !important;
            }
        }
    }

    .green,
    .yellow,
    .pink,
    .popular {
        .gantt_tree_icon.gantt_file {
            background: none;
            position: relative;

            &::before {
                content: "";
                width: 10px;
                height: 10px;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    .green {
        .gantt_tree_icon.gantt_file {
            &::before {
                background: #84bd54;
            }
        }
    }

    .yellow {
        .gantt_tree_icon.gantt_file {
            &::before {
                background: #fcca02;
            }
        }
    }

    .pink {
        .gantt_tree_icon.gantt_file {
            &::before {
                background: #da645d;
            }
        }
    }

    .popular {
        .gantt_tree_icon.gantt_file {
            &::before {
                background: #d1a6ff;
            }
        }
    }

}

.gantt_task_content {
    text-align: left;
    padding-left: 10px;
}



#gantt_here {
    width: 100vw;
    height: 100vh;
}


.fa {
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    opacity: 0.2;
    padding: 5px;
}

.fa:hover {
    opacity: 1;
}

.fa-pencil {
    color: #ffa011;
}

.fa-plus {
    color: #328EA0;
}

.fa-times {
    color: red;
}

.weekend {
    background: #f4f7f4;
}

.gantt_selected .weekend {
    background: #f7eb91;
}
</style>