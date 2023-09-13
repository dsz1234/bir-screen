import type { ParkResponseType } from '@/types/park'
import request from '@/utils/request'

// 获取园区数据信息
export const getParkInfo = () => {
  return request<ParkResponseType>('/park/statistics/info', 'GET')
}
