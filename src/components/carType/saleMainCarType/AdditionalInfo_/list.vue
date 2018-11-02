<template>
<div class="row">
<div class="col-md-12">
<div class="portlet box">
<div class="portlet-body">
    <div class="bootstrap-table bordered">
        <div class="fixed-table-toolbar">
            <div class="columns columns-right margin-bottom-10">
                <button class="btn btn-primary" title="新增" @click="add">新增</button>
                <button class="btn btn-success" title="保存" @click="save">保存</button>
            </div>
        </div>
        <div class="table-container">
            <div class="fixed-table-body height-550 table-scrollable">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    fixed
                    prop="date"
                    label="日期"
                    width="150"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="province"
                    label="省份"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="市区"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="zip"
                    label="邮编"
                    width="100">
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</template>

<script>
import api from "../../../common/api.js"
import commonConfig from "../../../common/commonConfig.js"
import { Toast } from 'mint-ui'

import Vue from 'vue'
import { TableColumn, Table } from 'element-ui'
Vue.use(TableColumn)
Vue.use(Table)


const REQUIRED = '信息未填写完整!',
      REPEAT   = '数据重复, 请重新填写!',
      MAX_NUMS_TITLE = '最多添加10调数据!',
      MAX_NUMS = 10,
      MAX_PAGENUMS = 100,
      SUCCESS = '提交成功' 

export default {
    data() {
        return {
            carList: [],      // 表头车型
            propsList: [],    // 车型附加信息
            addList: [],      // 添加列表
            addItem: {},
            count: 1,
            carCode: JSON.parse(sessionStorage.getItem("AdditionalInfo")).carCode,
            isInsert: true,

            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }]
        }
    },
    mounted() {
        
    },
    methods: {
        add() {},
        save() {},
    },
}
</script>

