import axios from "axios"
import qs from 'qs';

const ajax = axios.create({
  baseURL: "http://127.0.0.1:8181"
})

// 用户登录请求

const toSignIn = (userInfo) => {
  return ajax.post(
    "/login", qs.stringify(userInfo), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

// 请求权限菜单
const toGetAsideMenu = () => {
  return ajax.get(
    "/api/current/user/permission", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 汇聚机房告警设置列表
const toGetConvergeRoomAlarmSettings = (userId,type,currentPage=1) => {
  return ajax.get(
    `/api/user/${userId}/device?currentPage=${currentPage}&type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求用户id
const toGetUserInfo = () => {
  return ajax.get(
    "/api/current/user", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求汇聚机房列表
const toGetconvergeRoomList = () => {
  return ajax.get(
    "/api/data/machine", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求弱电房间列表
const toGetlowVoltageRoomList = () => {
  return ajax.get(
    "/api/data/electric", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求状态汇总信息
const toGetSummary = () => {
  return ajax.get(
    "/api/summary", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求状态汇总信息
const toGetExceptionManageList = (page=1) => {
  return ajax.get(
    "/api/exception?currentPage="+page, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求pos机列表
const toGetPosMechineList = (page =1, status,buildingId,searchRoom) => {
  let statusQuery = status !=undefined? `&status=${status}` : "",
    buildingIdQuery = buildingId !=undefined? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom !=undefined? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/pos?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}
// 获取故障异常列表


const toGetFualtExceptionList = (page =1,FaultId,exceptionType) => {
  let exceptionTypeQuery = exceptionType !=undefined? `&exceptionType=${exceptionType}` : "";
  return ajax.get(
    `/api/fault/${FaultId}/exception?currentPage=` + page + exceptionTypeQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 是否绑定异常
const toChangeFualtException = (fualtException) => {
  console.log(fualtException)
  return ajax.post(
    `/api/fault/${fualtException.faultId}/binding/${fualtException.exceptionId}`, qs.stringify(fualtException), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}


// 请求圈存机列表
const toGetTransferList = (page =1, status,buildingId,searchRoom) => {
  let statusQuery = status !=undefined ? `&status=${status}` : "",
    buildingIdQuery = buildingId != undefined ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom  ? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/transfer?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求门禁列表
const toGetAccessList = (page =1, status,buildingId,searchRoom) => {
  let statusQuery = status !=undefined? `&status=${status}` : "",
    buildingIdQuery = buildingId !=undefined? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom !=undefined? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/access?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求广播列表
const toGetBroadcastList = (page =1, status,buildingId,searchRoom) => {
  let statusQuery = status !=undefined? `&status=${status}` : "",
    buildingIdQuery = buildingId !=undefined? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom !=undefined? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/broadcast?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求交换机列表
const toGetinterchangerList = (page =1, status,buildingId,searchRoom) => {
  let statusQuery = status !=undefined ? `&status=${status}` : "",
    buildingIdQuery = buildingId !==undefined ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom !=undefined ? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/network?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}



// 请求角色管理列表
const toGetRoleManageList = () => {
  return ajax.get(
    "/api/role", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求楼宇名称列表
const toGetBuildingList = () => {
  return ajax.get(
    "/api/cmdb/building", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 角色管理删除操作
const toDeleteRole = (userId) => {
  return ajax.delete(
    "/api/role/" + userId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 删除故障
const toDeleteFualt = (faultId) => {
  return ajax.delete(
    "/api/fault/" + faultId,{
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 用户管理删除操作
const toDeleteUser = (userId) => {
  return ajax.delete(
    "/api/user/" + userId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

//用户添加
const toAddUser = (userInfo) => {
  let obj ={};
  obj=userInfo;
  // obj.roleIds=[userInfo.role]
  userInfo.role=1
  console.log(obj)
  return ajax.post(
    `/api/user?roleIds=${userInfo.role}`,obj, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}

//新增故障
const toAddFualt = (fualtInfo) => {
  console.log(fualtInfo)
  return ajax.post(
    `/api/fault`,qs.stringify(fualtInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//角色添加
const toAddRole = (userInfo) => {
  console.log(userInfo)
  return ajax.post(
    "/api/role", qs.stringify(userInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//角色修改
const toModifyRole = (userInfo) => {
  return ajax.put(
    "/api/role/" + userInfo.id, qs.stringify(userInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//修改故障信息
const toModifyFualt = (fualtInfo) => {
  return ajax.put(
    `/api/fault/${fualtInfo.faultId}?name=${fualtInfo.name}&${fualtInfo.remark}`, qs.stringify(fualtInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}


//用户修改
const toModifyUser = (userInfo) => {
  console.log(userInfo)
  return ajax.put(
    "/api/user/" + userInfo.userId, qs.stringify(userInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//用户重置密码
const toResetPassword = (userId) => {
  console.log(userId)
  return ajax.put(
    "/api/user/reset/password/" + userId, {},{
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//用户设置告警设置
const toSetAlarm = (userID, FaultId) => {
  console.log(userID, FaultId)
  return ajax.post(
    `/api/user/${userID}/warning/${FaultId}`, qs.stringify({
    }), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"

      }
    }
  )
}

//用户开启告警设置
const toSetAlarmOn = (obj) => {
  console.log(obj)
  return ajax.post(
    `/api/user/${obj.userId}/device/${obj.cmdbId}/on`, qs.stringify(obj), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"

      }
    }
  )
}

//用户禁用告警设置
const toSetAlarmOff = (obj) => {
  console.log(obj)
  return ajax.post(
    `/api/user/${obj.userId}/device/${obj.cmdbId}/off`, qs.stringify(obj), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"

      }
    }
  )
}

// 请求用户列表
const toUserList = () => {
  return ajax.get(
    "/api/user", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求故障列表
const toGetFualtManageList = (page=1) => {
  return ajax.get(
    "/api/fault?currentPage="+page, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 请求故障详情列表
const toGetFualtInfo = (fualtId) => {
  return ajax.get(
    "/api/fault/"+fualtId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 获取用户告警设置列表
const toGetUserAlarmSettings = (userId) => {
  return ajax.get(
    `/api/user/${userId}/warning`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求告警记录列表

const toGetWarningRecordList = (page =1, exceptionId,searchName) => {
  let exceptionIdQuery = exceptionId !=undefined ? `&status=${exceptionId}` : "",
  searchNameQuery = searchName !==undefined ? `&buildingId=${searchName}` : "";
  return ajax.get(
    `/api/record/warning?currentPage=` + page + exceptionIdQuery + searchNameQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}



// 进入编辑角色页面，获取角色信息
const toRoleInfo = (userId) => {
  return ajax.get(
    "/api/role/" + userId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 请求用户信息
const toGetUserInfoById = (userId = 1) => {
  return ajax.get(
    "/api/user/" + userId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


//拦截请求,并进行操作,显示等待图标
ajax.interceptors.request.use((config) => {
  return config
});

//拦截相应,对相应数据进行操作并返回,顺带关掉indicator
ajax.interceptors.response.use((config) => {

  return config

})


export {
  toSignIn,
  toGetAsideMenu,
  toGetconvergeRoomList,
  toGetUserInfo,
  toGetlowVoltageRoomList,
  toGetPosMechineList,
  toGetRoleManageList,
  toDeleteRole,
  toAddRole,
  toUserList,
  toRoleInfo,
  toModifyRole,
  toDeleteUser,
  toAddUser,
  toGetUserInfoById,
  toModifyUser,
  toSetAlarm,
  toGetUserAlarmSettings,
  toResetPassword,
  toGetConvergeRoomAlarmSettings,
  toSetAlarmOn,
  toSetAlarmOff,
  toGetBuildingList,
  toGetTransferList,
  toGetSummary,
  toGetAccessList,
  toGetBroadcastList,
  toGetinterchangerList,
  toGetWarningRecordList,
  toGetFualtManageList,
  toGetFualtExceptionList,
  toChangeFualtException,
  toAddFualt,
  toGetFualtInfo,
  toModifyFualt,
  toDeleteFualt,
  toGetExceptionManageList
}
