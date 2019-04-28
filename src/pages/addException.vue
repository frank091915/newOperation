<template>
  <div id="addRoleWrapper">
      <div id="pageTitle">
          新增异常
      </div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="异常code"
      >
        <a-input
          v-decorator="[
          'code',
          {rules: [{ required: true,message:'请输入异常code'}]}
        ]"
        />
      </a-form-item>
      <div style="margin-bottom:20px;;margin-top:30px">
        <span style="margin-left:130px">异常类型 ：</span>
        <a-radio-group @change="onChange" v-model="type" style="margin-left:10px">
          <a-radio :value="1">汇聚机房异常</a-radio>
          <a-radio :value="2">弱电间异常</a-radio>
        </a-radio-group>
      </div>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="备注"
      >
        <a-input
        type="textarea"
          v-decorator="[
          'remark',
          
          {rules: [{ required: true, message: '请输入备注' }]}
        ]"
        />
      </a-form-item>
      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <div id="opetarionBox">
          <a-button @click="toReturn">返回</a-button>
          <a-button type="primary" @click="toSave">保存</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 2 }
};
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      value: 1,
      roleName: "",
      type:1,
      code:""
    };
  },
  methods: {
    onChange (e) {
      this.type=e.target.value
      console.log(e.target.value)
    },
    toReturn() {
      console.log("return");
      this.$router.go("-1");
    },

    toSave() {
      this.form.validateFields((err, values) => {
        console.log(values)
        values.type=this.type;
        if (!err) {
          this.$http.toAddException(values).then(res => {
            console.log(res);
            if (res.data.success) {
              this.$message.success("添加异常成功");
              this.$router.push({
                path: "/exception",
                query: { title: "异常管理" }
              });
            } else {
              this.$message.error(res.data.errorInfo);
            }
          });
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    }
  }
};
</script>
<style scoped>
#pageTitle{
    margin-left: 52px;
}
#radioBox {
  box-sizing: border-box;
  padding-left: 230px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
#radioText {
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.85);
}
#radioText span{
    margin-left: 2px;
}
#addRoleWrapper {
  margin-top: 20px;
}
.ant-form-item {
  margin-bottom: 20px !important;
}
#opetarionBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 358px;
  box-sizing: border-box;
  padding-left: 145px;
}
</style>