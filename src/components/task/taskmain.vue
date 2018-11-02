<template>
    <div>
        <div class="row margin-top-20">
            <div class="col-md-12">
                <div class="portlet box">
                    <div class="portlet-body form">
                        <!--FORM BEGIN-->
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label class="control-label col-md-4">任务名称</label>
                                        <div class="col-md-8">
                                            <input type="text" v-model="jobName" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="control-label col-md-4">任务分组</label>
                                        <div class="col-md-8">
                                            <input v-model="jobGroup" type="text" class="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label class="control-label col-md-4">任务状态</label>
                                        <div class="col-md-8">
                                            <!-- <input v-model="jobStatus" type="text" class="form-control" /> -->
                                            <select v-model="jobStatus" class="form-control" name="" id="">
                                                                    <option value="1">启用</option>
                                                                    <option value="2">停用</option>
                                                                </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="control-label col-md-4"></label>
                                        <div class="col-md-8 text-right">
                                            <span class="btn btn-default" @click="reset">重置</span>
                                            <span class="btn btn-primary" @click="searchList(1);">查询</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <!--FORM END-->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="portlet box">
                    <div class="portlet-body">
                        <div class="bootstrap-table bordered">
                            <div class="fixed-table-toolbar">
                                <div class="columns columns-left pull-left margin-left-10 margin-bottom-10">
                                    <a href="#">
                                        <a class="btn btn-primary" @click="addOrEdit('add')" data-toggle="modal" href="#addinfo">新增</a>
                                    </a>
                                    <a href="javascript:void(0)">
                                        <a class="btn btn-success" :data-toggle="selitem == ''? '':'modal'" @click="addOrEdit('edit')" :href="selitem == ''? 'javascript:void(0)':'#addinfo'">编辑</a>
                                    </a>
                                </div>
                            </div>
                            <div class="table-container">
                                <div class="fixed-table-body height-550 scroll">
                                    <table class="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>选择</th>
                                                <th>任务名称</th>
                                                <th>任务分组</th>
                                                <th>任务状态</th>
                                                <th>任务运行时间表达式</th>
                                                <th>任务执行调用链接</th>
                                                <th>是否邮件提醒</th>
                                                <th>任务描述</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in tableList">
                                                <td><input v-model="selitem" type="radio" :value="item.id"></td>
                                                <td>{{item.jobName}}</td>
                                                <td>{{item.jobGroup}}</td>
                                                <td>
                                                    <span v-if="item.jobStatus==1">启用</span>
                                                    <span v-else>停用</span>
                                                </td>
                                                <td>{{item.cronExpression}}</td>
                                                <td>{{item.toDoUrl}}</td>
                                                <td>{{item.email}}</td>
                                                <td>{{item.desc}}</td>
                                            </tr>
                                            <tr v-if="tableList.length <= 0">
                                                <td colspan="9">没有数据</td>
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
        <!-- start-updata-modal -->
        <div class="modal fade" id="addinfo" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title text-center">统一任务信息</h4>
                    </div>
                    <div class="modal-body form">
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">任务名称:</label>
                                            <div class="col-md-8">
                                                <input v-model="editjobName" :readonly="type!='add'?true:false" type="text" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">任务分组:</label>
                                            <div class="col-md-8">
                                                <input :readonly="type!='add'?true:false" type="text" v-model="editjobGroup" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">任务状态:</label>
                                            <div class="col-md-8">
                                                <select v-model="editjobStatus" class="form-control" name="" id="">
                                                                            <option value="1">启用</option>
                                                                            <option value="2">停用</option>
                                                                        </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">运行表达式:</label>
                                            <div class="col-md-8">
                                                <input type="text" v-model="editcronExpression" :readonly="editState" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">任务描述:</label>
                                            <div class="col-md-8">
                                                <input type="text" v-model="editdesc" :readonly="editState" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">执行调用链接:</label>
                                            <div class="col-md-8">
                                                <input type="text" v-model="edittoDoUrl" :readonly="editState" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">发送提醒邮件:</label>
                                            <div class="col-md-8 text-left">
                                                <input type="text" v-model="editemail" :readonly="editState" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <!--                                         <div class="form-group">
                                                                            <label class="control-label col-md-3 col-sm-3">是否可用:</label>
                                                                            <div class="col-md-8 text-left">
                                                                                <select v-model="isDeleted" class="form-control" name="" id="">
                                                                                    <option value="0">可用</option>
                                                                                    <option value="1">停用</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>  -->
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3"></label>
                                            <div class="col-md-8 text-right">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                                <button type="button" @click="type=='add'?addinfo():edit()" class="btn btn-primary" data-dismiss="modal">确定</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- end-updata-modal -->
    </div>
</template>

<script>
    import pager from '../common/pager/Pager.vue';
    import common from "../../assets/js/common.js";
    import api from '../common/api.js';
    import commonfig from '../common/commonConfig.js';
    import {
        Toast
    } from 'mint-ui';
    export default {
        data() {
            return {
                jobName: '',
                jobGroup: '',
                jobStatus: '',
                editjobName: '',
                editjobGroup: '',
                editjobStatus: '',
                editcronExpression: '',
                editdesc: '',
                edittoDoUrl: '',
                editemail: '',
                tableList: [],
                selitem: '',
                currlist: '',
                type: 'add',
                pageNum: '',
                pager: {
                    page_no: 1, //当前页数
                    page_size: 15, //每页显示数
                    sort_name: 'id',
                    is_desc: false
                },
                total: 1, //总条数
                editState: false
            };
        },
        components: {
            pager
        },
        methods: {
            reset() {
                var $this = this;
                $this.jobName = ''
                $this.jobGroup = ''
                $this.jobStatus = ''
            },
            searchList(pageNum) {
                var $this = this;
                api.task.search({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "jobName": $this.jobName,
                        'jobGroup': $this.jobGroup,
                        'jobStatus': $this.jobStatus,
                        'pageNums': commonfig.pageNums,
                        'pageStart': pageNum ? pageNum : $this.pager.page_no
                    })
                }).then(function(res) {
                    if (res.data.code == 'success' && res.data.obj.list.length > 0) {
                        $this.tableList = res.data.obj.list;
                        $this.pager.page_no = res.data.obj.pageNum;
                        $this.total = res.data.obj.total;
                        $this.pager.page_size = res.data.obj.pageSize;
                    }
                })
            },
            addOrEdit(type) {
                var $this = this;
                this.type = type;
                if (type == 'edit') {
                    this.getData();
                    this.editjobName = this.currlist.jobName;
                    this.editjobGroup = this.currlist.jobGroup;
                    this.editjobStatus = this.currlist.jobStatus;
                    if(this.currlist.jobStatus == 1) {
                        this.editState = true
                    }else {
                        this.editState = false
                    }
                    this.editcronExpression = this.currlist.cronExpression;
                    this.editdesc = this.currlist.desc;
                    this.edittoDoUrl = this.currlist.toDoUrl;
                    this.editemail = this.currlist.email;
                } else {
                    this.editjobName = '';
                    this.editjobGroup = '';
                    this.editjobStatus = '';
                    this.editcronExpression = '';
                    this.editdesc = '';
                    this.edittoDoUrl = '';
                    this.editemail = '';
                }
            },
            addinfo() {
                var $this = this;
                api.task.newadd({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        jobName: $this.editjobName,
                        jobGroup: $this.editjobGroup,
                        jobStatus: $this.editjobStatus,
                        cronExpression: $this.editcronExpression,
                        desc: $this.editdesc,
                        toDoUrl: $this.edittoDoUrl,
                        email: $this.editemail
                    })
                }).then(function(res) {
                    if (res.data.code == 'success') {
                        Toast(commonfig.success.add)
                        $this.searchList();
                    }
                })
            },
            pageChange(num, size) {
                this.pager.page_no = num;
                this.searchList();
            },
            getData: function() {
                var $this = this;
                if (!$this.selitem) {
                    Toast(commonfig.prompt.checkData);
                    return;
                }
                for (var i = 0, len = this.tableList.length; i < len; i++) {
                    console.info(this.tableList);
                    if ($this.tableList[i].id == $this.selitem) {
                        $this.currlist = this.tableList[i];
                    }
                }
            },
            edit() {
                var $this = this;
                api.task.edit({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        id: $this.selitem,
                        jobName: $this.editjobName,
                        jobGroup: $this.editjobGroup,
                        jobStatus: $this.editjobStatus,
                        cronExpression: $this.editcronExpression,
                        desc: $this.editdesc,
                        toDoUrl: $this.edittoDoUrl,
                        email: $this.editemail
                    })
                }).then(function(res) {
                    if (res.data.code == 'success') {
                        Toast(commonfig.success.edit)
                        $this.searchList();
                    }
                })
            }
        }
    }
</script>
