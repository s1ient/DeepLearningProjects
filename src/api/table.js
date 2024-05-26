import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/deepLearning/table/list',
    method: 'get',
    params
  })
}
