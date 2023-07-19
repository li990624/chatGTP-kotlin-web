<template>
    <el-upload
        class="upload-demo"
        drag
        :auto-upload="false"
        multiple
        :on-change="liceFileIntoChunks"
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>
<script lang="ts" setup>
import {ref, UnwrapRef} from "vue";
import axios from "axios";

const chunks = ref([]);
const liceFileIntoChunks = (file:Blob,files:File) => {
    console.log(file)
    const fileSize: number = file.size;
    const chunkSize: number = 1024 * 1024; // 每个切片的大小，这里设置为1MB
    let start = 0;
    let end = chunkSize;
    let chunkIndex = 0;
    while (start < fileSize) {
        //let fileChunk = file.slice(start, end); // 切割文件
        let fileObject = {
           // fileChunk:fileChunk,
            index:chunkIndex
        }
        chunks.value.push(fileObject)
        start = end;
        end = start + chunkSize;
        chunkIndex++;
    }
    //切片完成之后
    chunks.value.forEach(itme=>{
        uploadChunk(itme)
    })
};
const uploadChunk = (chunk) => {
    // 发送每个切片到服务器
    const formData = new FormData();
    formData.append("chunk", chunk.fileChunk);
    formData.append("chunkIndex", chunk.index);
    formData.append("totalChunks", chunks.value.length.toString());
    // 发送切片数据到服务器
    // 使用axios或其他HTTP库发送请求
    axios
        .post("http://localhost:8001/file/upload", formData)
        .then((response) => {
            // 处理切片上传成功的响应
            console.log("处理切片上传成功的响应:",response)
        })
        .catch((error) => {
            // 处理切片上传失败的响应
            console.log("处理切片上传失败的响应",error)
        });
};
// const uploadChunks =() => {
//     // 将每个切片上传到服务器
//     this.chunks.forEach((chunk) => {
//         this.uploadChunk(chunk);
//     });
// }
</script>
