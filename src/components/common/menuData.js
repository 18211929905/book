/**
 *  common config
 *  cataLog 为销售老客户用的二级菜单  数据字典不为空那么是二级
 *  menuCataLog 为新用户用的三级菜单 数据字典为空默认三级
 */

import common from "../../assets/js/common.js";

export default {

    //子菜单与父菜单匹配归类,菜单顺序为数组顺序
    cataLog: [
        {
            modulName: '销售线索',
            iconClass: "iconfont icon-xiaoshouxiansuo",
            children: ['000481'] // 销售线索
        }, {
            modulName: '前台接待',
            iconClass: "iconfont icon-qiantaijiedai",
            children: ['000463'] // 前台接待
        }, {
            modulName: '金融管理',
            iconClass: "iconfont icon-jinrongguanli",
            children: [
                '000186', // 金融机构
                '000201', // 金融产品
                '001186', // 金融协作报价
                '001187'  // 贷款申请管理
            ]
        }, {
            modulName: '保险管理',
            iconClass: "iconfont icon-baoxianguanli",
            children: [
                '000232', // 保险公司
                '000246', // 保险方案
                '001613', // 保险协作报价
                '001670'  // 保险出单管理
            ]
        }, {
            modulName: '市场活动',
            iconClass: "iconfont icon-shichanghuodongguanlicopy",
            //          市场活动管理
            children: ['000217']
        }, {
            modulName: 'CRM调研',
            iconClass: "iconfont icon-CRMtiaoyan",
            children: [
                '000252', // 调查问卷设置
                '000275'  // 调研任务工作台
            ]
        }, {
            modulName: '订单中心',
            iconClass: "iconfont icon-dingdanzhongxin",
            children: [
                '000601', // 订单发票模块
                '000607', // 订单退款信息
                '000608', // 订单收款信息
                '000551', // 整车订单
                '002331'  // 行政挂车
            ]
        }, {
            modulName: '仓库管理',
            iconClass: "iconfont icon-cangkuguanli",
            children: [
                '000402', // 仓库信息
                '000442', // 仓库库区
                '000448'  // 仓库库位
            ]
        }, {
            modulName: '库存管理',
            iconClass: "iconfont icon-cangkuguanli",
            children: [
                '000454', // 商品库存查询
                '001340'  // 整车库存查询
            ]
        }, {
            modulName: '供应商管理',
            iconClass: "iconfont icon-gongyinglianguanli",
            //          供应商信息
            children: ['000393']
        }, {
            modulName: '商品管理',
            iconClass: "iconfont icon-shangpinguanli",
            children: [
                '000337', // 商品包装
                '000302', // 商品产地
                '000288', // 商品分类
                '000315', // 商品目录
                '000294', // 商品价格
                '000343', // 商品单位
                '000282', // 商品品牌
                '000323', // 精品商品
                '000349', // 组合商品
                '000308', // 商品关联车型设置
                '000429', // 精品采购订单
                '000434'  // 精品采购入库
            ]
        }, {
            modulName: '整车商品管理',
            iconClass: "iconfont icon-chexingguanli",
            children: [
                '000321', // 整车商品
                '000767', // 车辆分享平台
                '000769', // 车辆发布管理
                '000818', // 调拨出库管理
                '000826', // 调拨入库管理
                '000333', // 整车锁定管理
                '000410', // 整车采购订单
                '000425', // 整车付款
                '000421', // 整车开票
                '000417',  // 整车入库
                '002326', // 科达整车采购
                '002327', // 科达整车付款
                '002282', // 车辆预装
            ]
        }, {
            modulName: '销售行政管理',
            iconClass: "iconfont icon-xiaoshouhangzhengguanli",
            children: [
                '000048', // GP归属设置
                '000056', // SNP归属设置
                '000367', // 客户主档
                '000499', // 销售目标
                '000516', // 商务政策
                '000530',  // 门店审批流设置
                '002197',  // 服务费设置
                '002228'   // 审批流批量导入设置
            ]
        }, {
            modulName: '车型管理',
            iconClass: "iconfont icon-chexingguanli",
            children: [
                '000111', // 车型-厂家信息
                '000118', // 车型-品牌信息
                '000125', // 车型-车系信息
                '000132', // 车型-车型信息
                '000139', // 车型-排量信息
                '000146', // 车型-进气方式
                '000153', // 主车型信息
                '001050'  // 售后车型
            ]
        }, {
            modulName: '数据报表',
            iconClass: "iconfont icon-xiaoshouhangzhengguanli",
            children: [
                '002221', //PC数据看板
                '000740', // 展厅流量日志
                '001306', // LPE展厅客流日志
                '001119', // DCC线索跟进转化表
                '001120', // SC线索跟进转化表
                '001203', // 跨部门策略表
                '001660', // 销售管理报表
                '001415', // 经销商财务报表
                '001671', // SC线索电话跟进清单
                '000796', // CRM回访跟进表
                '002074', // CRM调研内容情况表
                '001740', // 展厅历史客流导入
                '002183'  // 虚拟销售管理报表
            ]
        }, {
            modulName: '基础设置',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                '000024', // 组织管理
                '000030', // 岗位管理
                '000039', // 角色管理
                '002426', // 岗位类型角色管理
                '000099', // 员工信息管理
                '000001', // 数据字典
                '000174', // 门店管理
                '000183', // 销售车型管理
                '000071', // 行政区域管理
                '000085', // 采购区域管理
                '000091', // 销售区域管理
                '000079', // 配送区域管理
                '000018', // 菜单管理
                '000011', // 业务序号
                '000167', // 统一任务调度
                '001091'  // 车型适配查询
            ]
        }
    ],

    // 子菜单与父菜单匹配归类
    menuCataLog: [
        {
            modulName: '页头',
            iconClass: "iconfont icon-xiaoshouxiansuo",
            children: [],
        },
        {
            modulName: '工作台',
            iconClass: 'iconfont icon-jichushezhi',
            children: ['002190'] // CSdashboard
        },
        {
            modulName: '系统设置',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                '000001', // 数据字典
                '000662', // 账务账期
                '000011', // 业务序号
                '000018', // 菜单管理
                '000167', // 系统任务调度
                '000048', // GP归属设置
                '000056', // SNP归属设置
                '000039', // 角色管理
                '000530'  // 工作流管理
            ]
        },
        {
            modulName: '行政管理',
            iconClass: "iconfont icon-xiaoshouhangzhengguanli",
            children: [
                '000024', // 组织管理
                '000030', // 岗位管理
                '000979', // 员工管理
                // '001015',  // 员工岗位
                '002426'   // 岗位类型角色管理
            ]
        },
        {
            modulName: '门店管理',
            iconClass: "iconfont icon-xiaoshouhangzhengguanli",
            children: [
                '001069', // 门店管理
                '000183', // 销售车型管理
                '000402', // 仓库信息
                '000442', // 库区管理
                '000448', // 库位管理
                '000970', // 工位管理
                '001425', // 摆放管理
                '001390'  // 店长折扣
            ]
        },
        {
            modulName: '区域管理',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                '000071', // 行政区域
                '000091', // 销售区域
                '000085', // 采购区域
                '000079'  // 配送区域
            ]
        },
        {
            modulName: '车型管理',
            iconClass: "iconfont icon-chexingguanli",
            children: [
                '000111', // 厂家管理
                '000118', // 品牌管理
                '000125', // 车系管理
                '000132', // 车型管理
                '000139', // 排量管理
                '000146', // 进气方式
                '000153', // 销售车型
                '001050'  // 售后车型
            ]
        },
        {
            modulName: '金融管理',
            iconClass: "iconfont icon-jinrongguanli",
            children: [
                '000186', // 金融机构
                '000201', // 金融产品
                '001186', // 协作报价
                '001187'  // 贷款申请
            ]
        },
        {
            modulName: '保险管理',
            iconClass: "iconfont icon-baoxianguanli",
            children: [
                '000232', // 保险公司
                '000246', // 保险方案
                '001613', // 协作报价
                '001670'  // 保险出单
            ]
        },
        {
            modulName: '市场活动',
            iconClass: "iconfont icon-shichanghuodongguanlicopy",
            //         活动管理
            children: ['000217']
        },
        {
            modulName: 'CRM管理',
            iconClass: "iconfont icon-CRMtiaoyan",
            children: [
                '000252', // 问卷设置
                '000275', // 调研任务
                '002299', // 售后招揽任务分配
                '002332', // 售后招揽任务清单
                '002292'  // 车辆保养参数配置
            ]
        },
        {
            modulName: '商品中心',
            iconClass: "iconfont icon-shangpinguanli",
            children: [
                '000288', // 分类管理
                '000315', // 目录管理
                {
                    childName: '整车信息',
                    textCode: [
                        '000321', // 整车信息
                        '000333'  // 整车锁定/解锁
                    ]
                }, {
                    childName: '商品信息',
                    textCode: [
                        '000325', // 商品管理
                        '000282', // 品牌管理
                        '000302', // 产地管理
                        '000337', // 包装管理
                        '000343', // 单位管理
                        '000294', // 商品定价
                     /*   '000308', // 商品车型适配*/
                        '001093', // 商品适配概览
                        '001091'  // 车型适配查询
                    ]
                }, {
                    childName: '组合信息',
                    textCode: [
                        '001032', // 组合商品
                     /*   '001161', // 组合分类
                        '001155'  // 组合目录*/
                    ]
                }
            ],
        },
        {
            modulName: '服务管理',
            iconClass: "iconfont icon-xiaoshouhangzhengguanli",
            children: [
                '000786', // 分类管理
                '000791', // 目录管理
                {
                    childName: '服务信息',
                    textCode: [
                        '000877', // 服务管理
                        '000906'  // 服务商品用量
                    ]
                }, {
                    childName: '服务定价',
                    textCode: [
                        '000884', // 车型工时管理
                        '000897'  // 套餐售价设置
                    ]
                },
                '002055', // 服务预约推荐配置
                '001343'  // 推荐服务
            ],
        },
        {
            modulName: '客户管理',
            iconClass: "iconfont icon-xiaoshouhangzhengguanli",
            children: [
                '001437', // 客户档案
                '002350', // 公司管理
                '002386', // 授信管理
            ]
        },
        {
            modulName: '供应商管理',
            iconClass: "iconfont icon-gongyinglianguanli",
            children: [
                '000636', // 供应商信息
                '000670'  // 采购合同
            ]
        },
        {
            modulName: '供应链管理',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                {
                    childName: '需求管理',
                    textCode: [
                        '001103', // 日常补货计划
                        '001126'  // 需求处理
                    ]
                }, {
                    childName: '整车采购',
                    textCode: [
                        '000410', // 采购订单
                        '000425', // 采购付款
                        '000421', // 采购开票
                        '000417', // 采购入库
                        '002326', // 科达整车采购
                        '002327', // 科达整车付款
                    ]
                }, {
                    childName: '整车共享',
                    textCode: [
                        '000767', // 车辆分享
                        '000769', // 车辆发布
                        '000818', // 调拨出库
                        '000826'  // 调拨入库
                    ]
                }, {
                    childName: '商品供应链',
                    textCode: [
                        '002141', // 商品采购
                        '002163', // 采购入库
                        '001326', // 采购退货
                        '000698', // 调拨出库
                        '000720', // 调拨入库
                        '000962', // 内售出库
                        '000957', // 内售入库
                        '001601', // 自采管理
                        '001602', // 自采到货处理
                        '001615', // 商品库存调整
                        '000684'  // 报损/报溢
                    ]
                }, {
                    childName: '库存信息',
                    textCode: [
                        '000454', // 商品库存
                        '001340', // 整车库存
                        '001319', // 入库批次查询
                        '001322', // 出入库查询
                        '001564'  // 调拨在途查询
                    ]
                }, {
                    childName: '盘点管理',
                    textCode: [
                        '000622', // 盘点计划
                        '000610'  // 盘点处理
                    ]
                }, {
                    childName: '对账/核销',
                    textCode: [
                        '001539', // 对账单管理
                        '001549'  // 核销单管理
                    ]
                },
                '001780' // 自采对账核销
            ]
        },
        {
            modulName: '整车交易',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                {
                    childName: '行政设置',
                    textCode: [
                        '000499', // 销售目标
                        '000516', // 商务政策
                        '001740', // 历史客流导入
                        '002197', // 服务费设置
                        '002228'  // 审批流批量导入设置
                    ]
                }, {
                    childName: '新车销售',
                    textCode: [
                        '000463', // 前台接待
                        '000481', // 销售线索
                        '000551', // 整车订单
                        '002331', // 行政挂车
                        '000601', // 订单发票模块
                        '000607', // 订单退款信息
                        '000608', // 订单收款信息
                        '002361'  // 订单核销
                    ]
                }
            ],
        },
        {
            modulName: '售后交易',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                {
                    childName: '行政设置',
                    textCode: [
                        '000836', // 员工排班
                        '001351'  // 检查模板
                    ]
                },
                '001742', // 快捷洗车
                {
                    childName: '预约单',
                    textCode: ['001913'] // 预约单查询
                },
                {
                    childName: '售后维修',
                    textCode: [
                        '001697', // 预检单查询
                        '001672', // 工单查询
                        '000929', // 派工管理
                        '000951', // 打卡管理
                        '001741', // 维修领料
                        '002202', // 寄存查询
                        '001724', // 工单收款
                        '001371', // 工单开票
                        '002302', // 完工检查
                        '002309', // 竣工校验
                        '002400', // 退货入库
                    ]
                }, {
                    childName: '退款',
                    textCode: ['002238'] // 退款查询
                }
            ],
        },
        {
            modulName: '卡券中心',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                {
                    childName: '卡中心',
                    textCode: [
                        '001216', // 计次卡模版
                        '001566', // 储值卡模版
                        '001261', // 卡管理
                        '001226', // 卡销售
                        '001239', // 卡充值
                        '001307'  // 卡退换
                    ]
                },
                {
                    childName: '券中心',
                    textCode: [
                        '001469', // 券模板
                        '001667', // 券管理
                        '001952'  // 券销售
                    ]
                }
            ],
        },
        {
            modulName: '财务管理',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                {
                    childName: '发票管理',
                    //        退票管理
                    textCode: ['001376']
                }
            ],
        },
        {
            modulName: '数据报表',
            iconClass: "iconfont icon-jichushezhi",
            children: [
                {
                    childName:'整车交易',
                    textCode: [
                        '002221', //PC数据看板
                        '000740', // 展厅客流日志
                        '000796', // CRM回访跟进表
                        '001203', // 跨部门策略表
                        '001119', // DCC线索跟进转化表
                        '001120', // SC线索跟进转化表
                        '001306', // LPE展厅客流日志
                        '001660', // 销售管理报表
                        '001415', // 经销商财务报表
                        '001671', // SC线索电话跟进清单
                        '002074',  // CRM调研情况表
                        '002183'  //虚拟销售管理报表
                    ]
                }
            ],
        },
    ],

    //菜单sidebar 渲染
    menuMap: {
        // ==========================================以下为基础模块
        //数据字典
        '000001': {
            url:common.isweb() + '/dataDictionary/dataDictionary.html',
            isNative:true
        },
        //根据岗位类型添加角色
        '002426': {
            url:common.isweb() + '/addingroles/addingroles.html',
            isNative:true
        },
        //业务序号
        '000011': {
            url: common.isweb() + '/ordinal-info/ordinal-info.html',
            isNative:true
        },
        //菜单管理
        '000018': {
            url: common.isweb() + '/menu/menu.html',
            isNative:true
        },
        //组织管理
        '000024': {
            url: common.isweb() + '/organization/organization.html',
            isNative:true
        },
        //岗位管理
        '000030': {
            url:  common.isweb() + '/position/position.html',
            isNative:true
        },
        //角色管理
        '000039': {
            url: common.isweb() + '/role/role.html',
            isNative:true
        },
        //行政区域管理
        '000071': {
            url: common.isweb() + '/china/china.html',
            isNative:true
        },
        //配送区域管理
        '000079': {
            url: common.isweb() + '/distribution/distribution.html',
            isNative:true
        },
        //采购区域管理
        '000085': {
            url: common.isweb() + '/purchase/purchase.html',
            isNative: true
        },
        //销售区域管理
        '000091': {
            url: common.isweb() + '/sale/sale.html',
            isNative: true
        },
        //员工信息管理
        '000099': {
            url: common.isweb() + '/employee/employee.html',
            isNative: true
        },
        //车型-厂家信息
        '000111': {
            url: common.isweb() + '/carType/factory/factory.html',
            isNative: true
        },
        //车型-品牌信息
        '000118': {
            url: common.isweb() + '/carType/brand/brand.html',
            isNative: true
        },
        //车型-车系信息
        '000125': {
            url: common.isweb() + '/carType/series/series.html',
            isNative: true
        },
        //车型-车型信息
        '000132': {
            url: common.isweb() + '/carType/model/model.html',
            isNative: true
        },
        //车型-排量信息
        '000139': {
            url: common.isweb() + '/carType/displacement/displacement.html',
            isNative: true
        },
        //车型-进气方式
        '000146': {
            url: common.isweb() + '/carType/inlet/inlet.html',
            isNative: true
        },
        //主车型信息
        '000153': {
            url: common.isweb() + '/carType/mainCarType/mainCarType.html',
            isNative: true
        },
        //统一任务调度
        '000167': {
            url: common.isweb() + '/task/tasklist.html',
            isNative: true
        },
        //门店管理
        '000174': {
            url: common.isweb() + '/store/storeInfo/storeInfo.html',
            isNative: true
        },
        //门店可见车型设置
        '000183': {
            url: common.isweb() + '/store/storeVisibleCar/storeVisibleCar.html',
            isNative: true
        },
        //主车型信息V2
        '001050': {
            url: common.isweb() + '/carType/saleMainCarType/saleMainCarType.html',
            isNative: true
        },
        // ==========================================以下为销售模块
        //商品关联车型设置
        '000308':  {
            url: common.islivePro() + '/models/query',
            isNative: false
        },
        //市场活动管理
        "000217": {
            url: common.islivePro() + '/market/query',
            isNative: false
        },
        //金融机构
        "000186": {
            url: common.islivePro() + '/finance/mainFinance',
            isNative: false
        },
        //金融产品
        "000201": {
            url: common.islivePro() + '/financePro/mainFinancePro',
            isNative: false
        },
        //金融协作报价
        '001186': {
            url: common.islivePro() + '/financeWb/quote',
            isNative: false
        },
        //金融贷款申请
        '001187': {
            url: common.islivePro() + '/financeWb/loan',
            isNative: false
        },
        //保险协作报价
        "001613": {
            url: common.islivePro() + '/insuranceWorkbench/quote',
            isNative: false
        },
        //保险出单管理
        "001670": {
            url: common.islivePro() + '/insuranceWorkbench/out',
            isNative: false
        },
        //保险公司
        "000232": {
            url: common.islivePro() + '/insurance/query',
            isNative: false
        },
        //保险方案
        "000246": {
            url:common.islivePro() + '/insurancepro/query',
            isNative: false
        },
        //调查问卷设置
        "000252": {
            url:common.islivePro() + '/questionnaire/query',
            isNative: false
        },
        //调研任务工作台
        "000275": {
            url: common.islivePro() + '/research/query',
            isNative: false
        },
        // 商品分类
        "000288": {
            url:common.islivePro() + '/classification',
            isNative: false
        },
        // 商品目录
        "000315": {
            url:common.islivePro() + '/catalog',
            isNative: false
        },
        //商品品牌
        '000282': {
            url:common.islivePro() + '/commoditybrand',
            isNative: false
        },
        //商品价格
        '000294': {
            url:common.islivePro() + '/skuPrice/query',
            isNative: false
        },
        //商品产地
        '000302': {
            url: common.islivePro() + '/birthplace',
            isNative: false
        },
        //整车商品
        '000321': {
            url: common.islivePro() + '/archives/query',
            isNative: false
        },
        //车辆预装
        '002282': {
            url: common.islivePro() + '/preloadedCar',
            isNative: true
        },
        //商品包装
        '000337': {
            url: common.islivePro() + '/pack',
            isNative: false
        },
        //商品单位
        '000343': {
            url: common.islivePro() + '/commodityunit',
            isNative: false
        },
        //仓库信息
        '000402': {
            url: common.islivePro() + '/warehouse/query',
            isNative: false
        },
        //仓库库区
        '000442': {
            url: common.islivePro() + '/whArea',
            isNative: false
        },
        //仓库库位
        '000448': {
            url: common.islivePro() + '/whLocation',
            isNative: false
        },
        // 销售线索
        '000481': {
            url: common.islivePro() + '/dccthread/queryclientmain',
            isNative: false
        },
        //前台接待
        '000463': {
            url: common.islivePro() + '/receptionist',
            isNative: false
        },
        //订单发票模块
        '000601': {
            url: common.islivePro() + '/billing/query',
            isNative: false
        },
        //订单收款信息
        '000608': {
            url: common.islivePro() + '/incollectmoney/query',
            isNative: false
        },
        //订单退款信息
        '000607': {
            url: common.islivePro() + '/outcollectmoney/query',
            isNative: false
        },
        //整车订单
        '000551': {
            url: common.islivePro() + '/order',
            isNative: false
        },
        //商品库存查询
        '000454': {
            url: common.islivePro() + '/storeInfo/sku',
            isNative: false
        },
        //整车库存查询
        '001340':{
            url: common.islivePro() +  '/storeInfo/car',
            isNative: false
        },
        //整车锁定管理
        '000333': {
            url: common.islivePro() + '/archiveslock',
            isNative: false
        },
        //整车采购订单
        '000410': {
            url: common.islivePro() + '/procurement/orderForm',
            isNative: false
        },
        //整车采购付款
        '000425': {
            url: common.islivePro() + '/pay/query',
            isNative: false
        },
        //整车采购开票
        '000421': {
            url: common.islivePro() + '/ticket/query',
            isNative: false
        },
        //整车采购入库
        '000417': {
            url: common.islivePro() + '/storage/query',
            isNative: false
        },
        //车辆资源共享平台
         '000767': {
            url: common.islivePro() + '/vehicle/share',
            isNative: false
        },
        //车辆资源发布
         '000769': {
            url: common.islivePro() + '/vehicle/release/main',
            isNative: false
        },
        //GP归属设置
        '000048': {
            url: common.islivePro() + '/gpbelonging/gp',
            isNative: false
        },
        //SNP归属设置
        '000056': {
            url: common.islivePro() + '/snpbelonging/snp',
            isNative: false
        },
        //销售目标
        '000499': {
            url: common.islivePro() + '/salesTargetPlan/query',
            isNative: false
        },
        //商务政策
        '000516': {
            url: common.islivePro() + '/businessaffairs',
            isNative: false
        },
        //门店审批流设置
        '000530': {
            url: common.islivePro() + '/salesAdmin/query',
            isNative: false
        },
        //服务费设置
        '002197': {
            url: common.islivePro() + '/serviceFree/index',
            isNative: false
        },
        //PC数据看板
        '002221': {
            url: common.islivePro() + '/dashboardmarket',
            isNative: false
        },
        //展厅客流日志
        '000740': {
            url: common.islivePro() + '/dataReport/exHallPassengerLog',
            isNative: false
        },
        //展厅历史客流导入
        '001740': {
            url: common.islivePro() + '/dataReport/exHallPassengerToChannel',
            isNative: false
        },
        //CRM跟进情况表
         '000796': {
            url: common.islivePro() + '/dataReport/crmFollowUp',
            isNative: false
        },
        //SC线索电话跟进清单
        '001671': {
            url: common.islivePro() + '/dataReport/phonecalllist',
            isNative: false
        },
        //SC线索跟进及转化表
        '001120': {
            url: common.islivePro() + '/dataReport/scThreadFollowUp',
            isNative: false
        },
        //DCC线索跟进及转化表
        '001119': {
            url: common.islivePro() + '/dataReport/dccThreadReport',
            isNative: false
        },
        //经销商财务报表
        '001415': {
            url: common.islivePro() + '/dataReport/financeReport',
            isNative: false
        },
        //销售管理报表
        '001660': {
            url: common.islivePro() + '/dataReport/salesManageOrder',
            isNative: false
        },
        //跨部门策略表
        '001203': {
            url: common.islivePro() + '/policyTable/list',
            isNative: false
        },
        //LPE展厅客流日志
        '001306': {
            url: common.islivePro() + '/lpe/index',
            isNative: false
        },
         //内采内销调出单
         '000818': {
            url: common.islivePro() + '/vehicle/callOut/main',
            isNative: false
        },
         //内采内销调入单
         '000826': {
            url: common.islivePro() + '/vehicle/callIn/main',
            isNative: false
        },
        // CRM调研情况表
        '002074': {
            url:  common.islivePro() + '/crm/index',
            isNative: false
        },
        //虚拟销售管理报表
        '002183': {
            url: common.islivePro() + '/dataReport/virtualMarketReportForm',
            isNative: false
        },
        //审批流批量导入设置
        '002228': {
            url: common.islivePro() + '/approvalFlowBatchImportSetting',
            isNative: false
        },
        // 科达整车采购
        '002326': {
            url: common.islivePro() + '/kedaprocurement/orderForm',
            isNative: true
        },
        // 科达整车付款
        '002327': {
            url: common.islivePro() + '/kedaprocurement/pay',
            isNative: true
        },
        // 行政挂车
        '002331': {
            url: common.islivePro() + '/salesQuote',
            isNative: true
        },
        // ==========================================以下为售后模块\
        // 精品商品 old
        '000323': {
            url: common.islivePro() + '/boutique',
            isNative: false
        },
        // 商品分类 new
        '000325': {
            url: common.isliveCs() + '/skuinfo/query',
            isNative: false
        },
        // dashboard
        '002190': {
            url: common.isliveCs() + '/dashboard',
            isNative: false
        },
        //精品采购订单 老 pro项目
        '000429': {
            url: common.islivePro() + '/purchaseOrder',
            isNative: false
        },
        //精品采购订单
        '002141': {
            url: common.isliveCs() + '/purchase-order/purchase-query',
            isNative: false
        },
        //精品采购入库 老 pro项目
        '000434': {
            url: common.islivePro() + '/inStock',
            isNative: false
        },
        //精品采购入库
        '002163': {
            url: common.isliveCs()  + '/notarchives-put/notarchives-query',
            isNative: false
        },
        //员工岗位
        '001015': {
            url: common.isliveCs() + '/staffjobs/query',
            isNative: false
        },
        //员工打卡
        '000951': {
            url:  common.isliveCs() + '/clock/clock',
            isNative: false
        },
        //盘点单
        '000610': {
            url:  common.isliveCs() + '/blitem/blitemSearch',
            isNative: false
        },
        //采购合同
        '000670': {
            url:  common.isliveCs() + '/purchasecontract/search',
            isNative: false
        },
        //员工管理
        '000979': {
            url:  common.isliveCs() + '/staff/search',
            isNative: false
        },
        //盘点计划
        '000622': {
            url:  common.isliveCs() + '/checkplan/query',
            isNative: false
        },
        //账务账期
        '000662': {
            url:  common.isliveCs() + '/accounting/query',
            isNative: false
        },
        //服务信息
        '000877': {
            url:  common.isliveCs() + '/serviceitem/query',
            isNative: false
        },
        //服务固定价格
        '000897': {
            url:  common.isliveCs() + '/service-staticprice/query',
            isNative: false
        },
        //服务工时车型适配
        '000884': {
            url:  common.isliveCs() + '/service-manhour/query',
            isNative: false
        },
        //非整车调拨入库单
        '000720': {
            url:  common.isliveCs() + '/allotin/query',
            isNative: false
        },
        //非整车调拨出库单
        '000698': {
            url:  common.isliveCs() + '/allotout/query',
            isNative: false
        },
        //报损报溢
        '000684': {
            url:  common.isliveCs() + '/decrease-overflow/query',
            isNative: false
        },
        //库存调整单
        '001615': {
            url:  common.isliveCs() + '/stock-adjust/query',
            isNative: false
        },
        //员工排班
        '000836': {
            url:  common.isliveCs() + '/emp-scheduling',
            isNative: false
        },
        //商品服务目录
        '000791': {
            url:  common.isliveCs() + '/serviceCatalog/query',
            isNative: false
        },
        //商品服务分类
        '000786': {
            url:  common.isliveCs() + '/serviceClassify/query',
            isNative: false
        },
        //商品服务-服务商品关系及数量信息
        '000906': {
            url:  common.isliveCs() + '/servicesku',
            isNative: false
        },
        //售后主业务（派工管理）
        '000929': {
            url: common.isliveCs() + '/resource-utilization/resource-utilization',
            isNative: false
        },
        //供应商信息
        '000393': {
            url: common.islivePro() + '/supplier/query',
            isNative: false
        },
        //商品关联车型设置V2
        '001000':{
            url: common.isliveCs() + '/skuCar/skuCarSearch',
            isNative: false
        },
        //车型查询适配SKU
        '001091':{
            url: common.isliveCs() + '/carSku',
            isNative: false
        },
        //SKU车型适配全数据预览
        '001093':{
            url: common.isliveCs() + '/skuCarAll',
            isNative: false
        },


        /*==========================================演示测试==============================================================*/
        //非整车采购订单
        '000955' :{
            url: common.isliveCs() + '/purchase-order',
            isNative: false
        },
        // 自采管理
        '001601' :{
            url: common.isliveCs() + '/store-ownpurchase/search',
            isNative: false
        },
        // 自采到货处理
        '001602' :{
            url: common.isliveCs() + '/arrive-handle/query',
            isNative: false
        },
        //日常补货计划
        '001103' :{
            url: common.isliveCs() + '/dailyfill/query',
            isNative: false
        },
        //商品摆放目录
        '001425' :{
            url: common.isliveCs() + '/sku-place/query',
            isNative: false
        },
        //非整车采购退货
        '001326' :{
            url: common.isliveCs() + '/purchase-return/purchase-return-search',
            isNative: false
        },
        //出入库清单明细
        '001322' :{
            url: common.isliveCs() + '/warehousing-list',
            isNative: false
        },
        //入库清单明细
        '001319' :{
            url: common.isliveCs() + '/inventory-list',
            isNative: false
        },
        //集团内调拨入库单
        '000957' :{
            url: common.isliveCs() + '/group-allotin/query',
            isNative: false
        },
        //集团调拨出库单
        '000962' :{
            url: common.isliveCs() + '/group-allotout/query',
            isNative: false
        },
        //需求单
        '001126' :{
            url: common.isliveCs() + '/demand-order/require-goods',
            isNative: false
        },
        // 组合
        // 由于有两个页面的 name 都是 skuComb，所以在本地点击此链接时
        // 由于重定向会跳到 001032 所对应的页面
        '000349': {
            url: common.islivePro() + '/skuComb',
            isNative: false
        },
        //组合商品
        '001032':{
            url:  common.isliveCs() + '/skuComb/query',
            isNative: false
        },
        // 组合分类
        '001161' :{
            url: common.isliveCs() + '/groupClassify/query',
            isNative: false
        },
        // 组合目录
        '001155' :{
            url: common.isliveCs() + '/groupCatalog/query',
            isNative: false
        },
        // 门店管理
        '001069' :{
            url: common.isliveCs() + '/storemanage/query',
            isNative: false
        },
        //门店工位信息
        '000970' :{
            url: common.isliveCs() + '/store-station',
            isNative: false
        },
        //卡模板管理计次卡
        '001216' :{
            url: common.isliveCs() + '/card-template-counting/card-template-counting-query',
            isNative: false
        },
        //卡充值
        '001239' :{
            url: common.isliveCs() + '/card-pay/card-pay-search',
            isNative: false
        },
        //卡管理
        '001261' :{
            url: common.isliveCs() + '/card-manager/query',
            isNative: false
        },
        //卡销售单
        '001226' :{
            url: common.isliveCs() + '/card-sale-order/query',
            isNative: false
        },
        //退卡退款
        '001307' :{
            url: common.isliveCs() + '/back-card/back-card-query',
            isNative: false
        },

        // 券模板
        '001469': {
            url: common.isliveCs() + '/ticket-template-counting/ticket-template-counting-query',
            isNative: false
        },
        // 券管理
        '001667': {
            url: common.isliveCs() + '/ticket-manager/query',
            isNative: false
        },
        // 券销售
        '001952': {
            url: common.isliveCs() + '/coupons-sale-order/query',
            isNative: false
        },

        // 检查模板
        '001351' :{
            url: common.isliveCs() + '/check-template/check-template-search',
            isNative: false
        },
        // 对账单
        '001539' :{
            url: common.isliveCs() + '/statement-account/query',
            isNative: false
        },
        // 对账核销单
        '001549' : {
            url: common.isliveCs() + '/statement-account-cancel/query',
            isNative: false
        },
        // 自采对账核销
        '001780' : {
            url: common.isliveCs() + '/account-check/index',
            isNative: false
        },
        // 调拨相关清单
        '001564' :{
            url: common.isliveCs() + '/allot-relative/query',
            isNative: false
        },
        // 卡模版储值
        '001566' :{
            url: common.isliveCs() + '/card-template-storedvalue/card-template-storedvalue-query',
            isNative: false
        },
        // 退票
        '001376' :{
            url: common.isliveCs() + '/refund/refund-query',
            isNative: false
        },
        // 开票
        '001371' :{
            url: common.isliveCs() + '/workOrderInvoice/workOrderInvoice',
            isNative: false
        },
        // 完工
        '002302' :{
            url: common.isliveCs() + '/finish/query',
            isNative: false
        },
        // 竣工
        '002309' :{
            url: common.isliveCs() + '/complete/query',
            isNative: false
        },
        // 公司管理
        '002350': {
            url:common.isliveCs() + '/company/query',
            isNative: false
        },
        // 授信管理
        '002386': {
            url:common.isliveCs() + '/credit/query',
            isNative: false
        },
        '002361': {
            url:common.isliveCs() + '/enterprise-verification/query',
            isNative: false
        },
        // 售后招揽任务分配
        '002299' :{
            url: common.isliveCs() + '/solicit-allocation/query',
            isNative: false
        },
        // 售后招揽任务清单
        '002332' :{
            url: common.isliveCs() + '/solicit/query',
            isNative: false
        },
        // 车辆保养配置
        '002292' :{
            url: common.isliveCs() + '/vehicle-maintain/query',
            isNative: false
        },
        // 退款查询
        '002238' :{
            url: common.isliveCs() + '/repair-order-refund/query',
            isNative: false
        },
        // 洗车
        '001742': {
            url: common.isliveCs() + '/vehicle-cleaning/vehicle-cleaning-add',
            isNative: false
        },
        // 维修合同
        '001689': {
            url: common.isliveCs() + '/work-order/work-order-search',
            isNative: false
        },
        // 预约单
        '001913': {
            url: common.isliveCs() + '/appointment-new/appointment-search',
            isNative: false
        },
        // 预检单
        '001697': {
            url: common.isliveCs() + '/precheck-fix/precheck-fix-query',
            isNative: false
        },
        // 订单结算
        '001724': {
            url: common.isliveCs() + '/workOrderPay/workOrderPay',
            isNative: false
        },
        // 领料
        '001741': {
            url: common.isliveCs() + '/store-requisition/query',
            isNative: false
        },
        // 寄存查询
        '002202': {
            url: common.isliveCs() + '/consign/consign-query',
            isNative: false
        },
        // 非整车工单基础包
        '001672': {
            url: common.isliveCs() + '/check-fix-list/query',
            isNative: false
        },
        // 促销折扣权限
        '001390' :{
            url: common.isliveCs() + '/sale-discount/sale-discount-search',
            isNative: false
        },
        //供应商
        '000636' :{
            url: common.isliveCs() + '/supplier/supplierSearch',
            isNative: false
        },
        // 服务预约推荐配置
        '002055' :{
            url: common.isliveCs() + '/store-appointment-service/store-appointment-service-query',
            isNative: false
        },
        // 服务推荐
        '001343' :{
            url: common.isliveCs() + '/service-recommend/query',
            isNative: false
        },
        //客户主档 pre 销售环境老的 客户主档
        '000367': {
            url: common.islivePro() + '/clientmain',
            isNative: false
        },
        // 人车-会员车辆信息
        '001437' :{
            url: common.isliveCs() + '/mancar/query',
            isNative: false
        },
        // 商品信息
        '000905' :{
            url: common.isliveCs() + '/skuinfo/query',
            isNative: false
        },
        // 服务信息
        '000803' :{
            url: common.isliveCs() + '/serviceitem/query',
            isNative: false
        },
        // 非整车商品采购
        '001506' :{
            url: common.isliveCs() + '/notarchives-put/notarchives-query',
            isNative: false
        },
        // 退货入库
        '002400' :{
            url: common.isliveCs() + '/refund-sku-instock/query',
            isNative: false
        }
    }
}
