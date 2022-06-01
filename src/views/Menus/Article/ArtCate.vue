<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addVisible = true"
          >添加分类</el-button
        >
      </div>

      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <el-table-column label="操作">
          <!-- row 每条数据的信息 -->
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(row.id)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="remove(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加文章分类"
      @closed="$refs.addFormRef.resetFields()"
      :visible.sync="addVisible"
      width="35%"
    >
      <el-form
        :model="addForm"
        label-width="70px"
        :rules="addFormRules"
        ref="addFormRef"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 关闭对话框时重置表单 -->
    
    <!-- 修改分类的对话框 -->
    <!-- 修改的表单 -->
    <el-dialog
      title="修改文章分类"
      @closed="$refs.editFormRef.resetFields()"
      :visible.sync="editVisible"
      width="35%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="editForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="editForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 添加表单数据对象
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 添加验证规则
      addFormRules: {
        cate_name: [
          { required: true, message: '分类名称不能为空!', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10位的非空字符！', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '分类别名不能为空!', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字！！', trigger: 'blur' }
        ]
      },
      editForm: {
        // 文章修改的数据
        cate_name: '',
        cate_alias: ''
      },
      cateList: [],
      // 显示隐藏添加分类对话框
      addVisible: false,
      // 显示隐藏修改分类对话框
      editVisible: false
    }
  },
  name: 'ArtCate',
  methods: {
    // 获取文章列表数据
    async initArtCateList () {
      const { data: res } = await this.$http.get('/my/cate/list')
      if (res.code === 0) {
        this.cateList = res.data
      }
    },
    addCate () {
      // 表单预校验
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return // 未通过校验
        const { data: res } = await this.$http.post('/my/cate/add', this.addForm)
        if (res.code === 0) {
          // 通过校验,关闭对话框,重新请求列表数据
          this.addVisible = false
          this.initArtCateList()
          this.$message.success(res.message)
        }
      })
    },
    editCate () {
      // 注册事件 + 表单验证 + 发送请求 + 关闭对话框 + 刷新列表
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('/my/cate/info', this.editForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.editVisible = false
        this.initArtCateList()
      })
    },
    async showEditDialog (id) {
      // 获取分类信息
      const { data: res } = await this.$http.get('/my/cate/info', {
        params: {
          id
        }
      }
      )
      if (res.code === 0) {
        this.editForm = res.data
        // 展示对话框
        this.editVisible = true
      }
    },
    // 删除分类 注册事件处理函数 + 询问对话框 + 发送请求 + 刷新列表
    async remove (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除对应的分类
        const { data: res } = await this.$http.delete('/my/cate/del', {
          params: {
            id
          }
        })
        if (res.code !== 0) return this.$message.error('删除文章分类失败')
        this.$message.success('删除文章分类成功')
        this.editVisible = false
        this.initArtCateList()

      }).catch(err => err)

    }
  },
  created() {
    this.initArtCateList()
  }
  
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
