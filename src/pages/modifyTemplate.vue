<template>
<div>
  <div id="pageTitle">编辑模板</div>
  <div id="addRoleWrapper">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="模板名称"
      >
        <a-input
          v-decorator="[
          'name',
          {rules: [{ required: true,message:'请输入模板名称'}],initialValue:templateInfo.name}
          
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
          disabled="disabled"
          v-decorator="[
          'type',
          {rules: [{ required: true,message:'请选择模板类型'}],initialValue:templateInfo.type ? templateInfo.type : ''}
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
          disabled="disabled"
          v-decorator="[
          'exceptionId',
          {rules: [{ required: true,message:'请选择异常类型'}],initialValue:templateInfo.exceptionId ? templateInfo.exceptionId : ''}
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
          disabled="disabled"
          v-decorator="[
          'way',
          {rules: [{ required: true,message:'请选择通知方式'}],initialValue:templateInfo.way+'' ? templateInfo.way : ''}
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
        <a-input
          style="height:100px"
          type="textarea"
          v-decorator="[
          'content', {initialValue:templateInfo.content ? templateInfo.content : ''}
        ]"
        />
      </a-form-item>
      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <div id="opetarionBox">
          <a-button @click="toReturn" id="returnButton">返回</a-button>
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
      value: true,
      roleName: "",
      id: "",
      templateInfo: {},
      allExceptions: []
    };
  },
  methods: {
    toReturn() {
      this.$router.push({
                path: "/template",
                query: { title: "告警消息模板",menuIconId:8 }
              });
    },
    select(value) {
      console.log(value);
      this.roleIds = value;
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let templateInfo = { ...values };
          templateInfo.id = this.$route.query.id;
          this.$http.toModifyTemplate(templateInfo).then(res => {
            if (res.data.success) {
              this.$message.success("添加模板成功");
              this.$router.push({
                path: "/template",
                query: { title: "告警消息模板",menuIconId:8 }
              });
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    checkChange(e) {}
  },

  created() {
    this.$http.toGetTemplateById(this.$route.query.id).then(res => {
      if (res.data.success) {
        this.templateInfo = res.data.data;
        this.$nextTick(() => {
          console.log(this.templateInfo);
          if (this.templateInfo.type != "null") {
            console.log(this.templateInfo.type);
            this.$http
              .toGetAllExceptionList(this.templateInfo.type)
              .then(res => {
                if (res.data.success) {
                  this.allExceptions = res.data.data;
                  this.$nextTick(() => {
                    console.log(this.allExceptions);
                  });
                }
              });
          }
        });
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
  margin-bottom: 20px;
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
.ant-form-item {
  margin-bottom: 20px !important;
}
#permissionsMenu {
  margin-top: 20px;
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
#supremeWrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
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

#returnButton {
  margin-right: 50px;
}
#menuSelection {
  max-height: calc(100% - 49px);
  margin-left: 100px;
}

#components-layout-demo-side {
  min-height: 50px !important;
  border: 1px solid #e8e8e8;
}
#addRoleWrapper {
  margin-top: 30px;
  width: 880px;
  margin: 0 auto;
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
</style>