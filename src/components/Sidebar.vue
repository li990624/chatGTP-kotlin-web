<template>
    <el-row>
        <el-col :span="11">
            <el-card class="box-card" style="height: 100%;box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);">
                <div v-for="item in list" :key="item" class="text item">
                    {{item}}
                    <div v-for="im in img" :key="im">
                        <img :src="im" alt="">
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="box-card" style="height: 100%">
              <div v-for="item in list2" :key="item" class="text item">
                  {{item}}
                  <div v-for="im in img" :key="im">
                      <img :src="im" alt="">
                  </div>
              </div>
            </el-card>
        </el-col>
    </el-row>

</template>

<script setup>
import { ref } from "vue"
  const list = ref([
    "首页",
    "分享",
    "回收站"
  ])
const list2 = ref([
    "全部",
    "视频",
    "音频",
    "图片",
    "文档",
    "其他"
])
  const img = ref([
    
  ])
   const index = ref(list.item)
  
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 28px 0;
}

.box-card {
  width: 83px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>