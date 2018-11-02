<template lang="html">
  <modal :show.sync="show" :large="true" :backdrop="false" effect="fade" width="80%">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title text-center">编辑菜单</h4>
    </div>
    <div slot="modal-body" class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="portlet">
                <div class="portlet-body">
                  <div class="tree-view">
                    <tree :treeData="treeData" :options="treeOptions" @node-click="itemClick">
                    </tree>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <!--FORM BEGIN-->
              <form class="form-horizontal">
                <div class="form-body">
                  <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">父级菜单编码:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <input type="text" class="form-control" v-model="menu.fatherMenuCode" readonly/>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">菜单编码:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <input type="text" class="form-control" v-model="menu.menuCode" readonly/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">菜单名称:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <input type="text" class="form-control" v-model="menu.menuName" />
                        </div>
                        <span class="col-lg-2 col-md-1 col-sm-1">
                                    </span>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">菜单路径:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <input type="text" class="form-control" v-model="menu.menuPath" />
                        </div>
                        <span class="col-lg-2 col-md-1 col-sm-1">
                                    </span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">是否需要登录:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <select class="form-control" v-model="menu.needLogin">
                             <option value="1">必需登录</option>
                             <option value="0">不需要登录</option>
                          </select>
                        </div>
                        <span class="col-lg-2 col-md-1 col-sm-1"></span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                     <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">是否可见:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <select class="form-control" v-model="menu.isDisplay">
                             <option value="1">可见</option>
                             <option value="0">不可见</option>
                          </select>
                        </div>
                        <span class="col-lg-2 col-md-1 col-sm-1"></span>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">菜单类型:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                           <select class="form-control" v-model="menu.buttonType">
                              <template v-for="buttonType in buttonTypes">
                                 <option :value="buttonType.refDetailCode">
                                    {{ buttonType.refDetailName }}
                                 </option>
                              </template>
                           </select>
                        </div>
                        <span class="col-lg-2 col-md-1 col-sm-1"></span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">是否可用:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <select class="form-control" v-model="menu.isDeleted">
                              <option value="0" selected="selected">启用</option>
                              <option value="1">停用</option>
                            </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                     <div class="col-md-12 col-lg-12 col-sm-12">
                      <div class="form-group">
                        <label class="control-label col-md-5 col-lg-3 col-sm-5">备注:</label>
                        <div class="col-lg-5 col-md-6 col-sm-7">
                          <input type="text" class="form-control" v-model="menu.remark" />
                        </div>
                        <span class="col-lg-2 col-md-1 col-sm-1">
                        </span>
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
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="closeUpdateModal()">取消</button>
      <button type="button" class="btn btn-primary" @click="updateMenuInfo()">确定</button>
    </div>
  </modal>
</template>

<script>
  import {
    modal
  } from 'vue-strap'
  import Vue from 'vue'
  import tree from '../common/tree.vue'
  import api from '../common/api.js'
  import commonConfig from '../common/commonConfig.js'
  import bus from '../common/public.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      selectedMenu: {
        type: Object,
        default: function() {
          return {
          }
        }
      }
    },
    data: function() {
      return {
        menu: {
          fatherMenuCode: '',
          menuCode: '',
          releationCodeList: '',
          menuName: '',
          menuPath: '',
          needLogin: '0',
          isDisplay: 0,
          buttonType: '',
          isDeleted: '0',
          remark: ''
        },
        error: {
          fatherMenuCode: '',
          menuCode: '',
          releationCodeList: '',
          menuName: '',
          menuPath: '',
          needLogin: '',
          isDisplay: '',
          buttonType: '',
          remark: '',
        },
        buttonTypes: [],
        treeData: [],
        treeOptions: {
          showCheckbox: false,
          halfCheckedStatus: false,
          lazy: true,
          load: this.loadingChild,
          rootName: '系统管理',
          iconClass: {
            close: 'icon-youjiantou',
            open: 'icon-xiajiantou',
            add: 'icon-add'
          },
          iconStyle: {
            color: '#108ee9'
          },
        }
      }
    },
    methods: {
      closeUpdateModal: function() {
        this.$emit('close-update-modal')
      },
      itemClick(node) {
         let item = this.getParentNode(node, this.$data.treeData)
         this.$data.menu.fatherMenuCode = item.menu.menuCode
      },
      checkMenuCode: function() {},
      updateMenuInfo: function() {
        let _this = this
        let params = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(this.$data.menu)
        }
        api.menu
          .updateMenuInfo(params)
          .then((res) => {
              if (res.data.code === 'success') {
                Toast(commonConfig.success.edit)
                _this.closeUpdateModal()
                _this.initAllMenuCache()
                bus.$emit('refresh-data')
              }
          })
      },
      initAllMenuCache: function() {
        let _this = this
        let params = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({})
        }
        api.menu
          .initAllMenuCache(params)
          .then((res) => {})
      },
      getMenuInfo: function(sc) {
        let _this = this
        let params = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            menuCode: _this.$data.menu.fatherMenuCode
          })
        }
        api.menu
          .getMenuInfo(params)
          .then((res) => {
              if (res.data.code === 'success') {
                let arr = res.data.obj.childMenuInfos
                sc(arr)
              }
          })
      },
      getSequence: function() {
        let _this = this
        let params = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            serviceCode: '005'
          })
        }
        api.ordinalInfo
          .getSequence(params)
          .then((res) => {
              if (res.data.code === 'success') {
                _this.$data.menu.menuCode = res.data.obj
              }
          })
      },
      getButtonTypes: function() {
         let _this = this
         let params = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            refCode: commonConfig.menu.buttonType.refCode
          })
        }
        api.menu
           .getReferenceInfo(params)
           .then((res) => {
                if(res.data.code === 'success') {
                    _this.$data.buttonTypes = res.data.obj.referenceDetailInfos
                }
           })
      },
      loadingChild: async function(node, index) {
        try {
          let _this = this
          let item = this.getParentNode(node, this.$data.treeData)
          _this.$data.menu.fatherMenuCode = item.id
          let data = await new Promise((resolve, reject) => {
              var sc = function(data) {
                let arr = []
                if (data != null) {
                  data.forEach((item) => {
                    arr.push({
                      'id': item.menuCode,
                      'label': item.menuName,
                      'menu': item
                    })
                  })
                }
                resolve(arr)
              }
              _this.getMenuInfo(sc)
          })
          Vue.set(item, 'children', data)
          Promise.resolve(data)
        } catch (e) {
          Promise.reject(e)
        }
      },
      generateKey(treeData = [], parentKey = '0') {
        let _this = this
        treeData = treeData.map((item, i) => {
          item.key = parentKey + '-' + i.toString();
          if (item.hasOwnProperty('children') && item.children.length > 0) {
            _this.generateKey(item.children, item.key)
          }
          return item;
        })
        return treeData;
      },
      getParentNode(node = {}, treeData = []) {
        let tem;
        let postions = node.key.split('-');
        for (let [index, item] of postions.entries()) {
          switch (index) {
            case 0:
              break;
            case 1:
              tem = treeData[item];
              break;
            default:
              tem = tem.children[item];
          }
        }
        return tem
      },
    },
    watch: {
      show: {
        handler(val) {
          if (val === true) {
            let _this = this
            var sc = function(data) {
              if (data != null) {
                data.forEach((item) => {
                  _this.$data.treeData.push({
                    'id': item.menuCode,
                    'label': item.menuName,
                    'menu': item
                  })
                })
              }
            }
            this.$data.menu = this.selectedMenu
            this.$data.menu.fatherMenuCode = commonConfig.menu.rootMenuCode
            this.$data.treeData = []
            this.getMenuInfo(sc)
            this.getButtonTypes()
          }
        }
      }
    },
    components: {
      modal,
      tree
    }
  }
</script>
