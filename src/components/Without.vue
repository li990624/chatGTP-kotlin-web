<template>
    <div style="width: 340px;height: 369px;border: 1px solid whitesmoke;margin: auto;align-items: center;">
        <div style="margin-right: 30px;width: 120px;margin: auto">
            <el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
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
<!--            <img src="http://easypan.wuhancoder.com/assets/no_data-8d6fee09.png"-->
<!--                 style="width: 120px;height: 120px;margin: auto"/>-->
        </div>
        <span style="margin-left: 30px">
            当前目录为空，上传你的第一个文件吧
        </span>
        <div style="display: flex">
<!--            上传-->
            <div style="margin-left: 40px;margin-top: 30px">
                <div style="text-align: center;
  vertical-align: middle;">图片</div>
                <div>
                    <el-upload
                        v-model="data"
                        ref="uploadRef"
                        class="upload-demo"
                        action="http://localhost:8001/api/upload"
                        :on-change="change"
                        :show-file-list="true"
                        :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">上传文件</el-button>
                        </template>
                    </el-upload>
                </div>
            </div>
<!--            新建目录-->
            <div style="margin-left: 70px;margin-top: 30px">
                <div style="text-align: center;
  vertical-align: middle;">图片</div>
                <div>
                    <el-upload
                        ref="uploadRef"
                        class="upload-demo"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :auto-upload="false">
                        <template #trigger>
                            <el-button type="success">新建目录</el-button>
                        </template>
                    </el-upload>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from "axios";

const data = ref('')


const change = (file,uploadFiles) =>{
   //  console.log(file)
   //  const formData = new FormData();
   //  formData.append('file', file);
   // axios.post("http://localhost:8001/api/upload",formData.get(file)).then(data =>{
   //     console.log(data.code)
   // }).catch(error =>{
   //     console.log(error)
   // })
    console.log(file)
    console.log(data.value)
}
</script>