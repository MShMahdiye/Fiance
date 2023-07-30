import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import LineChart from '../components/LineChart'
import { motion as m } from 'framer-motion'

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
}`

export default function Summary() {

  const [somenewtags, setsomenewtags] = useState([])

  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']

  const { loading, error, data, refetch } = useQuery(getMyExpenses)

  useEffect(() => {

    if (data) {

      setsomenewtags(data.getMyExpenses.map(item => ({ ...item, isSelected: false })))
      console.log("Some new tags = ", somenewtags);
    }

    refetch()

  }, [data])

  if (error) return <h1> {error} </h1>

  if (loading) {
    return <h1>Loading</h1>
  }

  const yearlyExpenses = {}
  const monthlyExpenses = {}
  const dailyExpenses = {}

  const createYearly = () => {
    somenewtags.forEach(expense => {
      const date = new Date(expense.date)
      const year = date.getFullYear();
      const amount = expense.amount;
      if (yearlyExpenses[year]) {
        yearlyExpenses[year] += amount;
      }
      else {
        yearlyExpenses[year] = amount;
      }
    })
  }

  const createMonthly = () => {
    somenewtags.forEach(expense => {
      const date = new Date(expense.date)
      const month = months[date.getMonth()];
      const amount = expense.amount;
      if (monthlyExpenses[month]) {
        monthlyExpenses[month] += amount;
      }
      else {
        monthlyExpenses[month] = amount;
      }
    })
  }

  const createDaily = () => {
    somenewtags.forEach(expense => {
      const date = new Date(expense.date)
      const day = date.getDate();
      const amount = expense.amount;
      if (dailyExpenses[day]) {
        dailyExpenses[day] += amount;
      }
      else {
        dailyExpenses[day] = amount;
      }
    })
  }


  createYearly();
  createMonthly();
  createDaily();

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className='flex justify-center items-center h-[85vh]'>
      <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center w-[30vw] h-[20vw] rounded mx-[1vw]'>
          <div className='w-[30vw] h-[20vw]'><LineChart mainList={yearlyExpenses} label={'سالیانه'} colorr={{ bg: 'rgba(197, 91, 113,1)', br: 'rgba(197, 91, 113,0.5)' }} /></div>
        </div>
        <div className='flex justify-center items-center w-[30vw] h-[20vw] rounded mx-[1vw]'>
          <div className='w-[30vw] h-[20vw]'><LineChart mainList={monthlyExpenses} label={'ماهیانه'} colorr={{ bg: 'rgba(231, 187, 44,1)', br: 'rgba(231, 187, 44,.5)' }} /></div>
        </div>
        <div className='flex justify-center items-center w-[30vw] h-[20vw] rounded mx-[1vw]'>
          <div className='w-[30vw] h-[20vw]'><LineChart mainList={dailyExpenses} label={'روزانه'} colorr={{ bg: 'rgba(142, 182, 14,1)', br: 'rgb(142, 182, 149,0.5)' }} /></div>
        </div>
      </div>
    </m.div>
  )
}
