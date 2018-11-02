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
<input type="text" class="form-control" v-model="info.carCode"/>
</div>
</div>
</div>
<div class="col-md-5 col-lg-5 col-sm-5">
<div class="form-group">
<label class="control-label col-md-5 col-lg-4 col-sm-5">厂家:</label>
<div class="col-md-7 col-lg-5 col-sm-6">
    <search
    	ref ="select1"
        :dataList="factoryList"
        :option="facOptionName"
        @dataChange="facChange"
        @itemValue="facItemClick"
        @clearValue="facClearValue"
        @comScroll="facScroll">
    </search>
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
    <search
    	ref ="select2"
        :dataList="brandList"
        :option="braOptionName"
        @dataChange="braChange"
        @itemValue="braItemClick"
        @clearValue="braClearValue"
        @comScroll="braScroll">
    </search>
</div>
</div>
</div>
<div class="col-md-5 col-lg-5 col-sm-5">
<div class="form-group">
<label class="control-label col-md-5 col-lg-4 col-sm-5">车系:</label>
<div class="col-md-7 col-lg-5 col-sm-6">
    <search
    	ref ="select3"
        :dataList="seriesList"
        :option="serOptionName"
        @dataChange="serChange"
        @itemValue="serItemClick"
        @clearValue="serClearValue"
        @comScroll="serScroll">
    </search>
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
    <search
    	ref ="select4"
        :dataList.sync="modelList"
        :option="modOptionName"
        @dataChange="modChange"
        @itemValue="modItemClick"
        @clearValue="modClearValue"
        @comScroll="modScroll">
    </search>
</div>
</div>
</div>
<div class="col-md-5 col-lg-5 col-sm-5">
<div class="form-group">
<label class="control-label col-md-5 col-lg-4 col-sm-5">排量:</label>
<div class="col-md-7 col-lg-5 col-sm-6">
    <search
    	ref ="select5"
        :dataList.sync="opvList"
        :option="opvOptionName"
        @dataChange="opvChange"
        @itemValue="opvItemClick"
        @clearValue="opvClearValue"
        @comScroll="opvScroll">
    </search>
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
    <search
    	ref ="select6"
        :dataList.sync="ioTypeList"
        :option="ioOptionName"
        @dataChange="ioChange"
        @itemValue="ioItemClick"
        @clearValue="ioClearValue"
        @comScroll="ioScroll">
    </search>
</div>
</div>
</div>
</div>
<div class="row">
<div class="pull-right">
<div class="col-md-12">
<input type="reset" class="btn btn-default" @click="resetParams" value="重置">
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

    import api from "../../common/api.js"
    import Search from '../../common/search'

    export default {
        props: {
            params: {
                type: Object,
                default: {}
            }
        },
        created() {
            this.getBrandQueryInfo()
			this.getSeriesQueryInfo()
            this.getFactoryQueryInfo()
            this.getModelQueryInfo()
            this.getOpvQueryInfo()
            this.getIoTypeQueryInfo()
		},
        data: function() {
            return {
                info: {
                    carCode: "",
                    factoryCode: "",
                    brandCode: "",
                    seriesCode: "",
                    modelCode: "",
                    opvCode: "",
                    ioTypeCode: "",
                    pageNums: 15,
                    pageStart: 1
                },
                brandList: [],
                braSearchData: '',
				braOptionName: 'brandName',
                braParam: '',
                braPageStart: 1,
                braIsLastPage: false,
                pushBraList: [],

				seriesList: [],
				serSearchData: '',
				serOptionName: 'seriesName',
                serParam: '',
                serPageStart: 1,
                serIsLastPage: false,
                pushSerList: [],

                factoryList: [],
                facSearchData: '',
				facOptionName: 'factoryName',
                facParam: '',
                facPageStart: 1,
                facIsLastPage: false,
                pushFacList: [],

                modelList: [],
				modSearchData: '',
				modOptionName: 'modelName',
                modParam: '',
                modPageStart: 1,
                modIsLastPage: false,
                pushModList: [],

                opvList: [],
				opvSearchData: '',
				opvOptionName: 'opvName',
                opvParam: '',
                opvPageStart: 1,
                opvIsLastPage: false,
                pushOpvList: [],

                ioTypeList: [],
				ioSearchData: '',
				ioOptionName: 'ioTypeName',
                ioTypeParam: '',
                ioPageStart: 1,
                ioIsLastPage: false,
                pushIoTypeList: [],
            }
        },
        methods: {
            query() {
                this.$emit('go', this.info);
            },
            resetParams() {
                this.info = {
                    pageNums: 15,
                    pageStart: 1
                }
                this.$refs.select1.clearValue();
                this.$refs.select2.clearValue();
                this.$refs.select3.clearValue();
                this.$refs.select4.clearValue();
                this.$refs.select5.clearValue();
                this.$refs.select6.clearValue();
               
            },
            // 品牌下拉 - 搜索
            getBrandQueryInfo(_brandName = "", pageStart = 1) {
				let _params
				if(!_brandName) {
                    _params = {
						pageNums: 10,
                        pageStart: pageStart,
                        isDeleted: 0
					}
				}else {
					_params = {
						pageNums: 10,
                        pageStart: pageStart,
                        brandName: _brandName,
                        isDeleted: 0
					}
				}
                if(pageStart === 1) {
                    api.carType.brand.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.brandList = res.data.obj.list;
                        this.braIsLastPage = res.data.obj.isLastPage
                    })
                }else {
                    api.carType.brand.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.pushBraList = res.data.obj.list;
                        this.braIsLastPage = res.data.obj.isLastPage
                        this.brandList = this.brandList.concat(this.pushBraList)
                    })
                }
			},
			braChange(data) {
				this.braSearchData = data
			},
			braItemClick(item) {
				this.info.brandCode = item.brandCode
			},
            braScroll(scrollBottom) {
                if(scrollBottom && !this.braIsLastPage) {
                    this.braPageStart += 1
                    this.getBrandQueryInfo(this.braParam, this.braPageStart)
                }
            },
            braClearValue() {
                this.info.brandCode = '';
            },
            // 车系下拉 - 搜索
			getSeriesQueryInfo(_seriesName = "", pageStart = 1) {
				let _params
				if(!_seriesName) {
                    _params = {
						pageNums: 10,
                        pageStart: pageStart,
                        isDeleted: 0
					}
				}else {
					_params = {
						pageNums: 10,
                        pageStart: pageStart,
                        seriesName: _seriesName,
                        isDeleted: 0
					}
				}
                if(pageStart === 1){
                    api.carType.series.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.seriesList = res.data.obj.list;
                        this.serIsLastPage = res.data.obj.isLastPage
                    })
                }else {
                    api.carType.series.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.pushSerList = res.data.obj.list;
                        this.serIsLastPage = res.data.obj.isLastPage
                        this.seriesList = this.seriesList.concat(this.pushSerList)
                    })
                }
			},
			serChange(data) {
				this.serSearchData = data
			},
			serItemClick(item) {
				this.info.seriesCode = item.seriesCode
			},
            serScroll(scrollBottom) {
                if(scrollBottom && !this.serIsLastPage) {
                    this.serPageStart += 1
                    this.getSeriesQueryInfo(this.serParam, this.serPageStart)
                }
            },
            serClearValue() {
                this.info.seriesCode = '';
            },
            // 厂家下拉 - 搜索
            getFactoryQueryInfo(_factoryName = "", pageStart = 1) {
				let _params
				if(!_factoryName && !arguments.length) {
                    _params = {
						pageNums: 10,
                        pageStart: 1,
                        isDeleted: 0
					}
				}else {
					_params = {
						pageNums: 10,
                        pageStart: pageStart,
                        factoryName: _factoryName,
                        isDeleted: 0
					}
				}
                if(pageStart === 1){
                    api.carType.factory.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.factoryList = res.data.obj.list;
                        this.facIsLastPage = res.data.obj.isLastPage
                    })
                }else {
                    api.carType.factory.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.pushFacList = res.data.obj.list;
                        this.facIsLastPage = res.data.obj.isLastPage
                        this.factoryList = this.factoryList.concat(this.pushFacList)
                    })
                }
			},
			facChange(data) {
				this.facSearchData = data
			},
			facItemClick(item) {
				this.info.factoryCode = item.factoryCode
			},
            facScroll(scrollBottom) {
                if(scrollBottom && !this.facIsLastPage) {
                    this.facPageStart += 1
                    this.getFactoryQueryInfo(this.facParam, this.facPageStart)
                }
            },
            facClearValue() {
                this.info.factoryCode = '';
            },
            // 车型下拉 - 搜索
            getModelQueryInfo(_modelName = "", pageStart = 1) {
				let _params
				if(!_modelName && !arguments.length) {
                    _params = {
						pageNums: 10,
                        pageStart: 1,
                        isDeleted: 0
					}
				}else {
					_params = {
						pageNums: 10,
                        pageStart: pageStart,
                        modelName: _modelName,
                        isDeleted: 0
					}
				}
                if(pageStart === 1){
                    api.carType.model.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.modelList = res.data.obj.list;
                        this.modIsLastPage = res.data.obj.isLastPage
                    })
                }else {
                    api.carType.model.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.pushModList = res.data.obj.list;
                        this.modIsLastPage = res.data.obj.isLastPage
                        this.modelList = this.modelList.concat(this.pushModList)
                    })
                }
			},
			modChange(data) {
				this.modSearchData = data
			},
			modItemClick(item) {
				this.info.modelCode = item.modelCode
			},
            modScroll(scrollBottom) {
                if(scrollBottom && !this.modIsLastPage) {
                    this.modPageStart += 1
                    this.getModelQueryInfo(this.modParam, this.modPageStart)
                }
            },
            modClearValue() {
                this.info.modelCode = '';
            },
            // 排量下拉 - 搜索
            getOpvQueryInfo(_opvName = "", pageStart = 1) {
				let _params
				if(!_opvName && !arguments.length) {
                    _params = {
						pageNums: 10,
                        pageStart: 1,
                        isDeleted: 0
					}
				}else {
					_params = {
						pageNums: 10,
                        pageStart:pageStart,
                        opvName: _opvName,
                        isDeleted: 0
					}
				}
                if(pageStart === 1){
                    api.carType.opv.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.opvList = res.data.obj.list;
                        this.opvIsLastPage = res.data.obj.isLastPage
                    })
                }else {
                    api.carType.opv.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.pushOpvList = res.data.obj.list;
                        this.opvIsLastPage = res.data.obj.isLastPage
                        this.opvList = this.opvList.concat(this.pushOpvList)
                    })
                }
			},
			opvChange(data) {
				this.opvSearchData = data
			},
			opvItemClick(item) {
				this.info.opvCode = item.opvCode
			},
            opvScroll(scrollBottom) {
                if(scrollBottom && !this.opvIsLastPage) {
                    this.opvPageStart += 1
                    this.getOpvQueryInfo(this.opvParam, this.opvPageStart)
                }
            },
            opvClearValue() {
                this.info.opvCode = '';
            },
            // 进气方式下拉 - 搜索
            getIoTypeQueryInfo(_ioTypeName = "", pageStart = 1) {
				let _params
				if(!_ioTypeName && !arguments.length) {
                    _params = {
						pageNums: 10,
                        pageStart: 1,
                        isDeleted: 0
					}
				}else {
					_params = {
						pageNums: 10,
                        pageStart: pageStart,
                        ioTypeName: _ioTypeName,
                        isDeleted: 0
					}
				}
                if(pageStart === 1){
                    api.carType.ioType.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.ioTypeList = res.data.obj.list;
                        this.ioIsLastPage = res.data.obj.isLastPage
                    })
                }else {
                    api.carType.ioType.getQueryInfo(_params).then((res) => {
                        if(res.data.code === 'success') this.pushIoTypeList = res.data.obj.list;
                        this.ioIsLastPage = res.data.obj.isLastPage
                        this.ioTypeList = this.ioTypeList.concat(this.pushIoTypeList)
                    })
                }

			},
			ioChange(data) {
				this.ioSearchData = data
			},
			ioItemClick(item) {
				this.info.ioTypeCode = item.ioTypeCode
			},
            ioScroll(scrollBottom) {
                if(scrollBottom && !this.ioIsLastPage) {
                    this.ioPageStart += 1
                    this.getIoTypeQueryInfo(this.ioTypeParam, this.ioPageStart)
                }
            },
            ioClearValue() {
                this.info.ioTypeCode = '';
            }
        },
        watch: {
            braSearchData: function(data) {
                 this.braPageStart = 1
                 this.braParam = data
				this.getBrandQueryInfo(data, 1)
			},
			serSearchData: function(data) {
                 this.serPageStart = 1
                 this.serParam = data
				this.getSeriesQueryInfo(data, 1)
			},
            // 当滚动到底部的时候再次输入查询，执行了一次监听事件后  又执行了facScroll事件
            //（如果手动把滚动条往上拉一拉，后续查询正常） => 为什么
            // 解决 : 查询数据更新时,让组件的scrollTop = 0
            facSearchData: function(data) {
                 this.facPageStart = 1
                 this.facParam = data
                 this.getFactoryQueryInfo(data, 1)
			},
            modSearchData: function(data) {
                this.modPageStart = 1
                this.modParam = data
				this.getModelQueryInfo(data, 1)
			},
            opvSearchData: function(data) {
                this.opvPageStart = 1
                this.opvParam = data
				this.getOpvQueryInfo(data, 1)
			},
            ioSearchData: function(data) {
                this.ioPageStart = 1
                this.ioTypeParam = data
				this.getIoTypeQueryInfo(data, 1)
			}
        },
        components: {
			Search
		},
    }
</script>

<style>
</style>
