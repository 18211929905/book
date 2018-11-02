<template lang="html">
    <div class="row">
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}" v-if="!flag">
			<div class="form-group">
				<label class="control-label col-xs-4">厂家 *</label>
				<div class="col-xs-7">
					<select class="form-control" v-model="carCurr.factoryCode">
						<option v-for="(item, index) in factory" :value="item.value" :key="index">{{item.text}}</option>
					</select>
				</div>
			</div>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
			<div class="form-group">
				<label class="control-label col-xs-4">品牌 *</label>
				<div class="col-xs-7">
					<select class="form-control" v-model="carCurr.brandCode">
						<option v-for="(item, index) in brand" :value="item.value" :key="index">{{item.text}}</option>
					</select>
				</div>
			</div>
        </div>
        <div :class="{'col-md-4': col=='3', 'col-md-6': col=='2'}">
			<div class="form-group">
				<label class="control-label col-xs-4">车系</label>
				<div class="col-xs-7">
					<select class="form-control" v-model="carCurr.seriesCode">
						<option v-for="(item, index) in series" :value="item.value" :key="index">{{item.text}}</option>
					</select>
				</div>
			</div>
        </div>
    </div>
</template>
<script>
    import api from '../api'
	import config from '../commonConfig'
	import vm from "vue";
	export default {
        props: {
			flag: {
				type: Boolean,
				default: true
			},
			col: {
				type: Number,
				default: '3'
			}
        },
		data(){
			return {
				factory:[],
				brand:[],
				series:[],
				// model:[],
				// car:[],
				carCurr:{
					factoryCode:'',
					brandCode:'',
					seriesCode:'',
					// modelCode:'',
					// carCode:'',
				},
				mapArr:['factory', 'brand', 'series', 'model', 'car']
			}
		},
		created(){
			//false 从厂家开始，true从品牌开始
			// var flag = this.flag;

			// update by lwx
			// flag 为true从厂家开始 false从品牌开始
			this.once()

			
		},
		computed:{
			_factoryCode:function(){
				return this.carCurr.factoryCode;
			},
			_brandCode:function(){
				return this.carCurr.brandCode;
			},
			_seriesCode:function(){
				return this.carCurr.seriesCode;
			},
			// _modelCode:function(){
			// 	return this.carCurr.modelCode;
			// },
			// _carCode:function(){
			// 	return this.carCurr.carCode;
			// }

		},
		methods:{
			// 增加重置功能 by lwx
			setValue(data){	
				console.info(data);
				var i = this.flag?1:0, len;	
				for(i, len = this.mapArr.length; i < len; i++){	
					console.info(i);
					console.info(this.mapArr[i]+'Code');				
					this.carCurr[this.mapArr[i]+'Code'] = data[this.mapArr[i]+'Code'];					
				}
				console.log(this.carCurr)
			},
			clear() {
				this.carCurr = {
					factoryCode: '',
					// brandCode: '',
					// seriesCode: '',
					// modelCode: '',
					// carCode: ''
				}
				// this.factory = [];
				// this.once()
				// this.brand = [];
				// this.series = [];
				// this.model = [];
				// this.car = [];
				this.$emit('callBack',this.carCurr);				
			},
			once: function() {
				if(!this.flag) {
					this.getData('', 1, 0, 'factory');				
				}else{
					this.getData('', 2, 0, 'brand');
				}
			},
			//获取车节点数据
			getData(code, level, type, name){
			    var $this = this, code = code || '';
			    api.car.queryCarInfoByCarSearch({
			        code:code,
			        level:level,
			        type:type
			    },function(res){
			    	if(res.data.code == 'success'){
						$this[name] = [];
						$this.setOptions($this[name], res.data.obj || [], name);		    		
			    	}			    	
			    })
			},
			//给选项添加数据
			setOptions(obj, data, nav){
				//obj = [];
				// console.log(data)
				if(data.length == 0 && typeof data != 'object') return;
				for(var i = 0, len = data.length; i < len; i++){
					if(nav == 'car'){
						obj.push({text:data[i]['displayName'], value:data[i][nav+'Code']})
					}else{
						obj.push({text:data[i][nav+'Name'], value:data[i][nav+'Code']})
					}					
				}
			},
			selectBack(type, val){
				if(!type || !val)return;
				this.getData(val, 2, 0, 'brand');
			},
			resetSelectData(str){
				var num = this.mapArr.indexOf(str);
				if(this[str].length == 0)return;
				for(var i = num, len = this.mapArr.length; i < len; i++){
					this.carCurr[this.mapArr[i]+'Code'] = null;
				}
            }
        },
        watch:{
			//监听厂家获取品牌
			_factoryCode(val){
				//this.resetSelectData('brand');
				this.$emit('callBack',this.carCurr);
				this.getData(val, 2, 0, 'brand');
			},
			//监听品牌获取车系
			_brandCode(val){
				//this.resetSelectData('series');
				this.$emit('callBack',this.carCurr);
				this.getData(val, 4, 1, 'series');
			},
			//监听车系获取车型
			_seriesCode(val){
				//this.resetSelectData('model');
				this.$emit('callBack',this.carCurr);
				this.getData(val, 8, 2, 'model');
			},
			// //监听车型获取车款
			// _modelCode(val){
			// 	this.resetSelectData('car');
			// 	this.$emit('callBack',this.carCurr);
			// 	this.getData(val, 64, 3, 'car');
			// }
		}

    }
</script>
<style lang="scss" scoped>
    
</style>
