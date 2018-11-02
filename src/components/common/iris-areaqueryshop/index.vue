<template>
    <div class="row warp">
        <div class="col-md-6" @click="inputshow">
            <div class="form-group">
                <!-- <label class="control-label col-md-4">请选择销售区域</label> -->
                <div class="col-md-12">
                    <input  class="form-control" type="text" v-model="salesValue" readonly/>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <select class="form-control" :disabled="disabled" v-model="selectValue">
                <option v-for="(item, index) in options" :value="item.value" :key="index">{{item.text}}</option>
            </select>
            <!-- <b-form-select v-model="selectValue" :options="options" ></b-form-select> -->
        </div>
        <div class="treepick-warp text-left" v-if="show">
            <Tree ref="tree" :data="treeData" style="border: none;" :show-checkbox="true" :check-strictly="true" :highlight-current='true' :props="propOption" :load="loadNodeSales" lazy empty-text="暂无数据" @check-change="handleCheckChange">
            </Tree>
            <div class="text-right">
                <button type="button" class="pull-right btn btn-info" @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../api'
    import {
        Tree
    } from 'element-ui'
    export default {
        data() {
            return {
                options: [{
                    value: 0,
                    text: '请选择经销商店'
                }],
                selectValue: 0,
                selectData: {},
                treeData: [],
                availableType: "",
                selesNanme: "",
                disabled: false,
                propOption: {
                    label: 'name',
                    children: 'zones'
                },
                show: false,
                salesValue: ""
            }
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            setselect(sotreData) {
                console.log(6666)
                console.log(sotreData)
                if(typeof sotreData == 'object'){
                    api.storeInfo.queryShopInfo({
                        storeCode:sotreData.value
                        },(msg)=>{
                            if(msg.data.message == 'success'){
                                this.options = [{
                                    value: 0,
                                    text: "请选择经销商店"
                                },sotreData]
                                this.selectValue = sotreData.value;
                                this.salesValue = msg.data.obj.salesName
                            }
                    })
                }
            },
            stopBubble(e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation(); //w3c
                } else {
                    window.event.cancelBubble = true; //IE
                }
            },
            loadNodeSales(node, resolve) {
                if (node.level === 0) {
                    if (this.availableType === '1' || this.availableType === '2') {
                        api.getSalesAreaInfoByUserAvailableAllLevel((msg) => {
                            if (msg.data.message == "success" && msg.data.obj.length != 0) {
                                return resolve([{
                                    name: msg.data.obj[0].areaName || "",
                                    code: msg.data.obj[0].areaCode || ""
                                }]);
                            }
                        })
                    }
                    return;
                }
                api.area.getSalesAreaInfoByAreaCode({
                    areaCode: node.data.code
                }, (msg) => {
                    //获取子集
                    let data = msg.data.obj.salesAreaSubInfo || 0
                    let arr = [];
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            arr[i] = {
                                name: data[i].areaName,
                                code: data[i].areaCode
                            }
                        }
                        return resolve(arr);
                    }
                    return resolve([])
                })
            },
            handleCheckChange() {},
            confirm() {
                let data = this.$refs.tree.getCheckedNodes() //选择的树形结构
                this.show = false;
                this.salesValue = this.renovateValue(data)
                if (data.length !== 0) {
                    this.$emit('sales-data', data)
                    let arr = [];
                    //在这里查询经销商店
                    for (var i = 0; i < data.length; i++) {
                        arr.push(data[i].code);
                    }
                    api.finance.queryShopInfo({
                        salesAreaCodes: arr,
                        needPageFlag: "0"
                    }, (msg) => {
                        if (msg.data.message == 'success') {
                            this.options = [{
                                value: 0,
                                text: '请选择经销商店'
                            }, ]
                            let obj = msg.data.obj;
                            for (var i = 0; i < obj.length; i++) {
                                this.$set(this.options, i + 1, {
                                    text: obj[i].storeName,
                                    value: obj[i].storeCode
                                })
                            }
                        } else if (msg.data.message == "销售区域为空") {
                            this.options = [{
                                value: 0,
                                text: '请选择经销商店'
                            }, ]
                        }
                    })
                    this.treeData = data;
                    this.$emit('select-change', data, '');
                }
            },
            inputshow() {
                this.stopBubble()
                if (this.disabled) {
                    this.show = false
                    return
                }
                this.show = true
            },
            renovateValue(data) {
                //因为唯一标识符是code name可能会出现重复所以value需要在datas变化的时候重新计算一遍
                var value = ""
                for (var i = 0; i < data.length; i++) {
                    value += data[i].name + " "
                }
                return value
            },
            reset() {
                this.selectValue = 0
                this.options = [{
                    value: 0,
                    text: '请选择经销商店'
                }, ]
                this.salesValue = ''
                this.treeData = []
            },
            // setselect(sotreData, sotreValue, areaName) {
            //     if (sotreData && sotreValue) {
            //         this.options = sotreData
            //         this.selectValue = sotreValue
            //         this.salesValue = areaName
            //     } else {
            //         return
            //     }
            // },
            // //store,area  例如：{text:'苏州元星',code:'REFD000012'}
            // setselect2(store, area) {
            //     if(area && area.text && area.code ){
            //         this.salesValue = area.text;
            //     }

                
            // }
        },
        watch: {
            selectValue: function() {
                for (var i = 0; i < this.options.length; i++) {
                    if (this.options[i].value == this.selectValue) {
                        this.selectData = this.options[i]
                        this.$emit('select-change', this.treeData, this.selectData)
                        return;
                    }
                }
            },
            options: function() {
                if (this.selectValue == 0) {
                    this.$emit('select-change', this.treeData, this.selectData)
                }
            },
            readonly: function() {
                if (this.readonly) {
                    this.disabled = true
                } else {
                    this.disabled = false
                }
            },
        },
        components: {
            Tree
        },
        created() {
            this.$nextTick(function() {
                document.addEventListener('click', (event) => {
                    this.show = false
                })
            })
            api.getUserAvailableInfo((msg) => {
                if (msg.data.message === 'success') {
                    this.availableType = msg.data.obj.availableType
                    if (this.availableType === '0') {
                        this.$set(this.options, 1, {
                            value: msg.data.obj.storeInfoVo.storeCode,
                            text: msg.data.obj.storeInfoVo.storeName
                        })
                        this.salesValue = msg.data.obj.storeInfoVo.salesName
                        this.selectValue = msg.data.obj.storeInfoVo.storeCode
                        this.treeData = {
                            code: this.selectValue,
                            name: this.salesValue
                        }
                        this.disabled = true
                    }
                }
            })
        }
    }
</script>

<style lang="css">
    .treepick-warp {
        width: 100%;
        position: absolute;
        height: 200px;
        overflow: auto;
        box-shadow: 0 6px 8px 0 rgba(155, 155, 155, 0.50);
        background-color: #fff;
        z-index: 999;
        top: 100%;
        padding: 0 5px;
        box-sizing: border-box;
    }
    .warp {
        position: relative;
    }
    .treepicker-inner {
        width: 100% !important;
        height: 200px !important;
    }
    .treepicker-popup {
        width: 200% !important;
    }
</style>
