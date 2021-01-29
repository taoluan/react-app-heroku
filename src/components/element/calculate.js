class calculate {
    constructor(thamso1,thamso2){
        this.thamso1 = thamso1
        this.thamso2 = thamso2
    }
}
class Addition extends calculate{
    getResult(){
        return this.thamso1 + this.thamso2
    }
    showQuestion(){
        return `${this.thamso1} cộng ${this.thamso2} bằng bao nhiu ?`
    }
}
class Subtraction extends calculate{
    getResult(){
        return this.thamso1 - this.thamso2
    }
    showQuestion(){
        return `${this.thamso1} trừ ${this.thamso2} bằng bao nhiu ?`
    }
}
class Multiplication extends calculate{
    getResult(){
        return this.thamso1 * this.thamso2
    }
    showQuestion(){
        return `${this.thamso1} nhân ${this.thamso2} bằng bao nhiu ?`
    }
}
class Division extends calculate{
    getResult(){
        let kq = Math.floor(this.thamso1 / this.thamso2)
        return kq
    }
    showQuestion(){
        return `${this.thamso1} chia ${this.thamso2} bao nhiu ?`
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {Division,Multiplication,Subtraction,Addition}