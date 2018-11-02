<template>
    <div class="row">
        <div class="col-md-12">
            <div class="portlet box">
                <div class="portlet-body">
                    <div class="bootstrap-table bordered">
                        <div class="fixed-table-toolbar">
                            <div class="columns columns-left pull-left margin-left-10 margin-bottom-10">
                                <button class="btn btn-primary" title="新增" @click="showAddModal()">新增</button>
                                <button class="btn btn-success" title="编辑" @click="showUpdateModal()">编辑</button>
                            </div>
                            <div class="columns columns-right pull-right margin-bottom-10">
                                <button class="btn btn-warning" title="同步数据" @click="initAllMenuCache()">同步数据</button>
                            </div>
                        </div>
                        <div class="table-container">
                            <div class="fixed-table-body height-550 table-scrollable">
                                <table class="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>选择</th>
                                            <th v-for="column in columns">
                                                {{ column }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, index) in tableData.rows">
                                            <td><input type="radio" name="selectedColumn" v-model="selectedColumn" :value="index" /></td>
                                            <td>
                                                {{ row.menuCode }}
                                            </td>
                                            <td>
                                                {{ row.menuName }}
                                            </td>
                                            <td>
                                                {{ row.menuPath }}
                                            </td>
                                            <td>
                                                {{ row.needLogin | switchNeedLogin }}
                                            </td>
                                            <td>
                                                {{ row.isDisplay | switchIsDisplay }}
                                            </td>
                                            <td>
                                                {{ row.isDeleted | switchIsDeleted }}
                                            </td>
                                            <td>
                                                {{ row.remark }}
                                            </td>
                                        </tr>
                                        <tr v-if="tableData.rows.length === 0">
                                            <td colspan="11">暂无数据...</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <pager class="margin-left-10" @page-change="pageChange" :page-no="pager.page_no" :page-size="pager.page_size" :total-result="total">
                            </pager>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pager from '../common/pager/Pager.vue'
    import config from '../common/commonConfig.js'
    import common from "../../assets/js/common.js"
    import api from '../common/api.js'
    import bus from '../common/public.js'
    import {
        Toast
    } from 'mint-ui'
    export default {
        mounted: function() {
            let _this = this
            bus.$on('refresh-data', function() {
                _this.queryAllMenus()
            })
        },
        data: function() {
            return {
                selectedColumn: -1,
                columns: [
                    '菜单编码',
                    '菜单名称',
                    '菜单路径',
                    '是否需要登录',
                    '是否可见',
                    '是否可用',
                    '备注'
                ],
                tableData: {
                    rows: []
                },
                pager: {
                    page_no: 1, // 当前第几页
                    page_size: 15 // 每页多少条数据
                },
                total: 0 // 共有多少条数据
            }
        },
        props: {
            condition: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        methods: {
            pageChange: function(num, pageSize) {
                // num: 分页查询第几页
                // pageSize: 每页多少条数据
                this.condition.pageStart = num
            },
            showAddModal: function() {
                this.$emit('show-add-modal')
            },
            showUpdateModal: function() {
                if (parseInt(this.selectedColumn) == -1) {
                  			Toast(config.prompt.checkData);
                    return
                }
                let menu = this.$data.tableData.rows[parseInt(this.selectedColumn)]
                this.$emit('show-update-modal', menu)
            },
            queryAllMenus: function() {
                let _this = this
                let params = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        fatherMenuCode: '',
                        menuCode: '',
                        releationCodeList: '',
                        menuName: '',
                        menuPath: '',
                        needLogin: '0',
                        isDisplay: 1,
                        buttonType: '',
                        remark: '',
                        pageNums: 15,
                        pageStart: 1
                    })
                }
                api
                    .menu
                    .queryMenuInfo(params)
                    .then((res) => {
                        _this.tableData.rows = res.data.obj.list
                        _this.pager.page_no = res.data.obj.pageNum
                        _this.pager.page_size = res.data.obj.pageSize
                        _this.total = res.data.obj.total
                        _this.selectedColumn = -1
                    })
            },
            queryMenuInfo: function() {
                let _this = this
                let params = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(this.condition)
                }
                api
                    .menu
                    .queryMenuInfo(params)
                    .then((res) => {
                        _this.tableData.rows = res.data.obj.list
                        _this.pager.page_no = res.data.obj.pageNum
                        _this.pager.page_size = res.data.obj.pageSize
                        _this.total = res.data.obj.total
                        _this.selectedColumn = -1
                    })
            },
            initAllMenuCache: function() {
                let _this = this
                let params = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({})
                }
                api.menu
                    .initAllMenuCache(params)
                    .then((res) => {
                        if (res.data.code === 'success') {
                            Toast(config.success.cache)
                        }
                    })
            },
        },
        watch: {
            condition: {
                handler(newVal) {
                    this.queryMenuInfo()
                },
                deep: true
            }
        },
        components: {
            pager
        }
    }
</script>
