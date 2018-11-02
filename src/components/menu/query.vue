<template>
    <div class="row margin-top-20">
        <div class="col-md-12">
            <div class="portlet box">
                <div class="portlet-body form">
                    <!--FORM BEGIN-->
                    <form class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">菜单编码:</label>
                                        <div class="col-md-7 col-lg-5 col-sm-7">
                                            <input type="text" class="form-control" v-model="menu.menuCode" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">菜单名称:</label>
                                        <div class="col-md-7 col-lg-5 col-sm-7">
                                            <input type="text" class="form-control" v-model="menu.menuName" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">菜单路径:</label>
                                        <div class="col-md-7 col-lg-5 col-sm-7">
                                            <input type="text" class="form-control" v-model="menu.menuPath" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">备注:</label>
                                        <div class="col-md-7 col-lg-5 col-sm-7">
                                            <input type="text" class="form-control" v-model="menu.remark" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                               <div class="col-md-3 col-md-offset-9 col-sm-3 col-sm-offset-9 col-xs-6 col-xs-offset-6">
                                 <div class="form-group">
                                   <div class="col-md-12 text-right">
                                     <button type="reset" class="btn btn-default" @click="reset">重置</button>
                                     <button type="button" class="btn btn-primary" @click="search">查询</button>
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
    </div>
</template>

<script>
    import config from '../common/commonConfig.js'
    import api from '../common/api.js'

    export default {
        data: function() {
            return {
                menu: {
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
                }
            }
        },
        methods: {
            search: function() {
                this.$emit('search', this.$data.menu)
            },
            reset: function() {
                this.$data.menu = {
                    fatherMenuCode: '',
                    menuCode: '',
                    releationCodeList: '',
                    menuName: '',
                    menuPath: '',
                    needLogin: '1',
                    isDisplay: 1,
                    buttonType: '',
                    remark: '',
                    pageNums: 15,
                    pageStart: 1
                }
            }
        },
        components: {}
    }
</script>

<style>

</style>
