const projectStage = [
  { value: 1, text: '项目立项', background: 'background: rgb(37, 149, 183)' },
  { value: 2, text: '需求调研', background: 'background: #ff9900' },
  { value: 3, text: '蓝图设计', background: 'background: #9933ff' },
  { value: 4, text: '系统构建', background: 'background: #ff0000' },
  {
    value: 5,
    text: '系统上线',
    background: 'background: rgb(213, 189, 104)'
  },
  { value: 6, text: '项目验收', background: 'background: rgb(83, 165, 91)' }
]
export function projectStageText(val) {
  return projectStage.find((item) => item.value === val).text
}
export function projectStageColor(val) {
  return projectStage.find((item) => item.value === val).background
}

const projectType = [
  { value: 1, text: '未开始', type: 'info' },
  { value: 2, text: '进行中', type: '' },
  { value: 3, text: '已暂停', type: 'warning' },
  { value: 4, text: '已完成', type: 'success' }
]
export function projectTypeType(val) {
  return projectType.find((item) => item.value === val).type
}
export function projectTypeText(val) {
  return projectType.find((item) => item.value === val).text
}
