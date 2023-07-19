//封装一个函数:获取一个结果:当前是什么时候
export const getTime = ():string =>{
    let message = ""
    let time = new Date().getHours()
    if (time <=9){
        message = "早上"
    }else if (time<=11){
        message = "上午"
    }else if (time<=12){
        message = "中午"
    } else if (time<=18){
        message = "下午"
    }else {
        message = "晚上"
    }
    return message
}

export interface user {
    id:number,
    username:string,
    password:string
    age?:number  //?:表示这个属性可以为空
}
class User {
    name:string;

    constructor(name) {
        this.name = name
    }

    get getName(): string {
        return this.name;
    }
}