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
                                            <label class="control-label col-md-4">门店编码:</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="storeCode" @keyup.enter="getTableList()" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">门店名称:</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="storeName" @keyup.enter="getTableList()" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <button type="button" class="btn btn-default" @click="reset()">重置</button>
                                        <button type="button" class="btn btn-primary" @click="getTableList(1)">查询</button>
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
                            <button class="btn btn-primary" title="新增" type="button" @click="change('creted', '#storeInfo')">新增</button>
                            <button class="btn btn-success" title="更新" type="button" @click="change('edit', '#storeInfo')">编辑</button>
                            <button class="btn btn-warning pull-right" title="同步数据" @click="cache">同步数据</button>
                        </div>
                    </div>
                    <div class="table-container bordered">
                        <div class="fixed-table-body height-550 table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center">序列</th>
                                        <th class="text-center">门店编码</th>
                                        <th class="text-center">门店名称</th>
                                        <th class="text-center">门店地址</th>
                                        <th class="text-center">门店外部编码</th>
                                        <th class="text-center">联系人</th>
                                        <th class="text-center">联系电话</th>
                                        <!-- <th class="text-center">门店类型</th> -->
                                        <th class="text-center">日常营业时间</th>
                                        <th class="text-center">日常停业时间</th>
                                        <th class="text-center">线上是否可见</th>
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in tableList" :key="index">
                                        <td class="text-center"><input type="radio" name="dictionaryDetails" v-model="selitem" :value="item.storeCode"></td>
                                        <td>{{index + startRow}}</td>
                                        <td>{{item.storeCode}}</td>
                                        <td>{{item.storeName}}</td>
                                        <td>{{item.storeAddress}}</td>
                                        <td>{{item.externalCode}}</td>
                                        <td>{{item.contactPerson}}</td>
                                        <td>{{item.contactPhone}}</td>
                                        <!-- <td>{{item.storeType}}</td> -->
                                        <td>{{item.businessStartTime}}</td>
                                        <td>{{item.businessEndTime}}</td>
                                        <td>{{item.displayOnline == "0"?"不可见":"可见"}}</td>
                                        <td class="text-center">{{item.isDeleted == '0'?"可用":"停用"}}</td>
                                    </tr>
                                    <!-- .slice(10,16) -->
                                    <tr v-if="tableList.length == '0'">
                                        <td colspan="26">暂无数据...</td>
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
        <!--新增/编辑模态框-->
        <div class="modal fade" id="storeInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-full">
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
                                    <!--树结构-->
                                    <div class="col-md-4 tree-height">
                                        <ZTree ref='tree' :treeData="treeData" :options="options" @node-click="addClick" :key="2" @root-click="getRootAdd" :treeRootCode="treeRootCode" :treeName="treeName">
                                        </ZTree>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="row">
                                            <h4>主档信息</h4>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">行政区域</label>
                                                    <div class="col-xs-7">
                                                        <!-- <input class="form-control" type="text" v-model="edit.chinaCityCode" @click="getOrgCode('area')"/> -->
                                                        <input class="form-control" type="text" v-model="edit.chinaCityName" @click="getOrgCode('chinaCityCode')" readonly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">销售区域 *</label>
                                                    <div class="col-xs-7">
                                                        <!-- <input class="form-control" type="text" v-model="edit.salesCode" @click="getOrgCode('saleArea')"/> -->
                                                        <input class="form-control" type="text" v-model="edit.salesName" @click="getOrgCode('salesCode')" readonly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">采购区域</label>
                                                    <div class="col-xs-7"> -->
                                                        <!-- <input class="form-control" type="text" v-model="edit.purchasingAreaCode" @click="getOrgCode('purchaseArea')"/> -->
                                                        <!-- <input class="form-control" type="text" v-model="edit.purchasingAreaName" @click="getOrgCode('purchasingAreaCode')" readonly/>
                                                    </div>
                                                </div>
                                            </div> -->
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">组织 *</label>
                                                    <div class="col-xs-7">
                                                        <!-- <input class="form-control" type="text" v-model="edit.orgCode" @click="getOrgCode('org')"/> -->
                                                        <input class="form-control" type="text" v-model="edit.orgName" @click="getOrgCode('orgCode')" readonly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="col-xs-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">门店编码</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="edit.storeCode" readonly/>
                                                        </div>
                                                    </div>
                                                </div> -->
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">门店名称 *</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.storeName" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">门店类型 *</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="edit.storeType">
                                                                                                        <option v-for="(item, index) in storeTypes" :value="item.refDetailCode" :key="index">{{item.refDetailName}}</option>
                                                                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">外部编码</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.externalCode" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">营业开始</label>
                                                    <div class="col-xs-7">
                                                        <!-- <datepicker v-model="edit.businessStartTime" language="ch" value.sync="12345"></datepicker> -->
                                                        <!-- <vue-timepicker v-model="startTime" hide-clear-button></vue-timepicker> -->
                                                        <!-- <vue-timepicker v-model="startTime" hide-clear-button></vue-timepicker> -->
                                                        <el-time-picker
                                                            v-model="value2"
                                                            @change="datechange(value2, 'start')"
                                                            placeholder="营业时间">
                                                        </el-time-picker>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">营业结束</label>
                                                    <div class="col-xs-7">
                                                        <!-- <datepicker v-model="edit.businessEndTime" language="ch" value.sync="12345"></datepicker> -->
                                                        <!-- <vue-timepicker v-model="endTime"></vue-timepicker> -->
                                                        <el-time-picker
                                                            v-model="value3"
                                                            @change="datechange(value3, 'end')"
                                                            placeholder="停业时间">
                                                        </el-time-picker>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">开业时间</label>
                                                    <div class="col-xs-7">
                                                        <datepicker v-model="edit.openHours" language="ch" value.sync="12345"></datepicker>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">门店缩写</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.storeAddrName" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">前缀</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.prefixValue" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">门店地址</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.storeAddress" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">门店经度</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.storeLocalX" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">门店纬度</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.storeLocalY" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">运营阶段</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.storeLifeType" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">联系人</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.contactPerson" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">联系电话</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.contactPhone" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">联系手机</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.contactMobile" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">传真号码</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.faxNumber" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">电子邮件</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="email" v-model="edit.email" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">备注</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.remark" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">是否可见</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="edit.displayOnline">
                                                            <option v-for="(item, index) in storeShow" :key="index" :value="item.value">{{item.text}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">状态</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="edit.isDeleted">
                                                            <option v-for="(item, index) in storeStatus" :key="index" :value="item.value">{{item.text}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <h4>附加信息</h4>
                                            <div class="col-xs-6" v-for="(item, index) in attachedInfo" :key="index">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">{{item.refDetailName}}</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" v-model="storeAddInfoMaps[item.refDetailName]" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-8"></div>
                                    <div class="col-xs-4 text-right">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>
                                        <button type="button" class="btn btn-primary" aria-hidden="true" @click="type =='edit'?editSubmit():addSubmit()">确定</button>
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
    import Vue from 'vue'
    import pager from "../../common/pager/Pager"
    import common from "../../../assets/js/common.js"
    import commonConfig from "../../common/commonConfig.js"
    import api from "../../common/api.js"
    import ZTree from "../../common/tree.vue"
    import datepicker from 'vue-date'
    import {Toast} from 'mint-ui'
    import {TimePicker, DatePicker} from 'element-ui'
    Vue.use(TimePicker)
    Vue.use(DatePicker)
    Vue.use(ZTree)
    export default {
        components: {
            'ZTree': ZTree,
            pager,
            datepicker,
            // TimePicker
        },
        data: function() {
            return {
                value2: '',
                value3: '',
                storeStatus: commonConfig.storeStatus,
                storeShow: commonConfig.storeShow,
                startTimeInfo: '',
                storeCode: "",
                storeName: "",
                storeType: "",
                edit: {
                    isDeleted: '0',
                    displayOnline: "1",
                    id: "",
                    storeCode: "",
                    externalCode: "",
                    storeName: "",
                    storeAddrName: "",
                    prefixValue: "",
                    storeType: "",
                    remark: "",
                    chinaCityCode: commonConfig.storeRoot.chinaCityCode,
                    chinaCityName: '',
                    orgCode: commonConfig.storeRoot.orgCode,
                    orgName: '',
                    salesCode: commonConfig.storeRoot.salesCode,
                    salesName: '',
                    purchasingAreaCode: commonConfig.storeRoot.purchasingAreaCode,
                    purchasingAreaName: '',
                    openHours: "",
                    businessStartTime: "",
                    businessEndTime: "",
                    storeLifeType: "",
                    contactPerson: "",
                    contactPhone: "",
                    contactMobile: "",
                    faxNumber: "",
                    email: "",
                    storeAddress: "",
                    storeLocalX: "",
                    storeLocalY: "",
                    storeAddInfoMaps: {},
                },
                storeAddInfoMaps: {}, //附加信息
                attachedInfo: [], //数据字典信息
                tableList: [],
                editList: {},
                storeTypes: [], //门店类型
                prompt: true, //无数据时提示
                startRow: "", //每页第一行数据在数据库中的序号
                selitem: "", //标识选中的编辑行
                status: "可用",
                modelTatle: "新增门店信息", //模态框标题
                type: '', //判断新增/编辑
                //分页参数
                pager: {
                    page_no: 1, //当前页数
                    page_size: 15, //每页显示数
                    sort_name: 'id',
                    is_desc: false
                },
                total: 1, //总条数
                //树形菜单部分
                treeData: [],
                options: {
                    showCheckbox: false,
                    halfCheckedStatus: false, //控制父框是否需要半钩状态
                    lazy: true,
                    load: this.loadingChild,
                    showSearch: false,
                    rootName: '全国',
                    labelKey: 'label',
                    iconClass: {
                        close: 'icon-youjiantou',
                        open: 'icon-xiajiantou',
                        add: 'icon-add'
                    },
                    iconStyle: {
                        color: '#108ee9'
                    },
                    dynamicAdd: false,
                    dynamicAddFilter: (node) => {
                        if (node.type === 1 || node.type === 2) {
                            return true
                        }
                        return false
                    },
                    dynamicAddNode: this.addNode,
                    dynamicSaveNode: this.saveNode,
                    leafIcon: this.leafIcon,
                    search: {
                        useInitial: true,
                        useEnglish: false,
                        customFilter: null
                    }
                },
                treeRootCode: commonConfig.storeRoot.orgCode, //点击树根节点获取的相关编码
                treeName: "orgCode",
                startTime: {
                    HH: "00",
                    mm: "00",
                    ss: "00"
                },
                endTime: {
                    HH: "00",
                    mm: "00",
                    ss: "00"
                },
            }
        },
        created() {
            this.additionInfo()
        },
        methods: {
            reset() {
                this.storeCode = "";
                this.storeName = "";
                this.storeAddrName = "";
            },
            //时间格式化
            datechange(value1, type) {
                let hour = this.formatting(value1.getHours())
                let minute = this.formatting(value1.getMinutes())
                let second = this.formatting(value1.getSeconds())
                let date  =  hour + ':' + minute + ':' + second
                if(type == 'start') {
                    
                    this.edit.businessStartTime = date
                } else {
                    this.edit.businessEndTime = date
                }
            },
            formatting(num) {
                let value;
                value = num < 10 ? '0' + num : num;
                return value
            },
            getData: function() { //获取编辑数据
                const _this = this;
                if (!_this.selitem) {
                    Toast(commonConfig.prompt.checkData);
                    return;
                }
            },
            change: function(type, id) {
                const _this = this
                this.value2 = '',
                this.value3 = '',
                _this.type = type
                _this.getOrgCode('orgCode')
                _this.additionInfo()
                for (let i in _this.edit) {
                    _this.edit[i] = ''
                }
                _this.type = type
                _this.modelTatle = "新增门店信息"
                _this.edit.isDeleted = "0"
                _this.edit.displayOnline = "1"
                // for (let i in _this.startTime) {
                //     _this.startTime[i] = '00'
                // }
                // for (let i in _this.endTime) {
                //     _this.endTime[i] = '00'
                // }
                _this.edit.chinaCityCode = commonConfig.storeRoot.chinaCityCode
                _this.edit.orgCode = commonConfig.storeRoot.orgCode
                _this.edit.salesCode = commonConfig.storeRoot.salesCode
                _this.edit.purchasingAreaCode = commonConfig.storeRoot.purchasingAreaCode
                _this.edit.storeAddInfoMaps = {}
                if (_this.type == 'edit') {
                    _this.modelTatle = "编辑门店信息"
                    _this.getData()
                    if (this.selitem) {
                        common.triggerModal(id)
                        api.store.getStoreInfo({
                                "storeCode": _this.selitem,
                            })
                            .then(function(res) {
                                if (res.data.code == 'success') {
                                    _this.editList = res.data.obj
                                    console.log(_this.editList)
                                    for (let i in _this.edit) {
                                        _this.edit[i] = _this.editList[i]
                                    }
                                    let starthh =  parseInt(_this.editList.businessStartTime.slice(0, 3))
                                    let startmm =  parseInt(_this.editList.businessStartTime.slice(3, 6))
                                    let endhh =  parseInt(_this.editList.businessEndTime.slice(0, 3))
                                    let endmm =  parseInt(_this.editList.businessEndTime.slice(3, 6))
                                    // console.log(_this.editList.businessStartTime)
                                    // console.log(_this.editList.businessEndTime)
                                    // console.log(starthh)
                                    // console.log(startmm)
                                    // console.log(starthh)
                                    // console.log(startmm)
                                    _this.value2 = new Date(2016, 9, 10, starthh, startmm)
                                    _this.value3 = new Date(2016, 9, 10, endhh, endmm)
                                    
                                    _this.edit.openHours = _this.editList.openHours.slice(0, 10)
                                    _this.startTime.HH = _this.editList.businessStartTime.slice(0, 2)
                                    _this.startTime.mm = _this.editList.businessStartTime.slice(3, 5)
                                    _this.endTime.HH = _this.editList.businessEndTime.slice(0, 2)
                                    _this.endTime.mm = _this.editList.businessEndTime.slice(3, 5)
                                }
                            })
                    }
                } else {
                    common.triggerModal(id)
                    api.ordinalInfo.getSequence({
                            "serviceCode": commonConfig.ordinal.storeInfo
                        })
                        .then(function(res) {
                            if (res.data.code == 'success') {
                                _this.edit.storeCode = res.data.obj
                            }
                        })
                }
            },
            //从数据字典获取附加信息
            additionInfo: function() {
                const _this = this
                api.getDataDictionary({
                        "refCode": commonConfig.storeAdditionInfo
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.attachedInfo = res.data.obj.referenceDetailInfos
                        }
                    })
                api.queryDictionaryDetails({
                        "refCode": commonConfig.acquireType.refstore,
                        "pageNums": 100,
                        "pageStart": 1
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            let storeType = res.data.obj.list,
                                obj = {};
                            obj.refDetailCode = '';
                            obj.refDetailName = '';
                            storeType.unshift(obj);
                            _this.storeTypes = storeType;
                        } else {}
                    })
            },
            //同步门店数据
            cache: function() {
                api.store.cacheStoreInfo({})
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            Toast(commonConfig.success.cache)
                        } else {
                            Toast(red.data.message)
                        }
                    })
                    .catch(function(error) {});
            },
            //查询门店信息
            getTableList: function(pageNum) {
                const _this = this
                this.selitem = ''
                api.store.queryStoreInfo({
                        "storeCode": _this.storeCode,
                        "storeName": _this.storeName,
                        "storeType": _this.storeType,
                        "pageNums": commonConfig.pageNums,
                        "pageStart": pageNum ? pageNum : _this.pager.page_no
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.tableList = res.data.obj.list
                            _this.startRow = res.data.obj.startRow
                            _this.pager.page_no = res.data.obj.pageNum
                            _this.total = res.data.obj.total
                            _this.pager.page_size = res.data.obj.pageSize
                            // _this.tableList.forEach(function(item, index) {
                            //     _this.tableList[index].businessStartTime = item.businessStartTime.slice(0, 5)
                            //     _this.tableList[index].businessEndTime = item.businessEndTime.slice(0, 5)
                            // })
                        } else {}
                    })
            },
            //分页查询
            pageChange: function(num, size) {
                this.pager.page_no = num;
                this.getTableList();
            },
            //新增门店信息
            addSubmit: function() {
                const _this = this
                // _this.edit.businessStartTime = _this.startTime.HH + ':' + _this.startTime.mm + ':' + '00'
                // _this.edit.businessEndTime = _this.endTime.HH + ':' + _this.endTime.mm + ':' + '00'
                _this.edit.openHours = _this.edit.openHours
                _this.edit.storeAddInfoMaps = _this.storeAddInfoMaps
                api.store.createdStoreInfo({
                        "storeCode": _this.edit.storeCode,
                        "externalCode": _this.edit.externalCode,
                        "storeName": _this.edit.storeName,
                        "storeAddrName": _this.edit.storeAddrName,
                        "prefixValue": _this.edit.prefixValue,
                        "storeType": _this.edit.storeType,
                        "remark": _this.edit.remark,
                        "chinaCityCode": _this.edit.chinaCityCode,
                        "chinaCityName": _this.edit.chinaCityName,
                        "orgCode": _this.edit.orgCode,
                        "orgName": _this.edit.orgName,
                        "salesCode": _this.edit.salesCode,
                        "salesName": _this.edit.salesName,
                        "purchasingAreaCode": _this.edit.purchasingAreaCode,
                        "openHours": _this.edit.openHours,
                        "businessStartTime": _this.edit.businessStartTime,
                        "businessEndTime": _this.edit.businessEndTime,
                        "storeLifeType": _this.edit.storeLifeType,
                        "contactPerson": _this.edit.contactPerson,
                        "contactPhone": _this.edit.contactPhone,
                        "contactMobile": _this.edit.contactMobile,
                        "faxNumber": _this.edit.faxNumber,
                        "email": _this.edit.email,
                        "storeAddress": _this.edit.storeAddress,
                        "storeLocalX": _this.edit.storeLocalX,
                        "storeLocalY": _this.edit.storeLocalY,
                        "displayOnline": _this.edit.displayOnline,
                        "storeAddInfoMaps": _this.edit.storeAddInfoMaps,
                        "isDeleted": _this.edit.isDeleted
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.getTableList()
                            $('#storeInfo').modal('hide')
                            // _this.startTime = {
                            //     HH: "00",
                            //     mm: "00",
                            //     ss: "00"
                            // }
                            // _this.endTime = {
                            //     HH: "00",
                            //     mm: "00",
                            //     ss: "00"
                            // }
                            Toast(commonConfig.success.add)
                        } else {}
                    })
                    .catch(function(error) {
                        // console.log(error)
                    });
            },
            //编辑门店数据
            editSubmit: function() {
                const _this = this
                // _this.edit.businessStartTime = _this.startTime.HH + ':' + _this.startTime.mm + ':' + '00'
                // _this.edit.businessEndTime = _this.endTime.HH + ':' + _this.endTime.mm + ':' + '00'
                _this.edit.openHours = _this.edit.openHours
                api.store.editStoreInfo(_this.edit)
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.getTableList()
                            $('#storeInfo').modal('hide')
                            // _this.startTime = {
                            //     HH: "00",
                            //     mm: "00",
                            //     ss: "00"
                            // }
                            // _this.endTime = {
                            //     HH: "00",
                            //     mm: "00",
                            //     ss: "00"
                            // }
                            Toast(commonConfig.success.edit)
                        } else {}
                    })
                    .catch(function(error) {})
            },
            //获取组织编码,行政区域编码，销售区域编码，采购区域编码
            getOrgCode: function(code) {
                this.treeRootCode = commonConfig.storeRoot[code];
                this.treeName = code;
                this.getTree(code);
            },
            //树结构部分
            getTree: function(type, node, leaf) {
                let _this = this;
                let FunObj = {
                    chinaCityCode: {
                        api: 'getChinaAreaInfoByAreaCode',
                        childname: 'chinaAreaSubInfo',
                        param: 'areaCode'
                    },
                    orgCode: {
                        api: 'organzation', //getOrganizationByOrgCode
                        childname: 'childOrganizations',
                        param: 'orgCode'
                    },
                    salesCode: {
                        api: 'getSalesAreaInfoByAreaCode',
                        childname: 'salesAreaSubInfo',
                        param: 'areaCode'
                    },
                    purchasingAreaCode: {
                        api: 'getPurchasingAreaInfoByAreaCode',
                        childname: 'purchasingAreaSubInfo',
                        param: 'areaCode'
                    }
                };
                let _params = this.treeRootCode,
                    params, fn;
                if (type == 'orgCode') {
                    if (leaf) {
                        params = {
                            "orgCode": node.orgCode
                        }
                    } else {
                        params = {
                            "orgCode": _params
                        }
                    }
                    fn = api[FunObj[type].api].getOrganizationByOrgCode
                } else {
                    if (leaf) {
                        params = {
                            "areaCode": node.areaCode
                        }
                    } else {
                        params = {
                            "areaCode": _params
                        }
                    }
                    fn = api[FunObj[type].api];
                }
                fn(params).then(function(res) {
                    if (res.data.code === 'success') {
                        if (res.data.obj) {
                            if (!leaf) {
                                _this.treeData = [];
                                _this.options.rootName = type != 'orgCode' ? res.data.obj.areaName : res.data.obj.orgName;
                            }
                            let childname = res.data.obj[FunObj[type].childname];
                            if (childname) {
                                var name = type != 'orgCode' ? 'areaName' : 'orgName';
                                childname.forEach((item, index) => {
                                    let treeData = type == 'orgCode' ? {
                                        label: item[name],
                                        orgCode: item[FunObj[type].param],
                                        name: type,
                                        children: [],
                                        open: false,
                                        leaf: false
                                    } : {
                                        label: item[name],
                                        areaCode: item[FunObj[type].param],
                                        name: type,
                                        children: [],
                                        open: false,
                                        leaf: false
                                    }
                                    if (leaf) {
                                        node.loading = false;
                                        node.open = true;
                                        node.children.push(treeData);
                                    } else {
                                        _this.treeData.push(treeData);
                                    }
                                })
                            } else {
                                if (leaf) {
                                    node.loading = false;
                                    node.leaf = true;
                                }
                            }
                        }
                    }
                });
            },
            getRootUpdata(rootCode) {},
            getRootAdd(rootCode, name) {
                this.edit[name] = rootCode;
            },
            itemClick(node) {},
            addClick(node) {
                console.log(node)
                if (node.name == 'orgCode') {
                    this.edit[node.name] = node.orgCode;
                    this.edit.orgName = node.label
                } else {
                    // this.edit[node.name] = node.areaCode;
                    if (node.name == 'chinaCityCode') {
                        this.edit[node.name] = node.areaCode;
                        this.edit.chinaCityName = node.label
                    } else {
                        if (node.name == 'salesCode') {
                            this.edit[node.name] = node.areaCode;
                            this.edit.salesName = node.label
                        } else {
                            this.edit[node.name] = node.areaCode;
                            this.edit.purchasingAreaName = node.label
                        }
                    }
                }
            },
            async loadingChild(node, index) {
                let _this = this;
                try {
                    let data = await new Promise((resolve, reject) => {
                        this.getTree(node.name, node, true)
                    })
                    let tem = this.getParentNode(node, this.treeData)
                    Vue.set(tem, 'children', data);
                    Promise.resolve(data);
                } catch (e) {
                    Promise.reject(e);
                }
            },
            async addNode(item) {
                let parent = this.getParentNode(item, this.treeData)
                let node = {
                    id: 2,
                    label: '一级节点',
                    open: false,
                    checked: false,
                    nodeSelectNotAll: false,
                    parentId: null,
                    visible: true,
                    searched: false
                }
                if (!item.hasOwnProperty('children') || item.children.length === 0) {
                    await this.loadingChild(parent)
                }
                parent.open = true
                parent.children.splice(0, 0, Object.assign({}, {
                    dynamicAdd: true,
                    loaded: true
                }, node))
                //                generateKey(parent.children, parent.key) // regenerate key
                return Promise.resolve(true)
            },
            async saveNode(item, e) {
                if (!e.target.value) {
                    return
                }
                return new Promise((resolve, reject) => {
                    // todo sent data to sever
                    delete item.dynamicAdd // 删除属性
                    Vue.set(item, 'label', e.target.value)
                    e.target.value = ''
                    setTimeout(() => {
                        resolve(item)
                    }, 1000)
                })
            },
            generateKey(treeData = [], parentKey = '0') {
                let _this = this
                treeData = treeData.map((item, i) => {
                    item.key = parentKey + '-' + i.toString();
                    if (item.hasOwnProperty('children') && item.children.length > 0) {
                        _this.generateKey(item.children, item.key)
                    }
                    return item;
                })
                return treeData;
            },
            getParentNode(node = {}, treeData = []) {
                let tem;
                let postions = node.key.split('-');
                for (let [index, item] of postions.entries()) {
                    switch (index) {
                        case 0:
                            break;
                        case 1:
                            tem = treeData[item];
                            break;
                        default:
                            tem = tem.children[item];
                    }
                }
                return tem
            },
            leafIcon(node) {
                return ''
            }
        },
    }
</script>
<style>
    .el-input.is-disabled .el-input__inner {
        background-color: #c2cfd6 !important;
        border-radius: 0 !important;
    }
    .el-input__icon {
        color: #536c79 !important;
    }
    .el-input {
        width: 100% !important;
    }
    .el-time-panel {
        z-index: 99999 !important;
    }
    .tree-height {
        height: 626px;
        overflow: auto;
    }
</style>
