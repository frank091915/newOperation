<template>
  <div>
    <div id="pageWrapper" style="position:relative">
      <div id="searchBox">
        <!-- <div>
        <a-radio-group defaultValue="2" buttonStyle="solid" @change='changeTimeScale'>
            <a-radio-button value="2">按周次</a-radio-button>
            <a-radio-button value="3">按月份</a-radio-button>
            <a-radio-button value="4">按年份</a-radio-button>
        </a-radio-group>
        </div>-->
        <div id="searchByNames" style="float:right">
          <!-- <div id="searchByNamesLabel">名称：</div> -->
          <div id="searchByNamesInput">
            <!-- <a-input v-model="searchParam" @keydown.enter="search(true)" placeholder="请输入POS机房间名称"  size="small"/> -->
            <a-button @click="print" type="primary" size="small" style="margin-left:10px">导出</a-button>
          </div>
        </div>
      </div>
      <div style="z-index:100" id="lalala">
        <h4
          id="printTitle"
          style=" height: 56px;line-height: 56px;text-align: center;font-size: 16px;font-variant: normal;"
        >{{printTitle}}</h4>
        <a-table
          :columns="columns"
          :dataSource="data"
          :pagination="false"
          :rowClassName="(record, index)=>{
            if(index%2 != 0) return 'table-evenRow'
          } "
          :loading="isLoading"
        >
          <template
            v-for="col in ['name', 'age', 'address']"
            :slot="col"
            slot-scope="text, record, index"
          >
            <div :key="col">
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
            <div :key="col">
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
            <span>备注：</span>
            <span>{{remarks}}</span>
          </template>
        </a-table>
        <div
          id="tip"
          style="margin-top:20px;padding-left:16px"
        >注：正常填写正常，有问题填写异常，问题及处理情况6小时内必须以书面形式报至终端组主管人员，实行表年月周查制. 每周巡检1次，间隔禁止超过7个工作日</div>
        <div
          id="signatureBox"
          style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-top: 20px;padding-left:16px"
        >
          <div id="engineerSigature" style="width:200px;">
            <span>运维工程师签名：</span>
          </div>
          <div id="leaderSigature" style="width:200px;margin-left:300px">
            <span>负责人签名：</span>
          </div>
          <div id="leaderTeacherSigature" style="width:200px;margin-left:200px">
            <span>主管老师签名：</span>
          </div>
        </div>
        <!-- <div id="pagination" v-show="!isLoading"> 
          <div id="total">
            共<span style="margin:0 5px;">{{recordsTotal}}</span>条数据
          </div>
          <div id="paginationBox">
            <a-pagination @change="changePage" v-model="current" :total="recordsTotal"   :pageSize="12" />
          </div>
        </div>-->
      </div>
      <div
        id="pdfDom"
        style="box-sizing:border-box;padding:0 15px;font-size: 12px; position:absolute;top:-100000px;  height: calc(100% - 100px);overflow: auto;box-sizing: border-box;padding: 0 15px;padding-top: 10px;"
      >
        <h4
          id="printTitle"
          style=" height: 56px;line-height: 56px;text-align: center;font-size: 16px;font-variant: normal;"
        >{{printTitle}}</h4>
        <table
          class="table table-bordered"
          id="printedTable"
          cellspacing="0"
          cellpadding="1"
          border="1px"
        >
          <thead>
            <td style="text-align:center;vertical-align:middle;">巡检日期</td>
            <td>电源及照明灯情况</td>
            <td>是否有异味</td>
            <td>室内有无杂物</td>
            <td>卫生</td>
            <td>门锁</td>
            <td>市电异常个数</td>
            <td>UPS异常个数</td>
            <td>门禁异常个数</td>
            <td>烟雾异常个数</td>
            <td>温度异常个数</td>
            <td>湿度异常个数</td>
            <td>线路有无乱线及飞线情况存在</td>
          </thead>
          <tr v-for="item in data" :key="item.id">
            <td style="width: 92px !important;">{{item.startTime}}</td>
            <td style=" border-collapse: collapse;"></td>
            <td style=" border-collapse: collapse;"></td>
            <td style=" border-collapse: collapse;"></td>
            <td style=" border-collapse: collapse;"></td>
            <td style=" border-collapse: collapse;"></td>
            <td
              style="border-collapse: collapse;text-align:center;vertical-align:middle;"
            >{{item.powerCount}}</td>
            <td
              style="border-collapse: collapse;text-align:center;vertical-align:middle;"
            >{{item.upsCount}}</td>
            <td
              style="border-collapse: collapse;text-align:center;vertical-align:middle;"
            >{{item.doorCount}}</td>
            <td
              style="border-collapse: collapse;text-align:center;vertical-align:middle;"
            >{{item.smokeCount}}</td>
            <td
              style="border-collapse: collapse;text-align:center;vertical-align:middle;"
            >{{item.temperatureCount}}</td>
            <td
              style="border-collapse: collapse;text-align:center;vertical-align:middle;"
            >{{item.humidityCount}}</td>
            <td></td>
          </tr>
          <tfoot>
            <td colspan="13">备注：</td>
          </tfoot>
        </table>
        <div
          id="tip"
          style="margin-top:20px;padding-left:16px"
        >注：正常填写正常，有问题填写异常，问题及处理情况6小时内必须以书面形式报至终端组主管人员，实行表年月周查制. 每周巡检1次，间隔禁止超过7个工作日</div>
        <div
          id="signatureBox"
          style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-top: 20px;padding-left:16px"
        >
          <div id="engineerSigature" style="width:200px;">
            <span>运维工程师签名：</span>
          </div>
          <div id="leaderSigature" style="width:200px;margin-left:300px">
            <span>负责人签名：</span>
          </div>
          <div id="leaderTeacherSigature" style="width:200px;margin-left:200px">
            <span>主管老师签名：</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

const columns = [
  {
    title: "巡检日期",
    dataIndex: "startTime",
    scopedSlots: { customRender: "_id" },
    align: "center"
  },
  {
    title: "电源及照明灯情况",
    dataIndex: "electry",
    scopedSlots: { customRender: "highLight" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.electry){
        row.electry="——"
      }
      return value
    }
  },
  {
    title: "是否有异味",
    dataIndex: "smell",
    scopedSlots: { customRender: "address" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.smell){
        row.smell="——"
      }
      return value
    }
  },
  {
    title: "室内有无杂物",
    dataIndex: "mess",
    scopedSlots: { customRender: "address" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.mess){
        row.mess="——"
      }
      return value
    }
  },
  {
    title: "卫生",
    dataIndex: "health",
    scopedSlots: { customRender: "address" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.health){
        row.health="——"
      }
      return value
    }
  },
  {
    title: "门锁",
    dataIndex: "lock",
    scopedSlots: { customRender: "address" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.lock){
        row.lock="——"
      }
      return value
    }
  },
  {
    title: "市电异常个数",
    dataIndex: "powerCount",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "UPS异常个数",
    dataIndex: "upsCount",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "门禁异常个数",
    dataIndex: "doorCount",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "烟雾异常个数",
    dataIndex: "smokeCount",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "温度异常个数",
    dataIndex: "temperatureCount",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "湿度异常个数",
    dataIndex: "humidityCount",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "线路有无乱线及飞线情况存在",
    dataIndex: "circuit",
    scopedSlots: { customRender: "address" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.circuit){
        row.circuit="——"
      }
      return value
    }
  }
];

export default {
  name: "posMechine",
  data() {
    return {
      columns,
      recordsTotal: 0,
      page: 1,
      searchParam: "",
      isLoading: true,
      current: 1,
      data: [],
      timeScale: 2,
      remarks: "",
      printTitle: this.$route.query.title,
      isPrinting: false
    };
  },
  methods: {
    print() {

      window.open(`${JSON.parse(window.sessionStorage.getItem("url")).baseURL}/api/export/machine-room/detail?type=${this.$route.query.type}&startTime=${this.$route.query.startTime}&accessToken=${JSON.parse(window.sessionStorage.getItem("operationToken"))}`,"blank")
    //     let routeUrl = this.$router.resolve({
    //       path: "/downLoadPdf",
    //       query: {type:this.$route.query.type,startTime:this.$route.query.startTime}
    //  });
    //  window.open(routeUrl .href, '_blank');
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
    color(type) {
      if (type != 0) {
        return "color : red";
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
      var i = 1 + (this.page - 1) * 12;
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
    GetconvergeRoomStatementsDetails() {
      this.isLoading = true;
      this.$http
        .toGetconvergeRoomStatementsDetails(
          this.$route.query.type,
          this.$route.query.startTime
        )
        .then(res => {
          // console.log(res);
          if (res.data.success) {
            this.data = res.data.data.map(item => {
              item.startTime = item.startTime.substring(0, 10);
              return item;
            });
            this.$nextTick(() => {
              this.isLoading = false;
              // this.addOrder()
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    changePage(page) {
      this.page = page;
      this.$nextTick(() => {
        this.search(false);
      });
    },
    seeDetails(item) {
      // console.log(item);
    }
  },
  created() {
    // 默认请求第一页，按周统计
    // this.GetlowVoltageRoomStatements(1,2,false)
    this.GetconvergeRoomStatementsDetails();
    // console.log(JSON.parse(window.sessionStorage.getItem("url")).baseURL)
  },
  mounted() {
    // let that = this;
    // document.onkeypress = function(e) {
    //   var keycode = document.all ? event.keyCode : e.which;
    //   if (keycode == 13) {
    //     that.search(true); // 登录方法名
    //     return false;
    //   }
    // };
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
  height: calc(100vh - 91px);
  width:calc(100vw - 300px);
  background-color: #fff;
  box-sizing: border-box;
  margin: 10px 20px 20px 20px;
  border-radius: 8px;
}
#frame {
  height: 100%;
}
#searchBox {
  height: 50px;
  box-sizing: border-box;
  padding-right: 50px;
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
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
  height: 200px;
}
#pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}
#total {
  font-size: 15px;
}
#buildingSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
