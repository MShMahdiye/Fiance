import { ResponsiveLine } from '@nivo/line'


const MyResponsiveLine = () => {
  return (
    <div className='w-[80vw] h-[40vw] flex justify-center items-center'>
      <ResponsiveLine
        data={[
          {
            "id": "1399",
            "color": "hsl(38, 70%, 50%)",
            "data": [
              {
                "x": "فروردین",
                "y": 0
              },
              {
                "x": "اردیبهشت",
                "y": 0
              },
              {
                "x": "خرداد",
                "y": 0
              },
              {
                "x": "تیر",
                "y": 343000
              },
              {
                "x": "مرداد",
                "y": 0
              },
              {
                "x": "شهریور",
                "y": 0
              },
              {
                "x": "مهر",
                "y": 0
              },
              {
                "x": "آبان",
                "y": 0
              },
              {
                "x": "آذر",
                "y": 0
              },
              {
                "x": "دی",
                "y": 0
              },
              {
                "x": "بهمن",
                "y": 0
              },
              {
                "x": "اسفند",
                "y": 0
              }
            ]
          },
          {
            "id": "1401",
            "color": "hsl(9, 70%, 50%)",
            "data": [
              {
                "x": "فروردین",
                "y": 186000
              },
              {
                "x": "اردیبهشت",
                "y": 3000
              },
              {
                "x": "خرداد",
                "y": 221000
              },
              {
                "x": "تیر",
                "y": 129000
              },
              {
                "x": "مرداد",
                "y": 6800
              },
              {
                "x": "شهریور",
                "y": 1830
              },
              {
                "x": "مهر",
                "y": 95
              },
              {
                "x": "آبان",
                "y": 263
              },
              {
                "x": "آذر",
                "y": 32
              },
              {
                "x": "دی",
                "y": 186
              },
              {
                "x": "بهمن",
                "y": 45
              },
              {
                "x": "اسفند",
                "y": 12
              }
            ]
          },
          {
            "id": "1402",
            "color": "hsl(107, 70%, 50%)",
            "data": [
              {
                "x": "فروردین",
                "y": 230000
              },
              {
                "x": "اردیبهشت",
                "y": 0
              },
              {
                "x": "خرداد",
                "y": 0
              },
              {
                "x": "تیر",
                "y": 12000
              },
              {
                "x": "مرداد",
                "y": 0
              },
              {
                "x": "شهریور",
                "y": 0
              },
              {
                "x": "مهر",
                "y": 130
              },
              {
                "x": "آبان",
                "y": 212
              },
              {
                "x": "آذر",
                "y": 261
              },
              {
                "x": "دی",
                "y": 39
              },
              {
                "x": "بهمن",
                "y": 101
              },
              {
                "x": "اسفند",
                "y": 175
              }
            ]
          }
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'ماه‌ها',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'مقدار',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

export default MyResponsiveLine;
