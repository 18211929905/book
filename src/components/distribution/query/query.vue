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
	                 <label class="control-label col-md-5 col-lg-4 col-sm-5">配送区域编码:</label>
	                 <div class="col-md-7 col-lg-5 col-sm-6">
	                   <input type="text" class="form-control" v-model="queryParams.areaCode" @keyup.enter="query"/>
	                </div>
	              </div>
	           </div>
	           <div class="col-md-5 col-lg-5 col-sm-5">
	             <div class="form-group">
	               <label class="control-label col-md-5 col-lg-4 col-sm-5">配送区域名称:</label>
	               <div class="col-md-7 col-lg-5 col-sm-6">
	                 <input type="text" class="form-control" v-model="queryParams.areaName" @keyup.enter="query"/>
	               </div>
	             </div>
	           </div>
	           <div class="col-md-2">
	           </div>
	        </div>
	        <div class="row">
	           <div class="col-md-5 col-lg-5 col-sm-5">
	            <div class="form-group">
	               <label class="control-label col-md-5 col-lg-4 col-sm-5">配送区域缩写:</label>
	               <div class="col-md-7 col-lg-5 col-sm-6">
	                 <input type="text" class="form-control" v-model="queryParams.areaAddrName" @keyup.enter="query"/>
	               </div>
	            </div>
	          </div>
	           <div class="col-md-5 col-lg-5 col-sm-5">
	            <div class="form-group">
	               <label class="control-label col-md-5 col-lg-4 col-sm-5">前缀:</label>
	               <div class="col-md-7 col-lg-5 col-sm-6">
	                 <input type="text" class="form-control" v-model="queryParams.prefixValue" @keyup.enter="query"/>
	               </div>
	            </div>
	          </div>
	          <div class="col-md-2">
	          </div>
	        </div>
	        <div class="row">
	          <div class="pull-right">
								<div class="col-md-12">
									<input type="reset" class="btn btn-default" @click="oReset" value="重置">
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
	export default {
		data: function() {
			return {
				 queryParams: {
				   areaCode: '',
					 areaName: '',
					 areaAddrName: '',  
					 prefixValue: '',
					 pageNums: 15,
					 pageStart: 1
			   }
			}
		},
		methods: {
				// query() {
				// 		this.$emit('go',this.queryParams);
				// 		this.queryParams = {};
				// }

				query() {
						this.$emit('go', this.queryParams)
				},
				oReset() {
						this.queryParams = {}
				}
		}
	}
</script>

<style>
</style>