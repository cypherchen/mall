<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <!--尺寸列表-->
<!--    <table v-for="(table,indexa) in paramInfo.sizes"-->
<!--            :key="indexa">-->
<!--      <tr v-for="(tr,indexb) in table" >-->
<!--        <td v-for="(td,indexc) in tr" :key="indexc">{{td}}</td>-->
<!--      </tr>-->
<!--    </table>-->
    <table class="info-size">
      <tr v-for="(tr,index) in  paramInfo.sizes"
          :key="index">
        <td v-for="(td,indey) in tr" :key="indey">{{td}}</td>
      </tr>
    </table>
    <!--其他信息-->
    <table class="info-other">
      <tr v-for="(info,index) in paramInfo.infos">
        <td class="info-other-key" :key="index">{{info.key}}</td>
        <td class="info-other-value" :key="index*100+1">{{info.value}}</td>
      </tr>
    </table>
    <!--图片信息-->
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
}
</script>

<style scoped>
  .param-info {
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 5px solid #eee;
  }

  .info-size {
    width: 100%;
    table-layout: fixed;
  }

  .info-other {
    width: 100%;
    padding-bottom: 30px;
  }

  .info-other-key {
    width: 30%;
  }

  .info-other-value {
    line-height: 1.5rem;
    color: var(--color-high-text);
  }

  td {
    border-bottom: 1px solid #eee;
  }

</style>
