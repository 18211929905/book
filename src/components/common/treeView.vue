<template lang="html">
  <ZTree ref='tree' :treeData="treeData" :options="options" @node-click="itemClick" @add-node="addNode" :key="2">
  </ZTree>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import ZTree from './tree.vue'
  export default {
    props: {
      treeData: Array,
      default: []
    },
    data: function() {
      return {
        options: {
          showCheckbox: true,
          halfCheckedStatus: false, //控制父框是否需要半钩状态
          lazy: true,
          load: this.loadingChild,
          showSearch: false,
          rootName: '我的组织',
          labelKey: 'areaName',
          iconClass: {
            close: 'icon-youjiantou',
            open: 'icon-xiajiantou',
            add: 'icon-add'
          },
          iconStyle: {
            color: '#108ee9'
          },
          dynamicAdd: true,
          dynamicAddFilter: (node) => {
            if (node.type === 1 || node.type === 2) {
              return true
            }
            return false
          },
          // function handle add node; the new node must have `dynamicAdd` property
          // the tree component rely on this show editor
          // return Promise
          dynamicAddNode: this.addNode,
          // function handle save node; the new node must have `dynamicSaveNode` property
          // the tree component rely on this save node
          // return Promise
          dynamicSaveNode: this.saveNode,
          // function handle
          // return String
          leafIcon: this.leafIcon,
          search: {
            useInitial: true,
            useEnglish: false,
            customFilter: null
          }
        }
      }
    },
    methods: {
      itemClick(node) {
        
      },
      async loadingChild(node, index) {
        console.log(node,index)
        try {
          let data = await new Promise((resolve, reject) => {
            setTimeout(() => {
              let d = [
                {

                  "id": 1,
                  "label": "节点 1",
                  "open": false,
                  "checked": false,
                  "nodeSelectNotAll": false,
                  "parentId": null,
                  "visible": true,
                  "searched": false
                },
                {
                 // "id": 2,
                  "label": "北京",
                 // "open": false,
                //  "checked": false,
                 // "nodeSelectNotAll": false,
                 // "parentId": null,
                 // "visible": true,
                  //"searched": false
                }
              ]
              resolve(d)
            }, 1000)
          })
          let tem = this.getParentNode(node, this.treeData)
          this.options.rootName = '节点 2'
          // set Children
          // Vue.set(tem, 'children', generateKey(data, node.key));
          Vue.set(tem, 'children', data);
          Promise.resolve(data);
        } catch (e) {
          Promise.reject(e);
        }
      },
      async addNode(item) {
        let parent = this.getParentNode(item, this.treeData)
        let node = {
          id: 2,
          label: '一级节点',
          open: false,
          checked: false,
          nodeSelectNotAll: false,
          parentId: null,
          visible: true,
          searched: false
        }
        if (!item.hasOwnProperty('children') || item.children.length === 0) {
          await this.loadingChild(parent)
        }
        parent.open = true
        parent.children.splice(0, 0, Object.assign({}, {


          dynamicAdd: true,
          loaded: true
        }, node))
        //                generateKey(parent.children, parent.key) // regenerate key
        return Promise.resolve(true)
      },
      async saveNode(item, e) {
        if (!e.target.value) {
          return
        }
        return new Promise((resolve, reject) => {
          // todo sent data to sever
          delete item.dynamicAdd // 删除属性
          Vue.set(item, 'label', e.target.value)
          e.target.value = ''
          setTimeout(() => {
            resolve(item)
          }, 1000)
        })
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
      /**
       * 叶子结点 的 icon class
       * @param node
       * @returns {*}
       */
      leafIcon(node) {
        // filter type and return icon class
        if (node.type === 1 || node.type === 2) {
          return ''
        }
        return 'icon-square'
      }
    },
    components: {
      'ZTree': ZTree
    }
  }
</script>

<style lang="css" @scope>

</style>