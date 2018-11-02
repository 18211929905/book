'use strict';
import axios from 'axios'
import apiUrls from './api-urls.js'
import common from "../../assets/js/common.js";
import popup from './popupMessage';
import {
    Indicator
} from 'mint-ui';
axios.defaults.headers.post['Content-Type'] = 'application/json'; //请求头
axios.defaults.headers.Accept = 'application/json'; //请求头
axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;
// post传参序列化
axios.interceptors.request.use((config) => {
    Indicator.open('加载中...');
    return config;
}, (error) => {
    console.log("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {

    Indicator.close();

    if (!res.data) {
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }

    if (res.data.code === 'login') {
        window.location.href = common.isweb() + "/login/login.html";

    } else if (res.data.code === 'fail') {
        popup.popupErrMsg('错误: ' + res.data.message);
    }

    return res;
}, (error) => {
    Indicator.close();
    popup.popupErrMsg('网络错误, Fail');
    return Promise.reject(error);
});

var setParams = function (params, type) {
    var params = common.parseData(params);
    var pm = common.parseData(params.body) || params;
    var type = type == 'GET' ? 'GET' : 'POST';
    return pm;
}

export default {
    baseURL: '/',
    //请求  xxxx
    getTickerList(params) {
        return fetch(common.isdev() + apiUrls.getTickerList, params);
    },
    //请求  xxxx
    ajaxtest(params) {
        return fetch(common.isdev() + apiUrls.ajaxtest, params);
    },
    upDataPassword(params) {
        return axios.post(common.isdev() + apiUrls.upDataPassword, params);
    },
    //行政区域 Api
    getChinaAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getChinaAreaInfo, params);
    },
    getUpdateChinaAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getUpdateChinaAreaInfo, params);
    },
    getInsertChinaAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getInsertChinaAreaInfo, params);
    },
    getChinaAreaInfoByAreaCode(params) {
        return axios.post(common.isdev() + apiUrls.getChinaAreaInfoByAreaCode, params);
    },
    initChinaAreaToCache() { // 初始化缓存
        return axios.post(common.isdev() + apiUrls.initChinaAreaToCache);
    },
    //销售区域 Api
    getQuerySalesAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getQuerySalesAreaInfo, params);
    },
    getInsertSalesAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getInsertSalesAreaInfo, params);
    },
    getUpdateSalesAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getUpdateSalesAreaInfo, params);
    },
    getSalesAreaInfoByAreaCode(params) {
        return axios.post(common.isdev() + apiUrls.getSalesAreaInfoByAreaCode, params);
    },
    initSalesAreaToCache() { // 初始化缓存
        return axios.post(common.isdev() + apiUrls.initSalesAreaToCache);
    },
    //配送区域 Api
    getQueryDeliveryAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getQueryDeliveryAreaInfo, params);
    },
    getUpdateDeliveryAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getUpdateDeliveryAreaInfo, params);
    },
    getInsertDeliveryAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getInsertDeliveryAreaInfo, params);
    },
    getDeliveryAreaInfoByAreaCode(params) {
        return axios.post(common.isdev() + apiUrls.getDeliveryAreaInfoByAreaCode, params);
    },
    initDeliveryAreaToCache() { // 初始化缓存
        return axios.post(common.isdev() + apiUrls.initDeliveryAreaToCache);
    },
    //采购区域 Api
    getQueryPurchasingAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getQueryPurchasingAreaInfo, params);
    },
    getUpdatePurchasingAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getUpdatePurchasingAreaInfo, params);
    },
    getInsertPurchasingAreaInfo(params) {
        return axios.post(common.isdev() + apiUrls.getInsertPurchasingAreaInfo, params);
    },
    getPurchasingAreaInfoByAreaCode(params) {
        return axios.post(common.isdev() + apiUrls.getPurchasingAreaInfoByAreaCode, params);
    },
    initPurchasingAreaToCache() { // 初始化缓存
        return axios.post(common.isdev() + apiUrls.initPurchasingAreaToCache);
    },
    //员工信息
    getEmpInsert(params) { //员工信息
        return axios.post(common.isdev() + apiUrls.getEmpInsert, params);
    },
    // 获取员工岗位信息
    getPositionByMan(params) {
        return axios.post(common.isdev() + apiUrls.getPositionByMan, params)
    },
    queryMainEmployeeInfoByPost(params) {
        return axios.post(common.isdev() + apiUrls.queryMainEmployeeInfoByPost, params)
    },
    resetPasswrod(params) {
        return axios.post(common.isdev() + apiUrls.resetPasswrod, params);
    },
    getQueryMainInfo(params) {
        return axios.post(common.isdev() + apiUrls.getQueryMainInfo, params);
    },
    getUpdataInfo(params) {
        return axios.post(common.isdev() + apiUrls.getUpdataInfo, params);
    },
    getQueryAllInfo(params) {
        return axios.post(common.isdev() + apiUrls.getQueryAllInfo, params);
    },
    /****************      配置人员岗位  接口     ******************/

    configEmpPostOrg(params) { // 确定配置人员岗位
        return axios.post(common.isdev() + apiUrls.configEmpPostOrg, params); //   示例 - 接口
    },
    queryCheckedPostn(params) { // 查询该员工下已有的岗位信息Api
        return axios.post(common.isdev() + apiUrls.queryCheckedPostn, params);
    },
    queryNoCheckedPostn(params) { // 查询该员工下没有的岗位信息Api
        return axios.post(common.isdev() + apiUrls.queryNoCheckedPostn, params);
    },

    getRelationalInsert(params) { //人员岗位关系信息
        return axios.post(common.isdev() + apiUrls.getRelationalInsert, params);
    },
    getRelationalQueryInfo(params) {
        return axios.post(common.isdev() + apiUrls.getRelationalQueryInfo, params);
    },
    getRelationalUpdataInfo(params) {
        return axios.post(common.isdev() + apiUrls.getRelationalUpdataInfo, params);
    },
    getQueryEmpByPostn(params) {
        return axios.post(common.isdev() + apiUrls.getQueryEmpByPostn, params);
    },
    //车型附加信息
    getQueryCarMainCar(params) {
        return axios.post(common.isdev() + apiUrls.getQueryCarMainCar, params);
    },
    addCarMainInfo(params) {
        return axios.post(common.isdev() + apiUrls.addCarMainInfo, params);
    },
    //车型扩展信息新增
    AddCarMainInfo(params) {
        return axios.post(common.isdev() + apiUrls.AddCarMainInfo, params);
    },
    //车型信息
    carType: {
        //车型 - 厂家信息
        factory: {
            init(params) {
                return axios.post(common.isdev() + apiUrls.carType.factory.init, params);
            },
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.factory.getInsert, params);
            },
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.factory.getUpdata, params);
            },
            getFromDB(params) {
                return axios.post(common.isdev() + apiUrls.carType.factory.getFromDB, params);
            },
            getFromCache(params) {
                return axios.post(common.isdev() + apiUrls.carType.factory.getFromCache, params);
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.factory.getQueryInfo, params);
            }
        },
        //车型 - 品牌信息
        brand: {
            init(params) {
                return axios.post(common.isdev() + apiUrls.carType.brand.init, params);
            },
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.brand.getInsert, params);
            },
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.brand.getUpdata, params);
            },
            getFromDB(params) {
                return axios.post(common.isdev() + apiUrls.carType.brand.getFromDB, params);
            },
            getFromCache(params) {
                return axios.post(common.isdev() + apiUrls.carType.brand.getFromCache, params);
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.brand.getQueryInfo, params);
            }
        },
        //车型 - 车系信息
        series: {
            init(params) {
                return axios.post(common.isdev() + apiUrls.carType.series.init, params);
            },
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.series.getInsert, params);
            },
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.series.getUpdata, params);
            },
            getFromDB(params) {
                return axios.post(common.isdev() + apiUrls.carType.series.getFromDB, params);
            },
            getFromCache(params) {
                return axios.post(common.isdev() + apiUrls.carType.series.getFromCache, params);
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.series.getQueryInfo, params);
            }
        },
        //车型 - 车型信息
        model: {
            init(params) {
                return axios.post(common.isdev() + apiUrls.carType.model.init, params);
            },
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.model.getInsert, params);
            },
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.model.getUpdata, params);
            },
            getFromDB(params) {
                return axios.post(common.isdev() + apiUrls.carType.model.getFromDB, params);
            },
            getFromCache(params) {
                return axios.post(common.isdev() + apiUrls.carType.model.getFromCache, params);
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.model.getQueryInfo, params);
            }
        },
        //车型 - 排量信息
        opv: {
            init(params) {
                return axios.post(common.isdev() + apiUrls.carType.opv.init, params);
            },
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.opv.getInsert, params);
            },
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.opv.getUpdata, params);
            },
            getFromDB(params) {
                return axios.post(common.isdev() + apiUrls.carType.opv.getFromDB, params);
            },
            getFromCache(params) {
                return axios.post(common.isdev() + apiUrls.carType.opv.getFromCache, params);
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.opv.getQueryInfo, params);
            }
        },
        //车型 - 进气方式
        ioType: {
            init(params) {
                return axios.post(common.isdev() + apiUrls.carType.ioType.init, params);
            },
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.ioType.getInsert, params);
            },
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.ioType.getUpdata, params);
            },
            getFromDB(params) {
                return axios.post(common.isdev() + apiUrls.carType.ioType.getFromDB, params);
            },
            getFromCache(params) {
                return axios.post(common.isdev() + apiUrls.carType.ioType.getFromCache, params);
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.ioType.getQueryInfo, params);
            }
        },
        //主车型
        mainCarType: {
            init(params) {
                return axios.post(common.isdev() + apiUrls.carType.mainCarType.init, params);
            },
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.mainCarType.getInsert, params);
            },
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.mainCarType.getUpdata, params);
            },
            getFromDB(params) {
                return axios.post(common.isdev() + apiUrls.carType.mainCarType.getFromDB, params);
            },
            getFromCache(params) {
                return axios.post(common.isdev() + apiUrls.carType.mainCarType.getFromCache, params);
            },
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.mainCarType.getQueryInfo, params);
            },
            getExact(params) { //精准匹配检索主车型【没有分页】Api
                return axios.post(common.isdev() + apiUrls.carType.mainCarType.getExact, params);
            }
        },
        //销售主车型信息
        saleMainCarType: {
            getUpdata(params) {
                return axios.post(common.isdev() + apiUrls.carType.saleMainCarType.getUpdata, params);
            },
            //查询接口
            getQueryInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.saleMainCarType.getQueryInfo, params);
            },
            //新增接口
            getInsert(params) {
                return axios.post(common.isdev() + apiUrls.carType.saleMainCarType.getInsert, params);
            },
            //详情保存
            addCarMainInfo(params) {
                return axios.post(common.isdev() + apiUrls.carType.saleMainCarType.addCarMainInfo, params);
            },

        },
    },
    //数据字典部分
    //查询数据字典管理数据
    queryDataDictionary(params) {
        return axios.post(common.isdev() + apiUrls.queryDataDictionary, params);
    },
    //请求数据字典管理数据
    getDataDictionary(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.getDataDictionary, params);
    },
    //新增数据字典管理数据
    createdDataDictionary(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.createdDataDictionary, params);
    },
    //更新数据字典管理数据
    editDataDictionary(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.editDataDictionary, params)
    },
    //新增数据字典明细
    createDictionaryDetails(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.createDictionaryDetails, params)
    },
    //修改数据字典明细
    editDictionaryDetails(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.editDictionaryDetails, params)
    },
    //查询数据字典明细数据
    queryDictionaryDetails(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.queryDictionaryDetails, params)
    },
    //根据refCode以及refDetailCode查询数据字典信息
    getDataDetails(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.getDataDetails, params)
    },
    //同步数据字典数据
    cacheDataDictionary(params) {
        var params = setParams(params)
        return axios.post(common.isdev() + apiUrls.cacheDataDictionary, params)
    },
    // 拿数据字典明细
    getDictionaryDetails(params) {
        return axios.post(common.isdev() + apiUrls.getDictionaryDetails, params)
    },
    //组织职位信息部分
    organzation: {
        //查询组织信息
        queryOrganization(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.organzation.queryOrganization, params)
        },
        //同步组织数据
        cacheOrganization(params) {
            return axios.post(common.isdev() + apiUrls.organzation.cacheOrganization, params)
        },
        //根据组织编码获取组织信息
        getOrganizationByOrgCode(params) {
            // var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.organzation.getOrganizationByOrgCode, params)
        },
        //新增组织信息
        createdOrganization(params) {
            return axios.post(common.isdev() + apiUrls.organzation.createdOrganization, params)
        },
        //修改组织信息
        editOrganization(params) {
            return axios.post(common.isdev() + apiUrls.organzation.editOrganization, params)
        },
        //查询职位信息
        queryPosition(params) {
            return axios.post(common.isdev() + apiUrls.organzation.queryPosition, params)
        },
        //新增职位信息
        createdPosition(params) {
            return axios.post(common.isdev() + apiUrls.organzation.createdPosition, params)
        },
        //修改职位信息
        editPosition(params) {
            return axios.post(common.isdev() + apiUrls.organzation.editPosition, params)
        },
        //根据职位编码获取职位信息
        getPositionByPostCode(params) {
            return axios.post(common.isdev() + apiUrls.organzation.getPositionByPostCode, params)
        },
        //同步职位信息
        cachePostionInfo(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.organzation.cachePostionInfo, params)
        }
    },
    //岗位角色关系
    addPostRole: {
        postHaveRole(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.addPostRole.postHaveRole, params)
        },
        postNotHaveRole(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.addPostRole.postNotHaveRole, params)
        }
    },
    //门店信息部分
    store: {
        //根据门店code查询门店信息
        getStoreInfo(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.store.getStoreInfo, params)
        },
        //查询门店信息
        queryStoreInfo(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.store.queryStoreInfo, params)
        },
        //新增门店信息
        createdStoreInfo(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.store.createdStoreInfo, params)
        },
        //修改门店信息
        editStoreInfo(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.store.editStoreInfo, params)
        },
        //同步门店数据
        cacheStoreInfo(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.store.cacheStoreInfo, params)
        },
        //门店可见车型部分
        getCarTypeInfo(params) { //查询车辆信息
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.store.getCarTypeInfo, params)
        },
        queryStoreCarInfo(params) { //查询门店车辆信息关系
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.store.queryStoreCarInfo, params)
        },
        addEditStoreCarInfo(params) { //新增or编辑门店车型信息关系
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.store.addEditStoreCarInfo, params)
        },
        // 查询    =>    销售区域获取
        getSalesArea(params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.store.getSalesArea, params)
        },
        queryStoreBysale(params) {
            return axios.post(common.isdev() + apiUrls.store.queryStoreBysale, params)
        },
    },
    //车型信息部分
    vehicle: {
        //查询排量信息
        queryDisplacement(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.vehicle.queryDisplacement, params)
        },
        //新增排量信息
        createDisplacement(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.vehicle.createDisplacement, params)
        },
        //修改排量信息
        editDisplacement(params) {
            var params = setParams(params)
            return axios.post(common.isdev() + apiUrls.vehicle.editDisplacement, params)
        },
    },
    role: {
        insertRoleInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.role.insertRoleInfo, params)
        },
        updateRoleInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.role.updateRoleInfo, params)
        },
        queryRoleInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.role.queryRoleInfo, params)
        },
        getRoleInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.role.getRoleInfo, params)
        },
        initRoleInfoToCache: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.role.initRoleInfoToCache, params)
        }
    },
    menu: {
        insertMenuInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.menu.insertMenuInfo, params)
        },
        updateMenuInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.menu.updateMenuInfo, params)
        },
        queryMenuInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.menu.queryMenuInfo, params)
        },
        getMenuInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.menu.getMenuInfo, params)
        },
        initAllMenuCache: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.menu.initAllMenuCache, params)
        },
        getReferenceInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.menu.getReferenceInfo, params)
        }
    },
    roleMenu: {
        insert: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.roleMenu.insert, params)
        },
        update: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.roleMenu.update, params)
        },
        query: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.roleMenu.query, params)
        },
        queryRoleHaveMenu: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.roleMenu.queryRoleHaveMenu, params);
        },
        queryRoleNotHaveMenu: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.roleMenu.queryRoleNotHaveMenu, params);
        }
    },
    postRole: {
        insert: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.postRole.insert, params)
        },
        update: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.postRole.update, params)
        },
        query: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.postRole.query, params)
        },
        getPostInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.postRole.getPostInfo, params)

        }
    },
    //业务信息
    ordinalInfo: {
        insert: function (params) {
            return axios.post(common.isdev() + apiUrls.ordinalInfo.insert, params)
        },

        search: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.ordinalInfo.search, params)
        },
        edit: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.ordinalInfo.edit, params)
        },
        //根据应用编码获得相关的应用序列
        getSequence: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.ordinalInfo.getSequence, params)
        },
        getSequenceList(params, sc) {
            return axios.post(common.isdev() + apiUrls.ordinalInfo.getSequenceList, params)
                .then((r) => {
                    sc(r)
                })
        },
        //同步数据
        dataSync: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.ordinalInfo.dataSync, params)
        }
    },
    //统一任务
    task: {
        edit: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.task.edit, params)
        },
        search: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.task.search, params)
        },
        newadd: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.task.newadd, params)
        }
    },
    ref: {
        //根据主档code获取树结构第一级节点
        queryFirstLevelReferenceDetails(params, sc) {
            return axios.post(common.isdev() + apiUrls.ref.queryFirstLevelReferenceDetails, params)
                .then((r) => {
                    sc(r)
                })
        },
        //根据明细code获取树结构下一级节点
        queryNextReferenceDetails(params, sc) {
            return axios.post(common.isdev() + apiUrls.ref.queryNextReferenceDetails, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    toLogin: {
        //登录调用接口
        login: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.toLogin.login, params);
        },
        //获取用户菜单
        getUserMenu: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.toLogin.getUserMenu, params);
        },
        //获取登录信息
        getLoginInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.toLogin.getLoginInfo, params);
        },
        //获取组织信息
        getOrg: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.toLogin.getOrg, params);
        },
        //切换组织
        changeLoginInfo: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.toLogin.changeLoginInfo, params);
        },
        //切换组织
        loginOut: function (params) {
            var params = setParams(params);
            return axios.post(common.isdev() + apiUrls.toLogin.loginOut, params);
        }
    },
    //销售区域门店
    getSalesAreaInfoByUserAvailableAllLevel: function (sc) {
        axios.post(common.isdev() + apiUrls.getSalesAreaInfoByUserAvailableAllLevel)
            .then((r) => {
                sc(r)
            })
    },
    finance: {
        //查询经销商门店信息
        queryShopInfo(params, sc) {
            return axios.post(common.isdev() + apiUrls.finance.queryShopInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    // 销售区域门店权限
    getJurisdiction(params) {
        return axios.post(common.isdev() + apiUrls.getJurisdiction, params);
    },
    area: {
        getSalesAreaInfoByAreaCode(params, sc) {
            return axios.post(common.isdev() + apiUrls.area.getSalesAreaInfoByAreaCode, params)
                .then((r) => {
                    sc(r)
                });
        },
    },
    getUserAvailableInfo: function (sc) {
        axios.post(common.isdev() + apiUrls.getUserAvailableInfo)
            .then((r) => {
                sc(r)
            })
    },
    // 车辆信息
    car: {
        queryCarInfoByCarSearch: function (params, sc) {
            axios.post(common.isdev() + apiUrls.car.queryCarInfoByCarSearch, params)
                .then((r) => {
                    sc(r)
                })
        }
    },
    // 获取按钮权限
    getBtnJurisdiction(params) {
        return axios.post(common.isdev() + apiUrls.getBtnJurisdiction, params);
    },
    storeInfo: {
        //查询经销商门店信息
        queryShopInfo(params, sc) {
            return axios.post(common.isdev() + apiUrls.storeInfo.queryShopInfo, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    //审批流
    approval: {
        query: function (params, sc) {
            axios.post(common.isdev() + apiUrls.approval.query, params)
                .then((r) => {
                    sc(r)
                })
        },
    },
    //从数据字典获取主表信息
    getDataDictionarys(params, sc) {
        axios.post(common.isdev() + apiUrls.getDataDictionarys, params)
            .then(r => {
                sc(r)
            })
    },
    getpostType: {
        //获取没有的角色
        getqueryno(params, sc) {
            axios.post(common.isdev() + apiUrls.getpostType.getqueryno, params)
                .then(r => {
                    sc(r)
                })
        },
        //获取已经有的角色
        getqueryshow(params, sc) {
            axios.post(common.isdev() + apiUrls.getpostType.getqueryshow, params)
                .then(r => {
                    sc(r)
                })
        },
        //插入
        insert(params, sc) {
            axios.post(common.isdev() + apiUrls.getpostType.insert, params)
                .then(r => {
                    sc(r)
                })
        }
    }
}
