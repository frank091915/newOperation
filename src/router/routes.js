import Frame from "../Frame/frame.vue"
import Overview from "../pages/overview.vue"
import Header from "../components/header.vue"
import SignIn from "../pages/signIn.vue"
import LoginRedirect from "../pages/loginRedirect.vue"
// 将所有组件集中管理进行配置

export default [{
  path: '/mine',
  name: 'mine',
  components: {
    frame: Frame,
    main: Overview,
    header: Header
  },
  meta: {
    title: "状态汇总"
  }
},
{
  path: "/",
  redirect: "/mine"
},
{
  path: "/loginredirect/:id",
  components: {
    main: LoginRedirect
  }
},

{
  path: '/signIn',
  name: 'signIn',
  components: {
    signIn: SignIn
  }
},
{
  path: '/loginredirect',
  name: 'loginredirect',
  components: {
    main: LoginRedirect
  }
}
]