<template>
  <div id="addRoleWrapper">
    <div id="pageTitle">新增模板</div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="模板名称"
      >
        <a-input
          v-decorator="[
          'name',
          {rules: [{ required: true,message:'请输入模板名称'}]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="模板类型"
      >
        <a-select
          showSearch
          placeholder="模板类型"
          optionFilterProp="children"
          style="width: 218px"
          @change="handleTemplateChange"
          v-decorator="[
          'type',
          {rules: [{ required: true,message:'请选择模板类型'}]}
        ]"
        >
          <a-select-option :value="1" :key="1">汇聚机房</a-select-option>
          <a-select-option :value="2" :key="2">弱电间</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="异常类型"
      >
        <a-select
          showSearch
          placeholder="异常类型"
          optionFilterProp="children"
          style="width: 218px"
          v-decorator="[
          'exceptionId',
          {rules: [{ required: true,message:'请选择异常类型'}]}
        ]"
        >
          <a-select-option
            v-for=" item in allExceptions"
            :value="item.id"
            :key="item.id"
          >{{item.remark}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="通知方式"
      >
        <a-select
          showSearch
          placeholder="通知方式"
          optionFilterProp="children"
          style="width: 218px"
          v-decorator="[
          'way',
          {rules: [{ required: true,message:'请选择通知方式'}]}
        ]"
        >
          <a-select-option :value="0" :key="0">通用</a-select-option>
          <a-select-option :value="1" :key="1">邮件</a-select-option>
          <a-select-option :value="2" :key="2">短信</a-select-option>
          <a-select-option :value="3" :key="3">微信</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="通知内容"
      >
        <a-input type="textarea" v-decorator="[
          'content'
        ]"/>
      </a-form-item>

      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <div id="opetarionBox">
          <a-button @click="toReturn" id="returnButton">返回</a-button>
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
  labelCol: { span: 4 },
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
      allExceptions: []
    };
  },
  methods: {
    toReturn() {
      this.$router.go("-1");
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.$http.toAddTemplate(values).then(res => {
            if (res.data.success) {
              this.$message.success("添加模板成功");
              this.$router.push({
                path: "/template",
                query: { title: "告警消息模板" }
              });
            } else {
              this.$message.error(res.data.errorInfo);
            }
          });
        }
      });
    },

    handleTemplateChange(e) {
      this.exception = "全部";
      this.allExceptions = [];
      if (this.type != "null") {
        this.$http.toGetNoTemplateException(e).then(res => {
          if (res.data.success) {
            this.allExceptions = res.data.data;
            this.$nextTick(() => {});
          }
        });
      }
    },
    checkChange(e) {}
  },
  created() {}
};
</script>
<style scoped>
#pageTitle {
  margin-left: 52px;
}
#menuSelection {
  max-height: calc(100% - 49px);
}

#components-layout-demo-side {
  min-height: 50px !important;
  border: 1px solid #e8e8e8;
}

#radioBox {
  box-sizing: border-box;
  padding-left: 101px;
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
  width: 880px;
  margin: 0 auto;
}
.ant-form-item {
  margin-bottom: 20px !important;
}
#opetarionBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 358px;
  box-sizing: border-box;
  padding-left: 70px;
}
#permissionsMenu {
  margin-top: 20px;
}
#permissionsMenuTitle {
  margin-bottom: 2px;
}
#returnButton {
  margin-right: 50px;
}
</style>