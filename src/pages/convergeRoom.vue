<template>
  <div id="convergeRoomWraper">
    <div id="statusBar">
      <div id="convergeRoomHeaderWraper">
        <div id="statusBox">
          <div class="faultyCountBox">故障：{{fauly}}</div>
          <div class="abnormalCountBox">异常：{{abnormal}}</div>
          <div class="normalCountBox">正常：{{normal}}</div>
          <div class="normalCountBox">合计：{{total}}</div>
        </div>
        <a-input-search
          placeholder="搜索汇聚机房名称"
          style="width: 200px"
          @keydown.enter="onSearch"
          @search="onSearch"
          v-model="searchParam"
        />
      </div>
    </div>
    <div id="convergeRoomBox" v-if="!isLoading">
      <div
        v-for="item in roomList "
        :key="item.Id"
        :type="item.statusDescription"
        class="statusDisplay"
      >
      <div class="imgWrapper">
        <img
          :src="color(item.status)"
          @click="toShowDetails(item.Id)"
          style="cursor:pointer;height:40px !important"
        >
      </div>

        <p @click="toShowDetails(item.Id)" style="cursor:pointer">{{item.roomName}}</p>
      </div>
    </div>
    <div v-if="isLoading">
      <a-spin tip="搜索中...">
        <div class="spin-content"></div>
      </a-spin>
    </div>
    <div id="noData" v-if="noData">暂无数据</div>
  </div>
</template>
<script>
export default {
  name: "convergeRoom",
  data() {
    return {
      roomList: [],
      normal: "",
      abnormal: "",
      fauly: "",
      unknown: 0,
      title: "",
      searchParam: "",
      isLoading: false,
      noData: false,
      total: 0
    };
  },
  methods: {
    onSearch() {
      this.isLoading = true;
      this.$http.toSearchConvergeRoom(this.searchParam).then(res => {
        if (res.data.success) {
          this.roomList = [];
          this.$nextTick(() => {
            if (res.data.deviceData) {
              this.noData = true;
            } else {
              this.roomList = res.data.data.device;
              if (res.data.data.device.length === 0) {
                this.noData = true;
              } else {
                this.noData = false;
              }
            }
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.$message.error(res.data.message);
        }
      });
    },
    color(status) {
      switch (status) {
        case 0 :
          return "../../static/assets/computerRoomYellow.png";
        case 1:
          return "../../static/assets/computerRoomGreen.png";
        case -1:
          return "../../static/assets/computerRoomRed.png";
      }
    },
    toShowDetails(id) {
      this.$router.push({
        path: "/roomDetails",
        query: {
          title: "汇聚机房详情",
          detailsId: id,
          roomType: 1,
          roomName: "汇聚机房"
        }
      });
    }
  },
  created() {
    this.title = this.$route.query.title;
    this.$http.toGetconvergeRoomList().then(res => {
      if (res.data.success) {
        this.roomList = res.data.data.device;
        this.normal = res.data.data.normalCount;
        this.abnormal = res.data.data.exceptionCount;
        this.fauly = res.data.data.faultCount;
        this.total =
          res.data.data.normalCount +
          res.data.data.exceptionCount +
          res.data.data.faultCount;
        this.$nextTick(() => {
        
        });
      } else {
              this.$message.error(res.data.message);
            }
    });
  },
  mounted() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.onSearch(); // 登录方法名
        return false;
      }
    };
  }
};
</script>
<style scoped >
#statusBar {
  height: 50px;
  border-bottom: 1px solid #bdbdbd;
  margin-left: 30px;
  width: 95%;
}
#convergeRoomHeaderWraper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
#convergeRoomWraper {
  font-size: 14px;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#convergeRoomBox {
  width: 95%;
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
}
.statusDisplay {
  width: 90px;
  height: 120px;
  margin-top: 30px;
  margin-right: 102px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.statusDisplay img {
  width: 40px;
  height: 40px;
}
.statusDisplay p{
  height: calc(100% - 55px)
}
.imgWrapper{
 width: 40px;
  height: 40px;
  margin-bottom: 15px;
}
#statusBox {
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
#noData {
  color: rgba(0, 0, 0, 0.45);
}
</style>