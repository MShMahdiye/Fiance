import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import LineChart from '../components/LineChart'
import { motion as m } from 'framer-motion'
import up from "../content/Images/upp.png"
import Path from '../content/Images/path.png'
import Path2 from '../content/Images/path2.png'

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
  let totalAmount = 0;
  let thisDay = 0
  let thisMonth = 0;
  let thisYear = 0;

  const today = new Date()

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
    totalAmount = 0;
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
      totalAmount += amount
    })
  }


  createYearly();
  createMonthly();
  createDaily();
  console.log("KKKKKKKKKKKKK",yearlyExpenses[1402]);

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className='grid grid-col-4 grid-row-3 gap-5 h-[89vh] p-5'>
      <div className='chart-res rounded bg-[#FF007C] flex p-2 justify-between items-center shadow-lg'>
        <div className='flex flex-col justify-center items-start'>
          <div className='text-white text-lg font-extrabold my-2'>مجموع کل </div>
          <div className='text-white '>{totalAmount > 0 ? totalAmount : 0}</div>
        </div>
        <div><img width={'160vw'} height={'160vw'} src={up} /></div>
      </div>
      <div className='chart-res rounded bg-[#7D00B5] flex p-2 justify-between items-center shadow-lg text-white text-right'>
        <div className='flex justify-center items-center rounded mx-[.5vw]'>
          <img width={"150vw"} height={"50vh"} src={Path} />
        </div>
        <div>
          <div className='text-lg mb-2'>سال جاری</div>
          <div>{yearlyExpenses[1402] > 0 ? yearlyExpenses[1402] : 0}</div>
        </div>
      </div>
      <div className='chart-res rounded bg-[#2D62ED] flex p-2 justify-between items-center shadow-lg text-white text-right'>
        <div className='flex justify-center items-center rounded mx-[.5vw]'>
          <img width={"160vw"} height={"50vh"} src={Path2} />
        </div>
        <div>
          <div className='text-lg mb-2'>ماه جاری</div>
          <div>{monthlyExpenses[monthlyExpenses[today.getMonth]] > 0 ? monthlyExpenses[today.getMonth] : 0}</div>
        </div>
      </div>
      <div className='chart-res rounded bg-[#39D5CF] flex p-2 justify-between items-center shadow-lg text-white text-right'>
        <div className='flex justify-center items-center rounded mx-[.5vw]'>
          <img width={"160vw"} height={"50vh"} src={Path} />
        </div>
        <div>
            <div className='text-lg mb-2'>روز جاری</div>
            <div>{dailyExpenses[dailyExpenses[today.getDate] ] > 0 ? dailyExpenses[dailyExpenses[today.getDate] ] : 0}</div>
          </div>
      </div>
      <div className='col-span-4 row-span-2'>
        <div className='h-full flex justify-center items-center'>
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
      </div>
    </m.div>
  )
}
