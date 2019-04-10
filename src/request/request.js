import axios from "axios"
import qs from 'qs';
console.log(qs)
const ajax = axios.create({
//   baseURL: "http://127.0.0.1:8181"
})

const toSignIn = (userId) => {
  console.log(userId)
  return ajax.get(
    "http://127.0.0.1:8181/api/user", qs.stringify({
        username: "admin",
        password: "123"
      }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

export {
  toSignIn
}
