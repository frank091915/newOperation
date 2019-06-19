<template>
  <div id="pageWrapper">
    <a-table :columns="columns" :dataSource="menu"  :pagination="false"  bordered>
      <template slot="ChangePermissionStatus" slot-scope="text, record">
        <a-switch :checked="record.status" @change="onChangePermissionStatus(record)"/>
      </template>
    </a-table>
    <!-- <a-table :columns="columns" :dataSource="menu"  :pagination="false"  :scroll="{y:790}">

        <a-table
          slot="expandedRowRender"
          slot-scope="text,record"
          :columns="innerColumns"
          :dataSource="innerData"
          :pagination="false"
          v-if="record.children"
        >
        </a-table>
      </a-table> -->

    <!-- <a-table
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
    </a-table> -->
  </div>
</template>
<script>

const innerColumns = [
  {
    title: "序号",
    dataIndex: "id",
    scopedSlots: { customRender: "num" },
    align: "center"
  },
  {
    title: "权限名称",
    dataIndex: "title",
    scopedSlots: { customRender: "age" },
    align: "center"
  },
  {
    title: "权限路径",
    dataIndex: "path",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "权限等级",
    dataIndex: "level",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "权限状态",
    dataIndex: "status",
    scopedSlots: { customRender: "weChatcheckBox" },
    align: "center"
  },
  {
    title: "上级权限id",
    dataIndex: "parentId",
    scopedSlots: { customRender: "address" },
    align: "center"
  }
];

const innerData = [];
// for (let i = 0; i < 1; ++i) {
//   innerData.push({
//     key: i,
//     date: '2014-12-24 23:12:00',
//     name: 'This is production name',
//     upgradeNum: 'Upgraded: 56',
//   });
// }

const columns = [
  {
    title: "序号",
    dataIndex: "id",
    width: "20%",
    scopedSlots: { customRender: "num" },
    align: "center"
  },
  {
    title: "权限名称",
    dataIndex: "title",
    width: "20%",
    scopedSlots: { customRender: "age" },
    align: "center"
  },
  {
    title: "权限路径",
    dataIndex: "path",
    width: "20%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "权限等级",
    dataIndex: "level",
    width: "20%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "权限状态",
    dataIndex: "status",
    width: "20%",
    scopedSlots: { customRender: "ChangePermissionStatus" },
    align: "center"
  }
];
export default {
  data() {
    return {
      columns,
      menu: [],
      isLoading: true,
      innerColumns,
      innerData,
    };
  },
  methods: {
    onChangePermissionStatus(e) {

      if(e.subPermissions!=undefined){
        if(e.subPermissions.length){
            let changePermmisionsIds=e.subPermissions.map((item)=>{
              if(e.status==item.status){return item.id}
            });
            changePermmisionsIds=changePermmisionsIds.concat([e.id])
            console.log(changePermmisionsIds)
            this.$http.toModifySeveralPermissionStatus(changePermmisionsIds).then(res => {
            if (res.data.success) {
              this.$message.success("设置成功");
              this.getMenu(true);
            } else {
              this.$message.error(res.data.data.message);
            }
          });
        }else{
            this.$http.toModifyPermissionStatus(e.id).then(res => {
              if (res.data.success) {
                this.$message.success("设置成功");
                this.getMenu(true);
              } else {
                this.$message.error(res.data.data.message);
              }
            });
        }
      }else{
          // console.log(e.parentId)
          let theParentMenu=this.menu.filter((item)=>{
            return item.id == e.parentId
          })[0];
          let theBrotherMenus=theParentMenu.subPermissions.filter((item)=>{
              return item.id != e.id
           });
          // console.log(theParentMenu,theBrotherMenus)
          // 判断是否改变该子菜单的父级菜单状态，（根据该菜单改变后的状态是否都与其他子菜单状态一样）
          let ifChangeParentMenuStatus=theBrotherMenus.every((item)=>{
            return item.status!=e.status
          })
          // console.log(ifChangeParentMenuStatus)
          if(ifChangeParentMenuStatus && theParentMenu.status==e.status){
            let menusToBeChanged=[theParentMenu.id,e.id];
              this.$http.toModifySeveralPermissionStatus(menusToBeChanged).then(res => {
                if (res.data.success) {
                  this.$message.success("设置成功");
                  this.getMenu(true);
                } else {
                  this.$message.error(res.data.data.message);
                }
              });
          }else{
              this.$http.toModifyPermissionStatus(e.id).then(res => {
                if (res.data.success) {
                  this.$message.success("设置成功");
                  this.getMenu(true);
                } else {
                  this.$message.error(res.data.data.message);
                }
              });
          }
      }
    },
    getMenu(afterSentting) {
      this.$http.toGetMenu().then(res => {
        // console.log(res.data.data)
        if (res.data.success) {
          let parentMenu=res.data.data.filter((item)=>{
            if(!item.parentId){
              return true
            }else{
              return false
            } 
          });
          parentMenu=parentMenu.map((item)=>{
            if(item.subPermissions.length){
              item.children=item.subPermissions;
            }
            return item
          })
          // console.log(parentMenu)

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
          this.menu = parentMenu;
          this.$nextTick(() => {
            this.isLoading = false;
            if(afterSentting){
              // this.$router.go(0)
              // this.$router.push({ path: "/permission", query: { title: "菜单管理",menuId:32 } })
            }
          });
        } else {
          this.$message.error(res.data.message);
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