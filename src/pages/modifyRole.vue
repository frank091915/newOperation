<template>
<div>
  <div id="pageTitle">编辑角色</div>
  <div id="supremeWrapper">
    <div id="addRoleWrapper">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="角色名称"
        >
          <a-input
            v-decorator="[
          'name',
          {rules: [{ required: true,message:'请输入角色名称'}],
          initialValue:name
          }
        ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Code"
        >
          <a-input
            v-decorator="[
          'code',
          {rules: [{ required: true,message:'请输入以ROLE_开头的Code'}],
          initialValue:code
          }
        ]"
            placeholder="请输入以ROLE_开头"
          />
        </a-form-item>
        <div id="radioBox">
          <div id="radioText">
            状态
            <span>:</span>
          </div>
          <a-radio-group v-model="value">
            <a-radio :value="1">正常</a-radio>
            <a-radio :value="0">关闭</a-radio>
          </a-radio-group>
        </div>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="备注"
        >
          <a-input
            v-decorator="[
          'remark',
          {rules: [{ required: true, message: '请输入备注' }],
          initialValue:remark
          }
        ]"
          />
        </a-form-item>
        <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
          <div id="opetarionBox">
            <a-button @click="toReturn" id="returnButton">返回</a-button>
            <a-button type="primary" @click="toSave">保存</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <div id="permissionsMenu">
      <div id="permissionsMenuTitle">权限菜单</div>

      <div id="menuSelection">
        <a-layout id="components-layout-demo-side" style="min-height: 100vh" class="frame">
          <a-layout-sider width="290px" v-model="collapsed">
            <a-menu theme="light" :defaultSelectedKeys="['1']" mode="inline" :openKeys="[openedMenu]">
              <!-- 渲染一级菜单 -->

              <a-menu-item v-for="item in aloneMenuArray" :key="item.id">
                <span>
                  <input
                    type="checkbox"
                    :checked="item.ifPermitted"
                    @click="changeAloneMenu(item.id,0)"
                  >
                </span>
                <span>{{item.title}}</span>
              </a-menu-item>

              <a-sub-menu v-for="item in parentMenuArray" :key="item.id" @titleClick='handleSelect'>
                <span slot="title">
                  <span>
                    <span>
                      <input
                        :checked="item.ifPermitted"
                        type="checkbox"
                        @click="changeParentMenu(item.id,1)"
                      >
                    </span>
                    {{item.title}}
                  </span>
                </span>

                <a-menu-item v-for="subItem in item.subPermissions" :key="subItem.id">
                  <span>
                    <input
                      type="checkbox"
                      :checked="subItem.ifPermitted"
                      @click="changeChildStatus(subItem.id,2)"
                      style="margin-left:20px;"
                    >
                  </span>
                  {{subItem.title}}
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-layout-sider>
        </a-layout>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 2 }
};
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      value: 1,
      roleName: "",
      id: "",
      code: "",
      remark: "",
      status: "",
      name: "",
      collapsed: false,
      aloneMenu: [],
      parentMenu: [],
      // 含有状态的菜单数组
      ultimateArray: [],
      //   完整权限菜单
      permissions: [],
      //  当前用户权限菜单
      permissionsArray: [],
      parentMenuArray: [],
      aloneMenuArray: [],
      //   权限菜单id
      permissionsIdArray: [],
      openedMenu:0,
    };
  },
  methods: {
    toReturn() {
      this.$router.go("-1");
    },
    handleSelect(item){
      console.log(item)
      if(this.openedMenu==item.key){
        this.openedMenu=''
      }else{
      this.openedMenu=item.key
      }

    },
    toSave() {
      // 计算出用户权限菜单数组
      let tempIdArray = [],
        tempParentMenuIdArray = [],
        tempChildrenMenuIdArray = [],
        tempaloneMenuIdArray = [];
      // 得到无子菜单的权限id
      tempaloneMenuIdArray = this.aloneMenuArray
        .filter(item => {
          if (item.ifPermitted) {
            return true;
          } else {
            return false;
          }
        })
        .map(item => {
          return item.id;
        });
      // 得到有子菜单的权限id
      tempParentMenuIdArray = this.parentMenuArray
        .filter(item => {
          if (item.ifPermitted) {
            return true;
          } else {
            return false;
          }
        })
        .map(item => {
          return item.id;
        });
      // 得到所有子菜单
      let childrenMenuArray = this.parentMenuArray.reduce((pre, nex) => {
        return pre.concat([...nex.subPermissions]);
      }, []);
      // 得到所有子菜单权限
      tempChildrenMenuIdArray = childrenMenuArray
        .filter(item => {
          if (item.ifPermitted) {
            return true;
          } else {
            return false;
          }
        })
        .map(item => {
          return item.id;
        });
      // 得到所有权限菜单
      let ultimatePermissionIdsArray = tempaloneMenuIdArray.concat(
        tempParentMenuIdArray.concat(tempChildrenMenuIdArray)
      );

      this.form.validateFields((err, values) => {
        if (!err) {
          let userInfo = { ...values };
          userInfo.status = this.value ? true : false;
          userInfo.permissions = ultimatePermissionIdsArray;
          userInfo.id = Number.parseInt(this.$route.query.id);

          this.$http.toModifyRole(userInfo).then(res => {
            if (res.data.success) {
              this.$message.success("角色修改成功");
              this.$router.push({
                path: "/role",
                query: { title: "角色管理" }
              });
            } else {
              this.$message.error(res.data.errorInfo);
            }
          });
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    checkChange(e) {},
    // 有子菜单的父级菜单状态改编后，改变子菜单状态的方法
    changeChildren(id) {},
    // 用户点击复选框时，先改变对应的菜单数组中队像的是否授权属性，然后再重新去掉judge方法判断是否选中

    // 修改没有子菜单的一级菜单
    changeAloneMenu(id, type) {
      // 改变菜单对象属性
      // 先创建一个新对象，改变其属性，再重新给菜单对象赋值
      this.aloneMenuArray = this.aloneMenuArray.map(item => {
        if (item.id == id) {
          item.ifPermitted = !item.ifPermitted;
          return item;
        }
        return item;
      });
      this.$nextTick(() => {});
    },
    // 修改有子菜单的一级菜单
    changeParentMenu(id, type) {
      // 改变菜单对象属性
      // 先创建一个新对象，改变其属性，再重新给菜单对象赋值
      this.parentMenuArray = this.parentMenuArray.map(item => {
        if (item.id == id) {
          item.ifPermitted = !item.ifPermitted;
          // 获取到新状态开始改变其子菜单权限属性

          let newStatus = item.ifPermitted;
          item.subPermissions.map(subItem => {
            subItem.ifPermitted = newStatus;
            return subItem;
          });
          return item;
        }
        return item;
      });
      this.$nextTick(() => {
        this.ultimateArray = this.aloneMenuArray.concat(this.parentMenuArray);
        this.$nextTick(() => {});
      });
    },
    changeChildStatus(id, type) {
      // 先找到该二级菜单的父级菜单
      let theParentMenu = this.parentMenuArray.filter(item => {
        if (
          item.subPermissions.filter(subItem => {
            if (subItem.id === id) {
              return true;
            } else {
              return false;
            }
          }).length != 0
        ) {
          return true;
        } else {
          return false;
        }
      })[0];
      // 改变该父级菜单属性
      theParentMenu.subPermissions.map(theItem => {
        if (theItem.id === id) {
          theItem.ifPermitted = !theItem.ifPermitted;
          return theItem;
        }
        return theItem;
      });

      // 该父级菜单权限属性
      let parentStatus = theParentMenu.subPermissions.every(item => {
        return item.ifPermitted === true;
      });

      theParentMenu.ifPermitted = parentStatus;

      // 去改变有子菜单的二级菜单数组
      this.parentMenuArray = this.parentMenuArray.map(parentItem => {
        if (parentItem.id === theParentMenu.id) {
          return theParentMenu;
        }
        return parentItem;
      });
      this.$nextTick(() => {
        this.ultimateArray = this.aloneMenuArray.concat(this.parentMenuArray);
        this.$nextTick(() => {});
      });
    }
  },
  //   beforeRouteEnter (to, from, next) {
  //       console.log(from,to)
  //       next((vm)=>{
  //           vm.id=to.query.id
  //       })
  //   },
  created() {
    this.$http.toRoleInfo(this.$route.query.id).then(res => {
      if (res.data.success) {
        this.code = res.data.data.code;
        this.name = res.data.data.name;
        this.value = res.data.data.status ? 1 : 0;
        this.remark = res.data.data.remark;
        this.permissionsIdArray = res.data.data.permissionIds;
      } else {
        this.$message.error(res.data.errorInfo);
      }
    });
    // 获取侧边栏菜单数据
    this.$http.toGetAsideMenu().then(res => {
      this.aloneMenu = res.data.data.filter(item => {
        if (item.subPermissions.length === 0) {
          return true;
        } else {
          return false;
        }
      });
      this.parentMenu = res.data.data.filter(item => {
        if (item.subPermissions.length != 0) {
          return true;
        } else {
          return false;
        }
      });
      this.$nextTick(() => {});
    });
    // 获取当前用户菜单权限
    this.$http.toGetUserInfoById(1).then(res => {
      this.permissions = res.data.data.permissions;

      // 角色详情权限菜单结构改一下，按照用户权限结构来，再添加一个所有当前角色所有权限id数组

      //   选出用户当前权限菜单
      this.$nextTick(() => {
        // 选出用户一级菜单
        this.aloneMenuArray = this.permissions.filter(item => {
          if (item.subPermissions.length === 0) {
            return true;
          } else {
            return false;
          }
        });
        // 选出用户二级菜单
        this.parentMenuArray = this.permissions.filter(item => {
          if (item.subPermissions.length != 0) {
            return true;
          } else {
            return false;
          }
        });
        this.$nextTick(() => {
          // 给各个菜单添加状态
          this.parentMenuArray = this.parentMenuArray.map(item => {
            if (this.permissionsIdArray.includes(item.id)) {
              item.ifPermitted = true;
              return item;
            } else {
              item.ifPermitted = false;
              return item;
            }
          });
          // 给二级目录添加状态
          this.parentMenuArray = this.parentMenuArray.map(item => {
            item.subPermissions.map(subItem => {
              if (this.permissionsIdArray.includes(subItem.id)) {
                subItem.ifPermitted = true;
                return subItem;
              } else {
                subItem.ifPermitted = false;
                return subItem;
              }
            });
            return item;
          });

          this.aloneMenuArray = this.aloneMenuArray.map(item => {
            if (this.permissionsIdArray.includes(item.id)) {
              item.ifPermitted = true;
              return item;
            } else {
              item.ifPermitted = false;
              return item;
            }
          });
          this.$nextTick(() => {
            this.ultimateArray = this.aloneMenuArray.concat(
              this.parentMenuArray
            );
            this.$nextTick(() => {});
          });
        });
      });
    });
  }
};
</script>
<style scoped>
#pageTitle {
  padding-left: 69px;
  height: 50px;
  border-bottom: 1px solid #bdbdbd;
  line-height: 50px;
  font-weight: 600;
}
#radioBox {
  box-sizing: border-box;
  padding-left: 230px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
#radioText {
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.85);
}
#radioText span {
  margin-left: 2px;
}
#addRoleWrapper {
  margin-top: 20px;
}
.ant-form-item {
  margin-bottom: 20px !important;
}

#opetarionBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 358px;
  box-sizing: border-box;
  padding-left: 145px;
}

#menuSelection {
  max-height: calc(100% - 49px);
  margin-top: 5px;
  width:300px;
}
#components-layout-demo-side {
  min-height: 50px !important;
  border: 1px solid #e8e8e8;
}
#supremeWrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  min-height: calc( 100% - 100px );
  overflow: auto;
}
#addRoleWrapper {
  width: 650px;
}
#permissionsMenu {
  margin-top: 20px;
  width:300px;
}
#radioBox {
  box-sizing: border-box;
  padding-left: 62px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
#opetarionBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 358px;
  box-sizing: border-box;
  padding-left: 53px;
}
#returnButton {
  margin-right: 50px;
}
#permissionsMenuTitle {
  text-align: center;
}
.ant-menu-item{
  margin-bottom: 0 !important;
}
</style>