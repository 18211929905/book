<template lang="html">
   <div>
       <commonheader></commonheader>

       <div class="clearfix"></div>

       <!-- BEGIN CONTAINER -->
       <div class="page-container">
           <!-- BEGIN SIDEBAR -->
            <sidebar></sidebar>
            <!-- END SIDEBAR -->
            <!-- BEGIN PAGE -->
            <div class="page-content-wrapper">
               <div class="page-content">
                  <pageheader :breadNav="breadNav"></pageheader>
                  <!-- main 从这开始 -->
                  <query @search="search"></query>
                  <table-body :condition="condition" @show-add-modal="displayAddModal" @show-update-modal="displayUpdateModal" @show-menu-modal="displayMenuModal"></table-body>
                  <add-modal :show="showAddModal" @close-add-modal="disappearAddModal"></add-modal>
                  <update-modal :show="showUpdateModal" :selectedRole="selectedRole" @close-update-modal="disappearUpdateModal"></update-modal>
                  <select-modal :show="showMenuModal" :options="selectOptions" :initOptionalItems="initOptionalItems" :initSelectedItems="initSelectedItems" @close-select-modal="disappearMenuModal" @commit="insertRoleMenus"></select-modal>
                <!-- main从这结束 -->
               </div>
<commonfooter></commonfooter>

               
            </div>
            <!-- END PAGE -->
       </div>
       <!-- END CONTAINER -->
   </div>
</template>

<script>
   import common from "../../assets/js/common.js";
   import api from '../common/api.js';
   import config from '../common/commonConfig.js';
   import commonheader from "../common/header.vue";
   import commonfooter from "../common/footer.vue";
   import sidebar from "../common/sidebar.vue";
   import pageheader from "../common/pageheader.vue";
   import query from './query.vue'
   import tableBody from './tableBody.vue'
   import addModal from './addModal.vue'
   import updateModal from './updateModal.vue'
   import selectModal from '../common/selectModal.vue'
   import {
        Toast
    } from 'mint-ui'

   export default {
       data: function() {
           return {
              showAddModal: false,
              showUpdateModal: false,
              showMenuModal: false,  // 控制弹出框显示与否标志位
              selectedColumn: '',
              condition: {
                 roleCode: '',
                 roleName: '',
                 roleMd5Seq: '',
                 remark: '',
                 pageNums: 0,
                 pageStart: 1
              },
              selectedRole: {},
              selectOptions: {
                  title: '配置角色菜单关系', //多选弹出框主标题
                  optionalTitle: '可选菜单', //多选弹出框可选项标题
                  selectedIitle: '已选菜单' //多选弹出框已选项标题
              },
              initOptionalItems: [], //初始化可选项
              initSelectedItems: [], //初始化已选项
              breadNav: config.breadNav.role
           }
       },
       methods: {
            displayAddModal: function() {
               if(!this.showAddModal) {
                  this.showAddModal = true
               }
            },
            displayUpdateModal: function(selectedRole) {
               this.selectedRole = {
                   id: selectedRole.id,
                   roleCode: selectedRole.roleCode,
                   roleName: selectedRole.roleName,
                   roleMd5Seq: selectedRole.roleMd5Seq,
                   remark: selectedRole.remark,
                   isDeleted: selectedRole.isDeleted
               }
               if(!this.showUpdateModal) {
                  this.showUpdateModal = true
               }
            },
            displayMenuModal: function(selectedRole) {
                console.log(selectedRole)
               this.selectedRole = {
                   id: selectedRole.id,
                   roleCode: selectedRole.roleCode,
                   roleName: selectedRole.roleName,
                   roleMd5Seq: selectedRole.roleMd5Seq,
                   remark: selectedRole.remark,
                   isDeleted: selectedRole.isDeleted
               }

               if(!this.showMenuModal) {
                  this.showMenuModal = true
               }
               this.queryRoleHaveMenu()
               this.queryRoleNotHaveMenu()
            },
            disappearAddModal: function() {
               this.showAddModal = false
            },
            disappearUpdateModal: function() {
               this.showUpdateModal = false
            },
            disappearMenuModal: function() { //控制弹出框关闭方法
               this.showMenuModal = false
            },
            search: function(condition) {
               this.$data.condition = {
                   roleCode: condition.roleCode,
                   roleName: condition.roleName,
                   roleMd5Seq: condition.roleMd5Seq,
                   remark: condition.remark,
                   pageNums: condition.pageNums,
                   pageStart: condition.pageStart
               }
            },
            queryRoleHaveMenu: function() {
                let _this = this
                let params = {
                    body: JSON.stringify({
                        roleCode: _this.selectedRole.roleCode
                    })
                }
                api.roleMenu
                    .queryRoleHaveMenu(params)
                    .then((res) => {
                        if(res.data.code === 'success') {
                            _this.$data.initSelectedItems = []
                            if(res.data.obj != null) {
                               res.data.obj.forEach((item) => {
                                  _this.$data.initSelectedItems.push({
                                     name: item.menuName,
                                     value: item.menuCode
                                  })
                               })
                            }
                        }
                    })
            },
            queryRoleNotHaveMenu: function() {
                let _this = this
                let params = {
                    body: JSON.stringify({
                        roleCode: _this.selectedRole.roleCode
                    })
                }
                api.roleMenu
                    .queryRoleNotHaveMenu(params)
                    .then((res) => {
                        if(res.data.code === 'success') {
                            _this.$data.initOptionalItems = []
                            if(res.data.obj != null) {
                              res.data.obj.forEach((item) => {
                                 _this.$data.initOptionalItems.push({
                                     name: item.menuName,
                                     value: item.menuCode
                                 })
                              })
                            }
                        }
                    })
            },
            insertRoleMenus: function(arr) {
                let _this = this
                let roleMenus = []
                arr.forEach((item) => {
                    roleMenus.push({
                        roleCode: _this.selectedRole.roleCode,
                        menuCode: item.value
                    })
                })
                let params = {
                    body: JSON.stringify(roleMenus)
                }
                api.roleMenu
                   .insert(params)
                   .then((res) => {
                       if(res.data.code === 'success') {
                           Toast('配置角色菜单成功')
                           _this.disappearMenuModal()
                       }
                   })
            }
       },
       components: {
            query,
            tableBody,
            addModal,
            updateModal,
            selectModal,
            commonheader,
            commonfooter,
            sidebar,
            pageheader
       }
   }
</script>
