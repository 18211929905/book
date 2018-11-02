<template>
<div class="row">
<div class="col-md-12">
<div class="portlet box">
<div class="portlet-body">
    <div class="bootstrap-table bordered">
        <div class="fixed-table-toolbar">
            <div class="columns columns-right margin-bottom-10">
                <button class="btn btn-primary" title="新增" @click="add">新增</button>
                <button class="btn btn-success" title="保存" @click="save">保存</button>
            </div>
        </div>
        <div class="table-container">
            <div class="fixed-table-body height-550 table-scrollable" ref="table">
                <table class="table table-striped table-hover table-bordered">
                    <thead >
                        <tr>
                            <th class="text-center" v-for="(item, i) in carList" :key="i">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.carName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-center hover-tbody">
                        <tr v-for="(item, i) in propsList" :key="i" @mouseover="mouseoverTr(i)" @mouseout="mouseoutTr(i)">
                            <td>{{item.refDetailName}}</td>
                            <td v-for="(addItem, index) in addList" :key="index" >
                                <input type="text" v-model="addList[index][item.refDetailCode]">
                            </td>
                        </tr>
                    </tbody>
                </table>
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
import { Toast } from 'mint-ui'

const REQUIRED     = '信息未填写完整!',
      REPEAT       = '数据重复, 请重新填写!',
      SUCCESS      = '提交成功',
      HEADER_TITLE = '附加信息',
      MAX_NUMS     = 10,
      MAX_PAGENUMS = 100
      

/**
 * @see
 *    create by lwx on 2018/02/09
 *    tr hover功能待完善 => 固定列头, hover功能已完善 2018/02/11
 *    第一列内容td宽度, 根据第一列 列头宽度进行动态计算( 始终和列头宽度保持一致 )
 *    功能实现的有点小复杂, 主要是对数据的处理, 倒来倒去
 *    页面所需数据和后台数据结构有出入, ( 中间层 用于处理数据 )
 * 
 * @function
 *    compare     =>  比较数据是否有重复,
 *    isRequired  =>  校验信息是否填写完整,
 *    canPush     =>  是否可以添加, 兼是否可以保存
 * 
 */
 
export default {
    data() {
        return {
            carList: [],      // 表头车型
            propsList: [],    // 车型附加信息
            addList: [],      // 添加列表
            addItem: {},
            count: 1,
            carCode: JSON.parse(sessionStorage.getItem("AdditionalInfo")).carCode,
            isInsert: true,
        }
    },
    mounted() {
        this.getProps()
 
        let table = this.$refs.table 
        table.addEventListener('scroll', (e) => {
            
            let columnHead = e.path[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0],
                columnBody = e.path[0].childNodes[0].children[1].childNodes,
                     width = columnHead.offsetWidth   // clientWidth  offsetWidth  scrollWidth
            
            columnHead.style.position = 'absolute'
            columnHead.style.width = width + 'px'
            columnHead.style.backgroundColor = '#fff'
            
            for(let i = 0; i < columnBody.length; i++) {
                columnBody[i].childNodes[0].style.position = 'absolute'
                columnBody[i].childNodes[0].style.width = width + 'px'
                columnBody[i].childNodes[0].style.paddingBottom = 14 + 'px'                
                if(i % 2 === 0) {
                    columnBody[i].childNodes[0].style.backgroundColor = '#f9f9f9'
                }else {
                    columnBody[i].childNodes[0].style.backgroundColor = '#fff'
                }
                if(e.srcElement.scrollLeft === 0) {
                    columnBody[i].childNodes[0].style.position = ''
                    columnBody[i].childNodes[0].style.width = width + 'px'
                }
            }
            if(e.srcElement.scrollLeft === 0) {
                columnHead.style.position = ''
                columnHead.style.width = width + 'px'
                columnHead.style.backgroundColor = '#fff'
            }
        })
    },
    methods: {
        mouseoverTr(index) {    
            let columnBody = this.$refs.table.childNodes[0].childNodes[2].childNodes
            for(let i = 0; i < columnBody.length; i++) {     
                columnBody[index].childNodes[0].style.backgroundColor = '#F6F5F4'           
            }
        },

        mouseoutTr(index) {
            let columnBody = this.$refs.table.childNodes[0].childNodes[2].childNodes
            for(let i = 0; i < columnBody.length; i++) {                
                if(i % 2 === 0) {
                    columnBody[i].childNodes[0].style.backgroundColor = '#f9f9f9'
                }else {
                    columnBody[i].childNodes[0].style.backgroundColor = '#fff'
                }
            }
        },

        save() {
            if(this.canPush(this.addList, true)) {
                let params = []
                this.addList.forEach(item => {
                    for( let key in item) {
                        if(item.hasOwnProperty(key) && key !== "carDetailCode") {
                            let data = {
                                "addCode": key,
                                "addValue": item[key],
                                "carCode": this.carCode,
                                "carDetailCode": item.carDetailCode,
                                "id": item[`${key}id`] || null
                            }
                            params.push(data)
                        }
                    }
                })
                for(let i = 0; i < params.length; i++) {
                    if(params[i].addCode.substr(params[i].addCode.length - 2) === 'id') {
                        params.splice(i, 1)
                    }
                }
                this.insertOrUpdate(params)
            }
        },

        add() {
            if(this.canPush(this.addList)) {
                this.resetObj(this.addItem)
                let item = JSON.parse(JSON.stringify(this.addItem))
                this.getSequence((res) => {
                    item.carDetailCode = res
                    this.addList.push(item)

                    if(!this.isInsert) {
                        this.count =  this.addList.length - 1
                    }
                    this.count ++
                    let obj = {carName: `车型-${this.count}`}
                    this.carList.push(obj)
                })
            }
        },
     
        getProps() {
            this.getParams().then((_propsList) => {
                this.queryListInfo(_propsList, () => {
                    let item = JSON.parse(JSON.stringify(this.addItem))
                    this.getSequence((res) => {
                        item.carDetailCode = res
                    })
                    this.propsList = _propsList
                    this.addList.push(item)

                    this.getData()
                })
            })
        },
         
        getParams() {
            return new Promise((resolve, reject) => {
                api.getDataDictionary({
                    refCode: commonConfig.AdditionalInfo.infoRefCode
                }).then((msg) => {
                    let _propsList = []      // 缓存优化, 数据一起渲染. 消除视觉差
                    _propsList = msg.data.obj.referenceDetailInfos;
                    _propsList.forEach(item => {
                        this.addItem[item.refDetailCode] = ''
                    })
                    resolve(_propsList)
                })
            })
        },

        getData() {
            let _carList = [
                {carName: HEADER_TITLE},
                {carName: `车型-${this.count}`},                
            ]
            this.carList = _carList
        },

        insertOrUpdate(params) {
            api.carType.saleMainCarType.addCarMainInfo(params).then((res) => {
                if (res.data.message == "success") {
                    Toast(SUCCESS)
                    this.queryListInfo(this.propsList)
                }
            })
        },
        
        queryListInfo(propsList, noData = () => {}) {
            api.getQueryCarMainCar({
                carCode: this.carCode,
                pageStart: 1,
                pageNums: MAX_PAGENUMS,
            }).then((res) => {
                if(res.data.message === 'success') {
                    if(!res.data.obj.hasOwnProperty('mapInfos')) {
                        noData()
                        return
                    }
                    this.isInsert = false
                    this.propsList = propsList
                    let mapInfos = res.data.obj.mapInfos,
                        count = 0

                    this.carList = []
                    this.addList = []
                    this.carList.push({carName: HEADER_TITLE})
                    
                    for(let item in mapInfos) {
                        let _addItem = {}
                        mapInfos[item].forEach(_item => {
                            _addItem[_item.addCode] = _item.addValue
                            _addItem.carDetailCode = _item.carDetailCode
                            _addItem[`${_item.addCode}id`] = _item.id
                            this.addList.push(_addItem)
                        })
                    }

                    let unique = {};
                    this.addList.forEach((gpa) => { 
                        unique[ JSON.stringify(gpa) ] = gpa 
                    });
                    this.addList = Object.keys(unique).map((u) => {
                        return JSON.parse(u) 
                    }); 

                    this.addList.forEach(item => {
                        count ++
                        let obj = {carName: `车型-${count}`}
                        this.carList.push(obj)
                    })
                }
            })
        },

        getSequence(res) {
            api.ordinalInfo.getSequence({
                serviceCode: commonConfig.AdditionalInfo.infoServiceCode
            }).then((msg) => {
                let obj = msg.data.obj
                res(obj)
            })
        },

        canPush(arr, isSave = false, maxNum = MAX_NUMS) {
            const length = arr.length
            if(this.isRequired(arr) === false) {
                Toast(REQUIRED)
                return false
            }
            if(this.compare(arr)) {
                Toast(REPEAT)
                return false
            }
            if(length === 1) {
                return true
            }else if(!isSave && length >= maxNum) {
                Toast(`最多添加${maxNum}条数据`)                
                return false
            }else if(!this.compare(arr) 
                    && arr.length > 1  
                    && !isSave ? arr.length !== maxNum : arr.length <= maxNum) {
                return true
            } 
        },

        isRequired(arr) {
            let i = 0,
                len = arr.length - 1
            for(; i <= len; i ++) {
                for(let item in arr[i]) {
                    if(arr[i].hasOwnProperty(item) 
                      && !arr[i][item] 
                      && item !== 'carDetailCode'
                      && item.substr(item.length - 2) !== 'id') {
                        return false
                    }
                }
            }
        },

        resetObj(obj) {
            for(let item in obj) {
                if(obj.hasOwnProperty(item)) {
                    obj[item] = ''
                }
            } 
        },

        compare(arr) {
            let unique = {},
                _arr = [],
                newArr = JSON.parse(JSON.stringify(arr)),
                len = newArr.length

            newArr.forEach(item => {
                delete item.carDetailCode
                for(let key in item) {
                    if(item.hasOwnProperty(key) && key.substr(key.length - 2) === 'id') {
                        delete item[key]
                    }
                }
            })

            newArr.forEach(gpa => { 
                unique[ JSON.stringify(gpa) ] = gpa 
            })
            _arr = Object.keys(unique).map((u) => {
                return JSON.parse(u) 
            })
            return len !== _arr.length ? true : false
        },
    }
}
</script>
<style>
.hover-tbody tr:hover {
    background-color: #F6F5F4
}
</style>


