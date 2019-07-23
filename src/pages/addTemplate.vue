<template>
<div id="pageWrapper">
  <div id="addRoleWrapper">
    <a-form :form="form">
      <div class="firstInputRow"> 
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="模板名称"
            :colon="false"
            style="width:32%"
          >
            <a-input
              style="height:40px"
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
            :colon="false"
            style="width:32%"
          >
            <a-select
              showSearch
              optionFilterProp="children"
              @change="handleTemplateChange"
              size="large"
              v-decorator="[
              'type',
              {rules: [{ required: true,message:'请选择模板类型'}]}
            ]"
            >
              <a-select-option :value="1" :key="1">汇聚机房</a-select-option>
              <a-select-option :value="2" :key="2">弱电间</a-select-option>
            </a-select>
          </a-form-item>
      </div>
      
      <div class="secondInputRow"> 
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="异常类型"
            :colon="false"
            style="width:32%"
          >
            <a-select
              size="large"
              showSearch
              optionFilterProp="children"
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
            :colon="false"
            style="width:32%"
          >
            <a-select
              size="large"
              showSearch
              optionFilterProp="children"
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
        </div>

        <div class="textareaWrapper">
          <span class="textareaWrapperSpan">
            通知内容
          </span>
            <!-- <a-input style="height:120px" type="textarea" v-decorator="[
              'content'
            ]"/> -->
            <a-textarea style="height:220px;flex:1" v-model="informtion" />
        </div>

        <div id="opetarionBox">
          <a-button @click="toReturn" id="returnButton" style="width:190px;height:56px;border-radius:10px;border:none;box-shadow:3px 3px 10px #F2F2F2;font-size:18px">取消</a-button>
          <a-button type="primary" style="width:190px;height:56px;border-radius:10px;border:none;box-shadow:3px 3px 10px #DDE8FF;background-color:#4181FF;font-size:18px" @click="toSave">保存</a-button> 
        </div>
    </a-form>
  </div>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19}
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
      allExceptions: [],
      informtion:''
    };
  },
  methods: {
    toReturn() {
      this.$router.push({
                path: "/template",
                query: { title: "告警消息模板",menuIconId:8 }
              });
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.content=this.informtion;
          console.log(values,this.informtion);
          this.$http.toAddTemplate(values).then(res => {
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
#pageWrapper{
  height: calc(100vh - 91px);
  width:calc(100vw - 300px);
  background-color: #fff;
  box-sizing: border-box;
  margin: 10px 20px 20px 20px;
  border-radius: 8px;
  overflow: auto;
}
#pageTitle {
  padding-left: 69px;
  height: 50px;
  border-bottom: 1px solid #bdbdbd;
  line-height: 50px;
  font-weight: 600;
  margin-bottom: 20px;
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
  width: 98%;
  margin: 0 auto;
}
.ant-form-item {
  margin-bottom: 20px !important;
}
#opetarionBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 200px;
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
.firstInputRow{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
}
.secondInputRow{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

}
.textareaWrapper{
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.textareaWrapperSpan{
  display: inline-block;
  width:calc(100% * 0.32 / 24 * 5);
  box-sizing: border-box;
  padding-left: 8px;
  color: rgba(0, 0, 0, 0.85);
}
</style>