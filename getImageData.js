function getImageData(canvas,x,y,w,h) {
    let {data:imageData} = canvas.getContext('2d').getImageData(x,y,w,h)
    let data1d = []
    for (let i=0;i<imageData.length;i+=4) {
        data1d.push('#'+imageData.slice(i,i+4).map(e=>e.toString(16).padStart(2,'0')).join(''))
    }
    let data2d = []
    for (let i=0;i<h;i++) {
        data2d.push([])
        for (let j=0;j<w;j++)
            data2d[i].push(data1d[i*w+j])
    }
    return data2d
}
