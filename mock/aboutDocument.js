const { color } = require('echarts/lib/export')
const Mock = require('mockjs')

module.exports = [
  {
    url: '/vue-element-admin/MoldDetails/TableList',
    type: 'get',
    response: (config) => {
      return Mock.mock({
        code: 20000,
        msg: 'success',
        total: 9,
        'items|9': [
          {
            id: '@id',
            code: /^[0-9]{7}/,
            name: /^T[0-9]{3}-[A-z]{4}$/,
            price: '@integer(1, 10000)',
            typeNumber: /^1[0-9]{6}$/,
            locator: '@word',
            MoldOpeningTime: '@datetime',
            state: '@integer(1, 4)',
            number: '@integer(1, 100)',
            principal: '@cname',
            remarks: '@csentence',
            createTime: '@datetime',
            updateTime: '@datetime',
            customerName: '@ctitle 有限公司',
            customerType: '@integer(1, 9)',
            customerPhone: '@integer(1, 100)',
            customerAddress: '@cparagraph',
            customerEmail: '@email',
            period: '@integer(1, 100)',
            money: '@integer(1, 50000)',
            type: '@integer(1, 6)',
            scheduledTime: '@datetime',
            amountReceived: '@integer(1, 10000)',
            latestTime: '@datetime',
            curator: '@cname',
            projectName: /^T[0-9]{3}-[A-z]{4}$/,
            projectNumber: '@integer(1, 100)',
            projectType: '@integer(1, 6)',
            costType: '@integer(1, 6)',
            productCode: /^T[0-9]{3}-[A-z]{4}$/,
            productName: /^T[0-9]{3}-[A-z]{4}$/,
            productionLine: /^[A-z][0-9]{3}/,
            liaisonMan: '@cname',
            liaison: '@cname',
            customerServiceList: /^T[0-9]{6}/,
            status: '@integer(1, 4)',
            stage: '@integer(1, 6)',
            plan: '@ctitle',
            email: '@email',
            phone: /^1[3456789]\d{9}$/,
            stage: '@integer(1, 6)',
            opportunityName: '@ctitle',
            source: '@integer(1, 10)',
            level: '@integer(1, 4)',
            address: '@province',
            province: '@province',
            city: '@city',
            days: '@integer(1, 200)',
            header: '@cname',
            theme: '@ctitle',
            complainant: '@cname',
            record: '@csentence',
            signInName: '@cname',
            socialCreditCode:
              /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
            content: '@cparagraph',
            title: '@csentence',
            isRead: '@boolean',
            startTime: "@now('yyyy-MM-dd')",
            endTime: "@now('yyyy-MM-dd')",
            color: '@color',
            type1: '@integer(0,1)',
            type2: '@integer(1,5)',
            type3: '@integer(0,1)',
            code1: /^[0-9]{7}/,
            code2: /^[0-9]{7}/,
            code3: /^[0-9]{7}/,
            code4: /^[0-9]{7}/,
            code5: /^[0-9]{7}/,
            code6: /^[0-9]{7}/,
            code7: /^[0-9]{7}/,
            code8: /^[0-9]{7}/,
            code9: /^[0-9]{7}/
          }
        ]
      })
    }
  },
  {
    url: '/vue-element-admin/MoldDetails/Delete/{id}',
    type: 'delete',
    response: (config) => {
      return Mock.mock({
        code: 20000,
        data: '删除成功'
      })
    }
  },
  {
    url: '/vue-element-admin/MoldDetails/Add',
    type: 'post',
    response: (config) => {
      return Mock.mock({
        code: 20000,
        data: [
          {
            id: '@id',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            typeNumber: /^1[0-9]{6}$/,
            MoldOpeningTime: '@datetime',
            state: '@integer(1, 4)',
            Modulus: '@integer(1, 100)',
            PartNumber: /^1[0-9]{4}$/
          }
        ]
      })
    }
  },
  {
    url: '/vue-element-admin/MoldDetails/ProjectTaskListAll',
    type: 'get',
    response: (config) => {
      return Mock.mock({
        code: 20000,
        items: [
          {
            id: '1',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            plannedStartDate: '@datetime',
            plannedEndDate: '@datetime',
            parent: null
          },
          {
            id: '@id',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            plannedStartDate: '@datetime',
            plannedEndDate: '@datetime',
            parent: 1,
            isMilestone: '@boolean'
          },
          {
            id: '2',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            plannedStartDate: '@datetime',
            plannedEndDate: '@datetime',
            parent: null
          },
          {
            id: '@id',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            plannedStartDate: '@datetime',
            plannedEndDate: '@datetime',
            parent: 2,
            isMilestone: '@boolean'
          },
          {
            id: '@id',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            plannedStartDate: '@datetime',
            plannedEndDate: '@datetime',
            parent: 2,
            isMilestone: '@boolean'
          },
          {
            id: '@id',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            plannedStartDate: '@datetime',
            plannedEndDate: '@datetime',
            parent: 2,
            isMilestone: '@boolean'
          },
          {
            id: '@id',
            name: /^T[0-9]{3}-[A-z]{4}$/,
            plannedStartDate: '@datetime',
            plannedEndDate: '@datetime',
            parent: 2,
            isMilestone: '@boolean'
          }
        ]
      })
    }
  }
]
