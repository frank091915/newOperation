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


// 请求所有异常列表
const toGetAllExceptionList = (type) => {
  console.log(type)
  let typeParam= type ?   `?type=${type}`: "";

  return ajax.get(
    "/api/exception/all" + typeParam, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 改变菜单权限状态
const toModifyPermissionStatus = (permissionId) => {
  console.log(permissionId)
  return ajax.put(
    `/api/permission/status/${permissionId}`, {}, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
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

// 请求汇聚机房详情
const toGetconvergeRoomDetails = (id) => {
  return ajax.get(
    "/api/data/machine/"+id, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求弱电间详情
const toGetLowVoltageRoomDetails = (id) => {
  return ajax.get(
    "/api/data/electric/"+id, {
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
const toGetPosMechineList = (page , status,buildingId,searchRoom) => {
  console.log(page , status,buildingId,searchRoom)
  let statusQuery = status ===undefined || status ===null ?  "" : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}`: ""  ,
    searchRoomQuery = searchRoom ?  `&searchRoom=${searchRoom}`: "";
  return ajax.get(
    `/api/control/pos?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求服务器列表
const toGetServerRoomList = (page , status,buildingId,searchRoom) => {
  console.log(page , status,buildingId,searchRoom)
  let statusQuery = status ? `&status=${status}`:  "" ,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}`: ""  ,
    searchRoomQuery = searchRoom ?  `&searchRoom=${searchRoom}`: "";
  return ajax.get(
    `/api/control/server?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
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
  console.log(status,buildingId,searchRoom)
  let statusQuery = status ===undefined || status ===null ?  "" : `&status=${status}`,
    buildingIdQuery = buildingId  ? `&buildingId=${buildingId}` : "",
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
const toGetAccessList = (page, status,buildingId,searchRoom) => { 
  let statusQuery = status ===undefined || status ==null ?  " " : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";
    console.log(buildingIdQuery)
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
  let statusQuery = status ===undefined || status ===null ?  "" : `&status=${status}`,
    buildingIdQuery = buildingId ?  `&buildingId=${buildingId}`:""  ,
    searchRoomQuery = searchRoom ?  `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/broadcast?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求交换机列表
const toGetinterchangerList = (page =1,status,buildingId,searchRoom) => {
  let statusQuery = status === undefined || status == null ?  "" : `&status=${status}`,
    buildingIdQuery = buildingId  ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";
    console.log(status,statusQuery,status === undefined || status == null,status === undefined,status === null)
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

// 获取异常详情
const toGetExceptionInfo =(exceptionId) => {
  return ajax.get(
    "/api/exception/"+exceptionId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 删除异常详情
const toDeleteExceptionInfo = (exceptionId) => {
  return ajax.delete(
    "/api/exception/"+exceptionId, {
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
  obj.roleIds=[userInfo.role]
  console.log(obj)
  return ajax.post(
    `/api/user`,obj, {
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

//新增异常
const toAddException = (exceptionInfo) => {
  console.log(exceptionInfo)
  return ajax.post(
    `/api/exception?code=${exceptionInfo.code}&type=${exceptionInfo.type}&remark=${exceptionInfo.remark}`,qs.stringify(exceptionInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}


//角色添加
const toAddRole = (roleInfo) => {
  console.log(roleInfo)
  return ajax.post(
    "/api/role"+"?permissionIds="+ roleInfo.permissions.join(","), qs.stringify(roleInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//角色修改
const toModifyRole = (roleInfo) => {
  console.log(roleInfo)
  return ajax.put(
    "/api/role/" + roleInfo.id+"?permissionIds="+ roleInfo.permissions.join(","), qs.stringify(roleInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//修改故障信息
const toModifyFualt = (fualtInfo) => {
  console.log(fualtInfo)
  return ajax.put(
    `/api/fault/${fualtInfo.faultId}?name=${fualtInfo.name}&remark=${fualtInfo.remark}`, qs.stringify(fualtInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}


//修改异常
const toModifyException = (exceptionInfo) => {
  console.log(exceptionInfo)
  return ajax.put(
    `/api/exception/${exceptionInfo.exceptionId}?type=${exceptionInfo.code}&remark=${exceptionInfo.remark}`, qs.stringify(exceptionInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}

//用户修改
const toModifyUser = (userInfo) => {
  console.log(userInfo)

let keyArray=Object.keys(userInfo),
    itemArray=[],
    i=0;
    for(var item of  keyArray){
      var obj={};
      if(userInfo[item]){
        if(i===0){
          obj[item]=`?${item}= ${userInfo[item]}`
        }else{
          obj[item]=`&${item}= ${userInfo[item]}` ;
        }

        itemArray.push(obj);
        i++;
      }
    }
    
console.log(itemArray)

  let ultimateParam =[],
      itemArrayKeys=Object.keys(itemArray);

      for(var item of itemArrayKeys){
        console.log(item)
        ultimateParam.push(itemArray[item])
      }

  console.log(itemArrayKeys)
  return ajax.put(
    `/api/user/${userInfo}`,qs.stringify(userInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}
//修改告警策略
const toModifyAlarmStrategy = (alarmStrategy) => {
  console.log(alarmStrategy)
  return ajax.put(
    `/api/warning/strategy/device/${alarmStrategy.cmdbId}/?type=${alarmStrategy.type}`, alarmStrategy.warningStrategy, {
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

const toGetWarningRecordList = (page =1,warningId,searchName) => {
  console.log(warningId)
  let warningIdQuery = warningId ?    `&exceptionId=${warningId}`: "",
      searchNameQuery = searchName ? `&searchName=${searchName}`  : "" ;
  return ajax.get(
    `/api/record/warning?currentPage=` + page + warningIdQuery + searchNameQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}
// 获取异常记录列表

const toGetExceptionRecordList = (page =1,status,buildingId,floorId,roomId) => {
  let roomIdQuery = roomId ?   `&roomId=${roomId}`: "",
      statusQuery = status ? `&status=${status}`: ""  ,
      buildingIdQuery = buildingId ?  `&buildingId=${buildingId}`:""  ,
      floorIdQuery = floorId ?  `&floorId=${floorId}`:""  ;

  return ajax.get(
    `/api/record/exception?currentPage=` + page + roomIdQuery + statusQuery+buildingIdQuery+floorIdQuery, {
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


// 获取所有楼层列表
const toGetAllFloors = (buildingId) => {
  return ajax.get(
    `/api/cmdb/building/${buildingId}/floor`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 获取所有房间列表
const toGetAllRooms = (floorId) => {
  return ajax.get(
    `/api/cmdb/floor/${floorId}/room`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 请求用户信息
const toGetUserInfoById = (userId) => {
  return ajax.get(
    "/api/user/" + userId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 告警策略信息
const toGetAlarmStrategy = (type,page) => {
  return ajax.get(
    `/api/warning/strategy/device?type=${type}&currentPage=${page}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 告警策略详情
const toGetAlarmStrategyInfo = (cmdbId,type) => {
  return ajax.get(
    `/api/warning/strategy/device/${cmdbId}?type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 用户推出
const toSignOut = () => {
  return ajax.get(
    `/login?logout`, {
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
  toGetExceptionManageList,
  toGetExceptionInfo,
  toDeleteExceptionInfo,
  toGetAlarmStrategy,
  toGetAlarmStrategyInfo,
  toModifyAlarmStrategy,
  toGetAllFloors,
  toGetAllRooms,
  toGetExceptionRecordList,
  toSignOut,
  toAddException,
  toModifyException,
  toModifyPermissionStatus,
  toGetconvergeRoomDetails,
  toGetLowVoltageRoomDetails,
  toGetAllExceptionList,
  toGetServerRoomList
}



