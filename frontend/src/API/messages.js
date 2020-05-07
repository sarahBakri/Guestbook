import axios from 'axios'
const BASEURL='http://localhost:3000'
const token = localStorage.getItem("userToken")

export const getMessages=()=>{
    return  axios.get(`${BASEURL}/messages`,{
        headers:{
            Authorization:`Bearer ${token}`            
        }
    }).then(res=>res.data)
}

export const addMessage = ({content})=>{
    const messages = {
        content:content
    }
    return axios.post(`${BASEURL}/message`,messages,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>res.data)
}
export const editMessage = ({content,id})=>{
    const messages = {
        content:content
    }
    return axios.patch(`${BASEURL}/message/${id}`,messages,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>res.data)
}
export const deleteMessage=({id})=>{
    return axios.delete(`${BASEURL}/message/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>res.data) 
}

export const reply = ({content,id})=>{
    const messages = {
        content:content
    }
    return axios.post(`${BASEURL}/message/reply/${id}`,messages,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>res.data)
}