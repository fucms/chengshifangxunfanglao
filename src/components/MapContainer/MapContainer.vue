<template>
  <div id="container" />
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapView',
  data() {
    return {
      map: {}
    }
  },
  mounted() {
    this.initAMap()
  },
  unmounted() {
    this.map?.destroy()
  },
  methods: {
    initAMap() {
      window._AMapSecurityConfig = {
        securityJsCode: '06920c1f29b8b8f4899415266ce55e03'
      }

      AMapLoader.load({
        key: '7285e915e1fb9a0f1ec6263d945c2cdb', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      })
        .then((AMap) => {
          this.map = new AMap.Map('container', {
            viewMode: '3D', // 默认使用 2D 模式
            zoom: 16, // 地图级别
            center: [114.402672, 30.518987], // 地图中心点,经纬度
            pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
            rotateEnable: true, // 是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
            pitchEnable: true, // 是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
            showIndoorMap: true // 是否自动展示室内地图
          })

          AMap.plugin(
            [
              'AMap.GeoJSON',
              'AMap.ToolBar',
              'AMap.Scale',
              'AMap.HawkEye',
              'AMap.MapType',
              'AMap.Geolocation',
              'AMap.ControlBar'
            ],
            () => {
              // 添加比例尺控件，展示地图在当前层级和纬度下的比例尺
              this.map.addControl(new AMap.Scale())

              // 添加控制罗盘控件，用来控制地图的旋转和倾斜
              this.map.addControl(new AMap.ControlBar())
            }
          )

          const geoJson = new AMap.GeoJSON({
            geoJSON: null
          })

          // 读取数据加入地图实例
          this.map.add(geoJson)

          // 监听地图的点击事件   使用箭头函数确保this指向组件实例
          this.map.on('click', (event) => {
            console.log(event)
            // 创建一个 Marker 实例：
            const marker = new AMap.Marker({
              position: [event.lnglat.lng, event.lnglat.lat], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              extData: {
                _geoJsonProperties: {
                  gid: geoJson.getOverlays().length + 1, // marker的唯一标识
                  click: 0 // marker的点击次数
                }
              }
            })

            // 通过GeoJSON对象来管理覆盖物
            geoJson.addOverlay(marker)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
    #container{
        padding:0px;
        margin: 0px;
        width: 100%;
        height: 100vh;
    }
    #right{
      width:250px;
      height: 500px;
      font-size: 12px;
      position: fixed;
      right: 10px;
      top:50px;
      background-color: gainsboro;
      z-index: 999;
      border: 1px solid black;
      .header{
        padding: 5px 10px;
        font-size: 14px;
        color: white;
        background-color: rgb(5, 5, 52);
      }
      .source{
        display: flex;
        text-align: center;
        padding: 5px;
        .checkbox{
          margin-left: 10px;
        }
      }
    }
</style>
