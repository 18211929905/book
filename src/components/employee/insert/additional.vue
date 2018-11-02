<template>
<div class="row margin-min">
	<div class="col-md-12">
	<div class="portlet box">
	  <div class="portlet-body form">
	    <!--FORM BEGIN-->
	    <form class="form-horizontal">
	      <div class="form-body">
          <p class="h3">附加信息</p>     
					<div class="row">
	           <div class="col-md-5 col-lg-5 col-sm-5" v-for="(item, index) of items">
	              <div class="form-group">
									 <label class="control-label col-md-5 col-lg-4 col-sm-5">{{item.refDetailName}}</label>
	                 <div class="col-md-7 col-lg-5 col-sm-6">
	                   <input type="text" class="form-control" v-model="additional[item.refDetailName]"/>
	                </div>
	              </div>
	           </div>
	        </div>
          <div class="row">
	          <div class="pull-right">
                <div class="col-md-12">
                    <input type="button" class="btn btn-default" @click="cancel" value="取消">
                    <input type="button" class="btn btn-primary" @click="insert" value="确定">
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
		import common from "../../../assets/js/common.js"
    import commonConfig from "../../common/commonConfig.js"
    import api from '../../common/api.js'
		import {Toast} from 'mint-ui'

	export default {
		props: {
				master: {
						type: Object,
						default: {}
				}
		},
		data() {
			return {   
					additional: {},       // 附加信息参数
					items: []
			}
		},
		mounted() {
				api.getDataDictionary({"refCode":commonConfig.empRefCode}).then((res) => {
						console.log(res)
				  	if(res.data.code === 'success')	this.items = res.data.obj.referenceDetailInfos;
				});
		},
		methods: {
				insert() {
						this.master.simpleEmpAddInfoMaps = this.additional;
						let _insertParams = this.master;  
						console.log(_insertParams)  
						if(!_insertParams.empType) {
							this.$emit('required', true)
							return
						}
						this.$emit('required', false)

						api.getEmpInsert(_insertParams).then((res) => {
								console.log(res)
								if(res.data.code === 'success') {
									Toast(commonConfig.success.add)
									window.location.href = commonConfig.menuMap["000076"]
								}
						});
				},
			
				cancel() {
					window.location.href = commonConfig.menuMap["000076"]
				} 
		},
		watch: {
				master: function(value) {
						if(master.empType) {
							this.$emit('required', false)
						}
				}
		}
	}
</script>

<style>
.margin-min {
	margin-top: -16px;
}
</style>