<template>
  <div>
    <div id="pageWrapper" @keydown.enter="search(true)">
      <div id="searchBox">
        <div>
        <a-radio-group defaultValue=2 buttonStyle="solid" @change='changeTimeScale'>
            <a-radio-button value=2>按周次</a-radio-button>
            <a-radio-button value=3>按月份</a-radio-button>
            <a-radio-button value=4>按年份</a-radio-button>
        </a-radio-group>
        </div>
        <!-- <div id="searchByNames">
          <div id="searchByNamesLabel">名称：</div>
          <div id="searchByNamesInput">
            <a-input v-model="searchParam" @keydown.enter="search(true)" placeholder="请输入POS机房间名称"  size="small"/>
            <a-button  @click="search(true)" type="primary" size="small" style="margin-left:10px">搜索</a-button>
          </div>
        </div> -->
      </div>
      <div id="tableWrapper">
        <a-table :columns="timeScale == 2 ? columnsWeek : columns" :dataSource="data" :pagination="false"  bordered :loading="isLoading">
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
        </a-table>
        <div id="pagination" v-show="!isLoading"> 
          <div id="total">
            共<span style="margin:0 5px;">{{recordsTotal}}</span>条数据
          </div>
          <div id="paginationBox">
            <a-pagination @change="changePage" v-model="current" :total="recordsTotal"   :pageSize="12" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const columnsWeek = [
  {
    title: "序号",
    dataIndex: "key",
    width: "4%",
    scopedSlots: { customRender: "_id" },
    align:"center"
  },
  {
    title: "巡查周次",
    dataIndex: "weekNum",
    width: "10%",
    scopedSlots: { customRender: "highLight" },
    align:"center"
  },
  {
    title: "日期范围",
    dataIndex: "timeRange",
    width: "11%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "广播系统检查数量",
    dataIndex: "inspectionCount",
    width: "6%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "广播系统异常数量",
    dataIndex: "count",
    width: "9%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "操作",
    dataIndex: "",
    width: "10%",
    scopedSlots: { customRender: "operation" },
    align:"center"
  }
];
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "4%",
    scopedSlots: { customRender: "_id" },
    align:"center"
  },
  {
    title: "日期范围",
    dataIndex: "timeRange",
    width: "11%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "广播系统检查数量",
    dataIndex: "inspectionCount",
    width: "6%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "广播系统异常数量",
    dataIndex: "count",
    width: "9%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "操作",
    dataIndex: "",
    width: "10%",
    scopedSlots: { customRender: "operation" },
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
      columnsWeek
    };
  },
  methods: {
    changeTimeScale(e){
          console.log(e.target.value)
          this.timeScale=Number.parseInt(e.target.value);
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
    search(isSearching) {
        this.$nextTick(()=>{
          this.GettransferRoomStatements(this.page,this.timeScale,isSearching)
        })
 
    },
    addOrder() {
      var i = 1 + (this.page-1)*12;
      this.data = this.data.filter(item => {
        item["key"] = i++;
        return true;
      });
    },
    GettransferRoomStatements(page,timeScale,isSearching){
      this.isLoading=true;
      this.$http.toGettransferRoomStatements(page,timeScale).then(res => {
        if (res.data.success) {
          this.recordsTotal = res.data.recordsTotal;
            this.data=res.data.data.map((item)=>{
                item.weekNum="第"+item.weekNum+"周";
                item.timeRange=item.startTime.substring(0,11) + " 至 " + item.endTime.substring(0,11);
                return item
            })
            this.$nextTick(() => {
            this.isLoading = false;
            this.addOrder()
          });
          if(isSearching){
            this.current=1
          }

        }else {
              this.$message.error(res.data.message);
            }
      });
    },
    changePage(page){
      this.page=page;
      this.$nextTick(()=>{
        this.search(false)
      })
    },
    seeDetails(item){
        console.log(item)
        this.$router.push({ path: "/transferRoomStatementsDetails", query: { title: this.printTitle,id:item.id,startTime:item.startTime.substring(0,10),type:item.type}});
    }
  },
  computed:{
    printTitle (){
      console.log(this.timeScale)
      switch(this.timeScale){
        case 2:
        return '圈存机周次巡检表';
        case 3:
        return '圈存机月次巡检表';
        case 4:
        return '圈存机年次巡检表';
      }
    }
  },
  created() {
      
    // 默认请求第一页，按周统计
    this.GettransferRoomStatements(1,2,false)
    
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
  width: 95%;
  margin-left: 20px;
}
#frame {
  height: 100%;
}
#searchBox {
  height: 50px;
  width: 880px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#statusSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#searchByNames {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
#tableWrapper {
  height: calc(100% - 100px);
  overflow: auto;
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
</style>
