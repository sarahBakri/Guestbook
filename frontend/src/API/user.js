import axios from 'axios'
const BASEURL='http://localhost:3000'
const token = localStorage.getItem("userToken")
export const LoginReq = ({userName,password})=>{
    const user = {
        userName:userName,
        password:password   
    }
    return axios.post(`${BASEURL}/user/login`,user).then(res=>res.data)
}
export const SignupReq = ({userName,password})=>{
    const user = {
        userName:userName,
        password:password
    }
    return axios.post(`${BASEURL}/user`,user).then(res=>res.data)
}
export const logout=()=>{
    return axios.post(`${BASEURL}/logout`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>res.data)
}
