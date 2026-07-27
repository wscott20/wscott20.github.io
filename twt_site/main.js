let n=0
document.body.addEventListener('keydown', e=>{
    if (e.key == 'ArrowLeft') {
        n--
        services.style.left = `${50+n*5}%`
    }
    if (e.key == 'ArrowRight') {
        n++
        services.style.left = `${50+n*5}%`
    }
})