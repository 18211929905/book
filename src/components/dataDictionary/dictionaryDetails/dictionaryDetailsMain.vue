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
                                            <label class="control-label col-md-4">主表编码:</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="insert.refCode" readonly/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">明细编码:</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="refDetailCode" @keyup.enter="getDetailsList()" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">明细名称:</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="refDetailName" @keyup.enter="getDetailsList()" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <button type="button" class="btn btn-default" @click="reset()">重置</button>
                                        <button type="button" class="btn btn-primary" @click="getDetailsList(1)">查询</button>
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
                        <div class="columns columns-right margin-right-10 margin-bottom-10">
                            <button class="btn btn-primary" title="新增" type="button" data-toggle="modal" @click="change('insert', '#dictionaryDetails')">新增</button>
                            <button class="btn btn-success" title="更新" type="button" data-toggle="modal" @click="change('edit', '#dictionaryDetails')">编辑</button>
                            <button class="btn btn-warning pull-right" title="同步数据" @click="cache">同步数据</button>
                        </div>
                    </div>
                    <div class="table-container bordered">
                        <div class="fixed-table-body height-550 scroll">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center">序列</th>
                                        <th class="text-center" v-if="displayType == 1">上级节点名称</th>
                                        <th class="text-center">明细</th>
                                        <th class="text-center">明细名称</th>
                                        <th class="text-center">明细值</th>
                                        <th class="text-center">明细备注</th>
                                        <th v-if="insert.refCode == 'GPSortTypeCode'" class="text-center">排列位置</th>
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in detailList" :key="index">
                                        <td class="text-center"><input type="radio" name="dictionaryDetails" v-model="selitem" :value="item.refDetailCode"></td>
                                        <td>{{index + startRow}}</td>
                                        <td v-if="displayType == 1">{{item.fatherNodeName}}</td>
                                        <td>{{item.refDetailCode}}</td>
                                        <td>{{item.refDetailName}}</td>
                                        <td>{{item.refDetailValue}}</td>
                                        <td>{{item.refDetailRemark}}</td>
                                        <td v-if="insert.refCode == 'GPSortTypeCode'">{{item.addField1}}</td>
                                        <td class="text-center">{{item.isDeleted == '0'?"可用":"停用"}}</td>
                                    </tr>
                                    <tr v-if="prompt">
                                        <td colspan="8">暂无数据...</td>
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
        <!--新增数据字典明细模态框-->
        <div class="modal fade" id="dictionaryDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" :style="{ width: displayType == 1 ? '80%': '' }">
                <div class="modal-content carousel-inner">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                x
                            </button>
                        <h4 class="modal-title text-center" id="myModalLabel">
                            {{ modelTitle }}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <!-- <div class="row">     -->
                                <div class="col-lg-6 col-md-6 col-sm-6" v-if="displayType == 1">
                                    <div class="portlet">
                                        <div class="portlet-body">
                                            <div class="tree-view">
                                                <tree ref='tree' :treeData="treeData" :options="options" @node-click="addClick" @add-node="addNode" @root-click="getRootAdd" :treeRootCode="treeRootCode">
                                                </tree>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div :class="{ 'col-lg-6 col-md-6 col-sm-6': displayType == 1, 'col-lg-12 col-md-12 col-sm-12': displayType == 0 }">
                                    <form class="form-horizontal">
                                        <div class="form-body">
                                            <div class="row" v-if="displayType == 0">
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">数据字典明细编码</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailCode" readonly/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">数据字典明细名称</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailName"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">数据字典明细值</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailValue" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">备注</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailRemark" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">状态</label>
                                                        <div class="col-xs-7">
                                                            <select class="form-control" v-model="insert.isDeleted">
                                                                <option v-for="(item, index) in status" :value="item.value" :key="index">{{item.text}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">排列位置</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.addField1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" v-if="displayType == 1">
                                                <div class="col-xs-11" v-if="type == 'insert'">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">当前节点名称</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.fatherNodeName" readonly/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">数据字典明细编码</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailCode" readonly/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">数据字典明细名称</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailName" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">数据字典明细值</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailValue" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">备注</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.refDetailRemark" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">状态</label>
                                                        <div class="col-xs-7">
                                                            <select class="form-control" v-model="insert.isDeleted">
                                                                <option v-for="(item, index) in status" :value="item.value" :key="index">{{ item.text }}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-11">
                                                    <div class="form-group">
                                                        <label class="control-label col-xs-4">排列位置</label>
                                                        <div class="col-xs-7">
                                                            <input class="form-control" type="text" v-model="insert.addField1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- </div> -->
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6"></div>
                            <div class="col-xs-6 text-right">
                                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true" @click="type =='insert' ? createDetails() : editDetails()">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
    </div>
</template>

<script>
    import pager from "../../common/pager/Pager"
    import common from "../../../assets/js/common.js"
    import commonConfig from "../../common/commonConfig.js"
    import api from "../../common/api.js"
    import tree from "../../common/tree.vue"
    import {
        Toast
    } from 'mint-ui'
    export default {
        mounted() {
            let _this = this
            let refCode = _this.getUrlStr("refCode")
            _this.insert.refCode = refCode
            _this.getDetailsList()
            _this.getRefInfo()
        },
        data: function() {
            return {
                routerName: '',
                status: [{
                    value: "0",
                    text: "可用"
                }, {
                    value: "1",
                    text: "停用"
                }],
                refDetailCode: "",
                refDetailName: "",
                insert: {
                    id: "",
                    refCode: "",
                    refDetailCode: "",
                    fatherNodeName: '',
                    refDetailFatherCode: '0',
                    refDetailName: "",
                    refDetailRemark: "",
                    refDetailValue: "",
                    isDeleted: "1",
                    addField1: '' //排序位置
                },
                detailList: {},
                editlist: {},
                startRow: "", //每页第一行数据在数据库中的序号
                prompt: true, //无数据时提示
                type: '',
                selitem: '',
                refInfo: {},
                modelTitle: "新增数据字典明细", //模态框标题
                //分页数据
                pager: {
                    page_no: 1, //当前页数
                    page_size: 15, //每页显示数
                    sort_name: 'id',
                    is_desc: false
                },
                total: 1, //总条数
                treeData: [],
                options: {
                    showCheckbox: false,
                    halfCheckedStatus: false, //控制父框是否需要半钩状态
                    lazy: true,
                    load: this.loadingChild,
                    showSearch: false,
                    rootName: 'XXXX',
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
                treeRootCode: '0' //点击树根节点获取的相关编码
            }
        },
        computed: {
            displayType: function() {
                let _this = this
                return _this.getUrlStr("displayType")
            }
        },
        methods: {
            reset() {
                this.refDetailCode = '';
                this.refDetailName = '';
            },
            change: function(type, id) {
                const that = this
                if (that.displayType == 1) {
                    this.getTree()
                }
                if (type == "insert") {
                    common.triggerModal(id)
                }
                that.type = type
                that.insert.refDetailCode = ""
                that.insert.refDetailFatherCode = '0'
                that.insert.refDetailName = ""
                that.insert.refDetailRemark = ""
                that.insert.refDetailValue = ""
                that.insert.isDeleted = '1'
                that.modelTitle = "新增数据字典明细"
                if (type == "edit") {
                    if (that.selitem) {
                        common.triggerModal(id)
                    }
                    that.getData()
                    that.modelTitle = "编辑数据字典明细"
                    that.insert.id = that.editlist.id
                    that.insert.refDetailCode = that.editlist.refDetailCode
                    that.insert.refDetailName = that.editlist.refDetailName
                    that.insert.refDetailRemark = that.editlist.refDetailRemark
                    that.insert.refDetailValue = that.editlist.refDetailValue
                    that.insert.refDetailFatherCode = that.editlist.refDetailFatherCode
                    that.insert.isDeleted = that.editlist.isDeleted
                    that.insert.addField1 = that.editlist.addField1
                } else {
                    if (that.insert.refDetailCode == "") {
                        that.insert.fatherNodeName = that.refInfo.refName
                        api.ordinalInfo.getSequence({
                            "serviceCode": commonConfig.ordinal.dictionaryDetails
                        }).then(function(res) {
                            if (res.data.code == 'success') {
                                that.insert.refDetailCode = res.data.obj
                            }
                        }).catch(function(error) {})
                    }
                }
            },
            getUrlStr: function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");　　
                var r = window.location.search.substr(1).match(reg);　　
                if (r != null) return unescape(r[2]);　　
                return null;
            },
            //查询数据字典主档
            getRefInfo: function() {
                api.getDataDictionarys({
                    "refCode": this.getUrlStr("refCode")
                }, (res) => {
                    if (res.data.code === 'success') {
                        this.$data.refInfo = res.data.obj
                        this.$data.options.rootName = res.data.obj.refName
                    }
                })
            },
            //查询明细数据
            getDetailsList: function(pageNum) {
                const _this = this
                this.selitem = ''
                api.queryDictionaryDetails({
                        "pageNums": commonConfig.pageNums,
                        "pageStart": pageNum ? pageNum : _this.pager.page_no,
                        "refCode": _this.insert.refCode,
                        "refDetailCode": _this.refDetailCode,
                        "refDetailName": _this.refDetailName
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.detailList = res.data.obj.list
                            _this.startRow = res.data.obj.startRow
                            _this.pager.page_no = res.data.obj.pageNum;
                            _this.total = res.data.obj.total;
                            _this.pager.page_size = res.data.obj.pageSize;
                            if (res.data.obj.list.length == 0) {
                                _this.prompt = true
                            } else {
                                _this.prompt = false
                            }
                        }
                    }).catch((error) => {
                    })
            },
            //同步数据
            cache: function() {
                api.cacheDataDictionary({})
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            Toast(commonConfig.success.cache)
                        }
                    })
                    .catch(function(error) {});
            },
            //新增明细
            createDetails: function() {
                const _this = this
                api.createDictionaryDetails({
                        "refCode": _this.insert.refCode,
                        "refDetailCode": _this.insert.refDetailCode,
                        "refDetailFatherCode": _this.insert.refDetailFatherCode,
                        "refDetailName": _this.insert.refDetailName,
                        "refDetailRemark": _this.insert.refDetailRemark,
                        "refDetailValue": _this.insert.refDetailValue,
                        "isDeleted": _this.insert.isDeleted,
                        "addField1": _this.insert.addField1
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.getDetailsList()
                            Toast(commonConfig.success.add)
                        }
                    })
                    .catch(function(error) {})
            },
            //编辑明细
            editDetails: function() {
                const _this = this
                api.editDictionaryDetails(_this.insert)
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.getDetailsList()
                            Toast(commonConfig.success.edit)
                        }
                    }).catch(function(error) {
                    })
            },
            getData: function() {
                var $this = this;
                if (!$this.selitem) {
                    Toast('请选择');
                    return;
                }
                for (var i = 0, len = this.detailList.length; i < len; i++) {
                    if (this.detailList[i].refDetailCode == $this.selitem) {
                        $this.editlist = this.detailList[i]
                    }
                }
            },
            pageChange: function(num, size) {
                this.pager.page_no = num;
                this.getDetailsList();
            },
            // 树状图
            getTree() {
                let _this = this
                api.ref.queryFirstLevelReferenceDetails({
                    "refCode": this.getUrlStr("refCode"),
                    "displayType": this.getUrlStr("displayType")
                }, (res) => {
                    if (res.data.code === 'success') {
                        if (res.data.obj) {
                            _this.treeData = [];
                            _this.options.rootName = _this.refInfo.refName;
                            let refDetailSubInfo = res.data.obj;
                            if (refDetailSubInfo != null) {
                                refDetailSubInfo.forEach((item, index) => {
                                    _this.treeData.push({
                                        label: item.refDetailName,
                                        refCode: item.refCode,
                                        refDetailCode: item.refDetailCode,
                                        children: [],
                                        open: false,
                                        leaf: false
                                    });
                                })
                            }
                        }
                    }
                })
            },
            getRootUpdata(rootCode) {
                this.insert.refDetailFatherCode = rootCode;
            },
            getRootAdd(rootCode) {
                if (this.type === 'insert') {
                    this.insert.refDetailFatherCode = rootCode;
                    this.insert.fatherNodeName = this.$data.options.rootName
                }
            },
            itemClick(node) {
                this.insert.refDetailFatherCode = node.refDetailCode;
                this.insert.fatherNodeName = node.label;
            },
            addClick(node) {
                if (this.type === 'insert') {
                    this.insert.refDetailFatherCode = node.refDetailCode;
                    this.insert.fatherNodeName = node.label;
                }
            },
            async loadingChild(node, index) {
                let _this = this;
                try {
                    let data = await new Promise((resolve, reject) => {
                        api.ref.queryNextReferenceDetails({
                            "refCode": node.refCode,
                            "refDetailCode": node.refDetailCode
                        }, (res) => {
                            if (res.data.code === 'success') {
                                if (res.data.obj) {
                                    let refDetailSubInfo = res.data.obj
                                    if (refDetailSubInfo != null && refDetailSubInfo.length > 0) {
                                        refDetailSubInfo.forEach((item, index) => {
                                            let treeData = {
                                                label: item.refDetailName,
                                                refCode: item.refCode,
                                                refDetailCode: item.refDetailCode,
                                                children: [],
                                                open: false,
                                                leaf: false
                                            }
                                            node.loading = false;
                                            node.open = true;
                                            node.children.push(treeData);
                                        })
                                    } else {
                                        node.loading = false;
                                        node.leaf = true;
                                    }
                                } else {}
                            }
                        });
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
                // regenerate key
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
        components: {
            pager,
            tree
        }
    }
</script>
<style lang="scss" scoped>
    .tree-height {
        height: 343px;
        overflow: auto;
    }
</style>