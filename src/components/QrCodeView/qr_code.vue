<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" style="padding-bottom: 5vh" width="400px">
      <div id="pdfDom" class="details">
        <div class="box_">
          <div class="sg-qrcode qr_box">
            <vue-qr
              :text="vueQRList.qr_text"
              :correct-level="3"
              :size="qrSize"
              :margin="3"
              color-dark="#000"
              color-light="white"
              background-color="white"
              background-dimming="white"
            />
          </div>
          <div class="qr_p qr_box">
            <p>{{ detailText.code }}：{{ vueQRList.qr_text }}</p>
            <p>{{ detailText.name }}：{{ vueQRList.name }}</p>
            <p>{{ detailText.type }}：{{ vueQRList.moldType }}</p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setPdf">生成PDF(带信息)</el-button>
        <el-button type="primary" @click="setPdf_qr">生成PDF(仅二维码)</el-button>
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vueQr from 'vue-qr' // 引入二维码生成组件
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  components: {
    vueQr
  },
  props: {
    detailText: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      qrSize: 80,
      vueQRList: {
        qr_text: '',
        name: '',
        moldType: ''
      },
      title: ''
    }
  },
  methods: {
    show(val) {
      this.title = val.code + '  二维码'
      this.vueQRList.qr_text = val.code
      this.vueQRList.name = val.name
      this.vueQRList.moldType = val.type
      this.dialogVisible = true
    },
    // 打印成pdf
    setPdf() {
      html2Canvas(document.querySelector('#pdfDom')).then((canvas) => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = (contentWidth / 592.28) * 841.89
        let leftHeight = contentHeight
        let position = 0
        const imgWidth = 595.28
        const imgHeight = (592.28 / contentWidth) * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        // let PDF = new JsPDF("", "pt", "a4");
        const PDF = new JsPDF({
          orientation: 'landscape',
          unit: 'pt',
          format: [600, 195]
        })

        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(this.title + '.pdf')
      })
    },

    // 打印
    setPdf_qr() {
      html2Canvas(document.querySelector('#pdfDom')).then((canvas) => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = (contentWidth / 592.28) * 841.89
        let leftHeight = contentHeight
        let position = 0
        const imgWidth = 595.28
        const imgHeight = (592.28 / contentWidth) * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        // let PDF = new JsPDF("", "pt", "a4");
        const PDF = new JsPDF({
          orientation: 'landscape',
          unit: 'pt',
          format: [175, 150]
        })

        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', -50, -20, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(this.title + '.pdf')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.details {
  padding: 10px;
}

.box_ {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;

  .sg-qrcode {
    width: 150px;
    text-align: center;
    border-right: 1px solid #ccc;
  }

  .qr_p {
    width: 200px;

    p {
      font-size: 12px;
      margin: 0;
      padding: 2px;
    }
  }

  .qr_box {
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>
