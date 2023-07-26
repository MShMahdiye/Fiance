import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

export default function NewChart({ mainList, label,colorr }) {

  // const [newData, setNewData] = React.useState([])
  const [labels, setLabels] = useState([])
  const [dataa, setDataa] = useState([])

  // console.log("mainList : ",mainList );

  const [newMainList, setNewMainList] = useState([
    { label: `${label}`, backgroundColor: `${colorr?.bg}`, borderColor: `${colorr?.br}`, data: [] }
  ])

  useEffect(() => {
     const array = Object.keys(mainList)
     setLabels([...array]);
     console.log('array : ',array);
     array.map((key) => {
      //  setNewData([...newData,mainList[key]])
       const newlistmain = [...newMainList]
       newlistmain.map(item => {
         if(item.label === `${label}`){
            item.data = [...(item.data),mainList[key]]
         }
       })
       setNewMainList([...newlistmain])
     })
  }, [mainList])

  const data = {
    labels: labels,
    datasets: [...newMainList],
  };

  return <Line options={options} data={data} />;
}
