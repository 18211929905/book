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
                    <query @search="search" ></query>
                    <table-body :condition="condition" @show-add-modal="displayAddModal" @show-update-modal="displayUpdateModal"></table-body>
                    <add-modal :show="showAddModal" @close-add-modal="disappearAddModal"></add-modal>
                    <update-modal :show="showUpdateModal" :selectedMenu="selectedMenu" @close-update-modal="disappearUpdateModal"></update-modal>
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
    export default {
        data: function() {
            return {
                showAddModal: false,
                showUpdateModal: false,
                condition: {
                    fatherMenuCode: '',
                    menuCode: '',
                    releationCodeList: '',
                    menuName: '',
                    menuPath: '',
                    needLogin: '',
                    isDisplay: 0,
                    buttonType: '',
                    remark: '',
                    pageNums: 0,
                    pageStart: 1
                },
                selectedMenu: {},
                breadNav: config.breadNav.menu
            }
        },
        methods: {
            displayAddModal: function() {
                if (!this.showAddModal) {
                    this.showAddModal = true
                }
            },
            displayUpdateModal: function(selectedMenu) {
                this.selectedMenu = {
                    id: selectedMenu.id,
                    fatherMenuCode: selectedMenu.fatherMenuCode,
                    menuCode: selectedMenu.menuCode,
                    releationCodeList: selectedMenu.releationCodeList,
                    menuName: selectedMenu.menuName,
                    menuPath: selectedMenu.menuPath,
                    needLogin: selectedMenu.needLogin,
                    isDisplay: selectedMenu.isDisplay,
                    buttonType: selectedMenu.buttonType,
                    isDeleted: selectedMenu.isDeleted
                }
                if (!this.showUpdateModal) {
                    this.showUpdateModal = true
                }
            },
            disappearAddModal: function() {
                this.showAddModal = false
            },
            disappearUpdateModal: function() {
                this.showUpdateModal = false
            },
            search: function(condition) {
                this.$data.condition = {
                    fatherMenuCode: condition.fatherMenuCode,
                    menuCode: condition.menuCode,
                    releationCodeList: condition.releationCodeList,
                    menuName: condition.menuName,
                    menuPath: condition.menuPath,
                    needLogin: condition.needLogin,
                    isDisplay: condition.isDisplay,
                    buttonType: condition.buttonType,
                    remark: condition.remark,
                    pageNums: condition.pageNums,
                    pageStart: condition.pageStart
                }
            }
        },
        components: {
            query,
            tableBody,
            addModal,
            updateModal,
            commonheader,
            commonfooter,
            sidebar,
            pageheader
        }
    }
</script>
