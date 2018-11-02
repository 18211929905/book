<template>
    <div class="searchContent">
        <input type="text" class="form-control" :class="{'input-check' : hasCheck}" :value="inputValue" readonly @click="_showBox"/>
        <div class="dowm" v-show="!inputValue"></div>
      <!--  <div class="clear" v-show="inputValue" @click="clearValue">x</div>-->
        <div ref="sel" class="oBox" v-show="showBox">
            <div class="searchBox">
                <input type="text" class="form-control" v-model="oData" placeholder="Search">
            </div>
            <div class="dataContent" @scroll="onScroll($event)" ref="oScroll">
                <ul>
                    <li v-show="!dataList.length">无数据...</li>
                    <li @click="itemClick(item)" v-for="item in dataList">{{item[option]}}</li>
                </ul>
            </div>
        </div>  
    </div>
</template>
<script>

   export default {
       props: {
           dataList: {
               type: [Array],
               default: []
           },
           option: {
               type: [String],
               default: 'brandName'
           },
           hasCheck: {
                type: [Boolean],
                default: false
           },
       },
       data() {
           return {
               oData: '',
               showBox: false,
			   optionName: this.option,  
               items: [],
               inputValue: ''
           }
       },
       methods: {
            _showBox() {
				this.showBox = !this.showBox
			},
			itemClick(item) {
                this.$emit('itemValue',item)
				this.inputValue = item[this.optionName]
                this.showBox = false
			},
            onScroll(event) {
                let _scrollTop = event.target.scrollTop
                let _offsetHeight = event.target.offsetHeight
                let _scrollHeight = event.target.scrollHeight
                if(_scrollTop + _offsetHeight >= _scrollHeight) {
                    this.$emit('comScroll', true)
                }else {
                    this.$emit('comScroll', false)
                }
            },
            setValue(val = '') {
                this.inputValue = val; 
            },
            clearValue() {
                this.setValue()
                this.$emit('clearValue')
            }
       },
       watch: {
            oData: function(data) {
                this.$emit('dataChange', this.oData)
                this.$refs.oScroll.scrollTop = 0
            },
            showBox(val) {
                document.addEventListener('click', (e) => {
                    if (!this.$el.contains(e.target)) this.showBox = false
                })
            }
       }
   }
</script>

<style>
   .oBox {
		position: absolute;
		border: 1px solid #e3e3e3;
		background-color: #fff; 
        z-index: 10000;
		margin-top: 6px;
		box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
        border-radius: 5px !important;
	}
    .searchBox {
        padding: 6px 10px 0 10px;
    }
    .searchBox input {
        border-radius: 5px !important;
        outline: 0;
        border-color: #66afe9 !important;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    }
	.oBox div ul {
		list-style-type: none;
		margin: 0;
        padding: 0;
	}
    .oBox div ul li {
        padding: 5px 10px;
    }
	.oBox div ul li:hover {
		background-color: #e3e3e3
	}
	.dowm {
		position: absolute;
		top: 14px;
		right: 22px;
		width: 6px;
		height: 6px;
		border-top: 6px solid #666;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-bottom: 6px solid transparent;
	}
    .clear {
        position: absolute;
        top: 8px;
        right: 16px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: #ccc;
        /* background-color: rgba(102, 175, 233, 0.6); */
        text-align: center;
        line-height: 18px;
        cursor: pointer;
    }
    .dataContent {
        max-height: 260px;
        overflow-y: scroll;
    }
    .input-check {
        border: 1px solid #f86c6b !important;
    }
</style>
