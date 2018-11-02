<template lang="html">
    <modal :show.sync="show" :large="true" :backdrop="false" effect="fade" width="80%">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title text-center">新增角色</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <!--FORM BEGIN-->
                    <form class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">角色编码:</label>
                                        <div class="col-lg-5 col-md-6 col-sm-7">
                                            <input type="text" class="form-control" v-model="role.roleCode" readonly/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">角色名称:</label>
                                        <div class="col-lg-5 col-md-6 col-sm-7">
                                            <input type="text" class="form-control" v-model="role.roleName" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">备注:</label>
                                        <div class="col-lg-5 col-md-6 col-sm-7">
                                            <input type="text" class="form-control" v-model="role.remark" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">是否可用:</label>
                                        <div class="col-lg-5 col-md-6 col-sm-7">
                                            <select class="form-control" v-model="role.isDeleted">
                                                       <option value="0" selected="selected">启用</option>
                                                       <option value="1">停用</option>
                                                    </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <!--FORM END-->
                </div>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="closeAddModal()">取消</button>
            <button type="button" class="btn btn-primary" @click="insertRoleInfo()">确定</button>
        </div>
    </modal>
</template>

<script>
    import {
        modal
    } from 'vue-strap'
    import api from '../common/api.js'
    import config from '../common/commonConfig.js'
    import bus from '../common/public.js'
    import {
        Toast
    } from 'mint-ui'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                role: {
                    roleCode: '',
                    roleName: '',
                    roleMd5Seq: '',
                    remark: '',
                    isDeleted: '0'
                },
                error: {
                    roleCode: '',
                    roleName: '',
                    roleMd5Seq: '',
                    remark: ''
                }
            }
        },
        methods: {
            closeAddModal: function() {
                this.$emit('close-add-modal')
            },
            insertRoleInfo: function() {
            	if(this.role.roleName == ''){
            		 Toast('请输入角色名称');
            		return 
            	}
                let _this = this
                let params = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(this.$data.role)
                }
                api.role
                    .insertRoleInfo(params)
                    .then((res) => {
                        if (res.data.code === 'success') {
                            Toast(config.success.add)
                            _this.initRoleInfoToCache()
                            _this.closeAddModal()
                            bus.$emit('refresh-data')
                        }
                    })
            },
            initRoleInfoToCache: function() {
                let params = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({})
                }
                api.role
                    .initRoleInfoToCache(params)
                    .then((res) => {})
            },
            getSequence: function() {
                let _this = this
                let params = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        serviceCode: config.role.serviceCode
                    })
                }
                api.ordinalInfo
                    .getSequence(params)
                    .then((res) => {
                        if (res.data.code === 'success') {
                            _this.$data.role.roleCode = res.data.obj
                        }
                    })
            }
        },
        watch: {
            show: {
                handler(val) {
                    if (val === true) {
                        this.$data.role.roleName = ''
                        this.$data.role.roleMd5Seq = ''
                        this.$data.role.remark = ''
                        this.$data.role.isDeleted = '0'
                        this.getSequence()
                    }
                }
            }
        },
        components: {
            modal
        }
    }
</script>



