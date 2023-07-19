<template>
    <div class="chat-container">
        <div class="chat-messages">
            <div v-for="data in messages" :key="index" class="message" style="display: inline-block;">
                <el-input
                    v-model="message"
                    type="textarea"
                />
            </div>
        </div>
        <div class="chat-input">
            <el-input
                    v-model="message"
                    :rows="1"
                    placeholder="请输入!"
                    type="textarea"
            />
            <el-button class="chat-button" type="primary" @click="sendMessage">发送</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import {ref, watch, nextTick, onMounted} from 'vue';

const textareaWidth = ref(0);
const messages = ref([]);
const message = ref("");


const eventSource = new EventSource('http://localhost:8080/api/chat/endpoint');
onMounted(() => {
    //在页面加载完成后重新建立 SSE 连接
    reconnectSSE();
    console.log("重新连接")
});

const reconnectSSE = () => {
    eventSource.addEventListener('message', (event) => {
        const data = event.data;
        let codeBuffer = '';
        if (data.startsWith('```')) {
            // 开始代码块
            codeBuffer = '';
        } else if (data.endsWith('```')) {
            // 结束代码块
            codeBuffer += data.substring(0, data.length - 3);
            messages.value.push({content: codeBuffer, isCode: true});
            codeBuffer = '';
        } else if (codeBuffer !== '') {
            // 在代码块中
            codeBuffer += data;
        } else {
            // 普通字符串
            messages.value.push({content: data, isCode: false});
        }
    });
    // 监听连接建立事件
    eventSource.onopen = function () {
        console.log('建立服务器连接!');
    };
    // 监听接收到消息事件
    eventSource.onmessage = function (event) {
        const data = event.data;
        console.log('Received message:', data);
    };
}

// 发送消息到后端
const sendMessage = () => {
    const formData = new FormData()
    const data = message.value;
    formData.append("data", data.toString())
    axios.post("http://localhost:8080/api/chat/send", formData).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })

}

</script>

<style scoped>
.chat-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.chat-messages {
    margin-bottom: 20px;
}

.message {
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 10px;
}

.chat-input {
    display: flex;
}

.chat-input input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
}

.chat-button {
    padding: 10px;
    font-size: 16px;
}
</style>