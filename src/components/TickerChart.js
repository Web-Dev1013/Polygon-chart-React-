import './styles/ticker-chart.scss'

import React, { useRef, useState } from "react";
import ReactResizeDetector from 'react-resize-detector';

import classnames from "classnames"
import PolygonAdapter from '@polygon.io/tradingview-adapter'
import TradingViewWidget from 'react-tradingview-widget'



// let chart
const client = new PolygonAdapter({
  apikey: '54HOyGGFrBpAEB3oMFoGVzk3_C_hQGOrxTeQOl',
  realtimeEnabled: true // True(default) = Use websockets for updates. False = use polling for new data.
  })

const TickerChart = (props) => {
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null)
  const [chartWidth, setChartWidth] = useState(0)
  const ticker = props.ticker

  if (!ticker) return null

  function onChartResize (width) {
      if (ticker) {
        setChartWidth(width)
      }
  }

  const className = classnames({ visible: ticker })
  console.log(client._searchSymbols);
  return (    
    <div className={className}>
      <ReactResizeDetector handleWidth handleHeight onResize={onChartResize} width='inherit'>
        <div className="ticker-chart-container" ref={chartContainerRef}>
          <div className="ticker-chart" ref={chartRef}><TradingViewWidget
          symbol={ticker}
          interval='D'
          timezone='America/New_York'
          datafeed={client}
          library_path={"/charting_library/"}
          locale={"en"}
          disabled_features={["use_localstorage_for_settings"]}
          enabled_features={["study_templates"]}
          charts_storage_url={"http://saveload.tradingview.com"}
          charts_storage_api_version={"1.1"}
          client_id="tradingview.com"
          user_id="public_user_id"
          theme="Light" /* Light or Dark */
          width={chartWidth}
          // width="600"
          autosize={true}
          // height="330"
          style="3"
          toolbar_bg= "#f1f3f6"
          enable_publishing={false}
          hide_top_toolbar={true}
          withdateranges={true}

        />
          </div>
        </div>
      </ReactResizeDetector>      
    </div>
  );
};

export default TickerChart;

