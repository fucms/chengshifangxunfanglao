import request from '@/utils/request'

export function getList() {
  return request({
    url: '/vue-element-admin/MoldDetails/TableList',
    method: 'get'
  })
}
export function deleteListById(id) {
  return request({
    url: `/vue-element-admin/MoldDetails/Delete/${id}`,
    method: 'delete'
  })
}

export function getProjectTaskListAll() {
  return request({
    url: `/vue-element-admin/MoldDetails/ProjectTaskListAll`,
    method: 'get'
  })
}