<template>
  <div id="overviewSuperWrappe">
      <div v-show="isLoading" >
        <a-spin tip="数据正在加载中...">
          <div class="spin-content"></div>
        </a-spin>
      </div>
    <div id="pageWrapper" >
      <div class="singleBoxWrapper">
        <div class="singleStaticsBox">
            <div class="singleStaticsBoxInstructionBox">
                <div class="singleStaticsBoxInstructionBoxTitle">
                    <span>部门项目总数</span>
                    <div class="whiheStripeDiv"></div>
                </div>
                <div class="singleStaticsBoxInstructionBoxNumber">
                  30
                </div>
            </div>
            <div class="singleStaticsBoxInstructionBoxImage singleStaticsBoxInstructionBoxImageOne">

            </div>
        </div>
        <div class="singleStaticsBox">
            <div class="singleStaticsBoxInstructionBox">
                <div class="singleStaticsBoxInstructionBoxTitle">
                    <span>在建项目总数</span>
                    <div class="whiheStripeDiv"></div>
                </div>
                <div class="singleStaticsBoxInstructionBoxNumber">
                  31
                </div>
            </div>
            <div class="singleStaticsBoxInstructionBoxImage singleStaticsBoxInstructionBoxImageTwo">

            </div>
        </div>
        <div class="singleStaticsBox">
            <div class="singleStaticsBoxInstructionBox">
                <div class="singleStaticsBoxInstructionBoxTitle">
                    <span>结办项目总数</span>
                    <div class="whiheStripeDiv"></div>
                </div>
                <div class="singleStaticsBoxInstructionBoxNumber">
                  32
                </div>
            </div>
            <div class="singleStaticsBoxInstructionBoxImage singleStaticsBoxInstructionBoxImageThree">

            </div>
        </div>
        <div class="singleStaticsBox">
            <div class="singleStaticsBoxInstructionBox">
                <div class="singleStaticsBoxInstructionBoxTitle">
                    <span>逾期项目总数</span>
                    <div class="whiheStripeDiv"></div>
                </div>
                <div class="singleStaticsBoxInstructionBoxNumber">
                  33
                </div>
            </div>
            <div class="singleStaticsBoxInstructionBoxImage singleStaticsBoxInstructionBoxImageFour">

            </div>
        </div>
      </div>
      <div id="staticsNumberBox">
        <div id="budgetAmount" class="singleStaticsNumberBox">
            <div class="singleStaticsNumberBoxLittleWrapper">
              <div class="singleStaticsNumberBoxTitle">
                预算金额(元)
              </div>
              <div class="singleStaticsNumberBoxNumber">
                100,000,000.00
              </div>
            </div>
        </div>
        <div id="approcalAmount" class="singleStaticsNumberBox">
            <div class="singleStaticsNumberBoxLittleWrapper">
              <div class="singleStaticsNumberBoxTitle">
                立项金额(元)
              </div>
              <div class="singleStaticsNumberBoxNumber">
                900,000.00
              </div>
            </div>
        </div>
        <div id="spentAmount" class="singleStaticsNumberBox">
            <div class="singleStaticsNumberBoxLittleWrapper">
              <div class="singleStaticsNumberBoxTitle">
                支出金额(元)
              </div>
              <div class="singleStaticsNumberBoxNumber">
                300,000.00
              </div>
            </div>
        </div>
        <div id="implementationRate" class="singleStaticsNumberBox">
            <div class="singleStaticsNumberBoxLittleWrapper">
              <div class="singleStaticsNumberBoxTitle">
                执行率
              </div>
              <div class="singleStaticsNumberBoxNumber">
                80%
              </div>
            </div>
        </div>
      </div>
      <div id="tabInformationWrapper">
          <div>
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="逾期项目" key="1" style="height: 200px">Content of Tab Pane 1</a-tab-pane>
              <a-tab-pane tab="责任人情况" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
              <a-tab-pane tab="分项执行情况" key="3">Content of Tab Pane 3</a-tab-pane>
              <template slot="renderTabBar" slot-scope="props, DefaultTabBar">
                <component :is="DefaultTabBar" {...props} />
              </template>
            </a-tabs>
          </div>
          <button @click="test">发请求</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    test(){
      this.$http.test().then((res)=>{
        console.log(res)
      })
    }
  },
  mounted(){

  },
  created() {
    console.log(window)
    let _this=this;
    setTimeout(function(){
          _this.$http.test(window.sessionStorage.getItem("token")).then((res)=>{
            console.log(res)
          })
    },3000)

    //  if(this.$route.query.token){
    //    setTimeout(function(){
    //       this.$http.test(window.sessionStorage.getItem("token")).then((res)=>{
    //         console.log(res)
    //       })
    //    },3000)

    //  }else{
    //     this.$http.test(window.sessionStorage.getItem("token")).then((res)=>{
    //         console.log(res)
    //     })
    //  } 
    console.log("进入首页后",window.sessionStorage.getItem("token"))
  }
};
</script>

<style>
#overviewSuperWrappe{
  height: 100%;
  background-color: #F1F7FB;
  overflow: hidden;
}
#pageWrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  margin-top: 20px;
}
#main{
  margin-left:220px;
  margin-top:60px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.singleBoxWrapper{
  height: 124px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.singleStaticsBox{
  width: 22.8%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}
.singleStaticsBox:nth-child(1){
 background: url("../../static/assets/bg_brown.png") 50% 40% no-repeat;
}
.singleStaticsBox:nth-child(2){
 background: url("../../static/assets/bg_pink.png") 50% 40% no-repeat;
}
.singleStaticsBox:nth-child(3){
 background: url("../../static/assets/bg_green.png") 50% 40% no-repeat;
}
.singleStaticsBox:nth-child(4){
 background: url("../../static/assets/bg_blue.png") 50% 40% no-repeat;
}
.singleStaticsBoxInstructionBox{
  width: 110px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.singleStaticsBoxInstructionBoxImage{
  width: 90px;
  height: 90px;
}
.singleStaticsBoxInstructionBoxImageOne{
background: url("../../static/assets/projectAmount.png") 50% 40% no-repeat;
}
.singleStaticsBoxInstructionBoxImageTwo{
background: url("../../static/assets/projectUnderConstruction.png") 50% 40% no-repeat;
}
.singleStaticsBoxInstructionBoxImageThree{
background: url("../../static/assets/projectsDone.png") 50% 40% no-repeat;
}
.singleStaticsBoxInstructionBoxImageFour{
background: url("../../static/assets/overDueProjects.png") 50% 40% no-repeat;
}
.singleStaticsBoxInstructionBoxTitle{
  height: 29px;
  font-size: 17px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.whiheStripeDiv{
  width: 40px;
  height: 2px;
  background-color: #fff;
}
.singleStaticsBoxInstructionBoxNumber{
  font-size: 38px;
  color: #fff;
  width: 38px;
  height: 38px;
  line-height: 38px;
  margin-left: 2px;
}
#staticsNumberBox{
  height: 160px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#staticsNumberBox .singleStaticsNumberBox{
  width: 25%;
  height: 100px;
  border-right: 1px solid #F3F3F3;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#staticsNumberBox .singleStaticsNumberBox:nth-child(4){
  border-right: none;
}
.singleStaticsNumberBoxLittleWrapper{
  width: 188px;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.singleStaticsNumberBoxTitle{
  height: 20px;
  font-size: 20px;
  color: #999999;
  text-align: center;
}
.singleStaticsNumberBoxNumber{
  font-size: 27px;
  color: #2bb7b3;
  text-align: center;
  /* font-family: PingFangSC-Regular; */
}
#tabInformationWrapper{
  height: calc(100vh - 404px);
  background-color: #fff;
  margin-top: 20px;
}
</style>