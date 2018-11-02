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
                                <div class="row form-group">
                                    <div class="col-md-4">
                                        <label class="control-label col-md-4">组织编码</label>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control" v-model="org.orgCode" @keyup.enter="getTableList()" />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="control-label col-md-4">组织名称</label>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control" v-model="org.orgName" @keyup.enter="getTableList()" />
                                        </div>
                                    </div>
                                    <div class="col-md-4 text-right">
                                        <span class="btn btn-default" @click="reset()">重置</span>
                                        <span class="btn btn-primary" @click="getTableList(1)">查询</span>
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
                            <button class="btn btn-primary" title="新增" data-toggle="modal" @click="change('creade', '#more')">新增</button>
                            <button class="btn btn-success" title="更新" data-toggle="modal" @click="change('edit', '#more')">编辑</button>
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
                                        <th class="text-center">组织编码</th>
                                        <th class="text-center">组织名称</th>
                                        <th class="text-center">组织缩写</th>
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in tableList" :key="index">
                                        <td class="text-center"><input type="radio" name="dataDictionary" v-model="selitem" :value="item.orgCode"></td>
                                        <td>{{index + startRow}}</td>
                                        <td>{{item.orgCode}}</td>
                                        <td>{{item.orgName}}</td>
                                        <td>{{item.orgAddrName}}</td>
                                        <td class="text-center">{{item.isDeleted == '0'?"可用":"停用"}}</td>
                                    </tr>
                                    <tr v-if="tableList.length == '0'">
                                        <td colspan="13">暂无数据...</td>
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
                        <div class="row">
                            <div class="col-md-6 tree-height">
                                <ZTree ref='tree' :treeData="treeData" :options="options" @node-click="addClick" :key="2" @root-click="getRootAdd" :treeRootCode="treeRootCode">
                                </ZTree>
                            </div>
                            <div class="col-md-6">
                                <form class="form-horizontal">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">父级组织编码</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="creade.fatherOrgCode" readonly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">组织编码</label>
                                                    <div class="col-xs-7">
                                                        <input type="text" class="form-control" v-model="creade.orgCode" readonly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">组织名称</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="creade.orgName" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">组织缩写</label>
                                                    <div class="col-xs-7">
                                                        <input type="text" class="form-control" v-model="creade.orgAddrName" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">前缀</label>
                                                    <div class="col-xs-7">
                                                        <input type="text" class="form-control" v-model="creade.prefixValue" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">组织类型</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="creade.orgType">
                                                                                <option v-for="(item, index) in orgType" :value="item.value" :key="index">{{item.text}}</option>
                                                                            </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">备注</label>
                                                    <div class="col-xs-7">
                                                        <input type="text" class="form-control" v-model="creade.remark" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">状态</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="creade.isDeleted">
                                                            <option v-for="(item, index) in status" :key="index" :value="item.value">{{item.text}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 text-right">
                                                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>
                                                <button type="button" class="btn btn-primary" @click="type =='creade'?addSubmit():editSubmit()" aria-hidden="true">确定</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
    import api from "../common/api.js"
    import ZTree from "../common/tree.vue"
    import common from "../../assets/js/common.js"
    import commonconfig from "../common/commonConfig.js"
    import pager from "../common/pager/Pager"
    import Vue from 'vue'
    // import  '@/../../static/plugins/jquery-1.10.2.min.js'
    import {
        Toast
    } from 'mint-ui'
    Vue.use(ZTree)
    export default {
        data() {
            return {
                startRow: "", //每页第一行数据在数据库中的序号
                selitem: "", //标识选中的编辑行
                status: [{
                        text: '可用',
                        value: '0'
                    },
                    {
                        text: '停用',
                        value: '1'
                    }
                ],
                modelTatle: "新增组织信息", //模态框标题
                type: '', //判断新增/编辑
                org: {
                    orgCode: "",
                    orgName: "",
                    pageNums: commonconfig.pageNums,
                    pageStart: ''
                },
                tableList: [],
                editList: {},
                orgType: [], //组织类型
                creade: {
                    id: "",
                    orgCode: "",
                    orgName: "",
                    fatherOrgCode: commonconfig.nodeCode.organizationCode.orgCode,
                    relationCodeList: "",
                    orgAddrName: "",
                    orgBigPic: "",
                    orgSmallPic: "",
                    prefixValue: "",
                    orgType: "",
                    remark: "",
                    isDeleted: "0"
                },
                //分页数据
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
                treeRootCode: commonconfig.nodeCode.organizationCode.orgCode //点击树根节点获取的相关编码
            }
        },
        created() {},
        methods: {
            reset() {
                this.org.orgCode = "";
                this.org.orgName = "";
            },
            getOrgType: function() {
                const _this = this
                api.queryDictionaryDetails({
                        "refCode": commonconfig.acquireType.refOrganization,
                        "pageNums": commonconfig.maxpageNums,
                        "pageStart": "0"
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            let type = res.data.obj.list
                            _this.orgType = [];
                            type.forEach(function(item, index) {
                                let obj = {};
                                obj.value = item.refDetailCode;
                                obj.text = item.refDetailName;
                                _this.orgType.push(obj)
                            })
                        } else {}
                    })
            },
            change: function(type, id) {
                const _this = this
                _this.type = type
                _this.getOrgType();
                _this.getTree()
                _this.modelTatle = "新增组织信息"
                _this.creade.isDeleted = 0
                _this.creade.fatherOrgCode = commonconfig.nodeCode.organizationCode.orgCode
                for (let i in _this.creade) {
                    _this.creade[i] = ""
                }
                if (_this.type == 'edit') {
                    if (_this.selitem) {
                        common.triggerModal(id)
                    }
                    _this.modelTatle = "编辑组织信息"
                    _this.getData()
                } else {
                    if (type == "creade") {
                        common.triggerModal(id)
                    }
                    api.ordinalInfo.getSequence({
                            "serviceCode": commonconfig.ordinal.organization
                        })
                        .then(function(res) {
                            if (res.data.code == 'success') {
                                _this.creade.orgCode = res.data.obj
                            }
                        })
                }
            },
            //同步数据
            cache: function() {
                api.organzation.cacheOrganization({})
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            Toast(commonconfig.success.cache)
                        } else {
                            Toast(red.data.message)
                        }
                    })
                    .catch(function(error) {});
            },
            //查询组织信息
            getTableList: function(pageNum) {
                this.selitem = ''
                const _this = this
                _this.org.pageStart = pageNum ? pageNum : _this.pager.page_no
                api.organzation.queryOrganization(_this.org)
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.tableList = res.data.obj.list
                            _this.startRow = res.data.obj.startRow
                            _this.pager.page_no = res.data.obj.pageNum
                            _this.total = res.data.obj.total
                            _this.pager.page_size = res.data.obj.pageSize
                        }
                    })
            },
            //分页查询
            pageChange: function(num, size) {
                this.pager.page_no = num;
                this.getTableList();
            },
            //新增数据功能
            addSubmit: function() {
                const _this = this
                if (!this.creade.orgName) {
                    Toast('组织名称不能为空')
                    return
                }
                // _this.creade.isDeleted = _this.status == "可用"?"0":"1"
                api.organzation.createdOrganization({
                        "orgCode": _this.creade.orgCode,
                        "orgName": _this.creade.orgName,
                        "fatherOrgCode": _this.creade.fatherOrgCode,
                        "relationCodeList": _this.creade.relationCodeList,
                        "orgAddrName": _this.creade.orgAddrName,
                        "orgBigPic": _this.creade.orgBigPic,
                        "orgSmallPic": _this.creade.orgSmallPic,
                        "prefixValue": _this.creade.prefixValue,
                        "orgType": _this.creade.orgType,
                        "remark": _this.creade.remark,
                        "isDeleted": _this.creade.isDeleted
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.getTableList()
                            $('#more').modal('hide')
                            Toast(commonconfig.success.add)
                        } else {}
                    })
                    .catch(function(error) {
                        console.log(error)
                    });
            },
            //获取要编辑的数据
            getData: function() {
                var $this = this;
                if (!$this.selitem) {
                    Toast('请选择一条数据');
                    return;
                }
                api.organzation.queryOrganization({
                        orgCode: $this.selitem,
                        pageStart: '0'
                    })
                    .then(function(res) {
                        if (res.data.code === 'success') {
                            $this.editList = res.data.obj.list[0]
                            for (let i in $this.creade) {
                                $this.creade[i] = $this.editList[i]
                            }
                            console.log($this.creade.orgType)
                        }
                    });
            },
            //编辑数据功能
            editSubmit: function() {
                const _this = this
                if (!this.creade.orgName) {
                    Toast('组织名称不能为空')
                    return
                }
                // _this.creade.isDeleted = _this.status == "可用" ? "0" : "1"
                api.organzation.editOrganization(_this.creade)
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            _this.getTableList()
                            $('#more').modal('hide')
                            Toast(commonconfig.success.edit)
                        } else {}
                    })
                    .catch(function(error) {
                        console.log(erroe)
                    })
            },
            // 树状图
            getTree() {
                // let _params = commonconfig.nodeCode.organizationCode; //组织根节点编码
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                // let orgCode = userInfo['empVo'].orgCode; //员工组织编码
                let orgCode = userInfo['inCharegOrgVo'].orgCode; //员工组织编码
                let _params = {
                    orgCode: orgCode
                }
                let _this = this;
                api.organzation.getOrganizationByOrgCode(_params)
                    .then(function(res) {
                        if (res.data.code === 'success') {
                            if (res.data.obj) {
                                _this.treeData = [];
                                _this.treeRootCode = res.data.obj.orgCode;
                                _this.options.rootName = res.data.obj.orgName;
                                let childOrganizations = res.data.obj.childOrganizations;
                                if (childOrganizations != null) {
                                    childOrganizations.forEach((item, index) => {
                                        let treeData = {
                                            label: item.orgName,
                                            orgCode: item.orgCode,
                                            children: [],
                                            open: false,
                                            leaf: false
                                        }
                                        _this.treeData.push(treeData);
                                    })
                                }
                            } else {}
                        }
                    });
            },
            getRootUpdata(rootCode) {
                this.creade.fatherOrgCode = rootCode;
            },
            getRootAdd(rootCode) {
                this.creade.fatherOrgCode = rootCode;
            },
            itemClick(node) {
                this.creade.fatherOrgCode = node.orgCode;
            },
            addClick(node) {
                this.creade.fatherOrgCode = node.orgCode;
            },
            async loadingChild(node, index) {
                let _this = this;
                try {
                    let data = await new Promise((resolve, reject) => {
                        api.organzation.getOrganizationByOrgCode({
                            "orgCode": node.orgCode
                        }).then(function(res) {
                            if (res.data.code === 'success') {
                                if (res.data.obj) {
                                    let childOrganizations = res.data.obj.childOrganizations;
                                    if (childOrganizations != null) {
                                        childOrganizations.forEach((item, index) => {
                                            let treeData = {
                                                label: item.orgName,
                                                orgCode: item.orgCode,
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
                    // set Children
                    //Vue.set(tem, 'children', generateKey(data, node.key));
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
        components: {
            'ZTree': ZTree,
            pager
        }
    }
</script>
<style>
    .tree-height {
        height: 392px;
        overflow: auto;
    }
</style>