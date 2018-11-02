import api from 'components/common/api'
import commonConfig from "components/common/commonConfig"

export function getPostTypeList(arr, code = commonConfig.acquireType.refPosition) {
    const param = {refCode: code}
    api.getDataDictionary(param).then(res => {
        let items = res.data.obj.referenceDetailInfos
        if(res.data.code === 'success') {
            if(!items) {
                return
            }
            items.forEach((item) => {
                let data = {
                    text: item.refDetailName,
                    value: item.refDetailCode
                }
                arr.push(data)
            });
        }
    })
}

// 这个方法不知道为什么在组间内部调用就是拿不到数组列表
export function getWaitList(params, arr) {
    api.queryNoCheckedPostn(params).then(res => {
        if(res.data.code === 'success') {
            arr = []
            let obj = res.data.obj
            if(obj) {
                obj.forEach((item) => {
                    arr.push({
                        text: item.postName,
                        value: item.postCode 
                    })
                })
            }
            // console.log(arr)  这里是可以拿到的
        }
    }); 
}

