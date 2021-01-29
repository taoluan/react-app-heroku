import axiosClient from './AxiosClient'
const User = {
    test:()=>{
        const url = '/connect'
        return axiosClient.get(url)
    }
}
export default User