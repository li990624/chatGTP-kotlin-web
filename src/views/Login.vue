<template>
    <div class="chat-wrapper">
        <div class="test">
            <div class="chat-container">
                <div class="chat-messages">
                    <div class="message-right">
                        {{ mess }}
                    </div>
                    <div class="message-left">
                        {{ message }}
                        <br/>
                        <div class="message-left">
                            {{ code }}
                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <el-input v-model="inputMessage" :rows="2" placeholder="请输入" type="textarea"/>
                    <el-button class="chat-button" style="height: 52px;" type="primary" @click="sendMessage">发送
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref,reactive} from 'vue';
import axios from 'axios'
import {ResponseMessage} from "@/entity/ResponseMessage1";
import Message1 from "@/entity/Message1";
import {v4 as uuidv4} from 'uuid';
import {getCurrentDateTime} from "../Ts/time";
import {Message} from "../entity/Message.Ts";

const message = ref('');
const code = ref('');




// 使用 reactive
const messages = reactive<Array<Message>>([
    new Message("","system"),
    new Message("","user"),
    new Message("","assistant")
]);


// const messages = ref([
//     {
//         content: "",
//         role: "system"
//     },{
//     content: "",
//     role: "user"
// }, {
//     content: "",
//     role: "assistant"
// }]);

 messages[0].content = "\\nYou are ChatGPT, a large language model trained by OpenAI.\\nKnowledge cutoff: 2021-09\\nCurrent model: gpt-3.5-turbo-0613\\nCurrent time: "+getCurrentDateTime()+"\\n"
let responseMessage = new ResponseMessage()
let qwe = {
    uid: localStorage.getItem("uid"),
    username: "qwe",
    responseMessage: [],
    content: "",
    role: ""
}

const inputMessage = ref('');
const eventSource = new EventSource('http://localhost:8080/api/chat/endpoint');
onMounted(() => {
    //在页面加载完成后重新建立 SSE 连接
    reconnectSSE();
    console.log("重新连接")
    if (localStorage.getItem("uid") == null) {
        let uid = uuidv4()
        localStorage.setItem("uid", uid)
    }
    const data = localStorage.getItem(String(1))
    console.log(data);
});
let flag = false
let numb = 0
const reconnectSSE = () => {
    eventSource.addEventListener('message', (event) => {
        const data = event.data;
        if (data.includes("DONE")) {
            messages.value.push({
                content: mess.value,
                role: "user"
            }, {
                content: message.value,
                role: "assistant"
            })
            let messagesJson = JSON.stringify(messages)
            localStorage.setItem('1', messagesJson); // 将数据存储到localStorage
            console.log("结束");
        } else {
            let jsonData = JSON.parse(data)
            console.log(localStorage.getItem("uid"))
            console.log(jsonData.uid)
            if (localStorage.getItem("uid") == jsonData.uid) {
                const pattern = /```([\s\S]*?)```/g;
                if (pattern == jsonData.content) {
                    numb++
                    flag = true
                    if (numb >= 2) {
                        flag = flag
                    }
                }
                if (flag) {
                    code.value = code.value + jsonData.content
                } else {
                    message.value = message.value + jsonData.content
                }
            }
        }
    });
    // 监听连接建立事件
    eventSource.onopen = function () {
        console.log('建立服务器连接!');
    };

}
let mess = ref('')
// 发送消息到后端
const sendMessage = () => {
    //点击的时候删除原来的对话
    mess.value = inputMessage.value
    const formData = new FormData()
    messages[1].content = inputMessage.value
    messages[2].content = message.value
    let data = messages.filter(it => it.content != null && it.content != "")
    qwe.responseMessage = data
    formData.

    ("message", new Blob([JSON.stringify(qwe)], {type: "application/json"}))
    message.value = ""//清除上一次显示的响应内容!
    if (inputMessage.value.trim() !== '') {
        inputMessage.value = '';//清除输入框
        axios.post("http://localhost:8080/api/chat/send", formData).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }
};
</script>

<style>
.chat-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.chat-container {
    width: 400px;
    height: 500px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* border: 1px solid; */
    margin: auto auto;
}

.test {
    width: 1000px;
    height: 700px;
    background-color: #e7f8ff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid;
}

.chat-messages {
    flex-grow: 1;
    overflow-y: auto;
}

.message {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
}

.message-right {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    text-align: right;
    background-color: #eaf2ff;
}

.message-left {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    text-align: left;
    background-color: #f5f5f5;
    overflow: hidden;
    text-overflow: ellipsis;

}

.chat-input {
    display: flex;
    align-items: center;
    margin-top: 10px;
}
</style>
  