import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import './messages.css'
import{Link} from 'react-router-dom'
import { LoginReq, logout } from '../../API/user';
import {getMessages,addMessage,editMessage,deleteMessage,reply} from '../../API/messages';

class Messages extends Component{
    constructor(props){
        super(props)
        this.state={
            allMessages:[],
            newMessageContent:"",
            editingMessageID:'',
            editingMessagecontent:"",
            deletingMessageID:"",
            replyingMessageContent:"",
            replyingMessageID:""
        }
    }
    setStateField=(fieldName)=>e=>{
        console.log(e.target.value)
        this.setState({
            [fieldName]:e.target.value
        })
       
    }
    logOutHandel=e=>{
        logout().then(res=>{
            window.location.replace('/')
        })
    }
    addMessagehandle=e=>{
        e.preventDefault()
        const newMessageContent=this.state.newMessageContent
        addMessage({content:newMessageContent}).then(res=>{
            
            window.location.replace('/messages')
        })
    }
    editPop(messageID,messageContent){
        
       this.setState({editingMessageID:messageID})
       this.setState({
        editingMessagecontent:messageContent})
    }
    deletePop(messageID){
        
        this.setState({deletingMessageID:messageID})
        
     }
     replyPop(messageID){
        
        this.setState({replyingMessageID:messageID})
        
     }
    editHandel=(e)=>{
        e.preventDefault()
        const editingMessagecontent=this.state.editingMessagecontent
        const editingMessageID = this.state.editingMessageID
        editMessage({content:editingMessagecontent,id:editingMessageID}).then(res=>{
            
            window.location.replace('/messages')
        })

    }
    deleteHandle=()=>{
        const deletingMessageID = this.state.deletingMessageID
        deleteMessage({id:deletingMessageID}).then(res=>{
            
            window.location.replace('/messages')
        })
    }
    replyHandel=()=>{
        const replyingMessageContent=this.state.replyingMessageContent

        const replyingMessageID = this.state.replyingMessageID
        reply({content:replyingMessageContent,id:replyingMessageID}).then(res=>{
            window.location.replace('/messages')
        })
    }
    getMessages=()=>{
        getMessages().then(res=>{
            this.setState({allMessages:res})
        }).catch(e=>{
            this.setState({allMessages:[]})
        })
    }
    componentDidMount(){
        this.getMessages()
    }
    render(){
        const {newMessageContent,replyingMessageContent,editingMessagecontent}=this.state
        return(
            <div >
                <div className="Mheader row py-3 p-0 m-0">
                <div className="col-3"></div>
                <form className="col-7 row">
                <input className='row form-control col-7 mx-4'
                 name="newMessageContent" 
                 value={newMessageContent}
                 onChange={this.setStateField('newMessageContent')}></input>
                <button className="btn btn-brown text-light" type="submit" onClick={this.addMessagehandle} > Add Message</button>
                </form>
                <button className="btn btn-brown text-light mx-3 col-1 " onClick={this.logOutHandel}> LogOut</button>
                </div>   
                {
                    this.state.allMessages.map(message=>{
                        return(
                            <div className="MContainer text-brown px-5 py-3 w-75 my-3 mx-auto">
                                <div className="row">
                                <div className="col-10">
                                <h5 className="text-left">{message.from.userName}</h5>
                                <p className="text-lightbrown text-left">
                                    {message.content}
                                </p>
                                </div>
                                <div className="col-2 text-brown text-right">
                                <a className="text-brown text-decoration-none  my-5" href="#" data-toggle="modal" data-target={'#edit'+(message._id)} onClick={this.editPop.bind(this,message._id,message.content)}  >Edit  </a>
                                <div class="modal fade" id={'edit'+message._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        <div class="modal-body">
                                        

                                        <form>
                                            <input className="form-control" value={editingMessagecontent} name="editingMessagecontent" onChange={this.setStateField('editingMessagecontent')}></input>
                                            <button type="submit" className="btn-brown btn text-light" onClick={this.editHandel} >Edit</button>
                                        </form>
                                        </div>
                              
                                    </div>
                                    </div>
                                </div> 
                                <a href="#" className="font-weight-bold text-brown" alt="Delete" data-toggle="modal" data-target={'#delete'+(message._id)} onClick={this.deletePop.bind(this,message._id)}>X</a></div>
                                <div class="modal fade" id={'delete'+message._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        <div class="modal-body">
                                        

                                        <p className="text-brown"> Are you want to delete this message?</p>
                                        <button className="btn btn-brown text-light" onClick={this.deleteHandle}>Yes</button>
                                        </div>
                              
                                    </div>
                                    </div>
                                </div>
                                </div>
                                
                                {(message.reply)?
                                    <div className="row ">
                                    <div className="col-1">
                                    </div>
                                    <div className="col-9 RContainer px-4 py-2">
                                        <div className="row">
                                        <p className=" col-10 text-lightbrown text-left ">

                                            {message.reply.content}
                                        </p> 
                                        <p className="col-2 text-brown text-right font-weight-bold"></p>
                                        </div>
                                        </div>
                                    </div>:<div>
                                    <button className="btn btn-brown text-light" data-toggle="modal" data-target={'#reply'+(message._id)} onClick={this.replyPop.bind(this,message._id)} >Reply</button>
                                    <div class="modal fade" id={'reply'+message._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        </div>
                                        <div class="modal-body">
                                        

                                        <form className="row"><div className="col-1"></div><input className="form-control col-8 mx-3" name = 'replyingMessageContent' onChange={this.setStateField('replyingMessageContent')} value={replyingMessageContent} id={'id'+message._id}></input> 
                                        <button className="btn text-light btn-brown" onClick={this.replyHandel}>Reply</button></form>
                                        </div>
                              
                                    </div>
                                    </div>
                                </div>
                                  </div>  }
                                
                            </div>)
                            
                    })
                }
                
                
            </div>
        )
    }
}
export default Messages