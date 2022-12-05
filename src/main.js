// async function getMovies(title) {
//   const res = await fetch('/api/movie', {
//     method: 'POST',
//     body: JSON.stringify({
//       title
//     })
//   })
//   const json = await res.json()
//   console.log(json)
// }

// getMovies('ralph')
import * as echarts from 'echarts'

  ; (async () => {
    async function getSales() {
      const res = await fetch('/api/sales')
      return await res.json()
    }

    const sales = await getSales()
    const chartEl = document.querySelector('.chart')
    const chart = echarts.init(chartEl)
    chart.setOption({
      tooltip: {
        extraCssText: `
        padding: 8px;
        border-radius: 4px;
        background-color: blue;
        color: #fff;
        `,
        formatter: params => {
          const { name, value } = params
          return `
          <div>Month: ${name}월</div>
          <div>Sales: ${value.toLocaleString()}원</div>
          `
        }
      },
      xAxis: {
        data: Object.keys(sales),
        axisLabel: {
          formatter: value => `${value}월`
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: Object.values(sales),
          itemStyle: {
            color: 'green'
          }
        }
      ]
    })
  })()
