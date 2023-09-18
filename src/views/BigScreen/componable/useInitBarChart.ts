// 引入echarts
import * as echarts from 'echarts'
import type { ParkResponseType } from '@/types/park'

import { ref } from 'vue'

export const useInitBarChart = () => {
  //保存柱状图的dom节点
  const barChart = ref(null)
  // 渲染树状图
  const initBarChart = (parkInfo: ParkResponseType) => {
    // 获取园区年度收入分析数据
    const { parkIncome } = parkInfo
    // console.log(parkIncome)

    // 3.初始化echarts并指定渲染的容器
    const myBarChart = echarts.init(barChart.value)
    // 4.设置配置
    const pieOption = {
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '10px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: parkIncome.xMonth,
        axisTick: {
          show: false, //刻度线消失
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false //图表图绘制消除
        }
      },
      series: [
        {
          type: 'bar',
          data: parkIncome.yIncome.map((item, index) => {
            const color =
              index % 2 === 0
                ? {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#74c0f8' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(116,192,248,0)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                : {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ff7152' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(255,113,82,0)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
            return { value: item, itemStyle: { color } }
          }),
          barWidth: '10px',
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          showBackground: true
        }
      ]
    }
    // 5. 渲染图表
    myBarChart && myBarChart.setOption(pieOption)
    // 6. 设置图表自适应
    // window.addEventListener('resize', () => {
    //   myPieChart.resize()
    // })
  }
  return { barChart, initBarChart }
}
