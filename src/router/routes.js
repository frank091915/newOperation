import Frame from "../Frame/frame.vue"
import Overview from "../pages/overview.vue"
import PositionDisplay from "../pages/positonDisplay.vue"
import ConvergeRoom from "../pages/convergeRoom.vue"
import Header from "../components/header.vue"
import SignIn from '../pages/signIn.vue'
// 将所有组件集中管理进行配置

export default [{
    path: '/overview',
    name: 'overview',
    components: {
		frame:Frame,
    main:Overview,
    header:Header
  },
  meta:{
    title:"状态汇总"
  }
  },
  {
    path: "/",
    redirect: "/overview"
  },
  {
    path: '/positionDisplay',
    name: 'positionDisplay',
    components: {
		frame:Frame,
    main:PositionDisplay,
    header:Header
	}
  },
  {
    path: '/convergeRoom',
    name: 'convergeRoom',
    components: {
		frame:Frame,
    main:ConvergeRoom,
    header:Header
	}
  },
  {
    path: '/signIn',
    name: 'signIn',
    components: {
      signIn:SignIn
	}
  }
]
