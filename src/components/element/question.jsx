import React, { useState, useEffect } from 'react'
import { Layout, Menu,Col ,Row,Typography} from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import logo from '../../assets/image/problem.png'
const { Title } = Typography;
const Question = (props)=>{
    const [count, setcount] = useState(15);
    useEffect(() => {
        count > 0 && setTimeout(() => setcount(count - 1), 1000);
        if(count === 0){
            props.timeout()
        }
    }, [count]);
    return(
        <Row style={{width:"100%" , justifyContent:"center",alignContent:"center" , marrgin:"0px",padding:"0px"}}  justify="space-around" align="middle">
            <Col span="24" >     
                <img src={logo} alt="" height="50" width="50"/>
            </Col>
            <Col span="24" > 
                <Title level={2} code style={{marginTop:"10px",marginBottom:"0px"}} className="text-font">{props.data}</Title>
                <Title level={5} keyboard style={{marginTop:"5px",marginBottom:"0px" , padding:"0px"}}>{count}</Title>
            </Col>
        </Row>
    )
}
export default Question