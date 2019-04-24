import Frame from "../Frame/frame.vue"
import Overview from "../pages/overview.vue"
import PositionDisplay from "../pages/positonDisplay.vue"
import ConvergeRoom from "../pages/convergeRoom.vue"
import Header from "../components/header.vue"
import SignIn from '../pages/signIn.vue'
import AlarmRecord from "../pages/alarmRecord.vue"
import LowVoltageRoom from "../pages/lowVoltageRoom.vue"
import PosMechine from "../pages/posMechine.vue"
import Transfer from "../pages/transfer.vue"
import theServer from "../pages/Server.vue"
import Access from "../pages/Access.vue"
import Broadcast from "../pages/Broadcast.vue"
import Network from "../pages/Network.vue"
import RoleManage from "../pages/roleManage.vue"
import addRole from "../pages/addRole.vue"
import UserManage from "../pages/userManage.vue"
import ModifyRole from "../pages/modifyRole.vue"
import AddUser from "../pages/addUser.vue"
import ModifyUser from "../pages/modifyUser.vue"
import AlarmSet from "../pages/alarmSet.vue"
import ServerRoom from "../pages/serverRoom.vue"
import WarningRecord from "../pages/warningRecord.vue"
import ExceptionRecord from "../pages/exceptionRecord.vue"
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
  },
  {
    path: '/pos',
    name: 'pos',
    components: {
      frame:Frame,
      main:PosMechine,
      header:Header
	}
  },
  {
    path: '/transfer',
    name: 'transfer',
    components: {
      frame:Frame,
      main:Transfer,
      header:Header
	}
  },
  {
    path: '/server',
    name: 'server',
    components: {
      frame:Frame,
      main:ServerRoom,
      header:Header
	}
  },
  {
    path: '/access',
    name: 'access',
    components: {
      frame:Frame,
      main:Access,
      header:Header
	}
  },
  {
    path: '/broadcast',
    name: 'broadcast',
    components: {
      frame:Frame,
      main:Broadcast,
      header:Header
	}
  },
  {
    path: '/network',
    name: 'network',
    components: {
      frame:Frame,
      main:Network,
      header:Header
	}
  },
  {
    path: '/role',
    name: 'role',
    components: {
      frame:Frame,
      main:RoleManage,
      header:Header
	}
  },
  {
    path: '/addRole',
    name: 'addRole',
    components: {
      frame:Frame,
      main:addRole,
      header:Header
	}
  },
  {
    path: '/user',
    name: 'user',
    components: {
      frame:Frame,
      main:UserManage,
      header:Header
	}
  },
  {
    path: '/modifyRole',
    name: 'modifyRole',
    components: {
      frame:Frame,
      main:ModifyRole,
      header:Header
	}
  }
  ,
  {
    path: '/addUser',
    name: 'addUser',
    components: {
      frame:Frame,
      main:AddUser,
      header:Header
	}
  },
  {
    path: '/modifyUser',
    name: 'modifyUser',
    components: {
      frame:Frame,
      main:ModifyUser,
      header:Header
	}
  },
  {
    path: '/alarmSet',
    name: 'alarmSet',
    components: {
      frame:Frame,
      main:AlarmSet,
      header:Header
	}
  },
  {
    path: '/warning',
    name: 'warning',
    components: {
      frame:Frame,
      main:WarningRecord,
      header:Header
	}
  },
  {
    path: '/exception',
    name: 'exception',
    components: {
      frame:Frame,
      main:ExceptionRecord,
      header:Header
	}
  }
]
