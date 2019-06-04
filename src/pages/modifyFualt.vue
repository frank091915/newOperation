<template>
<div>
  <div id="pageTitle">编辑故障</div>
  <div id="addRoleWrapper">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="故障名称"
      >
        <a-input
        style="width:290px;"
          v-decorator="[
          'name',
          {rules: [{ required: true,message:'请输入故障名称'}],
          initialValue:name
          }
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="备注"
      >
        <a-input
          type="textarea"
          style="width:290px;height:120px"
          v-decorator="[
          'remark',
          {rules: [{ required: true, message: '请输入备注' }],
          initialValue:remark}
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
      name: "",
      remark: ""
    };
  },
  methods: {
    toReturn() {
      this.$router.go("-1");
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.faultId = this.$route.query.fualtId;
          this.$http.toModifyFualt(values).then(res => {
            if (res.data.success) {
              this.$message.success("修改故障成功");
              this.$router.push({
                path: "/fault",
                query: { title: "故障管理" }
              });
            } else {
              this.$message.error(res.data.message);
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
  },
  created() {
    this.$http.toGetFualtInfo(this.$route.query.fualtId).then(res => {
      if (res.data.success) {
        this.name = res.data.data.name;
        this.remark = res.data.data.remark;
      } else {
        this.$message.error(res.data.message);
      }
    });
  }
};
</script>
<style scoped>
#pageTitle {
  padding-left: 69px;
  height: 50px;
  border-bottom: 1px solid #bdbdbd;
  line-height: 50px;
  font-weight: 600;
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
#radioText span {
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