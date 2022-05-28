<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img src="avatar" alt="" v-if="avatar">
      <img src="../../../assets/images/avatar.jpg" alt="" class="preview" v-else />
      <!-- 增加文件选择框 并隐藏 accept上传的类型 -->
      <input
        type="file"
        accept="image/*"
        style="display: none"
        ref="iptFile"
        @change="onFileChange"
      />
      <!-- 按钮区域 -->
      <div class="btn-box">
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
          >选择图片</el-button
        >
        <el-button
          type="success"
          icon="el-icon-upload"
          :disabled="avatar === ''"
          @click="uploadAvatar"
          >上传头像</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 模拟文件选择框的点击事件
    chooseImg () {
      this.$refs.iptFile.click()
    },
    onFileChange (e) {
      // console.log(e)
      const files = e.target.files
      if (files.length !== 0) {
        // 选择了图片
        console.log(files)
        // 创建FileReader对象
        const reader = new FileReader()
        // 调用readAsDataURL函数
        // readAsDataURL 方法会读取指定的 Blob 或 File 对象。
        /* 读取操作完成的时候，readyState 会变成已完成DONE，
        并触发 loadend (en-US) 事件，
        同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。 */
        reader.readAsDataURL(files[0])
        reader.addEventListener("load", function () {
          this.avatar = reader.result;
        }, false);
      } else {
        // 没有选择图片
        this.avatar=''
      }
    },
    async uploadAvatar () {
      const { data: res } = await this.$http.patch('/my/update/avatar',
        {
          avatar: this.avatar
        })
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
  width: 350px;
  height: 350px;
}
</style>
