<style scoped>
  .spin-content{
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
</style>
<template>
  <div>
    <a-spin spainning={{}} tip="Loading...">
      <div class="spin-content">
        我的描述文案是自定义的。。。
      </div>
    </a-spin>
  </div>
</template>

<script>
import func from '../../vue-temp/vue-editor-bridge';
export default {
    data:function(){
        return{
            loading:true
        }
    }
}
</script>