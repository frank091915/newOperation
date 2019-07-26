<!--  -->
<template>
<div class=''></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    console.log("登录后，重定向") 
    this.$http.ticektCheck().then((res)=>{
        console.log(res.data)
            if(res.data.isSuccess) {
                window.sessionStorage.setItem("token",res.data.token);
                document.cookie = "token"+"="+res.data.token;
                window.sessionStorage.setItem("user",res.data.userProfileModule.user);
                window.sessionStorage.setItem('ln',res.data.userProfileModule.ln);
                window.sessionStorage.setItem('name',res.data.userProfileModule.name);
                window.sessionStorage.setItem('fn',res.data.userProfileModule.fn);
                window.sessionStorage.setItem('groups',res.data.userProfileModule.groups);
                window.sessionStorage.setItem('groupid',res.data.userProfileModule.groupid);
                window.sessionStorage.setItem('groupparentid',res.data.userProfileModule.groupparentid);
                window.sessionStorage.setItem('id', res.data.userProfileModule.id);
                window.sessionStorage.setItem('sid',res.data.userProfileModule.sid) ;
                window.sessionStorage.setItem('actionlist',res.data.userProfileModule.actionList.join(','));
                window.sessionStorage.setItem('isLogin',true);

                this.$http.test().then((res)=>{
                    console.log(res)
                })
                window.location.replace("/")
                // this.$router.push({path:'/mine'})
            } else {
                // let logoutUrl = "https://cas.sustech.edu.cn/cas/logout";
                // this.$http.firstCheck(logoutUrl).then((res)=>{

                //     let cscURl = "https://cas.sustech.edu.cn/cas/login?service=" + "http://localhost:8080/loginredirect";
                //     window.location.href = cscURl;
                // })
            }
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
/* @import url(); 引入公共css类*/

</style>