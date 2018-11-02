<template>
	<div>
		<!--<b-modal hide-footer title="待办事项列表" ref="myModel" size="lg" id="emp-insert2" @show="reload">-->
		<el-dialog
		:visible.sync="dialogVisible"
		@open="open"
		@close ="close"
	  	title="待办事项列表">
			<div class="row">
				<div class="col-md-4 col-lg-4">
	                <div class="form-group">
						<label class="control-label col-md-4 col-lg-4 col-sm-4 padding0">单据类型</label>
						<div class="col-md-8 col-lg-8 col-sm-8 padding0">
							<select class="form-control" v-model="query.orderTypeCode">
								<option v-for="item of billType" :value="item.value">{{ item.text }}</option>
							</select>
						</div>
					</div>
				</div>	
				<div class="col-md-4 col-lg-4">
                   <div class="form-group">
						<label class="control-label col-md-3 col-lg-3 col-sm-3 padding0">单号</label>
						<div class="col-md-9 col-lg-9 col-sm-9 padding0">
							<input type="text" class="form-control" v-model="query.orderNo"/>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-lg-4">
	                <div class="form-group">
						<label class="control-label col-md-4 col-lg-4 col-sm-4 padding0">审批状态</label>
						<div class="col-md-8 col-lg-8 col-sm-8 padding0">
							<select class="form-control" v-model="query.nodeStatus">
								<option v-for="item of approvalStatus" :value="item.value">{{ item.text}}</option>
							</select>
						</div>
					</div>
				</div>	
			</div>
			<div class="row">
				<div class="col-lg-12 col-md-12 margin-top-10">
					<div class="pull-right">
						<button class="btn btn-default" @click="reset">重置</button>
						<button class="btn btn-primary" @click="getList()">查询</button>
					</div>
				</div>
			</div>
                 <div class="table-container">
                        <div class="fixed-table-body height-550 table-scrollable">
                            <table class="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr class="text-center">
                                        <th class="text-center" v-for="item in field">{{item}}</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr v-for="item in list">
                                        <td> 
                                        	<div @click="hideModal">
												<span ><a href="#" @click="changeHref(item.orderNo,item.orderTypeCode,item.orderWfCode)">{{item.orderNo}}</a></span>
						                    </div>
                                        </td>
                                        <td>{{item.orderTypeName}}</td>
                                        <td>{{item.storeName}}</td>
                                        <td>{{item.createByName}}</td>
                                        <td>{{item.createTimeStr}}</td>
                                        <td>{{item.nodeStatus | setnodeStatus}}</td>
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
		</el-dialog>
	</div>
</template>

<script>
import Vue from 'vue'	
import api from "../api";
import pager from '../../common/pager/Pager.vue'
/*import { getType } from 'common/com-api'*/
import common from '../../../assets/js/common'
import config from "../commonConfig.js"; 
import {Message, MessageBox} from 'element-ui'
import {Table,TableColumn,Dialog,Input,CheckboxGroup,Checkbox,Select,Option} from 'element-ui'
Vue.use(Dialog)
export default{
	 components: {
      pager
    },
	data(){
		return{
			isPro:false,
			islive:false,
			islivecs:true,
			dialogVisible:false,//弹层显示
			list:[{
				a:'3333'
			}],
			field:['单号','单据类型','门店','提交人','提交时间','审批状态'],
			approvalStatus:[{
				text:'待审批',
				value:-1
			},{
				text:'驳回',
				value:0
			},{
				text:'通过',
				value:1
			}],//审批状态
			billType:[],
			query:{
				orderTypeCode:'',
				orderNo:'',
				nodeStatus:null,
			},
			page:{
				pageNo:1,
				pageSize:config.pageNums,
				totalPages:0,
				totalResult:1,
			},
			getCount:0,
			obj:{},
			getOrigin:'',
		}
	},
	mounted(){
		this.getList();
		this.getNumSlist();
		this.getOrigin = common.getOrigin();
	},
	created(){
		/*getType('WorkFlowBusinessTypeCode',(res)=>{
					res.forEach((item)=>{
						this.billType.push({
							value:item.refDetailCode,
							text:item.refDetailName
						})
					})
				})
		*/
		
	},
	methods:{
		open(){},
		close(){},
		changeHref(orderNo,billtype,orderWfCode){
			window.location.href=`${this.getOrigin}/livecs/approval-flow/details?orderNo=${orderNo}&billtype=${billtype}&orderWfCode=${orderWfCode}`
		},
		reset(){
			for(let k of Object.keys(this.query)){
				this.query[k]=''
			}
		},
		reload(){
			this.getList();
		},
		pageChange(num){
			this.getList(num)
		},
		showModal(){
			this.dialogVisible = true
			api.getDataDictionarys({refCode:'WorkFlowBusinessTypeCode'},res=>{
				res.data.obj.referenceDetailInfos.forEach((item)=>{
						this.billType.push({
							value:item.refDetailCode,
							text:item.refDetailName
						})
				})
		})
		},
		hideModal(){
			this.dialogVisible = false
		},
		//获取列表
		getList(num = 1){
			console.log(JSON.parse(common.getSession('userInfo')).empToken)
			const option ={
				pageNums: config.pageNums,
				pageStart:num,
				empToken:JSON.parse(common.getSession('userInfo')).empToken,
			}
			Object.assign(this.query,option)
		   this.publicGetDate(this.query)
		},
		//获取总共的待审批数量
		getNumSlist(){
			console.log(JSON.parse(common.getSession('userInfo')).empToken)
			const option ={
				pageNums: config.pageNums,
				pageStart:1,
				empToken:JSON.parse(common.getSession('userInfo')).empToken,
				nodeStatus:-1

			}
			api.approval.query(option,res=>{
				if(res.data.code == 'success'){
					this.$emit('getNums',res.data.obj.total)
				}
			})
			//Object.assign(option)
  		},
		//公共查询
		publicGetDate(data){
				api.approval.query(data,res=>{
				if(res.data.code == 'success'){
					let Obj = res.data.obj
					this.list = res.data.obj.list;
					this.obj = {
						pageNum:Obj.pageNum,
						pageSize:config.pageNums,
						totalPages:Obj.pages,
						total:Obj.total,
					}
				}
			})
		},
		//实时推送
		sendMes(){
			let websocket;  
			// 首先判断是否 支持 WebSocket  
			 if('WebSocket' in window) {  
			     websocket = new WebSocket("ws://localhost:8085/springTest/testHandler?userId=zhaoshouyun");  
			 } else if('MozWebSocket' in window) {  
			     websocket = new MozWebSocket("ws://localhost:8085/springTest/testHandler?userId=zhaoshouyun");  
			 } else {  
			     websocket = new SockJS("http://localhost:8085/springTest/socketJs/testHandler?userId=zhaoshouyun");  
			 }  
			 // 打开连接时  
			 websocket.onopen = function(evnt) {  
			     console.log(" websocket已创建 链接");  
			 };  
			 // 收到消息时  
			 websocket.onmessage = function(evnt) {
			 	console.log(evnt.data);
			 	this.$emit('sendNum',evnt.data)
			 	Message({
			 		type:'warning',
			 		message:'收到一条审批消息'
			 	})
			 };  
			 websocket.onerror = function(evnt) {  
			     console.log("  websocket.onerror  ");  
			 };  
			 websocket.onclose = function(evnt) {  
			     console.log("  websocket.onclose  ");  
			 }; 
		}
	},
	filters:{
		setnodeStatus(val){
			let text = '';
			switch(val){
				case -1:
				text = '待审批'
				break;
				case 0:
				text="驳回"
				break;
				case 1:
				text ="通过"
				break;
			}
			return text
		}
	},
}
</script>

<style scoped>
#emp-insert2 .modal-lg {
    max-width: 1200px !important;
}
#emp-insert2 .modal-body {
    height: auto !important;
}
.padding0{padding: 0;}
</style>