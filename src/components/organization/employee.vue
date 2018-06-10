<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户姓名">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="归属组织">
              <el-popover
                  placement="bottom"
                  width="400"
                  trigger="click"
                   @after-enter="toFetchMenu">
                <el-form-item label="组织名称" class="inp"  >
                      <el-input class="search" v-model="abc"></el-input>
                    <el-button type="primary" @click="filterItem=abc">查询</el-button>
    
              </el-form-item>
              <el-table  :data="filterMenu()(filterItem)" height="300"  v-loading="flag">
                  <el-table-column width="100" type="index" label="序号"></el-table-column>
                  <el-table-column width="150" property="ORGNAME" label="组织部名称"></el-table-column>
                  <el-table-column width="300" property="FORGNAME" label="上级组织"></el-table-column>
              </el-table>
        
        <el-button slot="reference" class="btn"></el-button>
          </el-popover>

        </el-form-item>
      
    
      </el-form>
      
      <el-table  :data="tabelList"   border  style="width: 100%" size="small">
     <el-table-column fixed type="index"></el-table-column>
    
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column   prop="code" label="员工ID"  width="120"></el-table-column>
      <el-table-column   prop="code"  label="员工编号" width="120"></el-table-column>
      <el-table-column prop="phone"  label="电话号码" width="160"></el-table-column>
      <el-table-column   :show-overflow-tooltip="true" prop="email"  label="邮箱" width="120"></el-table-column>
      <el-table-column   prop="org"  label="归属组织" width="120"></el-table-column>
      <el-table-column  :show-overflow-tooltip="true" prop="forg"  label="上级组织" width="120"></el-table-column>
      <el-table-column   fixed="right"  label="操作"  width="100"> <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button  @click="removeClick(scope.row)" type="text" size="small" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 
<el-pagination style="display:inline-block" :page-size="count" @current-change="pageChange" background  layout="prev, pager, next"  :total="table.length">

</el-pagination>
  <el-button type="primary" size="small" style="float:right" @click="showdialog">添加</el-button>

 <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
  <el-form :model="form" ref="ruleForm" :rules="rules2" :inline="true" size="small" label-position="right">
    <el-form-item label="员工姓名" label-width="80" prop="name">
      <el-input v-model="form.name" auto-complete="off" ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="80" style="padding-left:42px"  prop="email">
      <el-input v-model="form.email" auto-complete="off" ></el-input>
    </el-form-item>
    <el-form-item label="身份证号" label-width="60">
      <el-select v-model="form.code" placeholder="请选择活动区域">
        <el-option label="身份证" value="shanghai"></el-option>
        <el-option label="学生证" value="beijing"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="在职状态" label-width="80">
      <el-input v-model="form.code" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="人员状态" label-width="60">
      <el-select v-model="form.code" placeholder="请选择活动区域">
        <el-option label="在职" value="shanghai"></el-option>
        <el-option label="离职" value="beijing"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="员工编号"  label-width="80">
      <el-input v-model="form.code" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="归属组织" label-width="60">
      <el-select v-model="form.org" placeholder="请选择活动区域">
        <el-option label="身份证" value="shanghai"></el-option>
        <el-option label="学生证" value="beijing"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="归属组织"  label-width="80">
      <el-input v-model="form.forg" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureAdd">确 定</el-button>
  </div>
</el-dialog>
</div>




 
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    let validator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        }
    }
    return {
      formInline: {
        user: "",
        region: ""
      },
      rules2:{
          name:[
            {required: true,validator,message:"请输入姓名", trigger: 'blur'},
               {type:"string"}
          ],
          email:[
             {required: true, validator,  message: '请输入邮箱地址', trigger: 'blur'},
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
      },

      tableData: [],
      ableData3: [],
      filterItem: "",
      abc: "",
      count: 5,
      initPage: 1,
      flag: true,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        phone: "",
        code: "",
        email: "",
        org:"",
        forg: "",   
      }
    };
  },
  computed: {
    ...mapState(["table", "menu"]),

    tabelList() {
      let page = this.table.slice(
        this.count * (this.initPage - 1),
        this.initPage * this.count
      );
      return page;
    }
  },
  methods: {
    ...mapActions(["fetchTableMenu", "fetchTableList","removeItem"]),
    ...mapGetters(["filterMenu"]),
    toFetchMenu() {
      this.flag = true;
      console.log("toFetchMenu");
      this.fetchTableMenu(() => {
        this.flag = false;
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.form = row
      console.log(row);
    },
    pageChange(page) {
      this.initPage = page;
    },
    showdialog() {
      this.form =  {
        name: "",
        phone: "",
        code: "",
        email: "",
        org:"",
        forg: "",   
      }
      this.dialogFormVisible = true;
    },
    sureAdd(){
         this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
             this.dialogFormVisible = false;
          } else {
            console.log('1')
            
          }
        });
    },
    removeClick(row){
    
        this.$alert('你确定要删除这个人吗?','提示',{
          callback:()=>{
                this.removeItem(row)
          } 
        })
    }
  },

  mounted() {
    this.filterMenu()();
    this.fetchTableList();
  }
};
</script>

<style scoped>
.btn {
  width: 200px;
  height: 40px;
}
.search {
  width: 200px;
}
</style>
