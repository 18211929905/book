<template>
<div class="row">
    <div class="col-md-12">
        <div class="portlet box">
            <div class="portlet-body">
                <div class="bootstrap-table bordered">
                    <div class="fixed-table-toolbar">
                        <div class="columns columns-right margin-bottom-10">
                            <button class="btn btn-primary" title="新增" data-toggle="modal" data-target="#updata" @click="addOrUpdata(0)">新增</button>
                            <button class="btn btn-success" title="更新" data-toggle="modal" data-target="#updata" @click="addOrUpdata(1)" v-if="checked">编辑</button>
                            <button class="btn btn-success" title="更新" @click="addOrUpdata(1)" v-else="checked">编辑</button>
                            <button class="btn btn-warning pull-right" @click="init">同步数据</button>
                        </div>
                    </div>
                    <div class="table-container">
                        <div class="fixed-table-body height-550 table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr class="text-center">
                                        <th v-show="datalist.length != 0"></th>
                                        <th class="text-center">序号</th>
                                        <th class="text-center">主车型编码</th>
                                        <!--<th class="text-center">厂家编码</th>
                                        <th class="text-center">品牌编码</th>
                                        <th class="text-center">车系编码</th>
                                        <th class="text-center">车型编码</th>
                                        <th class="text-center">排量编码</th>
                                        <th class="text-center">进气方式编码</th>-->
                                        <th class="text-center">车型完整名称</th>
                                        <!--<th class="text-center">车款</th>-->
                                        <!-- <th class="text-center">车款</th> -->
                                        <!--<th class="text-center">备注</th>-->
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr v-for="(data,index) in datalist">
                                        <td @click="check(index)"><input type="radio" name="radio" v-model="radioValue" :value="index"/></td>
                                        <td>{{index + 1 + (obj.pageNum-1) * 15}}</td>
                                        <td @click="AdditionalInfo(index)"><a :href="[AdditionalInfoUrl]">{{data.carCode}}</a></td>
                                       <!--  <td @click="AdditionalInfo(index)">{{data.carCode}}</td> -->
                                        <!--<td>{{data.factoryCode}}</td>
                                        <td>{{data.brandCode}}</td>
                                        <td>{{data.seriesCode}}</td>
                                        <td>{{data.modelCode}}</td>
                                        <td>{{data.opvCode}}</td>
                                        <td>{{data.ioTypeCode}}</td>-->
                                        <td>{{data.unionName}}</td>
                                      <!--  <td>{{data.displayName}}</td>-->
                                        <!-- <td>{{data.displayName}}</td> -->
                                        <!--<td>{{data.remark}}</td>-->
                                        <td>{{data.isDeleted | isDeleted}}</td>
                                    </tr>
                                    <tr v-show="datalist.length == 0">
                                        <td colspan='13' class="text-left">暂无数据...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <pager class="margin-left-10" @page-change="pageChange" 
                        :page-no="obj.pageNum" 
                        :page-size="obj.pageSize" 
                        :total-result="obj.total">
                        </pager>
                    </div>
                </div>
            </div>
            <!-- start-insert-modal -->
            <div class="modal fade" id="updata" aria-hidden="false">
                <div class="modal-dialog modal-wide">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                            <h4 class="modal-title text-center" v-if="!myStatus">新增主车型信息</h4>
                            <h4 class="modal-title text-center" v-if="myStatus">编辑主车型信息</h4>
                        </div>
                        <div class="modal-body form clearfix">
                            <form class="form-horizontal">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">主车型编码</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <input type="text" class="form-control" v-model="insertParams.carCode" readonly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">厂家</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <search 
                                                            ref="facSearch"
                                                            :hasCheck='facCheck'
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
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">品牌</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6 parent">
                                                        <search 
                                                            ref="braSearch"
                                                            :hasCheck='braCheck'
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
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">车系</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6 parent">
                                                        <search 
                                                            ref="serSearch"
                                                            :hasCheck='serCheck'
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
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">车型</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <search 
                                                            ref="modSearch"
                                                            :hasCheck='modCheck'
                                                            :dataList="modelList" 
                                                            :option="modOptionName" 
                                                            @dataChange="modChange" 
                                                            @itemValue="modItemClick" 
                                                            @clearValue="modClearValue"
                                                            @comScroll="modScroll">
                                                        </search>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">排量</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <search 
                                                            ref="opvSearch"
                                                            :hasCheck='opvCheck'
                                                            :dataList="opvList" 
                                                            :option="opvOptionName"
                                                            @dataChange="opvChange" 
                                                            @itemValue="opvItemClick" 
                                                            @clearValue="opvClearValue"
                                                            @comScroll="opvScroll">
                                                        </search>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <search 
                                                        ref="ioSearch"
                                                        :hasCheck='ioCheck'
                                                        :dataList="ioTypeList" 
                                                        :option="ioOptionName" 
                                                        @dataChange="ioChange" 
                                                        @itemValue="ioItemClick"
                                                        @clearValue="ioClearValue"
                                                        @comScroll="ioScroll">
                                                        </search>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--<div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">车款</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <input type="text" class="form-control" v-model="insertParams.displayName" />
                                                    </div>
                                                </div>
                                            </div>-->
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">状态</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <select class="form-control" v-model="insertParams.isDeleted">
																<option value="0">可用</option>
																<option value="1">停用</option>
															</select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="control-label col-md-5 col-lg-4 col-sm-5">备注</label>
                                                    <div class="col-md-7 col-lg-6 col-sm-6">
                                                        <input type="text" class="form-control" v-model="insertParams.remark" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="pull-right">
                                            <div class="col-md-12">
                                                <input type="button" class="btn btn-default" value="取消" data-dismiss="modal">
                                                <input type="button" class="btn btn-primary" value="确定" @click="insert(0)"  v-if="!myStatus" />
                                                <input type="button" class="btn btn-primary" value="确定" @click="insert(1)"  v-if="myStatus" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end-insert-modal -->
        </div>
    </div>
</div>
</div>
</div>
</template>

<script>
import api from "../../common/api.js";
import commonConfig from "../../common/commonConfig.js";
import { Toast } from "mint-ui";
import Search from "../../common/search";
import pager from '../../common/pager/Pager.vue'

export default {
  // name: 'page',
  props: {
    params: {
      type: Object,
      default: {}
    },
    query: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      datalist: [],
      insertParams: {
        carCode: "",
        factoryCode: "",
        brandCode: "",
        seriesCode: "",
        modelCode: "",
        opvCode: "",
        ioTypeCode: "",
        unionName: "",
        displayName: "",
        remark: "",
        isDeleted: "0"
      },
      detailParams: {
        carCode: "",
        factoryCode: "",
        brandCode: "",
        seriesCode: "",
        modelCode: "",
        opvCode: "",
        ioTypeCode: "",
        unionName: "",
        displayName: "",
        remark: "",
        isDeleted: ""
      },
      carCode: "",
      pages: 1,
      pageNum: 1,
      isLastPage: false,
      obj: {},
      myStatus: "",
      checked: false,

      brandList: [],
      braSearchData: "",
      braOptionName: "brandName",
      braParam: "",
      braPageStart: 1,
      braIsLastPage: false,
      pushBraList: [],
      braCheck: false,

      seriesList: [],
      serSearchData: "",
      serOptionName: "seriesName",
      serParam: "",
      serPageStart: 1,
      serIsLastPage: false,
      pushSerList: [],
      serCheck: false,

      factoryList: [],
      facSearchData: "",
      facOptionName: "factoryName",
      facParam: "",
      facPageStart: 1,
      facIsLastPage: false,
      pushFacList: [],
      facCheck: false,

      modelList: [],
      modSearchData: "",
      modOptionName: "modelName",
      modParam: "",
      modPageStart: 1,
      modIsLastPage: false,
      pushModList: [],
      modCheck: false,

      opvList: [],
      opvSearchData: "",
      opvOptionName: "opvName",
      opvParam: "",
      opvPageStart: 1,
      opvIsLastPage: false,
      pushOpvList: [],
      opvCheck: false,

      ioTypeList: [],
      ioSearchData: "",
      ioOptionName: "ioTypeName",
      ioTypeParam: "",
      ioPageStart: 1,
      ioIsLastPage: false,
      ioCheck: false,

      pushIoTypeList: [],
      AdditionalInfoUrl: "",
      radioValue: -1
    };
  },
  methods: {
    addOrUpdata(e) {
      this.facCheck = false
      this.braCheck = false
      this.serCheck = false
      this.modCheck = false
      this.opvCheck = false
      this.ioCheck = false

      if (!e) {
        this.myStatus = 0;
        let _params = commonConfig.carType.car;
        this.$refs.facSearch.setValue();
        this.$refs.braSearch.setValue();
        this.$refs.serSearch.setValue();
        this.$refs.modSearch.setValue();
        this.$refs.opvSearch.setValue();
        this.$refs.ioSearch.setValue();

        api.ordinalInfo
          .getSequence({
            serviceCode: _params
          })
          .then(res => {
            if (res.data.code === "success") {
              this.insertParams = {
                carCode: res.data.obj,
                factoryCode: "",
                brandCode: "",
                seriesCode: "",
                modelCode: "",
                opvCode: "",
                ioTypeCode: "",
                unionName: "",
                displayName: "",
                remark: "",
                isDeleted: "0"
              };
            }
          });
      } else {
        this.myStatus = 1;
        if (this.carCode) {
          let _params = this.carCode;
          api.carType.mainCarType
            .getFromCache({
              carCode: _params
            })
            .then(res => {
              if (res.data.code === "success")
                this.insertParams = res.data.obj;
                this.$refs.facSearch.setValue(this.insertParams.factoryName);
                this.$refs.braSearch.setValue(this.insertParams.brandName);
                this.$refs.serSearch.setValue(this.insertParams.seriesName);
                this.$refs.modSearch.setValue(this.insertParams.modelName);
                this.$refs.opvSearch.setValue(this.insertParams.opvName);
                this.$refs.ioSearch.setValue(this.insertParams.iotypeName);
            });
        } else {
          Toast(commonConfig.prompt.checkData);
        }
      }
    },
    insert(e) {
      if(!this.insertParams.factoryCode) {
        this.facCheck = true
        return 
      }else if(!this.insertParams.brandCode) {
        this.braCheck = true
        return 
      }else if(!this.insertParams.seriesCode) {
        this.serCheck = true
        return 
      }else if(!this.insertParams.modelCode) {
        this.modCheck = true
        return 
      }else if(!this.insertParams.opvCode) {
        this.opvCheck = true
        return 
      }else if(!this.insertParams.ioTypeCode) {
        this.ioCheck = true
        return 
      }
      let _params = this.insertParams;
      if (!e) {
        let insertPromise = new Promise((resolve, reject) => {
          let _carCode = _params.carCode;
          api.carType.saleMainCarType.getInsert(_params).then(res => {
            if (res.data.code === "success") {
              Toast(commonConfig.success.add);
              resolve(_carCode);
              this.insertParams.factoryCode = "";
              this.insertParams.brandCode = "";
              this.insertParams.seriesCode = "";
              this.insertParams.modelCode = "";
              this.insertParams.opvCode = "";
              this.insertParams.ioTypeCode = "";
              this.insertParams.unionName = "";
              this.insertParams.displayName = "";
              this.insertParams.remark = "";
            }
          });
        });
        insertPromise.then(_carCode => {
          $('#updata').modal('hide')
          this.getQueryInfo({
            carCode: _carCode
          });
        });
      } else {
        let updataPromise = new Promise((resolve, reject) => {
          let _carCode = this.carCode;
          api.carType.saleMainCarType.getUpdata(_params).then(res => {
            if (res.data.code === "success") {
              Toast(commonConfig.success.edit);
              resolve(_carCode);
              this.insertParams.factoryCode = "";
              this.insertParams.brandCode = "";
              this.insertParams.seriesCode = "";
              this.insertParams.modelCode = "";
              this.insertParams.opvCode = "";
              this.insertParams.ioTypeCode = "";
              this.insertParams.unionName = "";
              this.insertParams.displayName = "";
              this.insertParams.remark = "";
              this.insertParams.isDeleted = "0";
            }
          });
        });
        updataPromise.then(_carCode => {
          $('#updata').modal('hide')
          this.getQueryInfo({
            carCode: _carCode
          });
        });
      }
    },
    check(i) {
      this.checked = true;
      this.carCode = this.datalist[i].carCode;
    },
    AdditionalInfo: function(i) {
      this.checkData = this.datalist[i];
      sessionStorage.setItem("AdditionalInfo", JSON.stringify(this.checkData));
      sessionStorage.setItem("queryParams", JSON.stringify(this.query));
      
    },
    pageChange(s) {
      this.query.pageStart = s
      let _params = this.query;
      this.getQueryInfo(_params); 
    },
    init() {
      api.carType.mainCarType.init().then(res => {
        if (res.data.code === "success") {
          Toast(commonConfig.success.cache);
        }
      });
    },
    // 查询功能封装
    getQueryInfo(_params, flag = false) {
      if(flag) {
        this.AdditionalInfoUrl = commonConfig.menuMap["000153"];
      }
      this.radioValue = -1
      this.carCode = ''
      api.carType.saleMainCarType.getQueryInfo(_params).then(res => {
        if (res.data.code === "success") {
          let obj = res.data.obj;
          this.obj = obj;
          this.datalist = obj.list;
          this.pages = obj.pages;
          this.pageNum = obj.pageNum;
          this.isLastPage = obj.isLastPage;
          this.checked = false;
          if (!obj.pages) this.pages = 1;
        }
      });
    },

    // 品牌下拉 - 搜索
    getBrandQueryInfo(_brandName = "", pageStart = 1) {
      let _params;
      if (!_brandName) {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          isDeleted: 0
        };
      } else {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          brandName: _brandName,
          isDeleted: 0
        };
      }
      if (pageStart === 1) {
        api.carType.brand.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.brandList = res.data.obj.list;
          this.braIsLastPage = res.data.obj.isLastPage;
        });
      } else {
        api.carType.brand.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.pushBraList = res.data.obj.list;
          this.braIsLastPage = res.data.obj.isLastPage;
          this.brandList = this.brandList.concat(this.pushBraList);
        });
      }
    },
    braChange(data) {
      this.braSearchData = data;
    },
    braItemClick(item) {
      this.insertParams.brandCode = item.brandCode;
    },
    braScroll(scrollBottom) {
      if (scrollBottom && !this.braIsLastPage) {
        this.braPageStart += 1;
        this.getBrandQueryInfo(this.braParam, this.braPageStart);
      }
    },
    braClearValue() {
        this.insertParams.brandCode = ''
    },
    // 车系下拉 - 搜索
    getSeriesQueryInfo(_seriesName = "", pageStart = 1) {
      let _params;
      if (!_seriesName) {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          isDeleted: 0
        };
      } else {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          seriesName: _seriesName,
          isDeleted: 0
        };
      }
      if (pageStart === 1) {
        api.carType.series.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.seriesList = res.data.obj.list;
          this.serIsLastPage = res.data.obj.isLastPage;
        });
      } else {
        api.carType.series.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.pushSerList = res.data.obj.list;
          this.serIsLastPage = res.data.obj.isLastPage;
          this.seriesList = this.seriesList.concat(this.pushSerList);
        });
      }
    },
    serChange(data) {
      this.serSearchData = data;
    },
    serItemClick(item) {
      this.insertParams.seriesCode = item.seriesCode;
    },
    serScroll(scrollBottom) {
      if (scrollBottom && !this.serIsLastPage) {
        this.serPageStart += 1;
        this.getSeriesQueryInfo(this.serParam, this.serPageStart);
      }
    },
    serClearValue() {
      this.insertParams.seriesCode = ''
    },
    // 厂家下拉 - 搜索
    getFactoryQueryInfo(_factoryName = "", pageStart = 1) {
      let _params;
      if (!_factoryName && !arguments.length) {
        _params = {
          pageNums: 10,
          pageStart: 1,
          isDeleted: 0
        };
      } else {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          factoryName: _factoryName,
          isDeleted: 0
        };
      }
      if (pageStart === 1) {
        api.carType.factory.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.factoryList = res.data.obj.list;
          this.facIsLastPage = res.data.obj.isLastPage;
        });
      } else {
        api.carType.factory.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.pushFacList = res.data.obj.list;
          this.facIsLastPage = res.data.obj.isLastPage;
          this.factoryList = this.factoryList.concat(this.pushFacList);
        });
      }
    },
    facChange(data) {
      this.facSearchData = data;
    },
    facItemClick(item) {
      this.insertParams.factoryCode = item.factoryCode;
    },
    facScroll(scrollBottom) {
      if (scrollBottom && !this.facIsLastPage) {
        this.facPageStart += 1;
        this.getFactoryQueryInfo(this.facParam, this.facPageStart);
      }
    },
    facClearValue() {
      this.insertParams.factoryCode = ''
    },
    // 车型下拉 - 搜索
    getModelQueryInfo(_modelName = "", pageStart = 1) {
      let _params;
      if (!_modelName && !arguments.length) {
        _params = {
          pageNums: 10,
          pageStart: 1,
          isDeleted: 0
        };
      } else {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          modelName: _modelName,
          isDeleted: 0
        };
      }
      if (pageStart === 1) {
        api.carType.model.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.modelList = res.data.obj.list;
          this.modIsLastPage = res.data.obj.isLastPage;
        });
      } else {
        api.carType.model.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.pushModList = res.data.obj.list;
          this.modIsLastPage = res.data.obj.isLastPage;
          this.modelList = this.modelList.concat(this.pushModList);
        });
      }
    },
    modChange(data) {
      this.modSearchData = data;
    },
    modItemClick(item) {
      this.insertParams.modelCode = item.modelCode;
    },
    modScroll(scrollBottom) {
      if (scrollBottom && !this.modIsLastPage) {
        this.modPageStart += 1;
        this.getModelQueryInfo(this.modParam, this.modPageStart);
      }
    },
    modClearValue() {
      this.insertParams.modelCode = ''
    },
    // 排量下拉 - 搜索
    getOpvQueryInfo(_opvName = "", pageStart = 1) {
      let _params;
      if (!_opvName && !arguments.length) {
        _params = {
          pageNums: 10,
          pageStart: 1,
          isDeleted: 0
        };
      } else {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          opvName: _opvName,
          isDeleted: 0
        };
      }
      if (pageStart === 1) {
        api.carType.opv.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.opvList = res.data.obj.list;
          this.opvIsLastPage = res.data.obj.isLastPage;
        });
      } else {
        api.carType.opv.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.pushOpvList = res.data.obj.list;
          this.opvIsLastPage = res.data.obj.isLastPage;
          this.opvList = this.opvList.concat(this.pushOpvList);
        });
      }
    },
    opvChange(data) {
      this.opvSearchData = data;
    },
    opvItemClick(item) {
      this.insertParams.opvCode = item.opvCode;
    },
    opvScroll(scrollBottom) {
      if (scrollBottom && !this.opvIsLastPage) {
        this.opvPageStart += 1;
        this.getOpvQueryInfo(this.opvParam, this.opvPageStart);
      }
    },
    opvClearValue() {
      this.insertParams.opvCode = ''
    },
    // 进气方式下拉 - 搜索
    getIoTypeQueryInfo(_ioTypeName = "", pageStart = 1) {
      let _params;
      if (!_ioTypeName && !arguments.length) {
        _params = {
          pageNums: 10,
          pageStart: 1,
          isDeleted: 0
        };
      } else {
        _params = {
          pageNums: 10,
          pageStart: pageStart,
          ioTypeName: _ioTypeName,
          isDeleted: 0
        };
      }
      if (pageStart === 1) {
        api.carType.ioType.getQueryInfo(_params).then(res => {
          if (res.data.code === "success") this.ioTypeList = res.data.obj.list;
          this.ioIsLastPage = res.data.obj.isLastPage;
        });
      } else {
        api.carType.ioType.getQueryInfo(_params).then(res => {
          if (res.data.code === "success")
            this.pushIoTypeList = res.data.obj.list;
          this.ioIsLastPage = res.data.obj.isLastPage;
          this.ioTypeList = this.ioTypeList.concat(this.pushIoTypeList);
        });
      }
    },
    ioChange(data) {
      this.ioSearchData = data;
    },
    ioItemClick(item) {
      this.insertParams.ioTypeCode = item.ioTypeCode;
    },
    ioScroll(scrollBottom) {
      if (scrollBottom && !this.ioIsLastPage) {
        this.ioPageStart += 1;
        this.getIoTypeQueryInfo(this.ioTypeParam, this.ioPageStart);
      }
    },
    ioClearValue() {
      this.insertParams.ioTypeCode = ''
    }
  },
  watch: {
    braSearchData: function(data) {
      this.braPageStart = 1;
      this.braParam = data;
      this.getBrandQueryInfo(data, 1);
    },
    serSearchData: function(data) {
      this.serPageStart = 1;
      this.serParam = data;
      this.getSeriesQueryInfo(data, 1);
    },
    facSearchData: function(data) {
      this.facPageStart = 1;
      this.facParam = data;
      this.getFactoryQueryInfo(data, 1);
    },
    modSearchData: function(data) {
      this.modPageStart = 1;
      this.modParam = data;
      this.getModelQueryInfo(data, 1);
    },
    opvSearchData: function(data) {
      this.opvPageStart = 1;
      this.opvParam = data;
      this.getOpvQueryInfo(data, 1);
    },
    ioSearchData: function(data) {
      this.ioPageStart = 1;
      this.ioTypeParam = data;
      this.getIoTypeQueryInfo(data, 1);
    },
    // query(value) {
    //   this.AdditionalInfoUrl = commonConfig.menuMap["000152"];
    //   this.getQueryInfo(value);
    // }
  },
  filters: {
    isDeleted: function(value) {
      if (value == 1) {
        return "停用";
      } else {
        return "可用";
      }
    }
  },
  created() {
    this.getBrandQueryInfo();
    this.getSeriesQueryInfo();
    this.getFactoryQueryInfo();
    this.getModelQueryInfo();
    this.getOpvQueryInfo();
    this.getIoTypeQueryInfo();
  },
  components: {
    Search,
    pager
  }
};
</script>

<style lang="css" @scope>
.pageStyle {
  padding: 6px 12px;
}
.pageStyle a {
  line-height: 1.428571429;
  text-decoration: none;
}
.parent {
  position: relative;
}
.modal-dialog {
    padding-top: 150px !important;
}
</style>
