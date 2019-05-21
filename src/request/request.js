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

// 请求所有一级菜单
const toGetParentMenu = () => {
  return ajax.get(
    "/api/permission/grading", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 获取所有菜单
const toGetMenu = () => {
  return ajax.get(
    "/api/permission", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}



// 请求所有异常列表
const toGetAllExceptionList = (type) => {

  let typeParam = type ? `?type=${type}` : "";

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
const toGetConvergeRoomAlarmSettings = (userId, type, currentPage) => {
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


// 搜索汇聚机房
const toSearchConvergeRoom = (roomId) => {
  let roomIdParam = roomId ? `?searchRoom=${roomId}` : "";

  return ajax.get(
    "/api/data/machine" + roomIdParam, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 请求汇聚机房详情
const toGetconvergeRoomDetails = (id) => {
  return ajax.get(
    "/api/data/machine/" + id, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求弱电间详情
const toGetLowVoltageRoomDetails = (id) => {
  return ajax.get(
    "/api/data/electric/" + id, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 请求弱电间列表
const toGetlowVoltageRoomList = () => {
  return ajax.get(
    "/api/data/electric", {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 搜索弱电间
const toSearchlowVoltageRoom = (roomId) => {
  let roomIdParam = roomId ? `?searchRoom=${roomId}` : "";
  return ajax.get(
    "/api/data/electric" + roomIdParam, {
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
const toGetExceptionManageList = (page) => {
  return ajax.get(
    "/api/exception?currentPage=" + page, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求pos机列表
const toGetPosMechineList = (page, status, buildingId, searchRoom) => {

  let statusQuery = status === undefined || status === null ? "" : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/pos?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求服务器列表
const toGetServerRoomList = (page, status, buildingId, searchRoom) => {

  let statusQuery = status ? `&status=${status}` : "",
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/server?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 获取故障异常列表
const toGetFualtExceptionList = (page = 1, FaultId, exceptionType) => {
  let exceptionTypeQuery = exceptionType != undefined ? `&exceptionType=${exceptionType}` : "";
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
const toGetTransferList = (page, status, buildingId, searchRoom) => {

  let statusQuery = status === undefined || status === null ? "" : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";
  console.log(status, statusQuery, status === undefined, status === null)
  return ajax.get(
    `/api/control/transfer?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求门禁列表
const toGetAccessList = (page, status, buildingId, searchRoom) => {
  let statusQuery = status === undefined || status == null ? " " : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";

  return ajax.get(
    `/api/control/access?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求广播列表
const toGetBroadcastList = (page = 1, status, buildingId, searchRoom) => {
  let statusQuery = status === undefined || status === null ? "" : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";
  return ajax.get(
    `/api/control/broadcast?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求交换机列表
const toGetinterchangerList = (page = 1, status, buildingId, searchRoom) => {
  let statusQuery = status === undefined || status == null ? "" : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    searchRoomQuery = searchRoom ? `&searchRoom=${searchRoom}` : "";

  return ajax.get(
    `/api/control/network?currentPage=` + page + statusQuery + buildingIdQuery + searchRoomQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}



// 请求角色管理列表
const toGetRoleManageList = (currentPage) => {
  return ajax.get(
    `/api/role?currentPage=${currentPage}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求楼栋坐标信息列表
const toGetBuildingPositionList = (currentPage) => {
  return ajax.get(
    `/api/position?currentPage=${currentPage}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求角色管理列表
const toGetAllRoleManageList = () => {
  return ajax.get(
    `/api/role/all`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 获取异常详情
const toGetExceptionInfo = (exceptionId) => {
  return ajax.get(
    "/api/exception/" + exceptionId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 删除异常详情
const toDeleteExceptionInfo = (exceptionId) => {
  return ajax.delete(
    "/api/exception/" + exceptionId, {
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
    "/api/fault/" + faultId, {
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
// 模板删除操作
const toDeleteTemplate = (templateId) => {
  return ajax.delete(
    "/api/template/" + templateId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}
//用户添加
const toAddUser = (userInfo) => {
  let obj = userInfo;
  obj.roleIds = [userInfo.role]

  return ajax.post(
    `/api/user?roleIds=${userInfo.role}`, obj, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}

//模板添加
const toAddTemplate = (templateInfo) => {
  let obj = templateInfo;
  return ajax.post(
    `/api/template`, obj, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}

//新增故障
const toAddFualt = (fualtInfo) => {

  return ajax.post(
    `/api/fault`, qs.stringify(fualtInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//新增异常
const toAddException = (exceptionInfo) => {

  return ajax.post(
    `/api/exception?code=${exceptionInfo.code}&type=${exceptionInfo.type}&remark=${exceptionInfo.remark}`, qs.stringify(exceptionInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}


//角色添加
const toAddRole = (roleInfo) => {

  return ajax.post(
    "/api/role" + "?permissionIds=" + roleInfo.permissions.join(","), qs.stringify(roleInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//角色修改
const toModifyRole = (roleInfo) => {

  return ajax.put(
    "/api/role/" + roleInfo.id + "?permissionIds=" + roleInfo.permissions.join(","), qs.stringify(roleInfo), {
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
    `/api/fault/${fualtInfo.faultId}?name=${fualtInfo.name}&remark=${fualtInfo.remark}`, qs.stringify(fualtInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}


//修改异常
const toModifyException = (exceptionInfo) => {

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

  let keyArray = Object.keys(userInfo),
    itemArray = [],
    i = 0;
  for (var item of keyArray) {
    var obj = {};
    if (userInfo[item]) {
      if (i === 0) {
        obj[item] = `?${item}=${userInfo[item]}`
      } else {
        obj[item] = `&${item}=${userInfo[item]}`;
      }
      itemArray.push(obj);
      i++;
    }
  }

  let ultimateParam = [],
    ultimateKeyArray = []
  // 得到所有的key值
  for (var j = 0; j < itemArray.length; j++) {

    ultimateKeyArray.push(Object.keys(itemArray[j])[0]);
  }
  // 得到所有的参数array
  for (var j = 0; j < itemArray.length; j++) {
    ultimateParam.push(itemArray[j][(ultimateKeyArray[j])])
  }


  return ajax.put(
    `/api/user/${userInfo.userId}` + ultimateParam.join(''), qs.stringify(userInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}

//修改告警模板
const toModifyTemplate = (template) => {
  return ajax.put(
    `/api/template/${template.id}`, template, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}

//修改告警策略
const toModifyAlarmStrategy = (alarmStrategy) => {
  return ajax.put(
    `/api/warning/strategy/device/${alarmStrategy.cmdbId}/?type=${alarmStrategy.type}`, alarmStrategy.warningStrategy, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/json"
      }
    }
  )
}

//修改楼栋坐标信息
const toModifyBuildingPosition = (buildingPositionInfo) => {
  return ajax.put(
    `/api/position/${buildingPositionInfo.id}?xPosition=${buildingPositionInfo.xPosition}&yPosition=${buildingPositionInfo.yPosition}`, qs.stringify(buildingPositionInfo), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//用户重置密码
const toResetPassword = (userId) => {

  return ajax.put(
    "/api/user/reset/password/" + userId, {}, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
}

//用户设置告警设置
const toSetAlarm = (userID, FaultId) => {

  return ajax.post(
    `/api/user/${userID}/warning/${FaultId}`, qs.stringify({}), {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken")),
        "Content-Type": "application/x-www-form-urlencoded"

      }
    }
  )
}

//用户开启告警设置
const toSetAlarmOn = (obj) => {

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
const toUserList = (page, searchName) => {
  return ajax.get(
    `/api/user?currentPage=${page}&searchNname=${searchName}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求用户列表
const toTemplateList = (page) => {
  return ajax.get(
    `/api/template?currentPage=${page}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求故障列表
const toGetFualtManageList = (page = 1) => {
  return ajax.get(
    "/api/fault?currentPage=" + page, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 请求故障详情列表
const toGetFualtInfo = (fualtId) => {
  return ajax.get(
    "/api/fault/" + fualtId, {
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

const toGetWarningRecordList = (page = 1, deviceType, warningId, searchName) => {

  let deviceTypeQuery = deviceType ? `&type=${deviceType}` : "",
    warningIdQuery = warningId ? `&exceptionId=${warningId}` : "",
    searchNameQuery = searchName ? `&searchName=${searchName}` : "";
  return ajax.get(
    `/api/record/warning?currentPage=` + page + deviceTypeQuery + warningIdQuery + searchNameQuery, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}
// 获取异常记录列表

const toGetExceptionRecordList = (page = 1, status, buildingId, floorId, roomId) => {

  let roomIdQuery = roomId ? `&roomId=${roomId}` : "",
    statusQuery = status === undefined || status == null ? "" : `&status=${status}`,
    buildingIdQuery = buildingId ? `&buildingId=${buildingId}` : "",
    floorIdQuery = floorId ? `&floorId=${floorId}` : "";

  return ajax.get(
    `/api/record/exception?currentPage=` + page + roomIdQuery + statusQuery + buildingIdQuery + floorIdQuery, {
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


// 获取所有没有模板的异常记录
const toGetNoTemplateException = (type) => {
  return ajax.get(
    `/api/template/exception?type=` + type, {
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
// 请求模板信息
const toGetTemplateById = (templateId) => {
  return ajax.get(
    "/api/template/" + templateId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 请求模板信息
const toGetBuildingPositionById = (positionId) => {
  return ajax.get(
    "/api/position/" + positionId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 告警策略信息
const toGetAlarmStrategy = (type, page) => {
  return ajax.get(
    `/api/warning/strategy/device?type=${type}&currentPage=${page}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 告警策略详情
const toGetAlarmStrategyInfo = (cmdbId, type) => {
  return ajax.get(
    `/api/warning/strategy/device/${cmdbId}?type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 获取弱电间统计报表
const toGetlowVoltageRoomStatements = (page, type) => {
  return ajax.get(
    `/api/statistical/weak-electric?currentPage=${page}&type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 弱电间统计报表详情
// /api/statistical/weak-electric/detail?type=2&startTime=2019-05-06
const toGetlowVoltageRoomStatementsDetails = (type, startTime) => {
  return ajax.get(
    `/api/statistical/weak-electric/detail?type=${type}&startTime=${startTime}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }

    }
  )
}


// 获取汇聚机房统计报表
const toGetconvergeRoomStatements = (page, type) => {
  return ajax.get(
    `/api/statistical/machine-room?currentPage=${page}&type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 汇聚机房统计报表详情
const toGetconvergeRoomStatementsDetails = (type, startTime) => {
  return ajax.get(
    `/api/statistical/machine-room/detail?type=${type}&startTime=${startTime}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 获取pos机房间统计报表
const toGetposMechineRoomStatements = (page, type) => {
  return ajax.get(
    `/api/statistical/pos?currentPage=${page}&type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// pos机房统计报表详情
const toGetposMechineRoomStatementsDetails = (type, startTime) => {
  return ajax.get(
    `/api/statistical/pos/detail?type=${type}&startTime=${startTime}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 获取圈存机房间统计报表
const toGettransferRoomStatements = (page, type) => {
  return ajax.get(
    `/api/statistical/transfer?currentPage=${page}&type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 圈存机房统计报表详情
const toGetTransferRoomStatementsDetails = (type, startTime) => {
  return ajax.get(
    `/api/statistical/transfer/detail?type=${type}&startTime=${startTime}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 门禁房间统计报表
const toGetaccessStatements = (page, type) => {
  return ajax.get(
    `/api/statistical/access?currentPage=${page}&type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 门禁统计报表详情
const toGetaccessStatementsDetails = (type, startTime) => {
  return ajax.get(
    `/api/statistical/access/detail?type=${type}&startTime=${startTime}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


// 广播系统统计报表
const toGetbroadcastStatements = (page, type) => {
  return ajax.get(
    `/api/statistical/broadcast?currentPage=${page}&type=${type}`, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}

// 广播系统统计报表详情
const toGetbroadcastStatementsDetails = (type, startTime) => {
  return ajax.get(
    `/api/statistical/broadcast/detail?type=${type}&startTime=${startTime}`, {
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


ajax.interceptors.request.use((config) => {
  return config
});


ajax.interceptors.response.use((config) => {
  if (!config.data.success) {
    if (config.data.httpCode == 401) {
      window.sessionStorage.removeItem('operationToken')
      alert("登录已失效，请重新登录");
      window.location.href = "/"
      return config
    } else {
      return config
    }
  } else {
    return config
  }
})


export {
  toSignIn,
  toGetAsideMenu,
  toGetconvergeRoomList,
  toGetUserInfo,
  toGetlowVoltageRoomList,
  toGetPosMechineList,
  toGetRoleManageList,
  toGetBuildingPositionList,
  toGetAllRoleManageList,
  toDeleteRole,
  toAddRole,
  toUserList,
  toTemplateList,
  toRoleInfo,
  toModifyRole,
  toDeleteUser,
  toDeleteTemplate,
  toAddUser,
  toAddTemplate,
  toGetUserInfoById,
  toGetTemplateById,
  toModifyUser,
  toModifyTemplate,
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
  toGetNoTemplateException,
  toGetAllRooms,
  toGetExceptionRecordList,
  toSignOut,
  toAddException,
  toModifyException,
  toModifyPermissionStatus,
  toGetconvergeRoomDetails,
  toGetLowVoltageRoomDetails,
  toGetAllExceptionList,
  toGetServerRoomList,
  toSearchConvergeRoom,
  toSearchlowVoltageRoom,
  toGetMenu,
  toGetParentMenu,
  toGetlowVoltageRoomStatements,
  toGetlowVoltageRoomStatementsDetails,
  toGetBuildingPositionById,
  toModifyBuildingPosition,
  toGetconvergeRoomStatements,
  toGetconvergeRoomStatementsDetails,
  toGetposMechineRoomStatements,
  toGetposMechineRoomStatementsDetails,
  toGettransferRoomStatements,
  toGetTransferRoomStatementsDetails,
  toGetaccessStatements,
  toGetaccessStatementsDetails,
  toGetbroadcastStatements,
  toGetbroadcastStatementsDetails
}
