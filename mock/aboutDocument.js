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
        'items|5-9': [
          {
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
            opportunityName: '@ctitle',
            source: '@integer(1, 10)',
            level: '@integer(1, 4)',
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
            code1: '降雨量: @integer(10, 100)mm',
            code2: '积水深度: @integer(5, 20)cm',
            code3: '溶解氧: @float(5, 8, 1, 2)mg/L',
            code4: '排水流量: @integer(50, 300)m³/h',
            weatherInfo: '温度: @integer(20, 35)°C, 湿度: @integer(40, 90)%',
            rainfallInfo: '降雨量: @integer(10, 100)mm',
            floodData: '积水深度: @integer(5, 50)cm',
            alertInfo: '@pick(["红色", "橙色", "黄色", "蓝色"])',
            businessEvent: '@csentence(10, 15)',

            waterQualityMonitoring: '@pick(["优", "良", "中", "差"])',
            drainageOutlet: '@integer(10, 100)L/s',
            rainwaterPipeWell: '井深: @integer(3, 15)m',
            floodProneArea: '@county()',
            reservoir: '库容: @integer(100, 10000)m³',
            river: '流速: @integer(1, 10)m/s',
            surfaceWaterQuality: '@pick(["I类", "II类", "III类", "IV类", "V类"])',

            meetingName: '@cword(3, 5) 项目会议',
            meetingTime: '2022-9-@integer(1, 31)',
            meetingTopic: '@csentence(3, 5)',

            address: '@county(true)',
            description: '@cparagraph(1)',
            uploadTime: '2022-10-@integer(1, 31)',
            reporter: '@cname',
            contact: /^1[34578]\d{9}$/,
            image: '@image("100x100", "#50B347", "#FFF", "市民")',

            drainageAsset: '@cword(3, 5)设施',
            drainageMaintenance: '@cword(5, 10)',
            sewageRegulationFee: '@float(1000, 5000, 2, 2)',
            dailyBusiness: '@cword(4, 8)业务',
            usageObject: '@cword(3, 5)对象',

            'id|+1': 1,
            floodControlDispatch: '@csentence(3, 5)',
            emergencyResponse: '@csentence(3, 5)',
            floodForecast: '@csentence(3, 5)',

            taskId: '@guid',
            handlingTime: '2022-10-@integer(1, 31)',
            process: '@csentence(3, 5)',
            opinion: '@csentence(5, 10)',
            department: '@cword(3, 5)部门',

            waterSystemName: '@cword(2, 4) 水系',
            stationName: '@cword(2, 3) 站点',
            controlArea: '@county(true)',
            inspectionPersonnel: '@cname',
            handlingResult: '@csentence(4, 7)',

            'alarmId|+1': 1000, // 从1000开始递增
            deviceName: '@cword(3, 5) 设备',
            deviceType: '@cword(2, 4)',
            alarmType: '@cword(3, 6) 告警',
            alarmTime: '2022-10-@integer(1, 31)',
            handler: '@cname',

            time: '2022-10-@integer(1, 31)',
            monitoringPoint: '@cword(5, 8) 监测点',
            waterLevel: '@float(0, 10, 1, 2) 米',
            flow: '@float(0, 100, 1, 2) 立方米/秒',
            precipitation: '@float(0, 50, 1, 2) 毫米',
            waterQuality: '@pick(["优", "良", "中", "差"])'
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
