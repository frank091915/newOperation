import axios from "axios"
import qs from 'qs';

const ajax = axios.create({
  baseURL: "http://127.0.0.1:8181"
})

// 用户登录请求
const toSignIn = (userInfo) => {

  return ajax.post(
    "/login", qs.stringify({
        username: "admin",
        password: "123"
      }), {
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

// 请求pos机列表
const toGetPosMechineList = (page=1,status,buildingId,searchRoom) => {
  let statusQuery=status ? `&status=${status}` : "",
      buildingIdQuery=buildingId ? `&status=${status}` : "",
      searchRoomQuery=searchRoom ? `&status=${status}` : ""
  console.log(statusQuery)
  return ajax.get(
    `/api/control/pos?currentPage=`+page+statusQuery+buildingIdQuery+searchRoomQuery, {
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

  //角色添加
  const toAddUser = (userInfo) => {
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
      console.log(userInfo)
      return ajax.put(
        "/api/role/"+userInfo.id, qs.stringify(userInfo), {
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
          "/api/role/"+userInfo.userId, qs.stringify(userInfo), {
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

  // 进入编辑角色页面，获取角色信息
  const toRoleInfo = (userId) => {
    return ajax.get(
      "/api/role/"+userId, {
        headers: {
          "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
        }
      }
    )
  }


  // 请求用户信息
const toGetUserInfoById = (userId=1) => {
  return ajax.get(
    "/api/user/"+userId, {
      headers: {
        "accessToken": JSON.parse(window.sessionStorage.getItem("operationToken"))
      }
    }
  )
}


//拦截请求,并进行操作,显示等待图标
ajax.interceptors.request.use((config)=>{
    return config
  });
  
  //拦截相应,对相应数据进行操作并返回,顺带关掉indicator
  ajax.interceptors.response.use((config)=>{

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
  toModifyUser
}
