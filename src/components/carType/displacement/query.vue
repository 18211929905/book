<template>
<div class="row margin-top-20">
<div class="col-md-12">
<div class="portlet box">
<div class="portlet-body form"> 
<!--FORM BEGIN-->
<form class="form-horizontal">
<div class="form-body">
<div class="row">
<div class="col-md-5 col-lg-5 col-sm-5">
<div class="form-group">
<label class="control-label col-md-5 col-lg-4 col-sm-5">排量编码:</label>
<div class="col-md-7 col-lg-5 col-sm-6">
<input type="text" class="form-control" v-model="info.opvCode"/>
</div>
</div>
</div>
<div class="col-md-5 col-lg-5 col-sm-5">
<div class="form-group">
<label class="control-label col-md-5 col-lg-4 col-sm-5">排量名称:</label>
<div class="col-md-7 col-lg-5 col-sm-6">
<input type="text" class="form-control" v-model="info.opvName"/>
</div>
</div>
</div>
<div class="col-md-2"></div>
</div>

<div class="row">
<div class="col-md-5 col-lg-5 col-sm-5">
<div class="form-group">
<label class="control-label col-md-5 col-lg-4 col-sm-5">排量缩写:</label>
<div class="col-md-7 col-lg-5 col-sm-6">
<input type="text" class="form-control" v-model="info.opvAddrName"/>
</div>
</div>
</div>
<div class="col-md-5 col-lg-5 col-sm-5">
<div class="form-group">
<label class="control-label col-md-5 col-lg-4 col-sm-5">前缀:</label>
<div class="col-md-7 col-lg-5 col-sm-6">
<input type="text" class="form-control" v-model="info.prefixValue"/>
</div>
</div>
</div>
<div class="col-md-2"></div>
</div>
<div class="row">
<div class="pull-right">
<div class="col-md-12">
<input type="reset" class="btn btn-default" @click="oReset" value="重置">
<input type="button" class="btn btn-primary" @click="query" value="查询">
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
    import commonConfig from "../../common/commonConfig.js";

    export default {
        data() {
            return {
                info: {
                    opvCode: "",
                    opvName: "",
                    opvAddrName: "",
                    prefixValue: "",
                    pageNums: commonConfig.pageNums,
                    pageStart: 1	
                }
            }
        },
        methods: {
            query() {
                this.$emit('go', this.info)
            },
            oReset() {
                this.info = {}
            }
        }
    }
</script>

<style>
</style>