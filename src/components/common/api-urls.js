/**
 *  create by lwx on 2018/02/01
 * 
 *  此文件用于存放每个模块的新增, 编辑等权限接口url
 *    => 用来控制按钮权限
 * 
 */
export default {
    getTickerList: '/v1/sys/chinaArea/queryChinaAreaInfo.htm',
    ajaxtest: '/hello/world.htm',
    upDataPassword: '/v1/sys/emp/userUpdatePassword.htm',
    getChinaAreaInfo: '/v1/sys/chinaArea/queryChinaAreaInfo.htm',
    getUpdateChinaAreaInfo: '/v1/sys/chinaArea/updateChinaAreaInfo.htm',
    getInsertChinaAreaInfo: '/v1/sys/chinaArea/insertChinaAreaInfo.htm',
    getChinaAreaInfoByAreaCode: '/v1/sys/chinaArea/getChinaAreaInfoByAreaCode.htm',
    initChinaAreaToCache: '/v1/sys/chinaArea/initChinaAreaToCache.htm',
    getQuerySalesAreaInfo: '/v1/sys/salesArea/querySalesAreaInfo.htm',
    getInsertSalesAreaInfo: '/v1/sys/salesArea/insertSalesAreaInfo.htm',
    getUpdateSalesAreaInfo: '/v1/sys/salesArea/updateSalesAreaInfo.htm',
    getSalesAreaInfoByAreaCode: '/v1/sys/salesArea/getSalesAreaInfoByAreaCode.htm',
    initSalesAreaToCache: '/v1/sys/salesArea/initSalesAreaToCache.htm',
    getQueryDeliveryAreaInfo: '/v1/sys/deliveryArea/queryDeliveryAreaInfo.htm',
    getUpdateDeliveryAreaInfo: '/v1/sys/deliveryArea/updateDeliveryAreaInfo.htm',
    getInsertDeliveryAreaInfo: '/v1/sys/deliveryArea/insertDeliveryAreaInfo.htm',
    getDeliveryAreaInfoByAreaCode: '/v1/sys/deliveryArea/getDeliveryAreaInfoByAreaCode.htm',
    initDeliveryAreaToCache: '/v1/sys/deliveryArea/initDeliveryAreaToCache.htm',
    getQueryPurchasingAreaInfo: '/v1/sys/purchasingArea/queryPurchasingAreaInfo.htm',
    getUpdatePurchasingAreaInfo: '/v1/sys/purchasingArea/updatePurchasingAreaInfo.htm',
    getInsertPurchasingAreaInfo: '/v1/sys/purchasingArea/insertPurchasingAreaInfo.htm',
    getPurchasingAreaInfoByAreaCode: '/v1/sys/purchasingArea/getPurchasingAreaInfoByAreaCode.htm',
    initPurchasingAreaToCache: '/v1/sys/purchasingArea/initPurchasingAreaToCache.htm',
    getEmpInsert: '/v1/sys/emp/insert.htm',
    getPositionByMan: '/v1/system/postn/queryPostnByEmpCode.htm',
    queryMainEmployeeInfoByPost: '/v1/sys/emp/queryMainEmployeeInfoByPost.htm',
    resetPasswrod: '/v1/sys/emp/adminUpdatePassword.htm',
    getQueryMainInfo: '/v1/sys/emp/queryMainInfo.htm',
    getUpdataInfo: '/v1/sys/emp/update.htm',
    getQueryAllInfo: '/v1/sys/emp/queryAllInfo.htm',
     /****************      配置人员岗位  接口     ******************/
    configEmpPostOrg: '/v1/sys/empPstn/insert.htm',
    queryCheckedPostn: '/v1/sys/empPstn/queryPostnHaveByEmpCode.htm',
    queryNoCheckedPostn: '/v1/sys/empPstn/queryPostnNotHaveByEmpCode.htm',
    getRelationalInsert: '/v1/sys/empPstn/insert.htm',
    getRelationalQueryInfo: '/v1/sys/empPstn/query.htm',
    getRelationalUpdataInfo: '/v1/sys/empPstn/update.htm',
    getQueryEmpByPostn: '/v1/sys/empPstn/queryEmpByPostn.htm',
    getQueryCarMainCar: '/v2/sys/car/queryCarAddInfoByCarCode.htm',
    addCarMainInfo: '/v1/sys/car/batchInsertOrUpdateCarAddInfo.htm',
    AddCarMainInfo: '/v2/sys/car/batchInsertOrUpdateCarAddInfo.htm',
    carType: {
        factory: {
            init: '/v1/sys/car/initCarFactoryCache.htm',
            getInsert: '/v1/sys/car/insertCarFactory.htm',
            getUpdata: '/v1/sys/car/updateCarFactory.htm',
            getFromDB: '/v1/sys/car/queryCarFactoryByCodeFromDB.htm',
            getFromCache: '/v1/sys/car/queryCarFactoryByCodeFromCache.htm',
            getQueryInfo: '/v1/sys/car/queryCarFactory.htm'
        },
        brand: {
            init: '/v1/sys/car/initCarBrandCache.htm',
            getInsert: '/v1/sys/car/insertCarBrand.htm',
            getUpdata: '/v1/sys/car/updateCarBrand.htm',
            getFromDB: '/v1/sys/car/queryCarBrandByCodeFromDB.htm',
            getFromCache: '/v1/sys/car/queryCarBrandByCodeFromCache.htm',
            getQueryInfo: '/v1/sys/car/queryCarBrand.htm'
        },
        series: {
            init: '/v1/sys/car/initCarSeriesCache.htm',
            getInsert: '/v1/sys/car/insertCarSeries.htm',
            getUpdata: '/v1/sys/car/updateCarSeries.htm',
            getFromDB: '/v1/sys/car/queryCarSeriesByCodeFromDB.htm',
            getFromCache: '/v1/sys/car/queryCarSeriesByCodeFromCache.htm',
            getQueryInfo: '/v1/sys/car/queryCarSeries.htm'
        },
        model: {
            init: '/v1/sys/car/initCarModelCache.htm',
            getInsert: '/v1/sys/car/insertCarModel.htm',
            getUpdata: '/v1/sys/car/updateCarModel.htm',
            getFromDB: '/v1/sys/car/queryCarModelByCodeFromDB.htm',
            getFromCache: '/v1/sys/car/queryCarModelByCodeFromCache.htm',
            getQueryInfo: '/v1/sys/car/queryCarModel.htm'
        },
        opv: {
            init: '/v1/sys/car/initCarOpvCache.htm',
            getInsert: '/v1/sys/car/insertCarOpv.htm',
            getUpdata: '/v1/sys/car/updateCarOpv.htm',
            getFromDB: '/v1/sys/car/queryCarOpvByCodeFromDB.htm',
            getFromCache: '/v1/sys/car/queryCarOpvByCodeFromCache.htm',
            getQueryInfo: '/v1/sys/car/queryCarOpv.htm'
        },
        ioType: {
            init: '/v1/sys/car/initCarIoTypeCache.htm',
            getInsert: '/v1/sys/car/insertCarIoType.htm',
            getUpdata: '/v1/sys/car/updateCarIoType.htm',
            getFromDB: '/v1/sys/car/queryCarIoTypeByCodeFromDB.htm',
            getFromCache: '/v1/sys/car/queryCarIoTypeByCodeFromCache.htm',
            getQueryInfo: '/v1/sys/car/queryCarIoType.htm'
        },
        mainCarType: {
            init: '/v1/sys/car/initCarCache.htm',
            getInsert: '/v1/sys/car/insertCar.htm',
            getUpdata: '/v1/sys/car/updateCar.htm',
            getFromDB: '/v1/sys/car/queryCarByCodeFromDB.htm',
            getFromCache: '/v1/sys/car/queryCarByCodeFromDB.htm',
            getQueryInfo: '/v1/sys/car/queryCar.htm',
            getExact: '/v1/sys/car/queryExactCar.htm'
        },
        saleMainCarType: {
            getUpdata: '/v2/sys/car/updateCar.htm',
            getQueryInfo: '/v2/sys/car/queryCar.htm',
            getInsert: '/v2/sys/car/insertCar.htm',
            addCarMainInfo: '/v2/sys/car/batchInsertOrUpdateCarAddInfo.htm'
        }
    },
    queryDataDictionary: '/v1/sys/ref/query.htm',
    getDataDictionary: '/v1/sys/ref/get.htm',
    createdDataDictionary: '/v1/sys/ref/insert.htm',
    editDataDictionary: '/v1/sys/ref/update.htm',
    createDictionaryDetails: '/v1/sys/refDetail/insert.htm',
    editDictionaryDetails: '/v1/sys/refDetail/update.htm',
    queryDictionaryDetails: '/v1/sys/refDetail/query.htm',
    getDataDetails: '/v1/sys/refDetail/get.htm',
    cacheDataDictionary: '/v1/sys/ref/initRedisCache.htm',
    getDictionaryDetails: '/v1/sys/refDetail/get.htm',
    organzation: {
        queryOrganization: '/v1/sys/org/query.htm',
        cacheOrganization: '/v1/sys/org/initRedisCache.htm',
        getOrganizationByOrgCode: '/v1/sys/org/get.htm',
        createdOrganization: '/v1/sys/org/insert.htm',
        editOrganization: '/v1/sys/org/update.htm',
        queryPosition: '/v1/sys/postn/query.htm',
        createdPosition: '/v1/sys/postn/insert.htm',
        editPosition: '/v1/sys/postn/update.htm',
        getPositionByPostCode: '/v1/sys/postn/get.htm',
        cachePostionInfo: '/v1/sys/postn/initRedisCache.htm'
    },
    addPostRole: {
        postHaveRole: '/v1/sys/postRole/queryPostHaveRole.htm',
        postNotHaveRole: '/v1/sys/postRole/queryPostNotHaveRole.htm'
    },
    store: {
        getStoreInfo: '/v1/sys/store/get.htm',
        queryStoreInfo: '/v1/sys/store/queryMainInfo.htm',
        createdStoreInfo: '/v1/sys/store/insert.htm',
        editStoreInfo: '/v1/sys/store/update.htm',
        cacheStoreInfo: '/v1/sys/store/initRedisCache.htm',
        getCarTypeInfo: '/v1/sys/car/queryCarInfoByCarSearch.htm',
        queryStoreCarInfo: '/v1/sys/store/queryStoreCarInfo.htm',
        addEditStoreCarInfo: '/v1/sys/store/batchEditStoreCarInfos.htm',
        getSalesArea: '/v1/sys/SalesArea/getSalesAreaInfoByUserAvailableOnlyOneLevel.htm',
        queryStoreBysale: '/v1/sys/store/queryStoreInfoBySalesCode.htm'
    },
    vehicle: {
        queryDisplacement: '/v1/sys/car/queryCarOpvByCodeFromCache.htm',
        createDisplacement: '/v1/sys/car/insertCarOpv.htm',
        editDisplacement: '/v1/sys/car/updateCarOpv.htm',
    },
    role: {
        insertRoleInfo: '/v1/sys/role/insertRoleInfo.htm',
        updateRoleInfo: '/v1/sys/role/updateRoleInfo.htm',
        queryRoleInfo: '/v1/sys/role/queryRoleInfo.htm',
        getRoleInfo: '/v1/sys/role/getRoleInfo.htm',
        initRoleInfoToCache: '/v1/sys/role/initRoleInfoToCache.htm'
    },
    menu: {
        insertMenuInfo: '/v1/sys/menu/insertMenuInfo.htm',
        updateMenuInfo: '/v1/sys/menu/updateMenuInfo.htm',
        queryMenuInfo: '/v1/sys/menu/queryMenuInfo.htm',
        getMenuInfo: '/v1/sys/menu/getMenuInfo.htm',
        initAllMenuCache: '/v1/sys/menu/initAllMenuCache.htm',
        getReferenceInfo: '/v1/sys/ref/get.htm'
    },
    roleMenu: {
        insert: '/v1/sys/roleMenu/insert.htm',
        update: '/v1/sys/roleMenu/update.htm',
        query: '/v1/sys/roleMenu/query.htm',
        queryRoleHaveMenu: '/v1/sys/roleMenu/queryRoleHaveMenu.htm',
        queryRoleNotHaveMenu: '/v1/sys/roleMenu/queryRoleNotHaveMenu.htm'
    },
    postRole: {
        insert: '/v1/sys/postRole/insert.htm',
        update: '/v1/sys/postRole/update.htm',
        query: '/v1/sys/postRole/query.htm',
        getPostInfo: '/v1/sys/postn/get.htm',
    },
    ordinalInfo: {
        insert: '/v1/sys/seq/insertSequenceInfo.htm',
        search: '/v1/sys/seq/querySequenceInfo.htm',
        edit: '/v1/sys/seq/updateSequenceInfo.htm',
        getSequence: '/v1/sys/seq/getSequence.htm',
        getSequenceList: '/v1/sys/seq/getSequenceList.htm',
        dataSync: '/v1/sys/seq/initSequenceToCache.htm',
    },
    task: {
        edit: '/v1/task/update.htm',
        search: '/v1/task/query.htm',
        newadd: '/v1/task/insert.htm',
    },
    ref: {
        queryNextReferenceDetails: '/v1/sys/refDetail/queryNextReferenceDetails.htm',
        queryFirstLevelReferenceDetails: '/v1/sys/ref/queryFirstLevelReferenceDetails.htm',
    },
    toLogin: {
        login: '/v1/login.htm',
        getUserMenu: '/v1/getUserMenu.htm',
        getLoginInfo: '/v1/getLoginInfo.htm',
        getOrg: '/v1/login/getOrg.htm',
        changeLoginInfo: '/v1/login/changeLoginInfo.htm',
        loginOut: '/v1/logout.htm',
    },
    getSalesAreaInfoByUserAvailableAllLevel: '/v1/sys/SalesArea/getSalesAreaInfoByUserAvailableOnlyOneLevel.htm',
    finance: {
        queryShopInfo: '/v1/sys/store/queryStoreInfoBySalesCode.htm'
    },
    getJurisdiction: '/v1/getUserAvailableInfo.htm',
    area: {
        getSalesAreaInfoByAreaCode: '/v1/sys/salesArea/getSalesAreaInfoByAreaCode.htm'
    },
    getUserAvailableInfo: '/v1/getUserAvailableInfo.htm',
    car: {
        queryCarInfoByCarSearch: '/v1/sys/car/queryCarInfoByCarSearch.htm'
    },
    getBtnJurisdiction: '/v1/sys/menu/getMenuUrl.htm',
    storeInfo: {
        queryShopInfo: '/v1/sys/store/get.htm'
    },
    approval: {
        query: '/v2/workFlow/orderwf/queryOrderWfInfoByPostnCode.htm'
    },
    getDataDictionarys: '/v1/sys/ref/get.htm',
    getpostType:{
        insert:'/v1/sys/postTypeRole/insertPostTypeRoleInfo.htm',
        getqueryno:'/v1/sys/postTypeRole/queryPostTypeNotHaveRole.htm',
        getqueryshow:'/v1/sys/postTypeRole/queryPostTypeRoleInfo.htm'
    }
}