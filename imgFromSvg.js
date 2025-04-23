function svgToImage(svgElement) {
    return new Promise(resolve => {
        let svgData = new XMLSerializer().serializeToString(svgElement)
        let svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        let url = URL.createObjectURL(svgBlob)
        let img = new Image
        img.onload = ()=>{
            URL.revokeObjectURL(url)
            resolve(img)
        }
        img.onerror = ()=>{
            console.error('Failed to convert SVG to image.')
            URL.revokeObjectURL(url)
        }
        img.src = url
    })
}
function imgBlobToDataUrl(img) {
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d').drawImage(img, 0, 0)
    return canvas.toDataURL()
}
