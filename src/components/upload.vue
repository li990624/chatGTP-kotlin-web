<template>
  <div>
    <input type="file" ref="files" />
    <button @click="uploadFile">上传</button>
    <progress v-if="showProgress" :value="uploadProgress" max="100"></progress>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const files = ref(null);

const uploadFile = () => {
  console.log(files.value);
  const chunkSize = 1024 * 1024; // 切片大小，这里设置为1MB
  const totalChunks = Math.ceil(files.file.size / chunkSize);
  let currentChunk = 0;

  const uploadChunk = () => {
    const start = currentChunk * chunkSize;
    const end = Math.min(this.file.size, start + chunkSize);
    const chunk = this.file.slice(start, end);

    // 创建FormData对象，用于发送切片数据
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("fileName", this.file.name);
    formData.append("chunkNumber", currentChunk + 1);

    // 发送切片上传请求
    axios
      .post("/api/files/upload-chunk", formData)
      .then(() => {
        // 切片上传成功后，更新进度
        this.uploadProgress = Math.round(
          ((currentChunk + 1) / totalChunks) * 100
        );

        currentChunk++;
        if (currentChunk < totalChunks) {
          // 继续上传下一个切片
          uploadChunk();
        } else {
          // 所有切片上传完成，合并切片
          mergeChunks();
        }
      })
      .catch((error) => {
        // 处理切片上传失败的情况
        console.error(error);
      });
    const mergeChunks = () => {
      const formData = new FormData();
      formData.append("fileName", this.file.name);
      formData.append("totalChunks", Math.ceil(this.file.size / (1024 * 1024)));

      // 发送切片合并请求
      axios
        .post("/api/files/merge-chunks", formData)
        .then(() => {
          // 切片合并成功后的处理逻辑
          console.log("切片合并成功");
        })
        .catch((error) => {
          // 处理切片合并失败的情况
          console.error(error);
        });
    };
  };
};
</script>

<style></style>
