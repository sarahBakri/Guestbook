import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import './signup.css'
import{Link} from 'react-router-dom'
import { SignupReq } from '../../API/user';
class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            userName:"",
            password:"",
            confirmPassword:"",
            confirmed:true
        }
    }
    setStateField=(fieldName)=>e=>{
        console.log(e.target.value)
        this.setState({
            [fieldName]:e.target.value
        }, () => {
            console.log(this.state[fieldName]);
        })
        
        
    }

    handleSign=e=>{
        e.preventDefault()
        const {userName,password}=this.state
        SignupReq({userName,password}).then(res=>{
            localStorage.setItem('userToken',res.token)
            window.location.replace('/messages')
        })
    }

    render(){
        const {userName,password,confirmPassword,confirmed}=this.state
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
                <input type="text" 
                 className="form-control mx-auto my-3 w-25"  
                 placeholder="Confirm Password"
                 type="password"
                 name="confirmPassword"
                 value={confirmPassword}
                 onChange={this.setStateField('confirmPassword')}
                />
                {(password != confirmPassword)?<p>Password doesn't match</p>:<p></p>}
                <button type="submit" 
                 className="btn-brown col-2 btn text-light" 
                 onClick={this.handleSign}>Sign Up</button>    
                
                </form>
            
            </div>
        )
    }
}
export default SignUp