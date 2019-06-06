// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {

    Vue.prototype.getPdf = function (pdftitle) {

      console.log(pdftitle)
      var title = pdftitle;
      // 创建节点
      var c = document.createElement("canvas")
      var pdfDom1 = document.querySelector('#pdfDom')
      var pdfDom = document.createElement("div")
      pdfDom = pdfDom1
      console.log(pdfDom)
      var opts = {
        scale: 5,
        canvas: c,
        logging: true,
        width: pdfDom.offsetWidth + 20,
        height: pdfDom.offsetHeight
      };
      c.width = pdfDom.offsetWidth
      c.height = pdfDom.offsetHeight
      c.getContext("2d");


      html2Canvas(pdfDom, opts).then(function (canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        let pageHeight = contentWidth / 592.28 * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        let imgWidth = 841.89;
        let imgHeight = 841.89 / contentWidth * contentHeight;
        let pageData = canvas.toDataURL('image/jpeg', 1.0);
        let PDF = new JsPDF('l', 'pt', 'a4');
        console.log(pageData)
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
        PDF.save(title + '.pdf')
      }
      )
    }
  }
}
