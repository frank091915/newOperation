<template>
  <div id="main">
    <div id="searchBox">
      <div id="statusSearch">
        <div class="label">状态：</div>
        <div id="statusSearchInput">
          <a-select
            defaultValue="全部"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 200px"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :filterOption="filterOption"
          >
            <a-select-option value="jack">全部</a-select-option>
            <a-select-option value="lucy">正常</a-select-option>
            <a-select-option value="tom">故障</a-select-option>
          </a-select>
        </div>
      </div>
      <div id="statusSearch">
        <div class="label">楼宇名称：</div>
        <div id="buildingSearchInput">
          <a-select
            defaultValue="检测中心"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 200px"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :filterOption="filterOption"
          >
            <a-select-option value="jack">全部</a-select-option>
            <a-select-option value="lucy">检测中心</a-select-option>
          </a-select>
        </div>
      </div>
      <div id="searchByNames">
        <div id="searchByNamesLabel">名称：</div>
        <div id="searchByNamesInput">
          <a-input placeholder="请输入POS机名称"/>
          <a-button type="primary">搜索</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table 
      :columns="columns" 
      :dataSource="data"
      :pagination="false"
      bordered>
        <template
          v-for="col in ['name', 'age', 'address']"
          :slot="col"
          slot-scope="text, record, index"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0;padding:10px !important"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{text}}</template>
          </div>
        </template>

      </a-table>
    </div>
  </div>
</template>
<script>

const columns = [
  {
    title: "序号",
    dataIndex: "_id",
    width: "10%",
    scopedSlots: { customRender: "_id" }
  },
  {
    title: "状态",
    dataIndex: "status",
    width: "10%",
    scopedSlots: { customRender: "age" }
  },
  {
    title: "pos机名称",
    dataIndex: "Description",
    width: "15%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "型号",
    dataIndex: "modelNumber",
    width: "10%",
    scopedSlots: { customRender: "address" }
  },
   {
    title: "楼宇名称",
    dataIndex: "buildingName",
    width: "10%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "楼层",
    dataIndex: "floorNumber",
    width: "10%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "房间",
    dataIndex: "roomNumber",
    width: "10%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "编号",
    dataIndex: "Code",
    width: "10%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "ip地址",
    dataIndex: "SerialNumber",
    width: "10%",
    scopedSlots: { customRender: "SerialNumber" }
  },
  {
    title: "备注",
    dataIndex: "remarks",
    width: "10%",
    scopedSlots: { customRender: "address" }
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}

export default {
  name: "posMechine",
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data:[],
      columns,
      recordsTotal:""
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  },
  created() {
    this.$http.toGetPosMechineList(1).then(res => {
      console.log(res);
      var i=0;
      if(res.data.success){
        this.data=res.data.data.filter((res)=>{
          res["key"]=i++;
          return true
        })
        this.recordsTotal=res.data.recordsTotal
        this.$nextTick(()=>{
          console.log(this.data)
        })
      }
    });
  }
};
</script>
<style scoped>
html{
  height: 100%;
}
body{
  height: 100%;
}
#main{
  height: calc(100% - 50px);
}
#frame{
  height: 100%;
}
#searchBox {
  height: 50px;
  width: 880px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#statusSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#searchByNames {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#searchByNamesInput {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.ant-table-row td{
  background-color: aqua;
  padding:10px !important;
}
#tableWrapper{
  height: calc(100% - 100px);
  overflow: auto;
}
</style>
