<template>
  <div id="convergeRoomWraper">
    <div id="statusBar">
      <div id="convergeRoomHeaderWraper">
        <div id="statusBox">
          <div class="singleStatusBox">
            <p class="statusTitle">
              <span class="statusTitlefirstSpan">故障：</span>{{fauly}}
              
            </p>
            </div>
          <div class="singleStatusBox">
            <p class="statusTitle">
              <span class="statusTitlefirstSpan">异常：</span>{{abnormal}}
            </p>
          </div>
          <div class="singleStatusBox">
            <p class="statusTitle">
              <span class="statusTitlefirstSpan">正常：</span>{{normal}}
            </p>
            </div>
          <div class="singleStatusBox">
            <p class="statusTitle">
              <span class="statusTitlefirstSpan">合计：</span>{{total}}
            </p>
            </div>
        </div>
      </div>
    </div>
      <div id="searcSuperhWrapper">

        <div id="searchWrapper">
            <a-input-search
              placeholder="搜索汇聚机房名称"
              style="width: 200px"
              @keydown.enter="onSearch"
              @search="onSearch"
              v-model="searchParam"
            />
            <a-button @click="onSearch" type="primary"  style="margin-left:15px">搜索</a-button>
        </div>
      </div>

    <div id="convergeRoomBox" v-if="!isLoading">
          <div id="convergeRoomBoxWrapper">
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
                style="cursor:pointer"
              >
            </div>
              <p @click="toShowDetails(item.Id)" style="cursor:pointer">{{item.roomName}}</p>
            </div>
          </div>
    </div>
    <div v-show="isLoading" style="width:100%;">
      <a-spin tip="数据正在加载中...">
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
      isLoading: true,
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
          return "../../static/assets/icon_convergeroom_n.png";
        case 1:
          return "../../static/assets/icon_convergeroom_f.png";
        case -1:
          return "../../static/assets/icon_convergeroom_a.png";
      }
    },
    toShowDetails(id) {
      this.$router.push({
        path: "/roomDetails",
        query: {
          title: "汇聚机房详情",
          detailsId: id,
          roomType: 1,
          roomName: "汇聚机房",
          menuIconId:3
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
            this.isLoading=false;
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
  height: 216px;
  /* margin-left: 30px; */
  width: 95%;
  box-sizing: border-box;
  padding: 20px 0;
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
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #F1F5F6;
}
#convergeRoomBox {
  width: 95%;
  min-height: calc(100vh - 369px);
  /* margin-left: 30px; */
}
#convergeRoomBoxWrapper{
  min-height: calc(100vh - 369px) !important;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  background-color: #FDFDFD;
}
.statusDisplay {
  width: 18%;
  height: 160px;
  margin: 0 1%;
  margin-top: 30px;
  margin-bottom: 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color:#FFFFFF;
  box-shadow: 3px 3px 12px #EDEDED;
}
.statusDisplay img {
  width: 40px;
  height: 40px;
}
.statusDisplay p{
  height: calc(100% - 55px);
  line-height: 160px;
  font-size: 15px;
}
.imgWrapper{
  width: 80px;
  height: 80px;
  border-radius:40px !important;
  display: block;
  position: absolute;
  top: -40px;
  left: calc(50% - 40px);
  background-color: #FFFFFF;
  box-shadow: 2px 2px 10px #E8EFFF;
}
#statusBox {
  width: 100%;
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
.singleStatusBox{
  width: 24%;
  background-color: #FFFFFF;
  height: 175px;
  border-radius: 12px;
}
.statusTitle{
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  border-bottom: 1px solid #EBEBEB;
  box-sizing: border-box;
  padding-left: 20px;
}
.statusTitlefirstSpan{
  margin-right: 22px;
}
#searcSuperhWrapper{
  width: 95%;
  height: 92px;
  background-color: white;
  box-sizing: border-box;
  padding-top: 15px;
}
#searchWrapper{
  float:right;
  margin-right: 15px;
}
.imgWrapper img{
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>