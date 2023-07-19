<template>
    <div class="tag">
        <el-button type="primary">文件上传</el-button>
        <el-button type="success">新建文件夹</el-button>
        <el-button type="danger">批量删除</el-button>
        <el-button type="warning" style="margin-right: 10px">批量移动</el-button>
        <el-input v-model="input4" class="w-50 m-2"  placeholder="输入文件名搜索" style="width: 250px;margin-right: 10px">
            <template #prefix>
                <el-icon class="el-input__icon"><search /></el-icon>
            </template>
        </el-input>
        <el-button type="primary" :icon="Edit" circle />
    </div>
  <div style="font-size: 13px;margin: 15px 0px">
      全部文件
  </div>
  <div style="width: 100%;height:100%;border: 1px solid yellow">
      <Without></Without>
  </div>
</template>

<script setup>

import {Edit} from "@element-plus/icons-vue";
import Without from "@/components/Without.vue";
</script>

<style scoped>
.tag{
    display: flex;
}
.tag el-button{
    margin-right: 10px;
    font-size: 14px;
    width: 81px;
    height: 32px;
    color: white;
}
.m-2{
    margin-right: 10px;
}
</style>