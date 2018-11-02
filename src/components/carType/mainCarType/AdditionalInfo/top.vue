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
                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">主车型编码:</label>
                                    <div class="col-md-7 col-lg-5 col-sm-6">
                                        <input type="text" class="form-control" v-model="mainCarType.carCode" readonly/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5 col-lg-5 col-sm-5">
                                <div class="form-group">
                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">厂家:</label>
                                    <div class="col-md-7 col-lg-5 col-sm-6">
                                        <input type="text" class="form-control" v-model="mainCarType.factoryName" readonly/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2"></div>
                        </div>

                        <div class="row">
                            <div class="col-md-5 col-lg-5 col-sm-5">
                                <div class="form-group">
                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">品牌:</label>
                                    <div class="col-md-7 col-lg-5 col-sm-6">
                                        <input type="text" class="form-control" v-model="mainCarType.brandName" readonly/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5 col-lg-5 col-sm-5">
                                <div class="form-group">
                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">车系:</label>
                                    <div class="col-md-7 col-lg-5 col-sm-6">
                                        <input type="text" class="form-control" v-model="mainCarType.seriesName" readonly/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2"></div>
                        </div>

                        <div class="row">
                            <div class="col-md-5 col-lg-5 col-sm-5">
                                <div class="form-group">
                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">车型:</label>
                                    <div class="col-md-7 col-lg-5 col-sm-6">
                                        <input type="text" class="form-control" v-model="mainCarType.modelName" readonly/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5 col-lg-5 col-sm-5">
                                <div class="form-group">
                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">排量:</label>
                                    <div class="col-md-7 col-lg-5 col-sm-6">
                                        <input type="text" class="form-control" v-model="mainCarType.opvName" readonly/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2"></div>
                        </div>

                        <div class="row">
                            <div class="col-md-5 col-lg-5 col-sm-5">
                                <div class="form-group">
                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式:</label>
                                    <div class="col-md-7 col-lg-5 col-sm-6">
                                        <input type="text" class="form-control" v-model="mainCarType.iotypeName" readonly/>

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
import api from "../../../common/api.js"
export default {
    data: function() {
        return {
            mainCarType: {},
            mainCarCode: "",
            mainCarTypeInfo:{}
        }
    },
    created() {
        this.mainCarTypeInfo = JSON.parse(sessionStorage.getItem("AdditionalInfo"));
        api.carType.mainCarType.getFromDB({carCode:this.mainCarTypeInfo.carCode}).then((msg)=>{
                if(msg.data.message == 'success'){
                    this.mainCarType = msg.data.obj
                }
        })
    }
}
</script>

<style>
</style>
