import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut, Line } from 'react-chartjs-2';
import LineChart from './LineChart'

const getMyExpenses = gql`
  query GetMyExpenses {
    getMyExpenses {
      _id
      amount
      tags {
        _id
        name
        color
      }
      geo {
        lat
        lon
      }
      date
      address {
        MunicipalityZone
        Neighbourhood
        FormattedAddress
        Place
      }
    }
  }
`

ChartJS.register(ArcElement, Tooltip, Legend);

export function ChartComponent({ year, month, day }) {

  const [date, setDate] = useState([]);
  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
  const [amountOfMonth, setAmountOfMonth] = useState([])

  const { loading, error, data, refetch } = useQuery(getMyExpenses)

  useEffect(() => {

    data.getMyExpenses.map((expense, i) => {
      console.log("date", expense.date);
      const createdDate = new Date(expense.date);
      date.push(createdDate)
      setDate([...new Set(date)])
    })

  }, [data])

  const amountOfTags = {}
  const tags = {}
  const colors = {}
  let amountOfTagsList = []
  let tagsList = []
  let colorsList = []

  const create = () => {
    data.getMyExpenses.forEach(expense => {

      console.log("uuuu : ",expense);
      const tag = expense?.tags[0]?.name;
      const amount = expense?.amount;
      const color = expense?.tags[0]?.color
      if (amountOfTags[tag]) {
        amountOfTags[tag] += amount;

      }
      else {
        amountOfTags[tag] = amount;
        tags[tag] = tag
        colors[tag] = color
      }
    })

    amountOfTagsList = [...Object.keys(amountOfTags).map(item =>  amountOfTags[item])]
    tagsList = [...Object.keys(tags).map(item =>  tags[item])]
    colorsList = [...Object.keys(colors).map(item =>  colors[item])]
  }

  create()

  const externalData = {
    labels: [...tagsList],
    datasets: [
      {
        label: '',
        data: [...amountOfTagsList],
        backgroundColor: [...colorsList],
        borderColor: [...colorsList],
        borderWidth: 1,
      },
    ],
  };

  if (error) return <h1> error </h1>

  if (loading) {
    return <h1>Loading</h1>
  }
  return (
    <div style={{ display: 'flex' }}>
      <div className='w-[20vw] h-[20vw]'><Pie data={externalData} /></div>
      <div className='w-[20vw] h-[20vw]'><Doughnut data={externalData} /></div>
    </div>
  );
}
