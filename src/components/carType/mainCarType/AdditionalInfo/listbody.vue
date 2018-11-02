<template>
<div class="row">
    <div class="col-md-12">
        <div class="portlet box">
            <div class="portlet-body">
                <div class="bootstrap-table bordered">
                    <div class="fixed-table-toolbar">
                        <div class="columns columns-right margin-bottom-10">
                            <button class="btn btn-primary" title="新增" @click="addInfo()">新增</button>
                            <button class="btn btn-success" title="更新" @click="addCarMainInfo()">提交</button>
                        </div>
                    </div>
                    <div class="table-container">
                        <div class="fixed-table-body height-550 table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr class="text-center">
                                        <th class="text-center" v-for="item in referenceDetailInfos" :key="item.id">{{item.refDetailName}}</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr v-for=" item in addButton">
                                        <th class="text-center" v-for="item in referenceDetailInfos" :key="item.id"><input @click="refDetailCode(item.refDetailCode)" @change="change($event)" type="text" class="form-control" /></th>
                                    </tr>
                                    <tr v-for="item in queryList">
                                        <th class="text-center" v-for="val in item"><input type="text" class="form-control" @click="refDetailCode(val.addCode,val.carDetailCode,val.id)" @change="change($event)" :value="val.addValue" :readonly="isreadonly" /></th>
                                    </tr>
                                    <tr v-if="haveData">
                                        <td colspan='13' class="text-left">暂无数据...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="fixed-table-pagination clearfix">
                            <div class="row pull-right">
                                <div class="col-md-12 pagination">
                                    <span class="margin-right-10">第 {{pageNum}} 页 / 共 {{pages}} 页  </span>
                                    <button class="pageStyle">
										                       <a href="javascript:;" @click="Perv()"><span>上一页</span></a>
									                 </button>
                                   <button class="pageStyle">
										                       <a href="javascript:;" @click="Next()"><span>下一页</span></a>
									                 </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</template>

<script>
import api from "../../../common/api.js"
import commonConfig from "../../../common/commonConfig.js"
import {
    Toast
} from 'mint-ui'
export default {
    data() {
        return {
            referenceDetailInfos: "", //存储表头数据
            addCode: "", //附加信息字典编码
            addValue: "", //附加信息内容
            carCode: JSON.parse(sessionStorage.getItem("AdditionalInfo")).carCode, //从sessionStorage里面拿主车型编码
            carDetailCode: "", //明细车型编码
            addButton: 0, //用来新增空白行来新增数据
            haveData: true, //用来控制暂无数据是否显示
            params: [], //用来存储更新或新增的接口参赛
            queryList: [], //用来存储查询到的数据
            carId: undefined, //修改的数据需要ID用来存储主键ID
            isreadonly: false, //当新增空白行的时候来控制其他的input不可修改
            pageStart: 1, //用来获取第几页的分页
            pageNums: 15, //每页展示多少条数据
            pages: "", //分页总数
            pageNum: "" //当前分页数
        }
    },
    methods: {
        addCarMainInfo: function() {
            //当点击提交的时候触发
            if (this.isreadonly) {
                //当isreadonly为true说明是新增的数据 就要为当前所有数据添加同一个车型明细编码
                //获取车型明细编码
                api.ordinalInfo.getSequence({
                    serviceCode: commonConfig.AdditionalInfo.infoServiceCode
                }).then((msg) => {
                    for (var i = 0; i < this.params.length; i++) {
                        this.params[i].carDetailCode = msg.data.obj
                    }
                    api.addCarMainInfo(this.params).then((msg) => {
                        if (msg.data.message == "success") {
                            this.isreadonly = false; //新增成功让其他input可修改
                            this.addButton = 0; //新增空白行删除掉
                            this.queryInfo(); //刷新当前分页的信息
                            Toast(commonConfig.success.add);
                        }
                    })
                })
            } else {
                //进入这里说明是修改的数据直接打包发送后台
                api.addCarMainInfo(this.params).then((msg) => {
                    if (msg.data.message == "success") {
                        this.isreadonly = false;
                        Toast(commonConfig.success.edit);
                    }
                })
            }
        },
        change: function(event) {
            //当一个input框值值被改变并且失去焦点的时候收集当前这个input的信息打包成数据存储起来
            let obj = {
                addCode: this.addCode,
                addValue: event.target.value,
                carCode: this.carCode,
                carDetailCode: this.carDetailCode,
                id: this.carId
            };
            for (var i = 0; i < this.params.length; i++) {
                //如果有重复修改的把前面的删除
                if ((this.params[i].id === this.carId && this.carDetailCode) || this.params[i].addCode === this.addCode) {
                    this.params.splice(i, 1);
                }
            }
            this.params.push(obj)
        },
        refDetailCode: function(code, carDetailCode, id) {
            //当input被点击的时候在这里收集当前input的附加信息字典编码和明细车型编码
            this.addCode = code;
            this.carDetailCode = carDetailCode;
            this.carId = id;
        },
        addInfo: function() {
            this.addButton = 1;
            this.isreadonly = true;
        },
        queryInfo: function() {
            //查询主车型附加信息
            api.getQueryCarMainCar({
                carCode: this.carCode,
                pageStart: this.pageStart,
                pageNums: this.pageNums,
            }).then((msg) => {
                if (msg.data.obj.mapInfos) {
                    this.queryList = msg.data.obj.mapInfos;
                    this.pages = msg.data.obj.pageInfo.pages;
                    this.pageNum = msg.data.obj.pageInfo.pageNum;
                    this.haveData = false;
                } else {
                    this.haveData = true;
                }

            })
        },
        Perv: function() {
            //上一页
            if (!(this.pageNum <= 1)) {
                this.pageStart--;
                this.queryInfo();
            }
        },
        Next: function() {
            //下一页
            if (!(this.pageNum >= this.pages)) {
                this.pageStart++;
                this.queryInfo();
            }
        }
    },
    created() {
        //获取表头
        api.getDataDictionary({
            refCode: commonConfig.AdditionalInfo.infoRefCode
        }).then((msg) => {
            this.referenceDetailInfos = msg.data.obj.referenceDetailInfos;
        })
        //查询主车型附加信息
        this.queryInfo()
    }
}
</script>

<style lang="css" @scope>
    .pageStyle {
		padding: 6px 12px;
	}
	.pageStyle a {
        line-height:1.428571429;
		text-decoration:none;
	}
	.parent {
		position: relative;
	}
</style>
