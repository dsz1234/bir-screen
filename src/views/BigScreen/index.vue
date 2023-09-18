<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LoadingView from '@/components/LoadingView.vue'
import { Application } from '@splinetool/runtime'
import vScaleScreen from 'v-scale-screen'
// 引入3d解析器

// 设置显示显示进度条状态
const loading = ref(false)

// 渲染echarts图表方法
// 1. 下载并引入echarts
// 2. 获取渲染的dom容器(获取dom节点)
import { useInitBarChart, useInitPieChart, useParkInfo } from './componable'
// 获取园区数据
const { parkInfo, initParkList } = useParkInfo()
// 渲染树状图
const { barChart, initBarChart } = useInitBarChart()
// 渲染饼状图
const { pieChart, initPieChart } = useInitPieChart()
onMounted(async () => {
  await initParkList()
  initBarChart(parkInfo.value!)
  initPieChart(parkInfo.value!)
  init3dModel()
})

// 3d模型显示步骤
// 1.下载解析器
// 2.引入解析器
// 3.实例化解析器并指定渲染的容器
// 4.拉取模型，并且渲染
const ref3d = ref()
const init3dModel = () => {
  loading.value = true
  const spline = new Application(ref3d.value)
  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then((res) => {
    console.log('模型加载完毕')
    loading.value = false
  })
}
</script>

<template>
  <vScaleScreen width="1920" height="1080">
    <!-- 左侧 -->
    <div class="all-charts">
      <!-- 园区概况 -->
      <div class="section-one">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
          alt="logo"
        />
        <div class="icons-container">
          <div class="item">
            <div class="icons-item building-icon">
              <span class="number">{{ parkInfo?.base.buildingTotal }} </span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">（栋）</span>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">{{ parkInfo?.base.enterpriseTotal }} </span>
            </div>
            <span class="title">入驻企业总数</span>
            <span class="unity">（家）</span>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">{{ parkInfo?.base.parkingTotal }} </span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">（个）</span>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">{{ parkInfo?.base.chargePoleTotal }} </span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">（个）</span>
          </div>
        </div>
      </div>
      <!-- 园区年度收入分析 -->
      <div class="section-two">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt="logo"
        />
        <div class="bar-chart-title">
          <span>单位：元</span>
          <div class="right">
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            <p>收入情况</p>
          </div>
        </div>
        <div class="bar-chart" ref="barChart"></div>
      </div>
      <!-- 园区产业分布 -->
      <div class="section-three">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt="logo"
        />
        <div class="pie-chart" ref="pieChart"></div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="model-container">
      <LoadingView :loading="loading"></LoadingView>
      <canvas
        class="canvas-3d"
        style="width: 100%; height: 100%"
        ref="ref3d"
      ></canvas>
    </div>
  </vScaleScreen>
</template>

<style lang="scss" scoped>
.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  width: 480px;
  height: 100vh;
  padding: 20px;
  color: #fff;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background: linear-gradient(
    to left,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(1, 4, 11, 1) 70%,
    #04070d 100%
  );
  .img-header {
    height: 30px;
  }
  .section-one {
    flex-basis: 25%;
    .icons-container {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      .item {
        display: flex;
        flex-direction: column;
        text-align: center;
        flex: 1;
        .icons-item {
          height: 80px;
          position: relative;
          .number {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px;
            color: #fff;
          }
        }
        .title {
          margin-top: 8px;
        }
        .title,
        .unity {
          font-size: 14px;
          color: #cdd7e1;
        }
        .building-icon {
          background: url('@/assets/building-icon.png') no-repeat 50% 0 /
            contain;
        }
        .enterprise-icon {
          background: url('@/assets/building-icon.png') no-repeat 50% 0 /
            contain;
        }
        .rod-icon {
          background: url('@/assets/building-icon.png') no-repeat 50% 0 /
            contain;
        }
        .car-icon {
          background: url('@/assets/building-icon.png') no-repeat 50% 0 /
            contain;
        }
      }
    }
  }
  .section-two {
    margin-top: 50px;
    flex-basis: 35%;
    .bar-chart-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #c6d1db;
      font-size: 14px;
      margin-top: 20px;
      .right {
        display: flex;
        align-items: center;
        .bar-icon {
          display: inline-block;
          width: 12px;
          height: 4px;
          margin: 0 4px;
        }
        .blue-bar-icon {
          background: linear-gradient(90deg, #74c0f8, rgba(116, 192, 248, 0));
        }
        .red-bar-icon {
          background: linear-gradient(90deg, #ff7152, rgba(116, 192, 248, 0));
        }
        p {
          margin-left: 5px;
        }
      }
    }
    .bar-chart {
      width: 100%;
      height: calc(100% - 70px);
    }
  }
  .section-three {
    flex-basis: 40%;
    padding-top: 20px;
    .pie-chart {
      width: 80%;
      height: calc(100% - 40px);
      margin: 0 auto;
    }
  }
}
.model-container {
  width: 100%;
  height: 100%;
  background-color: #161c2a;
}
</style>
