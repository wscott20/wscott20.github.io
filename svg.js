function inou(item) {
    return item === null || item === undefined
}
class Svg {
    constructor(el,width,height,parent=document.body) {
        if (!(el instanceof SVGElement)) {
            console.warn('Element not set or not an svg element. Creating new one')
            this.element = document.createElementNS('http://www.w3.org/2000/svg','svg')
        }
        else this.element = el
        if (!document.body.contains(this.element)) parent.appendChild(this.element)
        if ((!inou(width) && !inou(height))) {
            this.element.setAttribute('width',width)
            this.element.setAttribute('height',height)
            this.width = width
            this.height = height
        } else if (!inou(el)) {
            this.width = el.getAttribute('width')
            this.height = el.getAttribute('height')
        } else throw new Error('Width or height not set')
        for (let element of `rect
            line
            circle
            ellipse
            defs
            path
            polygon`.split('\n').map(e=>e.trim())) {
                this[element] = (options,innerHTML)=>this.createElement(element,options,innerHTML)
        }
    }
    createElement(name,options,innerHTML) {
        let el = document.createElementNS('http://www.w3.org/2000/svg',name)
        for (let attr in options) el.setAttribute(attr,options[attr])
        if (innerHTML !== '' && !inou(innerHTML)) el.innerHTML = innerHTML
        this.element.appendChild(el)
        return el
    }
    removeElement(el) {
        if (el instanceof Element) this.element.removeChild(el)
    }
    background() {
        let fill, col, alpha, r, g, b
        switch (arguments.length) {
            case 0:
                if (this.backgroundElement) this.removeElement(this.backgroundElement)
                return
            case 1:
                col = arguments[0]
                if (typeof col === 'string')
                    fill = col
                else if (typeof col === 'number')
                    fill = '#'+col.toString(16).padStart(2,'0').repeat(3)
                break
            case 2:
                [col, alpha] = arguments
                fill = '#'+col.toString(16).padStart(2,'0').repeat(3) + Math.round(alpha*255).toString(16).padStart(2,'0')
                break
            case 3:
                [r, g, b] = arguments
                fill = '#'+[r,g,b].map(e=>e.toString(16).padStart(2,'0')).join('')
                break
            case 4:
                [r, g, b, alpha] = arguments
                fill = '#'+[r,g,b].map(e=>e.toString(16).padStart(2,'0')).join('') + Math.round(alpha*255).toString(16).padStart(2,'0')
                break
            default:
                throw new Error('Too many arguments')
                
        }
        if (!inou(this.backgroundElement))this.element.removeChild(this.backgroundElement)
        this.backgroundElement = this.rect({
            x:0,y:0,width:this.width,height:this.height,fill
        })
    }
}