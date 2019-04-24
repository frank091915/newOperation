<template>
<div id="menuSelection">
 <a-layout id="components-layout-demo-side" style="min-height: 100vh" class="frame">
      <a-layout-sider
        width="250px"
        v-model="collapsed"
      >
        <a-menu theme="light" :defaultSelectedKeys="['1']" mode="inline">
          <!-- 渲染一级菜单 -->
          <a-menu-item v-for="item in aloneMenu"  :key="item.id" >
            <span><input type="checkbox" :checked="judge(item.id,0)"></span><span>{{item.title}}</span>
          </a-menu-item>

          <a-sub-menu
            v-for="item in parentMenu" 
            :key="item.id"
          >
            <span slot="title"><span><span><input :checked="judge(item.id,1)" type="checkbox"></span>{{item.title}}</span></span>
            <a-menu-item 
            v-for="subItem in item.subPermissions"
            :key="subItem.id"
            ><span><input type="checkbox" :checked="judge(subItem.id,2)"></span>{{subItem.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
    </a-layout>
</div>
</template>
<script>
export default {
    data() {
    return {
      collapsed: false,
      aloneMenu:[],
      parentMenu:[],
    //   完整权限菜单
      permissions:[],
    //  当前用户权限菜单
      permissionsArray:[],
      parentMenuArray:[],
      aloneMenuArray:[],
      statusMenu:[],
    //   权限菜单id
      permissionsIdArray:[]
    }
  },
  created(){
    // 获取侧边栏菜单数据
    this.$http.toGetAsideMenu().then((res)=>{
      this.aloneMenu=res.data.data.filter((item)=>{
        if(item.subPermissions.length===0){
          return true
        }else{
          return false
        }
      });
      this.parentMenu=res.data.data.filter((item)=>{
        if(item.subPermissions.length != 0){
          return true
        }else{
          return false
        }
      })
      this.$nextTick(()=>{
      })
    });
    // 获取当前用户菜单权限
    this.$http.toGetUserInfoById(7).then((res)=>{
          console.log(res)
          this.permissions=res.data.data.permissions
          this.permissionsIdArray=res.data.data.permissionIds
        //   选出用户当前权限菜单
        this.$nextTick(()=>{
            // 选出用户一级菜单
        this.aloneMenuArray=this.permissions.filter((item)=>{
        if(item.subPermissions.length===0){
          return true
        }else{
          return false
        }
      });
        // 选出用户二级菜单
        this.parentMenuArray=this.permissions.filter((item)=>{
        if(item.subPermissions.length !=0){
          return true
        }else{
          return false
        }
      });
        this.$nextTick(()=>{
            // 给各个菜单添加状态
            this.parentMenuArray=this.parentMenuArray.map((item)=>{
                if(this.permissionsIdArray.includes(item.id)){
                    item.ifPermitted=true
                    return item
                }else{
                     item.ifPermitted=false
                    return item
                }
            });
            // 给二级目录添加状态
            this.parentMenuArray=this.parentMenuArray.map((item)=>{
                    item.subPermissions.map((subItem)=>{
                        if(this.permissionsIdArray.includes(subItem.id)){
                            subItem.ifPermitted=true
                            return subItem
                        }else{
                            subItem.ifPermitted=false
                            return subItem
                        }
                    })
                    return item
            });

            this.aloneMenuArray=this.aloneMenuArray.map((item)=>{
                if(this.permissionsIdArray.includes(item.id)){
                    item.ifPermitted=true
                    return item
                }else{
                     item.ifPermitted=false
                    return item
                }
            });
            this.$nextTick(()=>{
                console.log(this.parentMenuArray)
            })
                
        })
        })
      })
  },
  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    checkChange(e){
      console.log(`checked = ${e.target.checked}`)

    },
    judge(id,type){

        switch(type){
            case 0:
            return this.aloneMenuArray.filter((item)=>{
                if(item.id==id){
                    return true
                }else{return false }
            })[0]['ifPermitted'];

            case 1:
            return this.parentMenuArray.filter((item)=>{
                if(item.id==id){
                    return true
                }else{return false }
            })[0]['ifPermitted'];

            case 2:
            console.log(this.parentMenuArray.filter((item)=>{
                if(item.subPermissions.filter((subItem)=>{
                    subItem.id===id
                })){
                    return true
                }else{return false }
            })[0].subPermissions)

            return this.parentMenuArray.filter((item)=>{
                if(item.subPermissions.filter((subItem)=>{
                    subItem.id===id

                })){
                    return true
                }else{return false }
            })[0].subPermissions
            .filter((item)=>{
                if(item.id===id){ return true}else{return false} 
            }).ifPermitted;
            break;
        }
    }
  },
}

</script>
<style  scoped>
    #menuSelection{
        max-height:calc(100% - 49px) ;
        margin-left: 100px;
    }
    #components-layout-demo-side{
        min-height: 50px !important;
        border:1px solid #e8e8e8;
    }
    .ant-menu .ant-menu-inline .ant-menu-root .ant-menu-light{
        border: none !important;
    }
</style>