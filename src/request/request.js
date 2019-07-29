import axios from "axios"
import qs from 'qs';
import router from '../router'


let baseURL={
  baseURL: "http://127.0.0.1:8181"
};
// axios.defaults.withCredentials=true;

const ajax = axios.create(baseURL)

const ajaxLogin = axios.create({
  baseURL: "//localhost:8081"
})

const ajaxTurn = axios.create()

// 跳转到登录页面
const turnToLoginPage = () => {
  let casAddress="https://cas.sustech.edu.cn/cas/login?service=";

  return ajaxTurn.get(
    casAddress + 'http://localhost:8080/index.html',{
    }
  )
}

const firstCheck = (firstCheckURL) => {
  console.log(firstCheckURL)
  return ajaxLogin.get(
    firstCheckURL,{

    }
  )
}

// http://localhost:8081/cas?ticket=ST-545320-NTAwtemtYyKNTxolLNJm-cas.sustech.edu.cn&url=http://localhost:8081/loginredirect.html
// // tickek验证
const ticektCheck = () => {
  return ajaxLogin.get(
    "/cas?url=http://localhost:8080/index.html&ticket=" + window.sessionStorage.getItem("ticket"),{
    }
  )
}

const test = (token) => {
  return ajaxLogin.post(
    "/api/SystemApi/GetProjectsByUser",({
          limit: 20,
          offset: 0,
          order: "desc",
          orderId: "id",
          search: "",
          sort: "IsDuBan",
    }), {
      headers: {
        "Content-Type": "application/json",
        token:token,
        Authorization:token
      }
    }
  )
}

// 菜单
const toGetMenu = (token) => {
  return ajaxLogin.post(
    "/api/SystemApi/getUserRoleAndAction",{},{
      headers: {
        "Content-Type": "application/json",
        token:token,
        Authorization:token
      }
    }
  )
}


ajax.interceptors.request.use((config) => {
  return config
});


ajax.interceptors.response.use((config) => {
  console.log(router)
  if (!config.data.success) {
    if (config.data.httpCode == '401') {
      window.sessionStorage.removeItem('operationToken')
      router.push({path:"/signIn"})
      // window.location.href = "/signIn?invalidToken"
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
  ticektCheck,
  firstCheck,
  test,
  turnToLoginPage,
  toGetMenu
}
