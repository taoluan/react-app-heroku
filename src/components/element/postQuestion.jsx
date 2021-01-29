import { Modal, Button } from 'antd';
import React, { useState, useEffect } from 'react'
import {searchKey} from '../../Socket'
import {
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Cascader,
    DatePicker,
    TreeSelect,
    Switch,
  } from 'antd';
import openNotification from './openNotification'
import Calculate from './calculate'
import {sendQuestionServer} from '../../Socket'
const PostQuestion = (props)=> {
    const [loading, setloading] = useState(false);
    const [calculate,setcalculate] = useState({
        thamso1: null,
        thamso2: null,
        pheptoan: null
    })
    const handleOk = () => {
        let thamso1 = calculate.thamso1, thamso2 = calculate.thamso2, pheptoan = calculate.pheptoan
        if(thamso1 && thamso2 && pheptoan && !isNaN(thamso1) && !isNaN(thamso2) && typeof pheptoan === "string" ){
            let question 
            if(pheptoan === "cong"){
                question = new Calculate.Addition(thamso1,thamso2)
            }else if(pheptoan === "tru"){
                question = new Calculate.Subtraction(thamso1,thamso2)
            }else if (pheptoan === "nhan"){
                question = new Calculate.Multiplication(thamso1,thamso2)
            }else{
                question = new Calculate.Division(thamso1,thamso2)
            }
            setloading(true)
            setTimeout(() => {
                sendQuestionServer({questions: question.showQuestion() , kq: question.getResult()})
                setloading(false)
                props.hiden()
            }, 3000);
        }else{
            openNotification('warning','Lỗi rồi','Vui lòng nhập đầy đủ thông tin !!!')
        }
    };
    const handleCancel = () => {
        searchKey({name: sessionStorage.getItem('name') , id:sessionStorage.getItem('id')})
        props.hiden()
    };
    return (
        <>
        <Modal
            visible={props.show}
            title="Đặt câu hỏi ? "
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                Submit
            </Button>,
            ]}
        >
            <Form
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
                
            >
                <Form.Item label="Tham số thứ 1 " >
                <InputNumber onChange={(value)=> value && setcalculate({...calculate,thamso1:value})}/>
                </Form.Item>
                <Form.Item label="Thâm số thứ 2 ">
                <InputNumber onChange={(value)=> value && setcalculate({...calculate,thamso2:value})}/>
                </Form.Item>
                <Form.Item label="Phép toán">
                <Select onChange={(value)=> value && setcalculate({...calculate,pheptoan:value})}>
                    <Select.Option value="cong">Cộng</Select.Option>
                    <Select.Option value="tru">Trừ</Select.Option>
                    <Select.Option value="nhan">Nhân</Select.Option>
                    <Select.Option value="chia">Chia</Select.Option>
                </Select>
                </Form.Item>
                {/* <Form.Item label="Kết quả: ">
                    <span>13</span>
                </Form.Item> */}
            </Form>
        </Modal>
        </>
    )
}

export default PostQuestion