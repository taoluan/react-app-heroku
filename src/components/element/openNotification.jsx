import { Button, notification, Space } from 'antd';

const openNotification = (type,message,descriptons)=>{
    notification[type]({
        message: message,
        description:
        descriptons,
      });
}
export default openNotification