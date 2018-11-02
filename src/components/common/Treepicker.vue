<template>
  <div class="treepicker">
    <input class="form-control treepicker-input" :class="{'with-reset-button': clearButton}" type="text" :placeholder="placeholder"
        :style="{width:width}"
        @click="inputClick"
        v-model="value"/>
    <button v-if="clearButton && value" type="button" class="close" @click="value = ''">
      <span>&times;</span>
    </button>
    <div class="treepicker-popup" v-show="displayDayView">
      <div class="treepicker-inner">
        <div class="treepicker-body">
          <div class="treepicker-ctrl">
            <span class="treepicker-preBtn glyphicon glyphicon-chevron-left" aria-hidden="true" @click="preNextMonthClick(0)"></span>
            <span class="treepicker-nextBtn glyphicon glyphicon-chevron-right" aria-hidden="true" @click="preNextMonthClick(1)"></span>
            <p @click="switchMonthView">{{stringifyDayHeader(currDate)}}</p>
          </div>
          <div class="treepicker-weekRange">
            <!--<span v-for="w in text.daysOfWeek">{{w}}</span>-->
          </div>
          <div class="treepicker-dateRange">
            <span v-for="d in dateRange" :class="d.sclass" @click="daySelect(d.date,this)">{{d.text}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from './NodeList.js'

export default {
  props: {
    value: {
      type: String,
      twoWay: true
    },
    format: {
      default: 'MM/dd/yyyy'
    },
    disabledDaysOfWeek: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: String,
      default: '200px'
    },
    clearButton: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    }
  },
  ready () {
    this._blur = (e) => {
      if (this.$el !== null && !this.$el.contains(e.target)) this.close()
    }
    this.$dispatch('child-created', this)
    this.currDate = this.parse(this.value) || this.parse(new Date())
    $(window).on('click', this._blur)
  },
  beforeDestroy () {
    $(window).off('click', this._blur)
  },
  data () {
    return {
      currDate: new Date(),
      dateRange: [],
      decadeRange: [],
      displayDayView: false,
      displayMonthView: false,
      displayYearView: false
    }
  },
  watch: {
    currDate () {
      this.getDateRange()
    }
  },
  computed: {
    text () {
      return 
    }
  },
  methods: {
    close () {
      this.displayDayView = this.displayMonthView = this.displayYearView = false
    },
    inputClick () {
      this.currDate = this.parse(this.value) || this.parse(new Date())
      if (this.displayMonthView || this.displayYearView) {
        this.displayDayView = false
      } else {
        this.displayDayView = !this.displayDayView
      }
    },
    preNextDecadeClick (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        this.currDate = new Date(year - 10, months, date)
      } else {
        this.currDate = new Date(year + 10, months, date)
      }
    },
    preNextMonthClick (flag) {
      const year = this.currDate.getFullYear()
      const month = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        const preMonth = this.getYearMonth(year, month - 1)
        this.currDate = new Date(preMonth.year, preMonth.month, date)
      } else {
        const nextMonth = this.getYearMonth(year, month + 1)
        this.currDate = new Date(nextMonth.year, nextMonth.month, date)
      }
    },
    preNextYearClick (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        this.currDate = new Date(year - 1, months, date)
      } else {
        this.currDate = new Date(year + 1, months, date)
      }
    },
    yearSelect (year) {
      this.displayYearView = false
      this.displayMonthView = true
      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate())
    },
    daySelect (date, el) {
      if (el.$el.classList[0] === 'treepicker-item-disable') {
        return false
      } else {
        this.currDate = date
        this.value = this.stringify(this.currDate)
        this.displayDayView = false
      }
    },
    switchMonthView () {
      this.displayDayView = false
      this.displayMonthView = true
    },
    switchDecadeView () {
      this.displayMonthView = false
      this.displayYearView = true
    },
    monthSelect (index) {
      this.displayMonthView = false
      this.displayDayView = true
      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate())
    },
    getYearMonth (year, month) {
      if (month > 11) {
        year++
        month = 0
      } else if (month < 0) {
        year--
        month = 11
      }
      return {year: year, month: month}
    },
    stringifyDecadeHeader (date) {
      const yearStr = date.getFullYear().toString()
      const firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0
      const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10
      return firstYearOfDecade + '-' + lastYearOfDecade
    },
    stringifyDayHeader (date) {
      return this.text
    },
    parseMonth (date) {
      return this.text
    },
    stringifyYearHeader (date) {
      return date.getFullYear()
    },
    stringify (date, format = this.format) {
      if (!date) date = this.parse()
      if (!date) return ''
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const monthName = this.parseMonth(date)

      return format
      .replace(/yyyy/g, year)
      .replace(/MMMM/g, monthName)
      .replace(/MMM/g, monthName.substring(0, 3))
      .replace(/MM/g, ('0' + month).slice(-2))
      .replace(/dd/g, ('0' + day).slice(-2))
      .replace(/yy/g, year)
      .replace(/M(?!a)/g, month)
      .replace(/d/g, day)
    },
    parse (str = this.value) {
      let date
      if (str.length === 10 && (this.format === 'dd-MM-yyyy' || this.format === 'dd/MM/yyyy')) {
        date = new Date(str.substring(6, 10), str.substring(3, 5)-1, str.substring(0, 2))
      } else {
        date = new Date(str)
      }
      return isNaN(date.getFullYear()) ? new Date() : date
    },
    getDayCount (year, month) {
      const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (month === 1) {
        if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
          return 29
        }
      }
      return dict[month]
    },
    getDateRange () {
      this.dateRange = []
      this.decadeRange = []
      const time = {
        year: this.currDate.getFullYear(),
        month: this.currDate.getMonth(),
        day: this.currDate.getDate()
      }
      const yearStr = time.year.toString()
      const firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1
      for (let i = 0; i < 12; i++) {
        this.decadeRange.push({
          text: firstYearOfDecade + i
        })
      }

      const currMonthFirstDay = new Date(time.year, time.month, 1)
      let firstDayWeek = currMonthFirstDay.getDay() + 1
      if (firstDayWeek === 0) {
        firstDayWeek = 7
      }
      const dayCount = this.getDayCount(time.year, time.month)
      if (firstDayWeek > 1) {
        const preMonth = this.getYearMonth(time.year, time.month - 1)
        const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
        for (let i = 1; i < firstDayWeek; i++) {
          const dayText = prevMonthDayCount - firstDayWeek + i + 1
          this.dateRange.push({
            text: dayText,
            date: new Date(preMonth.year, preMonth.month, dayText),
            sclass: 'treepicker-item-gray'
          })
        }
      }

      for (let i = 1; i <= dayCount; i++) {
        const date = new Date(time.year, time.month, i)
        const week = date.getDay()
        let sclass = ''
        this.disabledDaysOfWeek.forEach((el) => {
          if (week === parseInt(el, 10)) sclass = 'treepicker-item-disable'
        })
        if (i === time.day) {
          if (this.value) {
            const valueDate = this.parse(this.value)
            if (valueDate) {
              if (valueDate.getFullYear() === time.year && valueDate.getMonth() === time.month) {
                sclass = 'treepicker-dateRange-item-active'
              }
            }
          }
        }
        this.dateRange.push({
          text: i,
          date: date,
          sclass: sclass
        })
      }

      if (this.dateRange.length < 42) {
        const nextMonthNeed = 42 - this.dateRange.length
        const nextMonth = this.getYearMonth(time.year, time.month + 1)

        for (let i = 1; i <= nextMonthNeed; i++) {
          this.dateRange.push({
            text: i,
            date: new Date(nextMonth.year, nextMonth.month, i),
            sclass: 'treepicker-item-gray'
          })
        }
      }
    }
  }
}
</script>

<style>
.treepicker{
  position: relative;
  display: inline-block;
}
input.treepicker-input.with-reset-button {
  padding-right: 25px;
}
.treepicker > button.close {
  position: absolute;
  top: 0;
  right: 0;
  outline: none;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
.treepicker > button.close:focus {
  opacity: .2;
}
.treepicker-popup{
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  margin-top: 2px;
  z-index: 1000;
  box-shadow: 0 6px 12px rgba(0,0,0,0.175);
}
.treepicker-inner{
  width: 218px;
}
.treepicker-body{
  padding: 10px 10px;
}
.treepicker-ctrl p,
.treepicker-ctrl span,
.treepicker-body span{
  display: inline-block;
  width: 28px;
  line-height: 28px;
  height: 28px;
  border-radius: 4px;
}
.treepicker-ctrl p {
  width: 65%;
}
.treepicker-ctrl span {
  position: absolute;
}
.treepicker-body span {
  text-align: center;
}
.treepicker-monthRange span{
  width: 48px;
  height: 50px;
  line-height: 45px;
}
.treepicker-item-disable {
  background-color: white!important;
  cursor: not-allowed!important;
}
.decadeRange span:first-child,
.decadeRange span:last-child,
.treepicker-item-disable,
.treepicker-item-gray{
  color: #999;
}

.treepicker-dateRange-item-active:hover,
.treepicker-dateRange-item-active {
  background: rgb(50, 118, 177)!important;
  color: white!important;
}
.treepicker-monthRange {
  margin-top: 10px
}
.treepicker-monthRange span,
.treepicker-ctrl span,
.treepicker-ctrl p,
.treepicker-dateRange span {
  cursor: pointer;
}
.treepicker-monthRange span:hover,
.treepicker-ctrl p:hover,
.treepicker-ctrl i:hover,
.treepicker-dateRange span:hover,
.treepicker-dateRange-item-hover {
  background-color : #eeeeee;
}
.treepicker-weekRange span{
  font-weight: bold;
}
.treepicker-label{
  background-color: #f8f8f8;
  font-weight: 700;
  padding: 7px 0;
  text-align: center;
}
.treepicker-ctrl{
  position: relative;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  text-align: center;
}
.month-btn{
  font-weight: bold;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.treepicker-preBtn{
  left: 2px;
}
.treepicker-nextBtn{
  right: 2px;
}
</style>
