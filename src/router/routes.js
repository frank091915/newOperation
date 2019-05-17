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
import TemplateManage from "../pages/templateManage.vue"
import ModifyRole from "../pages/modifyRole.vue"
import AddUser from "../pages/addUser.vue"
import AddTemplate from "../pages/addTemplate.vue"
import ModifyUser from "../pages/modifyUser.vue"
import ModifyTemplate from "../pages/modifyTemplate.vue"
import AlarmSet from "../pages/alarmSet.vue"
import ServerRoom from "../pages/serverRoom.vue"
import WarningRecord from "../pages/warningRecord.vue"
import Fualt from "../pages/fualtManage.vue"
import AddFualt from "../pages/addFualt.vue"
import FualtBinding from "../pages/fualtBinding.vue"
import ModifyFualt from "../pages/modifyFualt.vue"
import exceptionManage from "../pages/exceptionManage.vue"
import ModifyException from "../pages/modifyException.vue"
import AddException from "../pages/addException.vue"
import ExceptionRecord from "../pages/exceptionRecord.vue"
import AlarmStrategy from "../pages/alarmStrategy.vue"
import ModifyAlarmStrategy from "../pages/modifyAlarmStrategy.vue"
import AddAlarmStrategy from "../pages/addAlarmStrategy.vue"
import MenuManage from "../pages/menuManage.vue"
import RoomDetails from "../pages/roomDetails.vue"
import lowVoltageRoomStatements from "../pages/lowVoltageRoomStatements.vue"
import lowVoltageRoomStatementsDetails from "../pages/lowVoltageRoomStatementsDetails.vue"
// 将所有组件集中管理进行配置

export default [{
  path: '/summary',
  name: 'summary',
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
  redirect: "/summary"
},
{
  path: '/display',
  name: 'display',
  components: {
    frame: Frame,
    main: PositionDisplay,
    header: Header
  }
},
{
  path: '/data/machine',
  name: 'data/machine',
  components: {
    frame: Frame,
    main: ConvergeRoom,
    header: Header
  }
}, {
  path: '/alarmRecord',
  name: 'alarmRecord',
  components: {
    frame: Frame,
    main: AlarmRecord,
    header: Header
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
  path: '/data/electric',
  name: 'data/electric',
  components: {
    frame: Frame,
    main: LowVoltageRoom,
    header: Header
  }
},
{
  path: '/control/pos',
  name: 'control/pos',
  components: {
    frame: Frame,
    main: PosMechine,
    header: Header
  }
},
{
  path: '/control/transfer',
  name: 'control/transfer',
  components: {
    frame: Frame,
    main: Transfer,
    header: Header
  }
},
{
  path: '/control/server',
  name: 'control/server',
  components: {
    frame: Frame,
    main: ServerRoom,
    header: Header
  }
},
{
  path: '/control/access',
  name: 'control/access',
  components: {
    frame: Frame,
    main: Access,
    header: Header
  }
},
{
  path: '/control/broadcast',
  name: 'control/broadcast',
  components: {
    frame: Frame,
    main: Broadcast,
    header: Header
  }
},
{
  path: '/control/network',
  name: 'control/network',
  components: {
    frame: Frame,
    main: Network,
    header: Header
  }
},
{
  path: '/role',
  name: 'role',
  components: {
    frame: Frame,
    main: RoleManage,
    header: Header
  }
},
{
  path: '/addRole',
  name: 'addRole',
  components: {
    frame: Frame,
    main: addRole,
    header: Header
  }
},
{
  path: '/user',
  name: 'user',
  components: {
    frame: Frame,
    main: UserManage,
    header: Header
  }
},
{
  path: '/template',
  name: 'template',
  components: {
    frame: Frame,
    main: TemplateManage,
    header: Header
  }
},
{
  path: '/modifyRole',
  name: 'modifyRole',
  components: {
    frame: Frame,
    main: ModifyRole,
    header: Header
  }
},
{
  path: '/addUser',
  name: 'addUser',
  components: {
    frame: Frame,
    main: AddUser,
    header: Header
  }
},
{
  path: '/modifyUser',
  name: 'modifyUser',
  components: {
    frame: Frame,
    main: ModifyUser,
    header: Header
  }
},
{
  path: '/addTemplate',
  name: 'addTemplate',
  components: {
    frame: Frame,
    main: AddTemplate,
    header: Header
  }
},
{
  path: '/modifyTemplate',
  name: 'modifyTemplate',
  components: {
    frame: Frame,
    main: ModifyTemplate,
    header: Header
  }
},
{
  path: '/alarmSet',
  name: 'alarmSet',
  components: {
    frame: Frame,
    main: AlarmSet,
    header: Header
  }
},
{
  path: '/record/warning',
  name: 'record/warning',
  components: {
    frame: Frame,
    main: WarningRecord,
    header: Header
  }
},
{
  path: '/exception',
  name: 'exception',
  components: {
    frame: Frame,
    main: exceptionManage,
    header: Header
  }
},
{
  path: '/fault',
  name: 'fualt',
  components: {
    frame: Frame,
    main: Fualt,
    header: Header
  }
},
{
  path: '/addFualt',
  name: 'addFualt',
  components: {
    frame: Frame,
    main: AddFualt,
    header: Header
  }
},
{
  path: '/fualtBinding',
  name: 'fualtBinding',
  components: {
    frame: Frame,
    main: FualtBinding,
    header: Header
  }
},
{
  path: '/ModifyFualt',
  name: 'ModifyFualt',
  components: {
    frame: Frame,
    main: ModifyFualt,
    header: Header
  }
},
{
  path: '/modifyException',
  name: 'modifyException',
  components: {
    frame: Frame,
    main: ModifyException,
    header: Header
  }
},
{
  path: '/addException',
  name: 'addException',
  components: {
    frame: Frame,
    main: AddException,
    header: Header
  }
},
{
  path: '/record/exception',
  name: 'record/exception',
  components: {
    frame: Frame,
    main: ExceptionRecord,
    header: Header
  }
},
{
  path: '/warning/strategy',
  name: 'warning/strategy',
  components: {
    frame: Frame,
    main: AlarmStrategy,
    header: Header
  }
},
{
  path: '/modifyAlarmStrategy',
  name: '/modifyAlarmStrategy',
  components: {
    frame: Frame,
    main: ModifyAlarmStrategy,
    header: Header
  }
},
{
  path: '/addAlarmStrategy',
  name: 'addAlarmStrategy',
  components: {
    frame: Frame,
    main: AddAlarmStrategy,
    header: Header
  }
},
{
  path: '/permission',
  name: 'permission',
  components: {
    frame: Frame,
    main: MenuManage,
    header: Header,
  }
},
{
  path: '/roomDetails',
  name: 'roomDetails',
  components: {
    frame: Frame,
    main: RoomDetails,
    header: Header,
  }
},
{
  path: '/statistics/electric',
  name: 'statistics/electric',
  components: {
    frame: Frame,
    main: lowVoltageRoomStatements,
    header: Header,
  }
},
{
  path: '/lowVoltageRoomStatementsDetails',
  name: 'lowVoltageRoomStatementsDetails',
  components: {
    frame: Frame,
    main: lowVoltageRoomStatementsDetails,
    header: Header,
  }
}
]
