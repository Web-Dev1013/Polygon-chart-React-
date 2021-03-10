
const LAYOUT_KEY     = "board-layout"
const DEFAULT_LAYOUT = [{
    i: "DOW",
    x: 0,
    y: 0,
    w: 2,
    h: 10,
}]

export function loadLayout() {
    try {
        return JSON.parse(localStorage.getItem(LAYOUT_KEY)) || DEFAULT_LAYOUT
    } catch (e) {
        return DEFAULT_LAYOUT
    }
}

export function saveLayout(layout){
    localStorage.setItem(LAYOUT_KEY,JSON.stringify(layout))
    console.log("app is saving lauout", layout)
}

export function addTicker2Layout(ticker, layout) {
    const ySortedItems = layout.sort((item1, item2) => {
      return item1.y < item2.y ? 1 : -1
    })  

    const maxYItem = ySortedItems[0]    

    return [ ...layout, {
        i: ticker.ticker,
        x: 0,
        y: maxYItem.y + maxYItem.h,
        w: 2,
        h: 10, 
    } ]
  }

export function removeTIckerFromLayout(ticker, layout) {
    const newLayout = [ ...layout ]


    const item = newLayout.find(({ i }) => i === ticker)

    console.log('...item', item)

    if (item) {
        const index = newLayout.indexOf(item)
        newLayout.splice(index, 1)        
    }
    
    return newLayout
}

