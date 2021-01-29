import { io } from "socket.io-client";
var socket;
export const connectionSocket = (name,cb)=>{
    socket = io(process.env.REACT_APP_SOCKET_ENDPOIN || "https://fast-basin-53706.herokuapp.com/")
    socket.emit('setName',name)
    socket.on('profile',(data)=>cb(null,data))
    // console.log('123')
}
export const disconnectSocket = ()=>{
    socket && socket.disconnect();
}
export const checkUser = (client,cb)=>{
    // socket = io(process.env.REACT_APP_SOCKET_ENDPOINT)
    socket.emit('checkUser',client)
    socket.on('checkResult',(data)=>cb(null,data))
}
export const checkMaster = ()=>{
    socket.on('root',(data)=>{
        console.log(data)
    })
}
export const getListUser = (cb)=>{
    socket.on('listUser',(data)=>cb(null,data))
}
export const recKey = (cb)=>{
    socket.on('sendkey',(data)=>cb(null,data))
}
export const sendQuestionServer = (data)=>{
    socket.emit('sendQuestionServer',data)
}
export const recQuestion = (cb)=>{
    socket.on("postQuestion",data=>cb(null,data))
}
export const sendAnswer = (data)=>{
    socket.emit('sendAnswer',data)
}
export const searchKey = (data)=>{
    socket.emit('searchKey',data)
}
export const sendAnswerClient = (cb)=>{
    socket.on('sendAnswerClient',data=>{
        console.log(typeof data)
        cb(null,data)
    })
}