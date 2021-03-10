
import React,{ useState } from 'react'
import TickerChart from './TickerChart'
import { WidthProvider,Responsive } from "react-grid-layout";


import '../components/grid_elem/grid_styles.css'
import '../components/grid_elem/example-styles.css'
import '../components/grid_elem/grid.scss'

const ResponsiveReactGridLayout = WidthProvider(Responsive)


const TickerList = (props) => {
    const layouts = {} //useState(props.layout) TODO: WTF???
  
    const createElement = () => {
        return (
          props.layout.map(({ i, x, y, w, h }) => {
          const removeCallback = () => props.onRemove(i) 
          const removeStyle = {
              position: "absolute",
              right: "0",
              top: 0,
              cursor: "pointer",
            };
  
          return(
              <div key={i} data-grid={{ i, x, y, w, h }}>
                 <span className="dragme">
                    <p>..........<br/>..........</p>
                  </span>
                  <TickerChart ticker= {i}/>
                  <span 
                      className="remove"
                      style={removeStyle}
                      onClick={removeCallback}
                      >
                      &#215;
                  </span>
                 
              </div>
          )
          
        }))

      
    }

    return (
        <div>
            <div className="grid-container">
            {
                <ResponsiveReactGridLayout 
                  className="layout" 
                  layouts={layouts} 
                  onLayoutChange={props.onLayoutChange}
                  rowHeight={30}
                  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                  cols={{lg: 6, md: 4, sm: 2, xs: 1, xxs: 1}}>
                        {createElement()}
                </ResponsiveReactGridLayout>
            }
            </div>
        </div>
    )

    
}
export default TickerList