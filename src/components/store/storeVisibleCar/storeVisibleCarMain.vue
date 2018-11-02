<template>
    <div>
        <!--查询部分-->
        <div class="row margin-top-20">
            <div class="col-md-12">
                <div class="portlet box">
                    <div class="portlet-body form">
                        <!--FORM BEGIN-->
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">选择经销商店</label>
                                            <div class="col-md-8">
                                                <areaqueryshop ref="areaqueryshop" @sales-data="salesdata" @select-change="selectedfun"></areaqueryshop>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">品牌</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="queryData.brandName" @keyup.enter="queryInfo(1)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-default" @click="reset()">重置</button>
                                        <button type="button" class="btn btn-primary" @click="queryInfo(1)">查询</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <!--FORM END-->
                    </div>
                </div>
            </div>
        </div>
        <!--列表部分-->
        <div class="portlet box">
            <div class="portlet-body">
                <div class="bootstrap-table bordered">
                    <div class="fixed-table-toolbar">
                        <div class="columns columns-right margin-bottom-10">
                            <button class="btn btn-primary" @click="change('add', '#more')">新增</button>
                            <button class="btn btn-success" @click="change('edit', '#more')">编辑</button>
                        </div>
                    </div>
                    <div class="table-container bordered">
                        <div class="fixed-table-body height-550 table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center">序列</th>
                                        <th class="text-center">门店名称</th>
                                        <th class="text-center">厂商</th>
                                        <th class="text-center">品牌</th>
                                        <th class="text-center">车系</th>
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in storeCarData" :key="index">
                                        <td class="text-center"><input type="radio" name="dictionaryDetails" v-model="selitem" :value="item.storeCarCode"></td>
                                        <td>{{index + startRow}}</td>
                                        <td>{{item.storeName}}</td>
                                        <td>{{item.factoryName}}</td>
                                        <td>{{item.brandName}}</td>
                                        <td>{{item.seriesName}}</td>
                                        <td class="text-center">{{item.isDeleted == '0'?"可用":"停用"}}</td>
                                    </tr>
                                    <tr v-if="storeCarData.length == 0">
                                        <td colspan="10">暂无数据...</td>
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
        <!--模态框-->
        <div class="modal fade" id="more" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-wide">
                <div class="modal-content carousel-inner">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                x
                            </button>
                        <h4 class="modal-title text-center" id="myModalLabel">
                            {{modelTatle}}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <h5>选择门店</h5>
                                        <div class="row">
                                            <div class="col-md-10">
                                                <div class="form-group">
                                                    <label class="control-label col-md-4">选择经销商店</label>
                                                    <div class="col-md-8">
                                                        <areaqueryshop ref="editareaqueryshop" @sales-data="salesdata" @select-change="selectedfun"></areaqueryshop>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5>可见车辆</h5>
                                        <storecar :col="2" :flag="isShowFactory" :initData="intentionCarInfoVos[0]"  ref="car" @callBack="storeCar" @validete="validateCar"></storecar>
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">状态</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="edit.isDeleted">
                                                                <option value="0">可用</option>
                                                                <option value="1">停用</option>
                                                            </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 text-right">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>
                                        <button type="button" class="btn btn-primary" @click="type=='add'?addCar():editCar()">确定</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import api from "../../common/api.js"
    import common from "../../../assets/js/common.js"
    import commonConfig from "../../common/commonConfig.js"
    import pager from "../../common/pager/Pager"
    import Search from '../../common/search'
    import areaqueryshop from '../../common/iris-areaqueryshop'
    import storecar from '../../common/iris-car'
    import {
        Toast
    } from 'mint-ui'
    // import { Tree } from 'element-ui'
    // Vue.use(Tree);
    export default {
        data() {
            return {
                intentionCarInfoVos: [],
                tmp: null,
                selitem: '',
                modelTatle: "新增门店可见车型",
                queryData: {
                    storeCodeSet: [],
                    factoryName: '',
                    brandName: '',
                    seriesName: '',
                    pageNums: commonConfig.pageNums,
                },
                startRow: "", //每页第一行数据在数据库中的序号
                storeCarData: [], //查询的数据       
                editData: {}, //要编辑的数据
                type: '',
                //分页数据
                pager: {
                    page_no: 1, //当前页数
                    page_size: 15, //每页显示数
                    sort_name: 'id',
                    is_desc: false
                },
                total: 1, //总条数
                // storeOptions: [],
                storeData: {},
                edit: {
                    id: '',
                    isDeleted: '0',
                    storeCarCode: '', //门店对应车型信息编码
                    storeCode: '',
                    storeName: '',
                    factoryCode: '',
                    brandCode: '',
                    seriesCode: '',
                },
                isShowFactory:commonConfig.isShowFactory

            }
        },
        components: {
            pager,
            Search,
            areaqueryshop,
            storecar
        },
        mounted() {
        },
        methods: {
            storeCar(val) {

                for (let i in val) {
                    this.edit[i] = val[i]
                }
            },
            validateCar() {},
            salesdata(arg1) {
                
            },
            selectedfun(seles, storeInfo) {
                const $this = this
                if (this.type != '') {
                    $this.edit.storeCode = '';
                    $this.edit.storeName = '';
                    $this.edit.storeCode = storeInfo.value;
                    $this.edit.storeName = storeInfo.text;
                } else {
                    $this.edit.storeCode = '';
                    $this.edit.storeName = '';
                    $this.edit.storeCode = storeInfo.value;
                    $this.edit.storeName = storeInfo.text;
                    this.queryData.storeCodeSet = []
                    this.queryData.storeCodeSet.push(storeInfo.value)
                }
            },
            reset() {
                // this.queryData.factoryName = "";
                this.queryData.brandName = "";
            },
            queryInfo: function(pageNum) {
                this.selitem = ''
                this.queryData.pageStart = pageNum ? pageNum : this.pager.page_no
                api.store.queryStoreCarInfo(this.queryData)
                    .then((res) => {
                        if (res.data.code == "success") {
                            this.storeCarData = res.data.obj.list
                            this.startRow = res.data.obj.startRow
                            this.pager.page_no = res.data.obj.pageNum;
                            this.total = res.data.obj.total;
                            this.pager.page_size = res.data.obj.pageSize;
                        }
                    });
            },
            change: function(type, id) {
                const $this = this
                this.type = type
                this.modelTatle = '新增门店可见车型'
                $this.edit.factoryCode = ''
                $this.edit.brandCode = ''
                $this.edit.seriesCode = ''
                $this.edit.isDeleted = '0';
                this.$refs.car.clear()
                if (type == "edit") {
                    $this.modelTatle = '编辑门店可见车型';
                    $this.dealData()
                    if ($this.selitem) {
                        common.triggerModal(id)
                        
                        $this.$refs.car.setValue($this.editData)
                        for (let i in $this.edit) {
                            $this.edit[i] = $this.editData[i]
                        }
                        let obj = {
                            value: $this.editData.storeCode,
                            text: $this.editData.storeName
                        }
                        $this.$refs.editareaqueryshop.setselect(obj)
                    }
                } else {
                    common.triggerModal(id)
                    api.ordinalInfo.getSequence({
                            "serviceCode": commonConfig.ordinal.storeCarInfo
                        })
                        .then((res) => {
                            if (res.data.code == 'success') {
                                $this.edit.storeCarCode = res.data.obj
                            }
                        })
                }
            },
            addCar: function() {
                const $this = this //新增门店可见车型
                api.store.addEditStoreCarInfo([$this.edit])
                    .then((res) => {
                        if (res.data.code == "success") {
                            this.queryInfo()
                            $('#more').modal('hide')
                            Toast(commonConfig.success.add)
                        }
                    })
            },
            dealData: function() { //获取编辑数据
                const _this = this;
                if (!_this.selitem) {
                    Toast(commonConfig.prompt.checkData);
                    return;
                }
                for (var i = 0, len = _this.storeCarData.length; i < len; i++) {
                    if (_this.storeCarData[i].storeCarCode == _this.selitem) {
                        _this.editData = _this.storeCarData[i]
                    }
                }
            },
            editCar: function() { //编辑门店可见车型
                const $this = this
                $this.edit.storeCode = $this.editData.storeCode
                api.store.addEditStoreCarInfo([$this.edit])
                    .then((res) => {
                        if (res.data.code == "success") {
                            this.queryInfo()
                            $('#more').modal('hide')
                            Toast(commonConfig.success.edit)
                        }
                    })
            },
            pageChange: function(num, size) {
                this.pager.page_no = num;
                this.queryInfo();
            },
        },
        watch: {}
    }
</script>
<style>
    .tree {
        position: relative;
    }
    .tree-box {
        position: absolute;
        width: 100%;
        height: 190px;
        overflow: auto;
        z-index: 100;
        margin-top: 6px;
    }
</style>