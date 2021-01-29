import React, { useState, useEffect } from 'react'
import { useHistory , Route} from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import openNotification from '../element/openNotification'
import 'antd/dist/antd.css';
import '../../App.css';
let socket;
const Welcome = ()=>{
    useEffect(() => {
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('id')
    }, []);
    const history = useHistory();
    const handleEnter = (e)=>{
        let ten = e.target.value 
        if( ten.length >= 4 && ten.length <= 16){
            sessionStorage.setItem('name', ten);
            history.push('/main')
            // connectionSocket(ten,(err,data)=>{
            //     if(err) return;
            //     sessionStorage.setItem('id', data.id);
            //     sessionStorage.setItem('name', data.name);
            //     history.push('/main')
            // })
        }else{
            openNotification('warning','Lỗi rồi','Vui lòng nhập tên có từ 4 - 16 ký tự')
        }
    }
    return(
        <Route>
        <div className="App">
        <header className="App-header">
            <Row className="welcome-row">
                <Col span={24}> 
                    <h3 className="mt-4 text-font">Chào mừng bạn đến với Minigame</h3>
                </Col>
                <Col span={24}> 
                <Input
                    style={{height:"70px" , width:"500px"}}
                    placeholder="Enter your name"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                    onPressEnter={(e)=>handleEnter(e)}
                    className="mb-4"
                    />
                </Col>
            </Row>
        </header>
      </div>
      </Route>
    )
}
export default Welcome