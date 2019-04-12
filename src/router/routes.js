import Frame from "../Frame/frame.vue"
import Overview from "../pages/overview.vue"
import PositionDisplay from "../pages/positonDisplay.vue"
import ConvergeRoom from "../pages/convergeRoom.vue"
import Header from "../components/header.vue"
import SignIn from '../pages/signIn.vue'
import AlarmRecord from "../pages/alarmRecord.vue"
import LowVoltageRoom from "../pages/lowVoltageRoom.vue"
// 将所有组件集中管理进行配置

export default [{
    path: '/summary',
    name: 'summary',
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
    redirect: "/summary"
  },
  {
    path: '/display',
    name: 'display',
    components: {
		frame:Frame,
    main:PositionDisplay,
    header:Header
	}
  },
  {
    path: '/machine',
    name: 'machine',
    components: {
		frame:Frame,
    main:ConvergeRoom,
    header:Header
	}
  }, {
    path: '/alarmRecord',
    name: 'alarmRecord',
    components: {
		frame:Frame,
    main:AlarmRecord,
    header:Header
	}
  },
  {
    path: '/signIn',
    name: 'signIn',
    components: {
      signIn:SignIn
	}
  },
  {
    path: '/electric',
    name: 'electric',
    components: {
      frame:Frame,
      main:LowVoltageRoom,
      header:Header
	}
  }
]
