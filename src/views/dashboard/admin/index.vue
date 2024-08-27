<template>
  <div ref="workbench" class="crm-workbench">
    <div>
      <div v-loading="loading" class="brief-box">
        <div class="brief-title">
          <span class="icon el-icon-reading" />
          <span class="text">销售简报</span>
        </div>
        <div class="brief">
          <flexbox
            v-for="(item, index) in briefList"
            :key="index"
            :span="2"
            class="brief-item"
            @click.native="reportClick(item)"
          >
            <flexbox class="brief-item__body">
              <div :style="{ backgroundColor: item.color }" class="icon-box">
                <span :class="item.icon" class="icon" />
              </div>
              <div class="info">
                <div class="title">
                  {{ item.label }}
                </div>
                <div class="number">
                  {{ item.num }}
                </div>
              </div>
            </flexbox>
            <div v-if="rateText !== ''" class="brief-item__others">
              <div class="text">
                {{ rateText }}
              </div>
              <div :class="item.status" class="rate text-one-line">
                <span class="rate__num">{{ item.rate }}%</span>
                <span :class="`el-icon-${item.status}`" class="rate__icon" />
              </div>
            </div>
          </flexbox>
        </div>
      </div>
      <el-row :gutter="12" class="elRowBox">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <sales-funnel />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper" style="position: relative">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="收款额" name="collectedAmount" />
              <el-tab-pane label="签约额" name="signAmount" />
              <el-tab-pane label="客户数" name="clientNum" />
              <el-tab-pane label="开票额" name="invoiceAmount" />
              <el-tab-pane label="出库额" name="outAmount" />
            </el-tabs>
            <div class="chartBox">
              <p>
                <span>完成值：</span>
                <span>20万</span>
              </p>
              <p>
                <span>目标值：</span>
                <span>200万</span>
              </p>
              <p>
                <span>未完成值：</span>
                <span>180万</span>
              </p>
            </div>
            <completion-rate />
          </div>
        </el-col>
        <!-- <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col> -->
      </el-row>
      <el-row class="elRowBox">
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <line-chart :chart-data="lineChartData" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import SalesFunnel from './components/SalesFunnel'
import CompletionRate from './components/completionRate.vue'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'Workbench',
  components: {
    LineChart,
    SalesFunnel,
    CompletionRate
    // RaddarChart,
    // PieChart
    // BarChart
  },
  data() {
    return {
      loading: false,
      activeName: 'collectedAmount',
      briefList: [
        {
          label: '新增客户(人)',
          title: '新增客户',
          type: 'customer',
          labelValue: 2,
          field: 'customerCount',
          icon: 'el-icon-office-building',
          num: '10',
          rate: '20',
          status: 'top',
          color: '#2362FB'
        },
        {
          label: '新增联系人(人)',
          title: '新增联系人',
          type: 'contacts',
          labelValue: 3,
          field: 'contactsCount',
          icon: 'el-icon-s-custom',
          num: '20',
          rate: '10',
          status: 'top',
          color: '#27BA4A'
        },
        {
          label: '新增商机(个)',
          title: '新增商机',
          type: 'business',
          labelValue: 5,
          field: 'businessCount',
          icon: 'el-icon-coin',
          num: '5',
          rate: '10',
          status: 'bottom',
          color: '#FB9323'
        },
        {
          label: '新增合同(个)',
          title: '新增合同',
          type: 'contract',
          labelValue: 6,
          field: 'contractCount',
          icon: 'el-icon-postcard',
          num: '25',
          rate: '60',
          status: 'top',
          color: '#4A5BFD'
        },
        {
          label: '合同金额(元)',
          title: '合同金额',
          type: 'contract',
          labelValue: 6,
          field: 'contractMoney',
          icon: 'el-icon-bank-card',
          num: '50000',
          rate: '50',
          status: 'top',
          color: '#19B5F6'
        },
        {
          label: '商机金额(元)',
          title: '商机金额',
          type: 'business',
          labelValue: 5,
          field: 'businessMoney',
          icon: 'el-icon-money',
          num: '20000',
          rate: '20',
          status: 'bottom',
          color: '#AD5CFF'
        },
        {
          label: '回款金额(元)',
          title: '回款金额',
          type: 'receivables',
          labelValue: 7,
          field: 'receivablesMoney',
          icon: 'el-icon-wallet',
          num: '10000',
          rate: '50',
          status: 'top',
          color: '#FFB940'
        },
        {
          label: '新增跟进记录(条)',
          title: '新增跟进记录',
          type: 'record',
          labelValue: '',
          field: 'recordCount',
          icon: 'el-icon-document',
          num: '30',
          rate: '10',
          status: 'bottom',
          color: '#4A5BFD'
        }
      ],
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    rateText() {
      const type = 'month'
      return (
        {
          today: '较昨天',
          yesterday: '较前天',
          week: '较上周',
          lastWeek: '较前周',
          month: '较上月',
          lastMonth: '较前月',
          quarter: '较上季度',
          lastQuarter: '较上上季度',
          year: '较去年',
          lastYear: '较前年'
        }[type] || ''
      )
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style scoped lang="scss">
.crm-workbench {
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  padding: 15px 20px 20px;
  background-color: rgb(240, 242, 245);

  &__body {
    height: 100%;
    overflow: auto;
    padding-top: 55px;
  }

  .brief-box {
    width: 100%;
    background-color: white;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    .brief-title {
      padding: 15px 20px 0;
      .icon {
        color: #50cf9e;
        font-size: 18px;
      }
      .text {
        font-size: 16px;
        font-weight: bold;
        margin-left: 5px;
      }
    }
    .brief {
      width: 100%;
      padding: 10px 10px 14px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .brief-item {
        cursor: pointer;
        width: calc(25% - 20px);
        height: 88px;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        margin: 10px;
        .brief-item__body {
          flex: 1;
          overflow: hidden;
          .icon-box {
            width: 36px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            border-radius: 50%;
            margin-right: 10px;
            margin-left: 15px;
            flex-shrink: 0;

            .icon {
              color: white;
              font-size: 19px;
            }
          }
          .info {
            overflow: hidden;
            .title {
              font-size: 13px;
            }
            .number {
              font-size: 23px;
              font-weight: bold;
              line-height: 1;
              margin-top: 8px;
              margin-right: 5px;
              overflow: hidden;
            }
          }
        }
        .brief-item__others {
          position: relative;
          width: 100px;
          text-align: center;
          padding: 0 3px;
          overflow: hidden;

          &:before {
            position: absolute;
            top: 7.5%;
            left: 0;
            content: "";
            width: 1px;
            height: 85%;
            background-color: #e6e6e6;
            display: block;
          }
          .text {
            font-size: 12px;
            margin-left: -5px;
          }
          .rate {
            font-size: 14px;
            color: #2bbf24;
            margin-top: 8px;

            .rate__icon {
              font-size: 12px;
            }
            &.bottom {
              color: #2bbf24;
            }
            &.top {
              color: #f24b4b;
            }
          }
        }
        &:hover {
          box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
  .elRowBox {
    margin: 10px 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
  }
  .chartBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
  }
  .chartBox > p:nth-child(2) {
    margin: 0 50px;
  }
  .chartBox > p {
    font-size: 16px;
  }
}
</style>
