<template>
  <div id="pageWrapper">
    <a-table
      :columns="columns"
      :dataSource="menu"
      :pagination="false"
      bordered
      :scroll="{y:790}"
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
      <template slot="weChatcheckBox" slot-scope="text, record">
        <a-switch :checked="record.status" @change="onChangePermissionStatus(record)"/>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    width: "16%",
    scopedSlots: { customRender: "num" },
    align: "center"
  },
  {
    title: "权限名称",
    dataIndex: "title",
    width: "16%",
    scopedSlots: { customRender: "age" },
    align: "center"
  },
  {
    title: "权限路径",
    dataIndex: "path",
    width: "16%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "权限等级",
    dataIndex: "level",
    width: "16%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "权限状态",
    dataIndex: "status",
    width: "16%",
    scopedSlots: { customRender: "weChatcheckBox" },
    align: "center"
  },
  {
    title: "上级权限id",
    dataIndex: "floorNumber",
    width: "16%",
    scopedSlots: { customRender: "address" },
    align: "center"
  }
];
export default {
  data() {
    return {
      columns,
      menu: [],
      isLoading: true
    };
  },
  methods: {
    onChangePermissionStatus(e) {
      this.$http.toModifyPermissionStatus(e.id).then(res => {
        if (res.data.success) {
          this.$message.success("设置成功");
          this.getMenu();
        } else {
          this.$message.error(res.data.data.errorInfo);
        }
      });
    },
    getMenu() {
      this.$http.toGetMenu().then(res => {
        if (res.data.success) {
          // let parentMenu=res.data.data,
          //     childrenMenu=res.data.data.filter((item)=>{
          //         if(item.subPermissions.length){
          //             return true
          //         }else{return false}
          //     });
          // childrenMenu=childrenMenu.reduce((pre,next)=>{
          //     return pre.concat([...next.subPermissions])
          // },[])
          // parentMenu=parentMenu.concat(childrenMenu);
          this.menu = res.data.data;
          this.$nextTick(() => {
            this.isLoading = false;
          });
        } else {
          this.$message.error(res.data.errorInfo);
        }
      });
    }
  },
  created() {
    this.getMenu();
  }
};
</script>
<style >
#pageWrapper {
  height: calc(100% - 50px);
  width: 95%;
  margin-left: 20px;
}
</style>