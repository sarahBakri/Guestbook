import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import './login.css'
import{Link} from 'react-router-dom'
// import { Login } from '../../API/user';
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            userName:"",
            password:""
        }
    }
    setStateField=(fieldName)=>e=>{
        console.log(e.target.value)
        this.setState({
            [fieldName]:e.target.value
        })
    }
    handleLogin=e=>{
        e.preventDefault()
        const {userName,password}=this.state
        Login({userName,password}).then(res=>{
            localStorage.setItem('userToken',res.token)
            localStorage.setItem('userType',res.userType)
            window.location.replace('/')
        })
    }
    redirectSignUp(e){
        e.preventDefault()
        window.location.replace('/signup')
    }
    render(){
        const {userName,password}=this.state
        return(
            <div >
            <img src='logo.png' className="App-logo" alt="logo" />

            <form className="">
              
                
                <input type="text"
                 className="form-control mx-auto my-3 w-25" 
                 placeholder="User Name"
                 name="userName"
                 value={userName}
                 onChange={this.setStateField('userName')}
                />
                <input type="text" 
                className="form-control mx-auto my-3 w-25"  
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={this.setStateField('password')}
                />
                <button type="submit" className="btn-brown col-2 btn text-light" onClick={this.handleLogin}>Log in</button>    
                
                </form>
                <Link to='#' className='col-7 text-brown text-decoration-none my-3  mx-4 ' onClick={this.redirectSignUp} >Create Account</Link>
             
            
                
                   
        
                
            </div>
        )
    }
}
export default Login