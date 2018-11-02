<template lang="html">
<modal :show.sync="show" :large="true" :backdrop="false" effect="fade" width="80%">
    <div slot="modal-header" class="modal-header">
        <h4 class="modal-title text-center">
            配置人员岗位关系信息
        </h4>
    </div>
    <div slot="modal-body" class="modal-body">
        <div class="row">
            <div class="col-md-5">
                <div class="form-group">
                    <label class="control-label col-md-4 text-right">组织名称:</label>
                    <div class="col-md-8" @click="orgClick" ref="org">
                       <input type="text" class="form-control" readonly v-model="orgName"/>
                    </div>
                    <div class="text-left select-tree" v-show="orgShow">
                        <el-tree 
                             :data="orgTreeData" 
                             :props="orgOptions" 
                             :load="orgLoad" node-key="id" 
                             lazy accordion check-strictly 
                             :default-expanded-keys="[0]" 
                             :expand-on-click-node="false" 
                             @node-click="orgItemClick">
                        </el-tree>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-group">
                <label class="control-label col-md-4 text-right">岗位类型:</label>
                <div class="col-md-8">
                    <select class="form-control" v-model="params.postType">
                    <option :value="item.value" v-for="item in postTypeList">{{item.text}}</option>
                </select>
                </div>
                </div>
            </div>
            <div class="col-md-2">
                <input type="button" class="btn btn-primary" @click="query" value="查询">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <!--FORM BEGIN-->
                <form class="form-horizontal">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <div class="form-group">
                                    <label class="col-md-12 text-left">
                                            可选岗位 
                                    </label>
                                    <div class="col-md-12 height border" >
                                        <div v-for="item in waitList" @click="waitItemClick(item)" :class="{'check':item.check}">
                                            {{item.text}}
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <center class="text-vertical" style="height:140px">
                                    <button class="btn btn-default" type="button" @click="btnClick">
                                        <i class="icon-angle-right text-default"></i>
                                    </button>
                                </center>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label class="col-md-12">
                                        已选岗位
                                    </label>
                                    <div class="col-md-12 height border">
                                        <div v-for="(item, i) in alreadyList">
                                            {{item.text}}
                                            <div class="pull-right clear" @click="clear(i)">
                                                <span>x</span>
                                            </div>
                                        </div>                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 col-sm-5 col-md-offset-7 col-sm-offset-7">
                                <label for="">请选择主岗位:</label>
                                <select v-model="setTnCharge">
                                    <option :value="item.value" v-for="item in alreadyList">{{item.text}}</option>                                    
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <!--FORM END-->
            </div>
        </div>
    </div>  
    <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="cancel">取消</button>
        <button type="button" class="btn btn-primary" @click="confirm">确定</button>
    </div>
</modal>
</template>

<script>
    import {modal} from 'vue-strap'
    import api from 'components/common/api'
    import commonConfig from "components/common/commonConfig"
    import Vue from 'vue'
    import { Tree } from 'element-ui'
    Vue.use(Tree)
    import { getPostTypeList } from './com-api'
    import { Toast } from 'mint-ui'

    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            empCode: {
                type: String
            }
        },
        data() {
            return {
                // org - tree
                orgTreeData: [],
                orgOptions: {
                    children: 'children',
                    label: 'name'
                },
                orgShow: false,
                // 查询参数
                params: {
                    orgCode: '',
                    postType: ''
                },
                orgName: '',
                checkItem: {},
                postTypeList: [],
                waitList: [],      // 可选列表
                alreadyList: [],   // 已选列表 
                setTnCharge: ''
            }
        },
        methods: {
            query() {
                let params = {
                    empCode: this.empCode,
                    orgCode: this.params.orgCode,
                    postnType: this.params.postType
                }
                api.queryNoCheckedPostn(params).then(res => {
                    if(res.data.code === 'success') {
                        this.waitList = []
                        let obj = res.data.obj
                        if(obj.length > 0) {
                            obj.forEach((item) => {
                                this.waitList.push({
                                    text: `${item.postName} -- ( ${item.orgName || ''} )`,
                                    value: item.postCode,
                                    check: false
                                })
                            })
                        }else {
                            alert('暂无对应数据...')
                        }
                    }
                }); 
            },
            waitItemClick(item) {
                this.checkItem = item
                for(let i=0;i<this.waitList.length;i++) {
                    if(item.value === this.waitList[i].value) {
                        this.waitList[i].check = true
                    }else {
                        this.waitList[i].check = false
                    }
                }
                for(let i = 0; i < this.alreadyList.length; i++) {
                    if(this.checkItem.value === this.alreadyList[i].value) {
                        alert('此岗位已选, 请选择其他岗位!')
                        this.checkItem = {}
                    }
                }
            },
            btnClick() {
                if(this.checkItem.text !== undefined) {
                    if(this.alreadyList.length === 0) {
                        for(let i = 0; i < this.waitList.length; i++) {
                            if(this.checkItem.text === this.waitList[i].text) {
                                this.waitList.splice(i, 1)
                            }
                        }
                        this.alreadyList.push(this.checkItem)
                        this.checkItem = {}
                        return
                    }
                    for(let i = 0; i < this.alreadyList.length; i++) {
                        if(this.checkItem.value === this.alreadyList[i].value) {
                            alert('此岗位已选, 请选择其他岗位!')
                        }else {
                            // 删除waitList选中项
                            for(let i = 0; i < this.waitList.length; i++) {
                                if(this.checkItem.text === this.waitList[i].text) {
                                    this.waitList.splice(i, 1)
                                }
                            }
                            this.alreadyList.push(this.checkItem)
                            this.checkItem = {}
                            break
                        } 
                    }
                }
            },
            clear(i) {
                this.alreadyList.splice(i, 1)
            },
            // 获取该员工已有岗位信息
            getAlreadyList() {
                let param = {"empCode": this.empCode}
                api.queryCheckedPostn(param).then(res => {
                    if(res.data.code === 'success') {
                        this.alreadyList = []
                        let obj = res.data.obj
                        if(obj) {
                            obj.forEach((item) => {
                                this.alreadyList.push({
                                    text: `${item.postName} -- ( ${item.orgName || ''} )`,
                                    value: item.postCode,
                                    //inCharge: item.inCharge  添加主岗位标志位( 并没有什么卵用 )
                                })
                                if(item.inCharge === '1') {
                                    this.setTnCharge = item.postCode
                                }
                            })
                        }
                    }
                });
            },
            // 获取组织
            orgLoad(node, resolve) {
                if (node.level === 0) {
                    let params = { orgCode: "000001" };
                    api.organzation.getOrganizationByOrgCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let obj = res.data.obj;
                            let arr = [{
                                id: 0,
                                name: obj.orgName,
                                code: obj.orgCode
                            }];
                            return resolve(arr);
                        }
                    })
                } else {
                    let params = { orgCode: node.data.code };
                    api.organzation.getOrganizationByOrgCode(params).then(res => {
                        if (res.data.code === 'success') {
                            let items = res.data.obj.childOrganizations;
                            let arr = [];
                            if (items !== null) {
                                items.forEach((item, index) => {
                                    let data = {
                                        name: item.orgName,
                                        code: item.orgCode
                                    }
                                    arr.push(data)
                                })
                            } else {
                                return resolve([])
                            }
                            return resolve(arr)
                        }
                    })
                }
            },
            orgItemClick(data) {
                this.orgName = data.name
                this.params.orgCode = data.code
                this.orgShow = false
            },
            orgClick() {
                this.orgShow = !this.orgShow;
            },
            confirm() {
                let paramsList = []
                this.alreadyList.forEach( item => {
                    let data = {
                        empCode: this.empCode,
                        postCode: item.value,
                        inCharge: ''
                    }
                    paramsList.push(data)
                })
                // start => 添加条件判断, paramsList.length 为0的情况 2017/12/04
                if(paramsList.length > 0) {
                    for(let i=0;i<paramsList.length;i++) {                                           
                        if(this.setTnCharge === paramsList[i].postCode) {
                            paramsList[i].inCharge = '1'
                        }else {
                            paramsList[i].inCharge = '0'
                        }
                    }
                }else {
                    paramsList[0] = {
                        empCode: this.empCode,
                        postCode: '',
                        inCharge: 0
                    }
                }
                // end
                api.getRelationalInsert(paramsList).then(res => {
                    if(res.data.code === 'success') {
                        Toast(commonConfig.success.addpost)
                    }else {
                        Toast('添加失败')
                    }
                    this.$emit('cancel') 
                });
            },
            resetParams() {
                this.orgName = ''
                this.params.orgCode = ''
                this.params.postType = ''
            },
            cancel() {
                this.$emit('cancel')
            }
        },
        watch: {
            show(val) {
                if(val) {
                    this.waitList = []  // 初始化可选项
                    this.postTypeList = []
                    getPostTypeList(this.postTypeList)                    
                    this.getAlreadyList()
                }
            },
            orgShow(val) {
                document.addEventListener('click', (e) => {
                    let _oTree = this.$refs.org;
                    if(_oTree && !_oTree.contains(e.target))  this.orgShow = false 
                })
            }
        },
        components: {
            modal
        }
    }
</script>
<style scoped>
.border {
    border: 1px solid #ccc;
}
.height {
    min-height: 200px;
    max-height: 200px;
    overflow-y: scroll;
    padding: 10px 0;
}
.height div {
    padding: 0 10px 6px 6px;
    cursor: pointer;
}
.check {
    background: #ccc;
}
.clear {
    width: 20px;
    height: 20px;
    color: red;
    text-align: center;
    line-height: 18px;
    cursor: pointer;
}
.select-tree {
    position: absolute;
    right: 0;
    margin-top: 40px;
    width: 62%;
    z-index: 1000;
}

.el-tree {
    max-height: 300px;
    overflow-y: scroll;
}
</style>
