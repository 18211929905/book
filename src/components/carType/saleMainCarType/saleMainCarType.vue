<template>
    <div>
    	
	    <commonheader></commonheader>

	    <div class="clearfix"></div>
	    
	    <div class="page-container">
	        <sidebar></sidebar>

	        <!-- BEGIN PAGE -->
	        <div class="page-content-wrapper">
	            <div class="page-content">
	                <pageheader :breadNav="breadNav"></pageheader>
	                <!-- main 从这开始 -->
	                <query @go='change' :params="params"></query>
                    <listbody ref="list" :params="params" :query="listParams"></listbody>
	                <!-- main从这结束 -->
	            </div>
            </div>
            <!-- END PAGE -->
	    </div>
	    <commonfooter></commonfooter>
	    
	    
    </div>
</template>

<script>
	
    import commonConfig from "../../common/commonConfig.js";
    import api from '../../common/api.js';
    import commonheader from '../../common/header.vue';
    import sidebar from '../../common/sidebar.vue';
    import commonfooter from '../../common/footer.vue';
    import pageheader from '../../common/pageheader';
    import query from './query.vue';
    import listbody from './listbody.vue';
    
    export default {
        data() {
            return {
               breadNav:commonConfig.breadNav.saleMainCarType,
               params: {
                    factoryCodeItems: [],
                    brandCodeItems: [],
                    seriesCodeItems: [],
                    modelCodeItems: [],
                    opvCodeItems: [],
                    ioTypeCodeItems: []
               },
               listParams: {},
               querys:{
               	  	carCode: "",
                    factoryCode: "",
                    brandCode: "",
                    seriesCode: "",
                    modelCode: "",
                    opvCode: "",
                    ioTypeCode: "",
                    pageNums: 15,
                    pageStart: 1
               }
            };
        },
        created() {
            this.getFactory()
            //this.getBrand()
            //this.getSeries()
            this.getModel()
            this.getOpv()
            this.getIoType() 
        },
        mounted() {
            let _queryParams = sessionStorage.getItem('queryParams')
            if(_queryParams) {
               this.$refs.list.getQueryInfo(JSON.parse(_queryParams), true)
            }
        },
        components:{
            commonheader,
            sidebar,
            commonfooter,
            pageheader,
            query,
	        listbody
        },
        methods: {
            change(e) {
               this.querys = e;
               e.pageNums = commonConfig.pageNums;
               e.pageStart = 1;
               this.listParams = e
               this.$refs.list.getQueryInfo(e, true)
            },
            getFactory() {
                let _this = this;
                api.carType.factory.getQueryInfo({"pageNums":commonConfig.maxPageNums}).then(function(res) {
                    _this.params.factoryCodeItems = res.data.obj.list;
                });
            },
            getBrand() {
                let _this = this;
                api.carType.brand.getQueryInfo({"pageNums":commonConfig.maxPageNums}).then(function(res) {
                    _this.params.brandCodeItems = res.data.obj.list;
                })
            },
            getSeries() {
                let _this = this;
                api.carType.series.getQueryInfo({"pageNums":commonConfig.maxPageNums}).then(function(res) {
                    _this.params.seriesCodeItems = res.data.obj.list;
                })
            },
            getModel() {
                let _this = this;
                api.carType.model.getQueryInfo({"pageNums":commonConfig.maxPageNums}).then(function(res) {
                    _this.params.modelCodeItems = res.data.obj.list;
                })
            },
            getOpv() {
                let _this = this;
                api.carType.opv.getQueryInfo({"pageNums":commonConfig.maxPageNums}).then(function(res) {
                    _this.params.opvCodeItems = res.data.obj.list;
                })
            },
            getIoType() {
                let _this = this;
                api.carType.ioType.getQueryInfo({"pageNums":commonConfig.maxPageNums}).then(function(res) {
                    _this.params.ioTypeCodeItems = res.data.obj.list;
                })
            },
        }    
    }

</script>