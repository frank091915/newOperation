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



//拦截请求,并进行操作,显示等待图标
ajax.interceptors.request.use((config)=>{
    console.log(config)
    return config
  });
  
  //拦截相应,对相应数据进行操作并返回,顺带关掉indicator
  ajax.interceptors.response.use((config)=>{

    return config
  
  })

export {
  toSignIn
}
