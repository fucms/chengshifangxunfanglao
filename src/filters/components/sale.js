const saleStage = [
  { value: 1, text: '初期沟通', background: 'background: #889090' },
  { value: 2, text: '需求分析', background: 'background: #f38ce4' },
  { value: 3, text: '方案报价', background: 'background: #e88f4f' },
  { value: 4, text: '商务谈判', background: 'background: #5571bd' },
  {
    value: 5,
    text: '成功结案',
    background: 'background: #61bd55'
  },
  { value: 6, text: '失败结案', background: 'background: rgb(245, 100, 100)' }
]
export function saleStageText(val) {
  return saleStage.find((item) => item.value === val).text
}
export function saleStageBackground(val) {
  return saleStage.find((item) => item.value === val).background
}
