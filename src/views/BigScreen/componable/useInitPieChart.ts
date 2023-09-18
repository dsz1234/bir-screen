// 引入echarts
import * as echarts from 'echarts'
import type { ParkResponseType } from '@/types/park'

import { ref } from 'vue'

export const useInitPieChart = () => {
  // 保存饼状图的dom节点
  const pieChart = ref(null)

  // 渲染饼状图
  const initPieChart = (parkInfo: ParkResponseType) => {
    // 获取园区产业分布数据
    const { parkIndustry } = parkInfo

    // 3.初始化echarts并指定渲染的容器
    const myPieChart = echarts.init(pieChart.value)
    // 3. 创建配置项
    const option = {
      color: ['#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
      tooltip: {
        //划过提示信息
        trigger: 'item'
      },
      // 底部统计
      legend: {
        // 行的间隙
        itemGap: 10,
        // 位置
        bottom: '0',
        left: 'center',
        // 吧四个圆角变为方角
        icon: 'rect',
        // 设置宽高
        itemWidth: 10,
        itemHeight: 10,
        // 设置文字颜色
        textStyle: {
          color: '#c6d1db'
        }
      },
      series: [
        {
          // 划过的提示消息
          tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
              // console.log('params', params)
              return `${params.seriesName}<br/>${params.marker}${params.name}${params.percent}%`
            }
          },
          name: '园区产业分析',
          type: 'pie',
          // 饼状图大小 与位置
          radius: ['55%', '60%'],
          center: ['50%', '34%'],
          avoidLabelOverlap: false,
          // 中间文字不显示
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: parkIndustry
        }
      ]
    }

    // 4. 渲染配置项
    myPieChart && myPieChart.setOption(option)

    // 5. 图表自适应
  }
  return { pieChart, initPieChart }
}
