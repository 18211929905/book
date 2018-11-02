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
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">角色编码:</label>
                                        <div class="col-md-7 col-lg-5 col-sm-7">
                                            <input type="text" class="form-control" v-model="role.roleCode"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label class="control-label col-md-5 col-lg-3 col-sm-5">角色名称:</label>
                                        <div class="col-md-7 col-lg-5 col-sm-7">
                                            <input type="text" class="form-control" v-model="role.roleName"/>
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
    export default {
        data: function() {
            return {
                role: {
                    roleCode: '',
                    roleName: '',
                    roleMd5Seq: '',
                    remark: '',
                    pageNums: 15,
                    pageStart: 1
                }
            }
        },
        methods: {
            search: function() {
                this.$emit('search', this.$data.role) 
            },
            reset: function() {
                this.$data.role = {
                    roleCode: '',
                    roleName: '',
                    roleMd5Seq: '',
                    remark: '',
                    pageNums: 15,
                    pageStart: 1
                }
            }
        },
        components: {
            
        }
    }
</script>

<style>

</style>