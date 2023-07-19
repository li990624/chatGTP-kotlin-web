import {defineStore} from "pinia";
import {ref} from 'vue'


export const useStore =  defineStore('userInfo',()=>{
    let test = ref(`测试`)
    //必须要返回一个对象:属性与方法可以提供给组件用
    return {
        test,
        updata(data){//这是定义了一个修改方法






            
            test.value = data
        }
    }
})