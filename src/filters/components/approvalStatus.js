// 审批状态
const approvalStatus = [
  { value: 0, text: '待审批', tagType: '' },
  { value: 1, text: '已批准', tagType: 'success' },
  { value: 2, text: '已拒绝', tagType: 'danger' }
]
export function approvalStatusText(value) {
  return approvalStatus.find(item => item.value === value).text
}

export function approvalStatusTagType(value) {
  return approvalStatus.find(item => item.value === value).tagType
}
