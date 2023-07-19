<template>
    <div class="nav">
        <div class="website-name">My网盘</div>
        <div class="nav-login">
            <div class="login-options">
                <a href="#" @click="login">下载列表</a>
            </div>
            <div class="avatar" >
                <el-dropdown>
                <span class="el-dropdown-link">
                  <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="Avatar" />
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>修改头像</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.nav {
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 0;
}

.website-name {
    font-size: 20px;
    font-weight: bold;
    margin-right: auto;
}

.nav-login {
    display: flex;
    align-items: center;
}

.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.login-options a,
.logout a {
    color: #333;
    text-decoration: none;
    font-weight: bold;
    margin-right: 10px;
}

.login-options a:hover,
.logout a:hover {
    background-color: #666;
    color: #fff;
}
</style>
