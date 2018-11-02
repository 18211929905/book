<template>
    <div class="fixed-table-pagination clearfix" style="display: block;" v-if="totalPages >= 1 && totalResult >= 1 && pageSize >= 1 && totalResult <= totalPages*pageSize">
        <div class="pull-right pagination margin-right-10">
            <ul class="pagination">
                <!-- 第一页 -->
                <li>
                    <a  style="cursor:pointer;" @click=" firstpage" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
                <!-- 上一页 -->
                <li>
                    <a :disabled="hasPrevious" style="cursor:pointer;" @click="selectPage(pageNo - 1)" aria-label="Previous">
                        <span aria-hidden="true">‹</span>
                    </a>
                </li>
                <li v-if="pageNo>=DisplaySeveral">
                    <a style="cursor:pointer;">
                        <span aria-hidden="true">...</span>
                    </a>
                </li>
                <li v-for="item in totalPages" @click="pagechange(item)" v-if="pageNo>=DisplaySeveral?(item <= (pageNo+1)) && (item >= (pageNo-2)):item<=DisplaySeveral ">
                    <a style="cursor:pointer;" :class="{ 
                                'active': 'disabled',
                                'activecolor': item == pageNo
                                }">
                        <span aria-hidden="true">{{item }}</span>
                    </a>
                </li>
                <li v-if="(totalPages>DisplaySeveral)&&(pageNo!=(totalPages))">
                    <a style="cursor:pointer;">
                        <span aria-hidden="true">...</span>
                    </a>
                </l>
                <!-- 下一页 -->
                <li>
                    <a :disabled="hasNext" style="cursor:pointer;" :class="{ 'active': 'disabled'}" @click="selectPage(pageNo + 1)" aria-label="Next">
                        <span aria-hidden="true">›</span>
                    </a>
                </li>
                <!-- 最后一页 -->
                <li>
                    <a  style="cursor:pointer;" :class="{ 'active': 'disabled'}" @click="lastpage" aria-label="Next">
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="pull-right pagination margin-right-10">
            <div class="pagination">
                <span class="pagination-info">第 {{ pageNo }} 页/共 {{ totalPages }} 页</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      show: false,
      DisplaySeveral:4
    };
  },
  props: {
    pageNo: {
      type: Number,
      validator: function(value) {
        return value > 0;
      },
      default: 1
    },
    pageSize: {
      type: Number,
      validator: function(value) {
        return value > 0;
      },
      default: 10
    },
    totalResult: {
      type: Number,
      default: 0
    },
    displayNum: {
      type: Number,
      default: 6
    },
    edgeNum: {
      type: Number,
      default: 2
    }
  },
  replace: true,
  inherit: false,
  computed: {
    hasPrevious: function() {
      return this.pageNo > 1;
    },
    hasNext: function() {
      return this.pageNo < this.totalPages;
    },
    pages: function() {
      return getPages(
        this.pageNo,
        this.totalPages,
        this.edgeNum,
        this.displayNum
      );
    },
    totalPages: function() {
      return getTotalPages(this.pageSize, this.totalResult);
    },
    startIndex: function() {
      return Math.min(this.totalResult, (this.pageNo - 1) * this.pageSize + 1);
    },
    endIndex: function() {
      return Math.min(this.totalResult, this.pageNo * this.pageSize);
    }
  },
  methods: {
    open_change(val) {
      this.isOpen = val;
    },
    selectPage: function(num) {
      let size = arguments.length === 2 ? arguments[1] : this.pageSize;
      if (this.pageNo != num && num > 0 && num <= this.totalPages) {
        this.$emit("page-change", num, size);
      }
    },
    selectSize: function(size) {
      if (this.pageSize != size && size > 0) {
        //this.pageSize = size;
        if (this.pageNo > this.totalPages) {
          this.selectPage(this.totalPages, size);
        } else {
          this.$emit("page-change", this.pageNo, size);
        }
      }
      this.isOpen = false;
    },
    pagechange(pagenum) {
      this.$emit("page-change", pagenum, this.pageSize);
    },
    firstpage() {
      if (this.hasPrevious) {
        this.$emit("page-change", 1, this.pageSize);
      }
    },
    lastpage() {
      if (this.hasNext) {
        this.$emit("page-change", this.totalPages, this.pageSize);
      }
    }
  },
  components: {}
};
function getTotalPages(pageSize, totalResult) {
  var totalPages = pageSize < 1 ? 1 : Math.ceil(totalResult / pageSize);
  return Math.max(totalPages || 0, 1);
}
// Create page object used in template
function makePage(number, text, isActive) {
  return {
    number: number,
    text: text,
    disabled: number === -1
  };
}
/**
 * Calculate start and end point of pagination links depending on
 * currentPage and num_display_entries.
 * @return {Array}
 */
function getInterval(currentPage, pageCount, num_display_entries) {
  //var num_display_entries = 6;
  var ne_half = Math.ceil(num_display_entries / 2);
  var np = pageCount;
  var upper_limit = np - num_display_entries;
  var start =
    currentPage > ne_half
      ? Math.max(Math.min(currentPage - ne_half, upper_limit), 0)
      : 0;
  var end =
    currentPage > ne_half
      ? Math.min(currentPage + ne_half, np)
      : Math.min(num_display_entries, np);
  return [start, end];
}
function getPages(
  currentPage,
  totalPages,
  num_edge_entries,
  num_display_entries
) {
  var ret = [];
  //var num_edge_entries = 2;
  var skip_text = "...";
  var np = totalPages;
  var interval = getInterval(currentPage - 1, totalPages, num_display_entries);
  // Generate starting points
  if (interval[0] > 0 && num_edge_entries > 0) {
    var end = Math.min(num_edge_entries, interval[0]);
    for (var i = 0; i < end; i++) {
      var page = makePage(i + 1, i + 1);
      ret.push(page);
    }
    if (num_edge_entries < interval[0]) {
      var page = makePage(-1, skip_text);
      ret.push(page);
    }
  }
  // Generate interval links
  for (var i = interval[0]; i < interval[1]; i++) {
    var page = makePage(i + 1, i + 1);
    ret.push(page);
  }
  // Generate ending points
  if (interval[1] < np && num_edge_entries > 0) {
    if (np - num_edge_entries > interval[1]) {
      var page = makePage(-1, skip_text);
      ret.push(page);
    }
    var begin = Math.max(np - num_edge_entries, interval[1]);
    for (var i = begin; i < np; i++) {
      var page = makePage(i + 1, i + 1);
      ret.push(page);
    }
  }
  return ret;
}
</script>
<style>
.activecolor {
  color: #fff !important;
  background-color: #20a8d8 !important;
}
</style>
