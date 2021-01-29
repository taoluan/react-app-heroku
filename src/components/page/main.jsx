import React, { useState, useEffect } from 'react'
import {disconnectSocket,connectionSocket,getListUser,recKey,recQuestion,sendAnswer,sendAnswerClient} from '../../Socket'
import {Route , useHistory} from 'react-router-dom';
import '../../App.css';
import { Layout, Menu,Col ,Row,Typography} from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import Question from '../element/question'
import { Input, Tooltip } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import openNotification from '../element/openNotification'
import logo from '../../assets/image/problem.png'
import { Skeleton } from 'antd';
import calculate from '../element/calculate'
import PostQuestion from '../element/postQuestion'
const { Title } = Typography;

const Main = ()=>{
    const { Header, Footer, Sider, Content } = Layout;
    const [profile, setprofile] = useState({
      id : null,
      name :  sessionStorage.getItem('name'),
      point: 0
    });
    const [listUser, setlistUser] = useState([]);
    const [collapsed, setcollapsed] = useState(false);
    const [showQuestion, setshowQuestion] = useState(false);
    const [postQuestion, setpostQuestion] = useState(false)
    const [question,setquestion] = useState()
    const [showAnswer, setshowAnswer] = useState([]);
    const history = useHistory();
    const [disabled,setdisabled] = useState(false)
    useEffect(() => {
      if(profile.name !== null){
      connectionSocket(profile.name,(err,data)=>{
          if(err) return;
          sessionStorage.setItem('id', data.id)
          setprofile({...profile, id : sessionStorage.setItem('id', data.id)})
       })
      }else{
        history.push('/')
      }
      return () =>{
         disconnectSocket()
        //console.log('hallo')
      }
    }, [profile.name]);
    useEffect(() => {
      getListUser((err,data)=>{
        let arrTemp = []
        data.map(item=>{
          if(item.id !== profile.id && item.name !== profile.name){
            arrTemp.push(item)
          }else{
            arrTemp.push(item)
            setprofile({...profile,point: item.point})
          }
        })
        arrTemp = arrTemp.sort((a,b)=>b.point - a.point)
        setlistUser([...arrTemp])
      })
      recKey((err,data)=>{
        if(data){
          setpostQuestion(true)
        }
      })
      recQuestion((err,data)=>{
        setshowQuestion(true)
        setquestion(data.question)
        if(data.id !== sessionStorage.getItem('id')){
          setdisabled(true)
        }
      })
      sendAnswerClient((err,data)=>{
        setshowAnswer([])
        let arr = []
        for(let i = data.length-1 ; i >= 0 ; i--){
          arr.push(data[i])
        }
        setshowAnswer(arr)
      })
    }, []);
    // const handlePostQuestion = ()=>{
    // }
    const handelreply = (e)=>{
      let reply = Number(e.target.value)
      if(!isNaN(reply) && e.target.value !== ""){
        let data ={
          result : reply,
          name : profile.name
        }
        sendAnswer(data)
        e.target.value = ""
      }else{
        e.target.value = ""
        openNotification('warning','Lỗi rồi','Câu trả lời phải là một số !!!')
      }
      e.target.value = ""
    }
    const timeout = ()=>{
      setshowQuestion(false)
      // console.log("timeout.....")
      setdisabled(false)
      setshowAnswer([])
    }
    return(
      <Route>
         <div className="App container">
         <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width="300px">
          <div className="logo" >
            <p>{profile.name}</p>
            <span className="diemso">Điểm số:  <span style={{color:"red"}}>{profile.point}</span> </span>
          </div>
          <div className="list-user" >
            <span>Người tham gia | Điểm sô</span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
              listUser.length > 0
              &&
              (
                listUser.map((item,key)=>{
                  return(
                    <Menu.Item style={{fontSize:"18px"}} key={key} icon={<UserOutlined />}>
                    {item.name} | <span style={{color:"red"}}>{item.point}</span> 
                    </Menu.Item>
                  )
                })
              )
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            Mini Game
          </Header>
          <Content
            className="site-layout-background "
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {
              showQuestion
              ? (
                <Question timeout={timeout} data={question}/>
              )
              :(
                <Row style={{width:"100%" , justifyContent:"center",alignContent:"center" , marrgin:"0px",padding:"0px"}}  justify="space-around" align="middle">
                <Skeleton active />
                </Row>
              )
            }
            
            <Row style={{width:"100%" , backgroundColor:"#f0f0f0" , marginTop:"5px" ,height:"615px"}}  >
              <Col span="24" style={{height:"83%", overflow:"auto"}}> 
                { showAnswer.length > 0 
                  &&( showAnswer.map((item,key)=>{
                      if(item.id ===  sessionStorage.getItem('id')){
                        return (
                          <div key={key} className="outgoing_msg">
                            <div className="sent_msg">
                                <p>{item.result}</p>
                                {/* <span className="time_date"> 
                                    12:30 
                                </span> */}
                            </div>
                          </div>
                        )
                      }else{
                        return (
                           <div key={key} className="incoming_msg">
                              <div className="incoming_msg_img"> 
                                <img src={logo} height="20" width="20"/>
                              </div>
                              <div className="received_msg">
                                  <div className="received_withd_msg">
                                  <p>{item.result}</p>
                                      <span className="time_date">{item.name}</span>
                                  </div>
                              </div>
                            </div>
                        )
                      }
                    })
                )
              }
              </Col>
              <Col span="24" style={{height:"17%" ,  borderTop:"10px solid"}} justify="space-around" align="middle"  > 
            <Input
              style={{height:"70px" , width:"200px" , margin:"0px"}}
              placeholder="Nhập câu trả lời"
              disabled = {disabled ? false : true}
              // prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                  <Tooltip title="Extra information">
                  <CommentOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
              }
              onPressEnter={(e)=>handelreply(e)}
              />
            </Col>
            </Row>
              <PostQuestion show ={postQuestion} hiden={()=>setpostQuestion(false)}/>
          </Content>
        </Layout>
      </Layout>
        </div>
      </Route>

    )
}
export default Main