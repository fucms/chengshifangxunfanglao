<template>
    <div class="my-calendar">
        <FullCalendar ref="myCalendar" :options="calendarOptions" :weekNumbers='true' />
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import moment from 'moment';

export default {
    name: "my-calendar",
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
                initialView: 'dayGridMonth',
                locale: 'zh',
                firstDay: 1,
                buttonText: {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '日',
                    list: '周列表',
                },
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek',
                },
                height: 600,
                validRange: this.validRange,  //设置可显示的总日期范围
                datesSet: this.datesSet, //日期渲染；修改日期范围后触发
                eventClick: this.handleEventClick, //点击日程触发
                dateClick: this.handleDateClick, //点击日期触发
                eventDrop: this.calendarEventDropOrResize, //拖动事件触发
                eventResize: this.calendarEventDropOrResize, //缩放事件触发
                displayEventTime: false, //不显示具体时间
                events: [
                    {
                        id: 111,
                        title: '任务1',
                        start: '2024-07-21',
                        end: '2024-08-11',
                        color: 'rgb(255, 127, 249)',
                        editable: true, //允许拖动缩放，不写默认就是false
                        overlap: true, //允许时间重叠，即可以与其他事件并存，不写默认就是false
                        
                        // display: 'background', //背景色 (添加相同时间的背景色时颜色会重叠)
                        // backgroundColor: 'rgb(127, 206, 255)', //背景色(添加相同时间的背景色时颜色会重叠)
                        // textColor: '#000000', //文字颜色
                        // borderWidth: 1, //边框宽度
                        // className: 'custom-class', //自定义class

                    },
                    {
                        id: 222,
                        title: '任务2',
                        start: '2024-08-01',
                        end: '2024-10-11',
                        color: '#99ccff',
                        editable: true,
                        overlap: true,
                    },
                    {
                        id: 333,
                        title: '任务3',
                        start: '2024-09-01',
                        end: '2024-09-11',
                        color: 'rgb(129, 242, 114)',
                        editable: true,
                        overlap: true,
                    }
                ], //背景色 (添加相同时间的背景色时颜色会重叠) 
            },
            validRange: {
                start: '2023-01-01',
                end: moment().add(6, 'months').format('YYYY-MM-DD'),
            }
        }
    },
    methods: {
        datesSet(info) {   
        },
        handleEventClick(info) { },
        handleDateClick(info) { },
        calendarEventDropOrResize(info) { }
    }
}
</script>

<style scoped>
p{
    color: rgb(142, 255, 127);
}
</style>