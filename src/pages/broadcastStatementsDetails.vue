<template>
  <div>
    <div id="pageWrapper" @keydown.enter="search(true)">
      <div id="searchBox">
        <!-- <div>
        <a-radio-group defaultValue="2" buttonStyle="solid" @change='changeTimeScale'>
            <a-radio-button value="2">按周次</a-radio-button>
            <a-radio-button value="3">按月份</a-radio-button>
            <a-radio-button value="4">按年份</a-radio-button>
        </a-radio-group>
        </div> -->
        <div id="searchByNames" style="float:right">
          <!-- <div id="searchByNamesLabel">名称：</div> -->
          <div id="searchByNamesInput">
            <!-- <a-input v-model="searchParam" @keydown.enter="search(true)" placeholder="请输入POS机房间名称"  size="small"/> -->
            <a-button  @click="print" type="primary" size="small" style="margin-left:10px">导出</a-button>
          </div>
        </div>
      </div>
      <div id="pdfDom">
        <h4 id="printTitle" > {{printTitle}}</h4>
        <a-table :columns="columns" :dataSource="data" :pagination="false"  bordered :loading="isLoading">
          <template
            v-for="col in ['name', 'age', 'address']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <div :key="col" >
              <a-input
                v-if="record.editable"
                style="margin: -5px 0;padding:10px !important"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{text}}</template>
            </div>
          </template>
          <template
            v-for="col in ['name','age', 'address','highLight']"
            slot="highLight"
            slot-scope="text, record,highLight"
          >
            <div :key="col" >
              <a-input
                v-if="record.editable"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{text}}</template>
            </div>
          </template>
                  <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <a-button @click="seeDetails(record)" type="primary" size="small">详情</a-button>
          </div>
        </template>
        <template slot="footer" slot-scope="currentPageData" style="background:white !important">
            <span>备注：</span><span>{{remarks}}</span>
        </template>
        </a-table>
        <div id="tip" style="margin-top:20px;padding-left:16px">注：正常填写正常，有问题填写异常，问题及处理情况6小时内必须以书面形式报至终端组主管人员，实行表年月周查制. 每周巡检1次，间隔禁止超过7个工作日</div>
        <div id="signatureBox" style="padding-left:16px">
            <div id="engineerSigature" style="width:200px;">
                <span>运维工程师签名：</span> 
            </div>
            <div id="leaderSigature" style="width:200px;margin-left:300px">
                <span>负责人签名：</span> 
            </div>
            <div id="leaderTeacherSigature" style="width:200px;margin-left:200px">
                <span> 主管老师签名：</span> 
            </div>
        </div>
        <!-- <div id="pagination" v-show="!isLoading"> 
          <div id="total">
            共<span style="margin:0 5px;">{{recordsTotal}}</span>条数据
          </div>
          <div id="paginationBox">
            <a-pagination @change="changePage" v-model="current" :total="recordsTotal"   :pageSize="12" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "巡检日期",
    dataIndex: "startTime",
    width: "8%",
    scopedSlots: { customRender: "_id" },
    align:"center"
  },
  {
    title: "电源及照明灯情况",
    dataIndex: " 1",
    width: "10%",
    scopedSlots: { customRender: "highLight" },
    align:"center"
  },
  {
    title: "是否有异味",
    dataIndex: " 2",
    width: "7%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "室内有无杂物",
    dataIndex: " 3",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "卫生",
    dataIndex: " 4",
    width: "4%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },{
    title: "门锁",
    dataIndex: " ",
    width: "4%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
    {
    title: "异常个数",
    dataIndex: "count",
    width: "7%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
//     {
//     title: "UPS异常个数",
//     dataIndex: "upsCount",
//     width: "7%",
//     scopedSlots: { customRender: "address" },
//     align:"center"
//   },{
//     title: "门禁异常个数",
//     dataIndex: "doorCount",
//     width: "7%",
//     scopedSlots: { customRender: "address" },
//     align:"center"
//   },{
//     title: "烟雾异常个数",
//     dataIndex: "smokeCount",
//     width: "7%",
//     scopedSlots: { customRender: "address" },
//     align:"center"
//   },{
//     title: "温度异常个数",
//     dataIndex: "temperatureCount",
//     width: "7%",
//     scopedSlots: { customRender: "address" },
//     align:"center"
//   },{
//     title: "湿度异常个数",
//     dataIndex: "humidityCount",
//     width: "7%",
//     scopedSlots: { customRender: "address" },
//     align:"center"
//   },
  {
    title: "线路有无乱线及飞线情况存在",
    dataIndex: " 5",
    width: "10%",
    scopedSlots: { customRender: "address" },
    align:"center"
  }
];

export default {
  name: "posMechine",
  data() {
    return {
      columns,
      recordsTotal: 0,
      statusParam:this.status === "全部" ? null : this.status,
      buildingIdParam: this.buildingId === "全部" ? null : this.buildingId,
      page: 1,
      searchParam: "",
      isLoading: true,
      current: 1,
      data:[],
      timeScale:2,
      remarks:"",
      printTitle:this.$route.query.title,
      isPrinting:false
    };
  },
  methods: {
    print(){
      this.isPrinting=true;
      let _this=this;
      this.$nextTick(()=>{
        console.log(this.isPrinting)
      new Promise(function(resolve, reject){
            //做一些异步操作
            setTimeout(function(){
                _this.getPdf();
                resolve('随便什么数据');
            }, 20);
        }).then(()=>{
          _this.isPrinting=false;
          _this.$nextTick(()=>{
            console.log(this.isPrinting)
          })
        });


        
        // setTimeout(function(){
        //   this.isPrinting=false;
        // },1000)
      })
    },
    changeTimeScale(e){
          console.log(e.target.value)
          this.timeScale=e.target.value;
          this.page=1;
          this.$nextTick(()=>{
              this.search(true)
          })
      },
    handleStatusChange() {
      this.statusParam = this.status === "null" ? null : this.status;
      // this.$http
      //   .toGetPosMechineList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.data = res.data.data;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //       });
      //     } else {
      //     }
      //   });
    },
    color(type){
      if(type!=0){
        return 'color : red'
      }
    },
    handleBuildingChange() {
      this.buildingIdParam =
        this.buildingId === "null" ? null : this.buildingId;
      // this.$http
      //   .toGetPosMechineList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.data = res.data.data;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //       });
      //     } else {
      //     }
      //   });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // search(isSearching) {
    //     this.$nextTick(()=>{
    //       this.GetlowVoltageRoomStatements(this.page,this.timeScale,isSearching)
    //     })
 
    // },
    addOrder() {
      var i = 1 + (this.page-1)*12;
      this.data = this.data.filter(item => {
        item["key"] = i++;
        return true;
      });
    },
    // GetlowVoltageRoomStatements(page,timeScale,isSearching){
    //   this.isLoading=true;
    //   this.$http.toGetlowVoltageRoomStatements(page,timeScale).then(res => {
    //     if (res.data.success) {
    //       this.recordsTotal = res.data.recordsTotal;
    //         this.data=res.data.data.map((item)=>{
    //             item.weekNum="第"+item.weekNum+"周";
    //             item.timeRange=item.startTime.substring(0,11) + " 至 " + item.endTime.substring(0,11);
    //             return item
    //         })
    //         this.$nextTick(() => {
    //         this.isLoading = false;
    //         this.addOrder()
    //       });
    //       if(isSearching){
    //         this.current=1
    //       }
    //     }
    //   });
    // },f  
    GetbroadcastStatementsDetails(){
        this.isLoading=true;
        this.$http.toGetbroadcastStatementsDetails(this.$route.query.type,this.$route.query.startTime).then((res)=>{
            console.log(res)
            if(res.data.success){
                this.data=res.data.data.map((item)=>{
                    item.startTime=item.startTime.substring(0,10);
                    return item
                });
                this.$nextTick(() => {
                this.isLoading = false;
                // this.addOrder()
          });
            }else{
              this.$message.error(res.data.errorInfo);
            }
        })
    },
    changePage(page){
      this.page=page;
      this.$nextTick(()=>{
        this.search(false)
      })
    },
    seeDetails(item){
        console.log(item)
    }
  },
  created() {
    // 默认请求第一页，按周统计
    // this.GetlowVoltageRoomStatements(1,2,false)
    this.GetbroadcastStatementsDetails()
    
  },
  mounted(){
        let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.search(true);// 登录方法名
         return false;
      }
    };
  }
};
</script>
<style scoped>
html {
  height: 100%;
}
body {
  height: 100%;
}
#pageWrapper {
  height: calc(100% - 50px);
  width: 100%;
}
#frame {
  height: 100%;
}
#searchBox {
  height: 50px;
  width: 1560px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
#statusSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#searchByNames {
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
}
#searchByNamesInput {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.ant-table-row td {
  background-color: aqua;
  padding: 10px !important;
}
#pdfDom {
  height: calc(100% - 100px);
  overflow: auto;
  box-sizing: border-box;
  padding:0 15px;
  padding-top: 10px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
  height: 200px;
}
#pagination{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
}
#total{
  font-size: 15px;
}
#buildingSearch{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#signatureBox{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
}
#printTitle{
  height:56px;
  line-height:56px;
  text-align:center;
  font-size:16px;
  font-variant: normal;
}
</style>
