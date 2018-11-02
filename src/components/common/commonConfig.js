/**
  common config
 */
import common from "../../assets/js/common.js";
export default {
    //是否显示厂家 false 从厂家开始，true从品牌开始
    isShowFactory: common.getSession('showFactory') === 'false' ? false : true,
    selectCarRef: 'factoryFlag',
    pageNums: 15,
    maxpageNums: 100,
    irisLogo: "iRIS 汽车智能服务平台",
    menuLogoUrl: '/static/image/irislogo.png',
    //数据字典主表code
    ref: {
        frontSystemName: 'frontSystemName',
        frontMenuLogo: 'frontMenuLogo',
        frontLogo: 'frontLogo'
    },    
    //面包屑配置
    breadNav: {
        ordinalInfo: [{
            name: '业务序号信息',
            url: common.isweb() + '/ordinal-info/ordinal-info.html'
        }],
        china: [{
            name: '中国国标行政区域管理',
            url: common.isweb() + '/china/china.html'
        }],
        sale: [{
            name: '销售区域管理',
            url: common.isweb() + '/sale/sale.html'
        }],
        distribution: [{
            name: '配送区域管理',
            url: common.isweb() + '/distribution/distribution.html'
        }],
        purchase: [{
            name: '采购区域管理',
            url: common.isweb() + '/purchase/purchase.html'
        }],
        task: [{
            name: '统一任务调度',
            url: common.isweb() + '/task/tasklist.html'
        }],
        dataDictionary: [{
            name: "数据字典",
            url: common.isweb() + '/dataDictionary/dataDictionary.html'
        }],
        dictionaryDetails: [{
            name: "数据字典",
            url: common.isweb() + '/dataDictionary/dataDictionary.html'
        }, {
            name: "数据字典明细",
            url: common.isweb() + "/dataDictionary/dictionaryDetails/dictionaryDetails.html"
        }],
        organization: [{
            name: "组织信息",
            url: common.isweb() + "/organization/organization.html"
        }],
        menu: [{
            name: "菜单管理",
            url: common.isweb() + "/menu/menu.html"
        }],
        role: [{
            name: "角色管理",
            url: common.isweb() + "/role/role.html"
        }],
        roleMenu: [{
            name: "角色菜单管理",
            url: common.isweb() + "/role-menu/role-menu.html"
        }],
        postRole: [{
            name: "岗位角色管理",
            url: common.isweb() + "/post-role/post-role.html"
        }],
        insert: [{
            name: "员工信息",
            url: common.isweb() + "/employee/employee.html"
        }, {
            name: "新增员工信息",
            url: common.isweb() + "/employee/insert/insert.html"
        }],
        employee: [{
            name: "员工信息",
            url: common.isweb() + "/employee/employee.html"
        }],
        position: [{
            name: "岗位信息",
            url: common.isweb() + '/position/position.html'
        }],
        storeInfo: [{
            name: "门店信息",
            url: common.isweb() + "/store/storeInfo/storeInfo.html"
        }],
        storeVisibleCar: [{
            name: "门店可见车型表",
            url: common.isweb() + "/store/storeVisibleCar/storeVisibleCar.html"
        }],
        postInfo: [{
            name: "员工信息",
            url: common.isweb() + "/employee/employee.html"
        }],
        factory: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }, {
            name: "厂家信息",
            url: common.isweb() + "/carType/factory/factory.html"
        }],
        brand: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }, {
            name: "品牌信息",
            url: common.isweb() + "/carType/brand/brand.html"
        }],
        series: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }, {
            name: "车系信息",
            url: common.isweb() + "/carType/series/series.html"
        }],
        model: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }, {
            name: "车型信息",
            url: common.isweb() + "/carType/model/model.html"
        }],
        displacement: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }, {
            name: "排量信息",
            url: common.isweb() + "/carType/displacement/displacement.html"
        }],
        inlet: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }, {
            name: "进气方式",
            url: common.isweb() + "/carType/inlet/inlet.html"
        }],
        mainCarType: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }],
        //主车型附加信息
        AdditionalInfo: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        }, {
            name: "主车型附加信息",
            url: common.isweb() + "/carType/mainCarType/AdditionalInfo/AdditionalInfo.html"
        }],
        //銷售主車型信息
        saleMainCarType:[{
    	 		name: "主车型信息",
        	url: common.isweb() + "/carType/saleMainCarType/saleMainCarType.html"
        }],
         //主车型附加信息
        AdditionalInfo_: [{
            name: "主车型信息",
            url: common.isweb() + "/carType/saleMainCarType/saleMainCarType.html"
        }, {
            name: "主车型附加信息",
            url: common.isweb() + "/carType/saleMainCarType/AdditionalInfo_/AdditionalInfo_.html"
        }],
        Addingroles:[{
            name:'岗位类型角色管理',
            url: common.isweb() + "/addingroles/addingroles.html"
        }],
    },
    menu: {
        serviceCode: 'SYSMENU',
        rootMenuCode: '000001',
        //菜单
        buttonType: {
            refCode: 'MenuType',
            default: '001'
        },
    },
    role: {
        //获取角色编码
        serviceCode: 'SYSROLE',
    },
    roleMenu: {
        serviceCode: '006',
    },
    postRole: {
        serviceCode: 'SYSPR',
        rootPostCode: 'PN000001'
    },
    //获取所有组织，岗位，人员编码、(params)
    maxPageNums: 10000,
    //菜单sidebar 渲染
    menuMap: {
        '000001': '',
        //数据字典
        '000002': common.isweb() + '/dataDictionary/dataDictionary.html',
        //业务需要
        '000004': common.isweb() + '/ordinal-info/ordinal-info.html',
        //登录
        '000009': common.isweb() + '/login/login.html',
        //菜单
        '000018': common.isweb() + '/menu/menu.html',
        //组织管理
        '000031': common.isweb() + '/organization/organization.html',
        //菜单角色管理
        '000029': common.isweb() + '/role-menu/role-menu.html',
        //职位管理
        '000037': common.isweb() + '/position/position.html',
        //角色管理
        '000044': common.isweb() + '/role/role.html',
        //行政区域管理
        '000051': common.isweb() + '/china/china.html',
        //配送区域
        '000057': common.isweb() + '/distribution/distribution.html',
        //采购区域
        '000063': common.isweb() + '/purchase/purchase.html',
        //销售区域
        '000069': common.isweb() + '/sale/sale.html',
        //员工管理
        '000076': common.isweb() + '/employee/employee.html',
        //员工新增
        '000082': common.isweb() + '/employee/insert/insert.html',
        //车型管理-厂家管理
        '000085': common.isweb() + '/carType/factory/factory.html',
        //车型管理-品牌管理
        '000092': common.isweb() + '/carType/brand/brand.html',
        //车型管理-车系管理
        '000098': common.isweb() + '/carType/series/series.html',
        //车型管理-车型管理
        '000104': common.isweb() + '/carType/model/model.html',
        //车型管理-排量管理
        '000110': common.isweb() + '/carType/displacement/displacement.html',
        //车型管理-进气方式管理
        '000116': common.isweb() + '/carType/inlet/inlet.html',
        //车型管理-主车型信息
        '000122': common.isweb() + '/carType/mainCarType/mainCarType.html',
        //统一任务
        '000139': common.isweb() + '/task/tasklist.html',
        //门店管理
        '000147': common.isweb() + '/store/storeInfo/storeInfo.html',
        //门店管理
        '000152': common.isweb() + '/carType/mainCarType/AdditionalInfo/AdditionalInfo.html',
        '000153': common.isweb() + '/carType/saleMainCarType/AdditionalInfo_/AdditionalInfo_.html',
        //门店车型管理
        '000235': common.isweb() + '/store/storeVisibleCar/storeVisibleCar.html',
        //岗位分配角色
        '002426': common.isweb() + '/addingroles/addingroles.html',
        // ==========================================
        //市场活动
        "000174": common.islivePro() + '/market/query',
        //金融机构
        "000161": common.islivePro() + '/finance/mainFinance',
        //金融产品
        "000190": common.islivePro() + '/financePro/mainFinancePro',
        //保险机构
        "000217": common.islivePro() + '/insurance/query',
        //保险方案
        "000230": common.islivePro() + '/insurancepro',
        //crm调研
        "000237": common.islivePro() + '/questionnaire/query',
        // 商品分类
        "000275": common.islivePro() + '/classification',
        // 商品目录
        "000300": common.islivePro() + '/catalog',
        //商品品牌管理
        '000268': common.islivePro() + '/commoditybrand',
        //商品分类管理
        '000275': common.islivePro() + '/classification',
        //商品价格
        '000281': common.islivePro() + '/skuPrice/query',
        //商品产地管理
        '000288': common.islivePro() + '/birthplace',
        //商品车型管理
        '000294': common.islivePro() + '/models/query',
        //商品目录
        '000300': common.islivePro() + '/catalog',
        //整车商品
        '000306': common.islivePro() + '/archives',
        //商品包装
        '000313': common.islivePro() + '/pack',
        //商品单位管理
        '000319': common.islivePro() + '/commodityunit',
        //客户信息管理
        '000326': common.islivePro() + '/clientmain',
        //供应商管理
        '000354': common.islivePro() + '/supplier',
        //供应链订单
        '000380': common.islivePro() + '/purchaseOrder',
        //仓库管理
        '000360': common.islivePro() + '/warehouse',
        //问卷调查
        '000238': common.islivePro() + '/questionnaire',
        //问卷调查
        '000238': common.islivePro() + '/questionnaire',
        // snp管理
        "000600": common.islivePro() + '/snpbelonging/:snp',
        // gp管理
        "000580": common.islivePro() + '/gpbelonging/:gp',
        //  仓库库区信息
        "000410": common.islivePro() + '/whArea',
        //  库存管理
        "000459": common.islivePro() + '/queryware',
        //  仓库库位
        "000411": common.islivePro() + '/whLocation',
        //  工作流
        "000474": common.islivePro() + '/salesAdmin',
        //  商品品牌
        "000269": common.islivePro() + '/commoditybrand',
        //  组合商品
        "000448": common.islivePro() + '/skuComb',
        //  订单管理
        "000514": common.islivePro() + '/order',
        //  crm新车调研
        "": common.islivePro() + '/research',
        //  整车商品锁定
        "": common.islivePro() + '/archiveslock',
        //  精品商品
        "": common.islivePro() + '/boutique',
        //  前台工作台
        "": common.islivePro() + '/receptionist',
        //  供应商发票信息
        "": common.islivePro() + '/supplierInvoice',
        //  精品采购入库
        "": common.islivePro() + '/inStock',
        //  整车采购
        "": common.islivePro() + '/procurement',
        //  整车采购入库
        "": common.islivePro() + '/storage',
        //  整车采购付款
        "": common.islivePro() + '/pay',
        //  整车采购开票
        "": common.islivePro() + '/ticket',
        //  整车采购冻结
        "": common.islivePro() + '/frozen',
        //  DCC线索信息
        "": common.islivePro() + '/dccthread',
        //  销售目标设置
        "": common.islivePro() + '/salesTargetPlan',
        //  商务激励政策管理
        "": common.islivePro() + '/businessaffairs',
        //  收款信息
        "": common.islivePro() + '/collectmoney',
        //  开票
        "": common.islivePro() + '/billing',
    },
    //树结构根节点编码
    nodeCode: {
        rootRefCode: "PositionType", //数据字典编码
        //rootDetailsCode: "REFD000001", //数据字典明细树根节点编码
        organizationCode: {
            orgCode: "000001" //组织模块树、门店管理组织编码的树根节点编码
        },
        rootPostionCode: "000001", //职位管理树根节点编码
    },
    //获取业务应用编码
    ordinal: {
        dictionary: "SYSREF", // 数据字典
        dictionaryDetails: "SYSREFDETAIL", // 数据字典明细
        organization: "ORG", // 组织信息
        position: "POSTN", // 获取岗位编码
        storeInfo: "STORE", // 门店信息
        storeCarInfo: "STORECAR" // 门店对应车型编码序列
    },
    //车型新增模块获取编码参数
    carType: {
        factory: "CARFACTORY", // 查询厂家编码
        brand: "CARBRAND", // 品牌
        series: "CARSERIES", // 车系
        model: "CARMODEL", // 车型
        displacement: "CAROPV", // 排量
        inlet: "CARIOTYPE", // 进气方式
        car: "CAR" // 车辆主信息
    },
    //销售、采购、配送区域新增编码获取参数
    area: {
        sale: 'SAREA',
        darea: 'DAREA',
        parea: 'PAREA'
    },
    //行政、销售、配送、采购区域树状图根节点获取参数
    areaRoot: {
        org: "000001",
        area: "000001",
        sale: "000001",
        darea: "000001",
        parea: "000001"
    },
    //员工新增编码获取参数
    employee: {
        emp: 'EMP',
        sysep: 'SYSEP',
        type: 'EmpType'
    },
    //员工附加信息refCode
    empRefCode: 'EmpAdd',
    storeAdditionInfo: 'StoreAdd', // 门店附加信息数据字典编码
    acquireType: {
        refOrganization: 'OrgType', // 组织类型获取编码
        refPosition: 'PositionType', // 岗位类型获取编码
        refstore: 'StoreType' // 门店类型获取编码
    },
    //请求成功提示
    success: {
        edit: "编辑成功",
        add: "新增成功",
        cache: "同步数据成功",
        query: "查询数据成功",
        addpost: "添加成功",
        addrole: "添加成功",
        resetPasswrod: "重置密码成功"
    },
    prompt: {
        checkData: "请选择一条数据"
    },
    //门店部分获取行政、销售、配送、采购区域编码树状图根节点获取参数
    storeRoot: {
        orgCode: "000001",
        postCode: "000001",
        chinaCityCode: "000001",
        salesCode: "000001",
        purchasingAreaCode: "000001"
    },
    //主车型附加信息编码
    AdditionalInfo: {
        //获取明细车型编码
        infoServiceCode: "CARADD",
        //获取数据表格表头的编码
        infoRefCode: "MainModelAdd"
    },
    //门店管理是否可用
    storeStatus: [{
            value: '0',
            text: "可用"
        },
        {
            value: '1',
            text: "停用"
        }
    ],
    storeShow: [{
            value: '1',
            text: "可见"
        },
        {
            value: '0',
            text: '不可见'
        }
    ],
}
