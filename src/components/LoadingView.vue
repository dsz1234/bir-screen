<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
const router = useRouter()
const route = useRoute()
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="loading" v-if="loading">
    <p>园区资源加载中...</p>
    <div class="loading-proress">
      <div class="proress"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 40%;
  left: 66%;
  color: #cdd7e1;
  width: 290px;
  transform: translateX(-50%);
  text-align: center;
  .loading-proress {
    width: 100%;
    height: 4px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 15px;
    background: rgba(255, 255, 255, 0.2);
    .proress {
      width: 5%;
      height: 100%;
      background: linear-gradient(90deg, #48ffff 0%, #3656ff 100%);
      animation-name: loading;
      animation-duration: 1000s;
    }
  }
  @keyframes loading {
    0% {
      transform: scaleX(1);
    }
    1% {
      transform: scaleX(38);
    }
    100% {
      transform: scaleX(48);
    }
  }
}
</style>
