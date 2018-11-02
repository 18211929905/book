<template>
<div>
	<div class="card">
		<div class="card-header">
			车型扩展信息
		</div>
		<div class="card-body">
			<button type="button" class="btn btn-danger" @click="delet">删除</button>
			<button type="button" class="btn btn-primary" @click="dialogVisible = true">新增扩展信息</button>
			<button type="button" class="btn btn-success" @click="save">保存</button>
			<div class="flex skucar">
				<div  class="row" style="width:35%; margin-left: 0;">
					<dl class="col-lg-2 col-sm-2 no-padding">
						<dt>选择</dt>
						<dd v-for="item in list">
							<input type="radio" v-model="selectValue" :value="item.addCode"> 
						</dd>
					</dl>
					<dl class="col-lg-5 col-sm-5 no-padding">
						<dt>扩展属性</dt>
						<dd v-for="item in list">
							{{item.addName}}
						</dd>
					</dl>
					<dl class="col-lg-5 col-sm-5 no-padding">
						<dt class="skucar" style="">
							<button @click="resetAddSel" class="btn btn-default btn-sm" size="sm" >重置</button> 
							<button @click="saveCarAdd" class="btn btn-success">确定</button>
						</dt>
						<dd v-for="item in list">
							<input type="text" v-model="item.addValue" style="line-height:20px;width: 100px;" />
						</dd>
					</dl>
				</div>
					
					<div class="flex" style=" width:65%;overflow: auto; margin-left: 15px;">
						<dl v-for="(item,index) in addList">
							<dt class="skucar" style="min-width: 160px;">
							<button @click="coty(index)" class="btn btn-default" >复制</button>
							<button @click="de(index)" class="btn btn-danger" >删除</button>
							</dt>
							<dd v-for="x in item">
								{{ x.addValue  }}
							</dd>
						</dl>
					</div>
					
			</div>
		</div>
	</div>
	<el-dialog
		:visible.sync="dialogVisible"
		@open="open"
		@close ="close"
	  	title="新增扩展信息">
  		 <div class="car-add-search">
			 <el-input
				placeholder="筛选附加信息"
				icon="close"
				v-model="modelName"
				:on-icon-click="clearTxt"
				>
			</el-input>
		 </div>
		 <div>
		 	 <el-checkbox-group v-model="checkList">
			    <div style="margin-left: 15px; margin-top: 20px;">
			    	<label v-for="(item,index) in modelAddList" class="labelWidth">
			    		<el-checkbox :label="item.refDetailName"  :key="index" :disabled="item.disabled">
			    		</el-checkbox>
			    	</label>
			    </div>
			  </el-checkbox-group>
		 </div>
		<div slot="footer" class="dialog-footer ">
		    <button @click="dialogVisible = false" class="btn btn-default">取 消</button>
		    <button type="button" @click="ok"  class="btn btn-primary">确 定</button>
		</div>
	</el-dialog>
</div>
</template>

<script>
import Vue from 'vue'	
import api from "../../../common/api.js"
import commonConfig from "../../../common/commonConfig.js"
import { Toast } from 'mint-ui'
import {Table,TableColumn,Dialog,Input,CheckboxGroup,Checkbox,Select,Option} from 'element-ui'
Vue.use(Dialog)
Vue.use(Input)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)

const REQUIRED     = '信息未填写完整!',
      REPEAT       = '数据重复, 请重新填写!',
      SUCCESS      = '提交成功',
      HEADER_TITLE = '附加信息',
      MAX_NUMS     = 10,
      MAX_PAGENUMS = 100
      

/**
 * @see
 *    create by zhangweili  
 * 
 */
export default {
    data() {
        return {
        	selectValue:'',
        	modelAddList:[],
        	checkList:[],
        	modelName:'',
           	list:[],
           carAddList:[],
           dialogVisible:false,
           carAddSellList:[],
           addList:[],
        }
    },
    mounted() {
    	this.getModelText();
      	this.queryListInfo()
    },
    methods: {
    	getModelText(val=''){
    		this.modelAddList = []
			const option={
	    		"refCode":"MainModelAdd",
	    		"refDetailName":val.trim(),
	    		"pageNums":1000,
	    		"pageStart":1
	    	}
	    	api.queryDictionaryDetails(option).then((res)=>{
	    		const obj = res.data.obj.list;
	    		obj.forEach(item=>{
	    			if(item.isDeleted != 1){
	    				this.modelAddList.push({
			    			refDetailName:item.refDetailName,
			    			refDetailCode:item.refDetailCode,
			    			disabled:false,
			    		})
	    			}
	    		})
	    		this.open();
	    	});
	    	
    	},
    	//清空输入框的内容
    	clearTxt(){
    		this.modelName = ''
    	},
    	//保存接口
    	save(){
    		let flag = false
    		//判断全是空再次判断
	  		this.addList.forEach((item,i)=>{
	  			let num =0;
	  			item.forEach(x=>{
	  				if(x.addValue == ''){
	  					num++
	  				}
	  				if(num == item.length){
	  					flag = true
	  				}
	  			})
	  		})
	  		if(flag){
    			 Toast('数据不能全部为空')
    			return
    		}
    		if(!this.addList.length){
    			 Toast('数据不能为空')
    			return
    		}
    		let saveList=[];
    		this.addList.forEach(item=>{
    			saveList.push(...item)
    		})
    		if(!saveList.length){
    			saveList = [{
    				carCode:JSON.parse(sessionStorage.getItem("AdditionalInfo")).carCode,
    				isDelete:1
    			}]
    		}
    		this.getSquence().then((obj)=>{
    			api.AddCarMainInfo(saveList).then((res) => {
	                if (res.data.message == "success") {
	                	this.addList = [];
	                	this.list = [];
	                    Toast('操作成功')
	                    this.queryListInfo()
	                }
	            })
    		})
    	},
    	//查询扩展信息接口
    	queryListInfo(){
    		 api.getQueryCarMainCar({
                carCode: JSON.parse(sessionStorage.getItem("AdditionalInfo")).carCode,
                pageStart: 1,
                pageNums: MAX_PAGENUMS,
            }).then(res=>{
            	let arr =[];
            	let newArr = [];
            	let kzList=[];
            	for(let k of res.data.obj.pageInfo.list){
            		arr.push(k.addCode)
            	}
            	arr.forEach((item,i)=>{
            		if(newArr.indexOf(item)== -1){
            			newArr.push(item);
            			this.list.push({
            				addCode:res.data.obj.pageInfo.list[i].addCode,
		    				addName:res.data.obj.pageInfo.list[i].addName,
			    			addValue:'',
            			})
            		}
            	})
            	for(let k of Object.keys(res.data.obj.mapInfos)){
            		let arr = [];
            		/*arr.push(res.data.obj.mapInfos[k])*/
            		this.list.forEach((item,i)=>{
            			const index = res.data.obj.mapInfos[k].findIndex(v=>v.addCode == item.addCode);
            			if(index == -1){
            				arr.push({
            					addCode:item.addCode,
		    					addName:item.addName,
			    				addValue:'',
            				})
            			}else{
            				arr.push({
            					addCode:item.addCode,
		    					addName:item.addName,
			    				addValue:res.data.obj.mapInfos[k][index].addValue,
            				})
            			}
            		})
            		
            		this.addList.push(arr)
            	}
	    	})
        },
    	getSquence(){
    		return new Promise((resolve,reject)=>{
    			const option ={
    				getNums:this.addList.length,
    				serviceCode:'CARADD',
    			}
    			api.ordinalInfo.getSequenceList(option,res=>{
    				if(res.data.code == 'success'){
    					this.addList.forEach((item,i)=>{
    						item.forEach(list=>{
    							list.carDetailCode = res.data.obj[i];
	    						list.carCode = JSON.parse(sessionStorage.getItem("AdditionalInfo")).carCode;
    						})
	    				})
    					resolve(this.addList);
    				}
    			})
    		})
    	},
    	resetAddSel(){
    		this.list.forEach(item=>{
    			item.addValue = ''
    		})
    	},
    	 saveCarAdd(){
		  		console.log(this.list);
		  		let flag = false;
		  		let flags = false;
		  		let emptyNum = 0;
		  		this.addList.forEach(item=>{
		  			let size = 0;
		  			item.forEach((x,index)=>{
		  				if(x.addCode == this.list[index].addCode){
		  					if(x.addValue == this.list[index].addValue){
		  						size++
		  					}
		  				}
		  			})
		  			if(size == this.list.length){
		  				flag = true
		  				return 
		  			}
		  		})
		  		this.list.forEach(item=>{
		  			if(item.addValue == ''){
		  				emptyNum++
		  			}
		  		})
	  			if(emptyNum == this.list.length){
	  				flags = true
	  			}
		  		if(flag || flags ){
		  			if(flag){
		  				 Toast('数据不能重复')
		  			}else{
		  				Toast('数据不能全部为空')
		  			}
		  			return 	
		  		}else{
	  				const list2 = JSON.parse(JSON.stringify(this.list))
	  			/*	list2.forEach(item => {
	  					if(item.addValue==''){
	  						item.addValue=''
	  					}
	  				})*/
			  		this.addList.push([...list2])
			  		console.log(this.addList);
		  		}
		  	
		  	},
		  	de(index){
		  		/*if(this.addList[index][0].id){
		  			this.addList[index].forEach(item=>{
		  				item.isDeleted = 1
		  			})
		  			this.save();
		  		}else{
	  				this.addList.splice(index,1)
		  		}*/
		  		//更新接口后的操作
		  		this.addList.splice(index,1)
		  	},
		  	coty(index){
		  		this.addList[index].forEach((item,i)=>{
		  			this.list[i].addValue = item.addValue
		  		})
		  	},
		  	delet(){
		  		if(this.selectValue == ''){
		  			Toast('请选择一条数据')
		  			return
		  		}
		  		let arr = [];
		  		const index = this.list.findIndex(v=>v.addCode == this.selectValue);
		  		this.list.splice(index,1)
		  		this.addList.forEach((items,In)=>{
			  		const index = items.findIndex(v=>v.addCode == this.selectValue )
			  		if(index !== -1){
			  			items.splice(index,1)
			  		}
			  	})

		  		this.addList.forEach((item,i)=>{
		  			arr.push(JSON.stringify(item))
		  		})
		  		let brr = Array.from(new Set(arr));
		  		brr.forEach((item,i)=>{
		  			brr[i] = JSON.parse(item)
		  		})
		  		this.addList = brr
		  		console.log(this.addList)
		  		//判断全是空的去掉
		  		this.addList.forEach((item,i)=>{
		  			let num =0;
		  			item.forEach(x=>{
		  				if(x.addValue == ''){
		  					num++
		  				}
		  				if(num == item.length){
		  					brr.splice(i,1)
		  				}
		  			})
		  		})
		  		//重新再去赋值
		  		this.addList = brr
		  		this.selectValue = ''
		  	},
    	ok(){
    		console.log(this.checkList)
    		
    		this.checkList.forEach(item=>{
    			const index = this.modelAddList.findIndex(v=>v.refDetailName == item);
    			if(index != -1){
    				this.list.push({
	    				addCode:this.modelAddList[index].refDetailCode,
	    				addName:item,
		    			addValue:'',
		    			carCode:'',
		    			carDetailCode:'',
	    			})
    			}
    		})
    		this.dialogVisible = false;
    		
    	},
    	open(){
    		this.checkList =[];
    		console.log(this.list)
    		console.log(this.modelAddList)
    		this.list.forEach(item=>{
    			const index = this.modelAddList.findIndex(v=>v.refDetailName == item.addName);
    			if(index != -1){
    				this.modelAddList[index].disabled = true
    			}else{
    				this.modelAddList[index].disabled = false
    			}
    		})
    	},
    	close(){
    		this.modelName = ''
    	},
    },
  filters:{
  	 texts(val){
  	 	if(val==''){
  	 		return '/'
  	 	}else{
  	 		return val
  	 	}
  	 }
  },
  watch:{
	  	list(val,val1){
	  		this.addList.forEach((item,i)=>{
	  			if(item.length !== this.list.length){
	  				this.list.forEach((x,i)=>{
	  					const index = item.findIndex(v=>v.addCode == x.addCode)
	  					if(index == -1){
	  						item.push({
		  						addCode:x.addCode,
		  						addName:x.addName,
		  						addValue:'',
		  						carCode:JSON.parse(sessionStorage.getItem("AdditionalInfo")).carCode,
		  						carDetailCode:item[0].carDetailCode
		  					})
	  					}
	  				})
	  					
	  				
	  			}
	  		})
	  	},
  		modelName(val){
  			this.getModelText(val);
  			
  		}
  }
}
</script>
<style scoped>
.no-padding{
	padding: 0;
}
.flex{ display: flex;}
.hover-tbody tr:hover {
    background-color: #F6F5F4
}
.card {
    margin-bottom: 1.5rem;
}
.card {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #c2cfd6;
}

.card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    border-bottom: 1px solid #c2cfd6;
    background-color: #edf1f7;
    width: auto;
   
}
.card dl dt{
	   height: 50px;
	   line-height: 50px;
	    background-color: #f0f3f5;
	    padding: 0 10px;
	    border: 1px solid #c2cfd6;
}
.card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
}


.inp-invalid{
	border-color: #f86c6b!important;
}
.inp-invalid input{
	border: 1px solid #f86c6b!important;
}
.card-header div{
	font-weight: bold!important;
}
.car-add-search{
	padding: 5px 14px;
}
.car-add-box{
	width: 100%;
	height: 300px;
	overflow: auto;
}
.skucar-box{
	display: flex;
	width: 100%;
	flex-flow: row nowrap;

}
.skucar-table-left{
	flex: 0 0 200px!important;
	-webkit-box-flex: 0 0 200px!important;	
}
.skucar-table-left>table td{
	white-space:nowrap!important;
}
.skucar-table-right{
	flex: 1 1 auto;
	overflow: auto;
}
.skucar th{
	height: 28px;
}
.skucar button{
	padding: 0 4px!important;
}
.card dl dd{
	height: 50px;
	line-height: 50px;
	border: 1px solid #c2cfd6;
	padding: 0 20px;
}
.skucar-table1{
	width: 30px;
}
.skucar-table2{
	width: 170px;
}
.skucar-box table{
	margin: 0;
}
.skucar-box, .skucar-box::before, *::after {
    box-sizing: content-box; 
}
.checkbox-box{
	display: block;
}
.skucar-inpt-tab-center table tr td:nth-child(1){
	text-align: center!important;
}

.labelWidth{
	width: 200px;
}
</style>


