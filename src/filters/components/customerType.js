// 客户类型
const customerType = [
  { value: 1, text: '普通客户', background: 'background: rgb(37, 149, 183)' },
  { value: 2, text: 'vip客户', background: 'background: #ff9900' },
  { value: 3, text: '合作伙伴', background: 'background: #9933ff' },
  { value: 4, text: '竞争对手', background: 'background: #ff0000' },
  {
    value: 5,
    text: '竞争对手客户',
    background: 'background: rgb(213, 189, 104)'
  },
  { value: 6, text: '集成商', background: 'background: rgb(83, 165, 91)' },
  { value: 7, text: '代理商', background: 'background: rgb(123, 180, 170)' },
  { value: 8, text: '供应商', background: 'background: rgb(207, 174, 174)' },
  { value: 9, text: '其他', background: 'background: rgb(96, 95, 95)' }
]
export function customerTypeText(val) {
  return customerType.find((item) => item.value === val).text
}
export function customerTypeColor(val) {
  return customerType.find((item) => item.value === val).background
}

// 商机类型
const sourceType = [
  { value: 1, text: '电话来访', background: 'background: rgb(71, 234, 136)' },
  { value: 2, text: '公司分配', background: 'background: rgb(244, 129, 52)' },
  { value: 3, text: '客户介绍', background: 'background: rgb(102, 168, 248)' },
  { value: 4, text: '独立开发', background: 'background: rgb(45, 234, 215)' },
  { value: 5, text: '朋友介绍', background: 'background: rgb(240, 255, 75)' },
  { value: 6, text: '广告宣传', background: 'background: rgb(64, 149, 98)' },
  { value: 7, text: '市场活动', background: 'background: rgb(219, 167, 245)' },
  { value: 8, text: '合作伙伴', background: 'background: rgb(236, 107, 174)' },
  { value: 9, text: '公开招标', background: 'background: rgb(194, 111, 111)' },
  { value: 10, text: '老客户', background: 'background: rgb(54, 49, 163)' },
  { value: 11, text: '代理商', background: 'background: rgb(96, 95, 95)' }
]
export function sourceTypeText(val) {
  return sourceType.find((item) => item.value === val).text
}
export function sourceTypeColor(val) {
  return sourceType.find((item) => item.value === val).background
}

// 重要程度
const levelType = [
  { value: 1, text: 'A类客户', background: 'background: rgb(236, 82, 82)' },
  { value: 2, text: 'B类客户', background: 'background: rgb(236, 82, 223)' },
  { value: 3, text: 'C类客户', background: 'background: rgb(102, 168, 248)' },
  { value: 4, text: 'D类客户', background: 'background: rgb(169, 184, 199)' }
]
export function levelTypeText(val) {
  return levelType.find((item) => item.value === val).text
}
export function levelTypeColor(val) {
  return levelType.find((item) => item.value === val).background
}

// 客户状态
const customerStatus = [
  { value: 1, text: '潜在客户', background: 'background: rgb(250, 152, 114)' },
  { value: 2, text: '试用客户', background: 'background: rgb(95, 106, 254)' },
  { value: 3, text: '成交客户', background: 'background: rgb(100, 201, 56)' },
  { value: 4, text: '失败客户', background: 'background: rgb(131, 131, 131)' }
]
export function customerStatusText(val) {
  return customerStatus.find((item) => item.value === val).text
}
export function customerStatusColor(val) {
  return customerStatus.find((item) => item.value === val).background
}

// 隐患等级
const hazardLevel = [
  { value: 1, text: '1级', background: '#08760a' },
  { value: 2, text: '2级', background: '#87b00e' },
  { value: 3, text: '3级', background: '#d9d208' },
  { value: 4, text: '4级', background: '#c7620f' },
  { value: 5, text: '5级', background: '#ad0b0b' }
]
export function hazardLevelText(val) {
  return hazardLevel.find((item) => item.value === Number(val)).text
}
export function hazardLevelColor(val) {
  return hazardLevel.find((item) => item.value === Number(val)).background
}
