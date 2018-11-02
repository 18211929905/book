<template lang="html">
    <modal :show.sync="show" :large="true" :backdrop="false" effect="fade" width="80%">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title text-center">配置角色菜单关系</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <!--FORM BEGIN-->
                    <form class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-5">
                                    <div class="form-group">
                                        <label class="col-md-12 text-left">可选菜单</label>
                                        <div class="col-md-12">
                                            <select multiple="multiple" class="multi-select" v-model="menus">
                                                <template v-for="menu in initMenus">
                                                   <option :value="menu.menuCode">
                                                      {{ menu.menuName }}
                                                   </option>
                                                </template>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2">
                                    <center class="text-vertical">
                                        <button class="btn btn-default" type="button" @click="addItem()">
                                            <i class="icon-angle-right text-default"></i>
                                        </button>
                                        </br>
                                        </br>
                                        <button class="btn btn-default" type="button" @click="removeItem()">
                                            <i class="icon-angle-left text-default"></i>
                                        </button>
                                    </center>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-5">
                                    <div class="form-group">
                                        <label class="col-md-12">已选菜单</label>
                                        <div class="col-md-12">
                                            <select multiple="multiple" class="multi-select" v-model="selectedMenus">
                                                 <template v-for="selectedMenu in initSelectedMenus">
                                                    <option :value="selectedMenu.menuCode">
                                                        {{ selectedMenu.menuName }}
                                                    </option>
                                                 </template>
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
            <button type="button" class="btn btn-default" @click="closeMenuModal()">取消</button>
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
    import {
        Toast
    } from 'mint-ui'
    export default {
        props: {
            selectedRole: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                menus: [],
                selectedMenus: [],
                initMenus: [],
                initSelectedMenus: []
            }
        },
        methods: {
            closeMenuModal: function() {
                this.$emit('close-menu-modal')
            },
            addItem: function() {
                console.log(this.menus)
            },
            removeItem: function() {
                console.log(this.selectedMenus)
            },
            queryRoleHaveMenu: function() {
                let _this = this
                let params = {
                    body: JSON.stringify({
                        roleCode: _this.selectedRole.roleCode
                    })
                }
                api.roleMenu
                    .queryRoleHaveMenu(params)
                    .then((res) => {
                        if(res.data.code === 'success') {
                            let arr = res.data.obj
                            if (arr != null) {
                               _this.$data.initSelectedMenus = arr
                            }
                        }
                    })
            }
        },
        watch: {
            show: {
                handler(val) {
                    if (val === true) {
                        this.$data.initMenus = []
                        this.$data.initSelectedMenus = []
                        this.queryRoleHaveMenu()
                    }
                }
            }
        },
        components: {
            modal
        }
    }
</script>
