<template>
    <div>
        <!-- BEGIN LOGO -->
        <div class="logo">
            <!-- <img src="assets/img/logo-big.png" alt="" />  -->
            <p style="font-size:20px;color:#fff;"><img v-if="logo" class="img" :src="logo"/>&nbsp;&nbsp;&nbsp;<span style="vertical-align: middle;font-size:22px;font-weight: 400;">{{ systemName }}</span></p>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content">
            <!-- BEGIN LOGIN FORM -->
            <div>
                <h3 class="form-title">Login to your account</h3>
                <div class="alert alert-error hide">
                    <button class="close" data-dismiss="alert"></button>
                    <span>Enter any username and password.</span>
                </div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">Username</label>
                    <div class="input-icon">
                        <i class="icon-user"></i>
                        <input class="form-control placeholder-no-fix" v-model="loginName" type="text" autocomplete="off" placeholder="Username" name="username" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">Password</label>
                    <div class="input-icon">
                        <i class="icon-lock"></i>
                        <input class="form-control placeholder-no-fix" v-model="loginPasswd" type="password" autocomplete="off" placeholder="Password" name="password" />
                    </div>
                </div>
                <div class="form-actions">
                    <!--<label class="checkbox">
                        <input type="checkbox" name="remember" v-model="remember" value="1"/> 记住密码
                        </label> -->
                    <span @click="toLogin" class="btn blue pull-right">
                        登录 <i class="m-icon-swapright m-icon-white"></i>
                        </span>
                </div>
            </div>
            <!-- END LOGIN FORM -->
        </div>
        <!-- END LOGIN -->
        <!-- BEGIN COPYRIGHT -->
        <div class="copyright">
            <!-- 2018-2022 &copy; 润雅信息技术（上海）有限公司 版权所有 -->
        </div>
        <!-- END COPYRIGHT -->
    </div>
</template>
<style>
    @import '../../../static/css/pages/login-soft.css';
</style>
<script>
    import common from "../../assets/js/common.js";
    import api from '../common/api.js';
    import config from '../common/commonConfig.js'
    import {
        Toast
    } from 'mint-ui';
    export default {
        data() {
            return {
                loginName: '',
                loginPasswd: '',
                remember: '',
                systemName: 'IRiS经销商运营管理服务平台',
                logo: ''
            };
        },
        created() {
            this.getDictionaryDetails()
        },
        mounted() {
            let that = this;
            document.onkeyup = function(e) {
                if (e.keyCode == 13) {
                    common.clearSession()
                    that.toLogin();
                }
            }
        },
        methods: {
            toLogin() {
                let _this = this
                let params = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    method: "POST",
                    body: JSON.stringify({
                        loginName: this.loginName,
                        loginPasswd: this.loginPasswd
                    })
                }
                // common.removeSessionItem('urlMap')
                this.getLoginInfo(params).then((res) => {
                    this.getSelectCarStart(config.selectCarRef)
                    // this.getUrlMap()
                    let userInfo = res.data.obj
                    api.getUserAvailableInfo(msg => {
                        if (msg.data.code === 'success') {
                            userInfo.userAvailableInfo = msg.data.obj
                            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
                        }
                    })
                })
            },
            getLoginInfo(params) {
                return new Promise((resolve, reject) => {
                    api.toLogin.login(params).then((res) => {
                        if (res.data.code == 'success') {
                            resolve(res)
                        }
                    });
                })
            },
            getSelectCarStart(code) {
                const param = {
                    refDetailCode: code
                }
                api.getDataDetails(param).then(res => {
                    if (res.data.code === 'success') {
                        let value = res.data.obj.refDetailValue
                        common.setSession('showFactory', value)
                        window.location.href = `${location.origin}/livepro/index`
                    }
                })
            },
            // 去掉
            getUrlMap() {
                api.getBtnJurisdiction({}).then((res) => {
                    if (res.data.code === 'success') {
                        common.setSession('urlMap', res.data.obj)
                    }
                })
            },
            // 获取数据字典相关配置
            getDictionaryDetails() {
                let _this = this
                api.getDataDetails({
                       refDetailCode: config.ref.frontLogo
                    }).then((res) => {
                        if (res.data.code === 'success') {
                            if (common.env() != 'development') {
                                let relativePath = res.data.obj.refDetailValue
                                if (relativePath) {
                                  _this.logo = relativePath + '/resources/image/logo.png'
                                }
                            }
                        }
                    })
                api.getDataDetails({
                        refDetailCode: config.ref.frontSystemName
                    }).then((res) => {
                        if (res.data.code === 'success') {
                            if (common.env() != 'development') {
                                _this.systemName = res.data.obj.refDetailValue
                            }
                        }
                    })    
            }
        }
    }
</script>
