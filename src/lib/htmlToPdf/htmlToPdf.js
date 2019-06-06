// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {

    Vue.prototype.getPdf = function (pdftitle) {

      console.log(pdftitle)
      var title = pdftitle;
      var c = document.createElement("canvas")
      var pdfDom = document.querySelector('#pdfDom')
      pdfDom.style.position = ""
      console.log(pdfDom)
      var opts = {
        scale: 2,
        canvas: c,
        logging: true,
        width: pdfDom.offsetWidth + 20,
        height: pdfDom.offsetHeight
      };
      c.width = pdfDom.offsetWidth * 2
      c.height = pdfDom.offsetHeight * 2
      c.getContext("2d").scale(2, 2);


      html2Canvas(pdfDom, opts).then(function (canvas) {
        let contentWidth = canvas.width * 10;
        let contentHeight = canvas.height * 10;
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
        pdfDom.style.position = "absolute"
      }

      )
    }
  }
}
