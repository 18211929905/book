<!--multi select modal-->
<template lang="html">
    <modal :show.sync="show" :large="true" :backdrop="false" effect="fade" width="80%">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title text-center">
                {{ options.title }}
            </h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <slot name="footer"></slot>
            <div class="row">
                <div class="col-md-12">
                    <!--FORM BEGIN-->
                    <form class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-5">
                                    <div class="form-group">
                                        <label class="col-md-12 text-left">
                                               {{ options.optionalTitle }} 
                                            </label>
                                        <div class="col-md-12">
                                            <select multiple="multiple" class="multi-select" v-model="optionalItems">
                                                <template v-for="initOptionalItem in initOptionalItems">
                                                   <option :value="initOptionalItem.value">
                                                      {{ initOptionalItem.name }}
                                                   </option>
                                                </template>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2">
                                    <center class="text-vertical">
                                        <button class="btn btn-default" type="button" @click="addItem()">
                                            <i class="icon-angle-right text-default"></i>
                                        </button>
                                        </br>
                                        </br>
                                        <button class="btn btn-default" type="button" @click="removeItem()">
                                            <i class="icon-angle-left text-default"></i>
                                        </button>
                                    </center>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-5">
                                    <div class="form-group">
                                        <label class="col-md-12">
                                            {{ options.selectedIitle }}
                                        </label>
                                        <div class="col-md-12">
                                           <select multiple="multiple" class="multi-select" v-model="selectedItems">
                                              <template v-for="initSelectedItem in initSelectedItems">
                                                 <option :value="initSelectedItem.value">
                                                    {{ initSelectedItem.name }}
                                                 </option>
                                              </template>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-show="initSelectedItems.length && mainPost">
                                <div class="col-md-5 col-sm-5 col-md-offset-7 col-sm-offset-7">
                                    <label for="">请选择主岗位:</label>
                                    <select name="" v-model="inCharge">
                                        <!-- <option :value="inCharge ? inCharge : item.value" v-for="item in initSelectedItems" selected>{{item.name}}</option> -->
                                        <option :value="item.value" v-for="item in initSelectedItems">{{item.name}}</option>                                    
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <!--FORM END-->
                </div>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="closeSelectModal()">取消</button>
            <button type="button" class="btn btn-primary" @click="commit()">确定</button>
        </div>
    </modal>
</template>

<script>
    import {
        modal
    } from 'vue-strap'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            options: {
                type: Object,
                default: function() {
                    return {
                    }
                }
            },
            initOptionalItems: {
                type: Array,
                default: []
            },
            initSelectedItems: {
                type: Array,
                default: []
            },
            mainPost: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                optionalItems: [],
                selectedItems: [],
                updated: false,
                inCharge: ''
            }
        },
        methods: {
            closeSelectModal: function() {
                this.$emit('close-select-modal')
            },
            commit: function() {
                let arr = this.initSelectedItems
                if (arr.length >= 0 && this.updated) {
                    this.$emit('commit', arr)
                } else {
                    this.$emit('close-select-modal') 
                }
            },
            addItem: function() {
                let _this = this
                if (_this.initOptionalItems.length > 0) {
                    this.optionalItems.forEach((item) => {
                        let index = _this.findIndex(item, _this.initOptionalItems)
                        let node = _this.initOptionalItems[index]
                        _this.initSelectedItems.push(node)
                        _this.initOptionalItems.splice(index, 1)
                        _this.updated = true
                    })
                }
            },
            removeItem: function() {
                let _this = this
                if (_this.initSelectedItems.length > 0) {
                    this.selectedItems.forEach((item) => {
                        let index = _this.findIndex(item, _this.initSelectedItems)
                        let node = _this.initSelectedItems[index]
                        _this.initOptionalItems.push(node)
                        _this.initSelectedItems.splice(index, 1)
                        _this.updated = true
                    })
                }
            },
            findIndex: function(item, array) {
                let index = 0;
                index = array.findIndex((elem) => {
                    if(elem.value === item) {
                        return true; 
                    }
                })
                return index;
            }
        },
        watch: {
           show: {
              handler(val) {
                  if(val === true) {
                      this.updated = false
                  }
              }     
           },
           inCharge(value) {
               this.$emit('getInCharge', value)
           },
           initSelectedItems(val) {
               if(val && this.mainPost) {
                   this.inCharge = val[0].value
               }
           }
        },
        components: {
            modal
        }
    }
</script>