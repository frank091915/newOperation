<template>
  <div>
    <div id="pageWrapper">
      <div id="tableWrapper">
        <a-table
          :columns="columns"
          :dataSource="dataInfo"
          :pagination="false"
          bordered
          :loading="isLoading"
        >
          <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record">
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0;"
                :value="text"
                @change="e => handleChange(e.target.value, record.key)"
              />
              <template v-else>{{text}}</template>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "设备编号",
    dataIndex: "Code",
    width: "8%",
    scopedSlots: { customRender: "Code" },
    align: "center"
  },
  {
    title: "设备位置",
    dataIndex: "roomName",
    width: "20%",
    scopedSlots: { customRender: "roomName" },
    align: "center"
  },
  {
    title: "设备名称",
    dataIndex: "Description",
    width: "8%",
    scopedSlots: { customRender: "Description" },
    align: "center"
  },
  {
    title: "IP地址",
    dataIndex: "SerialNumber",
    width: "8%",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "异常开始时间",
    dataIndex: "time",
    width: "10%",
    scopedSlots: { customRender: "time" },
    align: "center"
  },
  {
    title: "异常持续时间",
    dataIndex: "apartTime",
    width: "10%",
    scopedSlots: { customRender: "apartTime" },
    align: "center"
  },
  {
    title: "异常描述",
    dataIndex: "subject",
    width: "20%",
    scopedSlots: { customRender: "subject" },
    align: "center"
  }
];

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12, offset: 2 }
};
export default {
  data() {
    return {
      dataInfo: [],
      columns,
      isLoading: true,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      value: true,
      id: "",
      name: "",
      deviceType: "",
      ip: ""
    };
  },
  methods: {
    toReturn() {
      this.$router.go("-1");
    },
    select(value) {
      console.log(value);
      this.roleIds = value;
    },
    checkChange(e) {}
  },

  created() {
    this.ip = this.$route.query.ip;
    this.name = this.$route.query.name;
    if (this.name == "POS机" || this.name == "圈存机") {
      this.deviceType = "NKD_CARD_DEVICE";
    }
    if (this.name == "门禁控制器") {
      this.deviceType = "NKD_ACCESS_CONTROL_DEVICE";
    }
    if (this.name == "广播系统") {
      this.deviceType = "NKD_BROAD_CAST_DEVICE";
    }
    if (this.name == "交换机") {
      this.deviceType = "NKD_NETWORK_DEVICE";
    }
    if (this.name == "服务器") {
      this.deviceType = "NKD_SERVER_DEVICE";
    }

    this.$http.getControlDetail(this.ip, this.deviceType).then(res => {
      if (res.data.success) {
        this.dataInfo = res.data.data;
        this.$nextTick(() => {
          this.isLoading = false;
        });
      } else {
        this.$message.error(res.data.message);
      }
    });
  }
};
</script>
<style scoped>
#pageTitle {
  padding-left: 69px;
  height: 50px;
  border-bottom: 1px solid #fafafa;
  line-height: 50px;
  font-weight: 600;
}
#tableWrapper {
  height: calc(100% - 100px);
  overflow: auto;
}
#pageWrapper {
  height: calc(100% - 50px);
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
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
</style>