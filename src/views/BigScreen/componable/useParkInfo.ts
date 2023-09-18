import type { ParkResponseType } from '@/types/park'
import { ref } from 'vue'
import { getParkInfo } from '@/api/park'

export const useParkInfo = () => {
  // 请求并保存园区数据
  const parkInfo = ref<ParkResponseType>()
  const initParkList = async () => {
    const res = await getParkInfo()
    // console.log(res)
    parkInfo.value = res.data
  }
  return { parkInfo, initParkList }
}
