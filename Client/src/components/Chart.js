import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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

export function ChartComponent() {

  const { loading, error, data, refetch } = useQuery(getMyExpenses)

  const externalData = {
    labels:  data.getMyExpenses.map((expense) =>{if (expense.tags.length > 0){return expense.tags[0].name}}),
    datasets: [
      {
        label: '# of Votes',
        data: data.getMyExpenses.map((expense) => {return expense.amount}),
        backgroundColor: data.getMyExpenses.map((expense) =>{if (expense.tags.length > 0){return expense.tags[0].color}}),
        borderColor: data.getMyExpenses.map((expense) =>{if (expense.tags.length > 0){return expense.tags[0].color}}),
        borderWidth: 1,
      },
    ],
  };

  if (error) return <h1> error </h1>

  if (loading) {
    return <h1>Loading</h1>
  }
  return <div className='w-[50vw] h-[70vw]'><Pie data={externalData} /></div>;
}
