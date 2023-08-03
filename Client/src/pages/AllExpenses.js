import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import wel from '../content/Images/wel.png'
import { ChartComponent } from '../components/Chart'
import '../components/component_css/allexpences.css'
import '../components/component_css/ProfileInfo.css'
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
  }
`

const deleteMutation = gql`
  mutation Delete_expense($id: ID!) {
    delete_expense(_id: $id) {
      status
      msg
    }
  }
`

function AllExpenses() {

  const [deletedItem] = useMutation(deleteMutation)
  const [somenewtags, setsomenewtags] = useState([])
  const trash = require('../content/Images/trash.png')
  const edit = require('../content/Images/edit.png')

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

  const handleSubmit = async () => {

    const arrayOfSelectedTags = somenewtags.reduce((acc, cur, i) => {

      if (cur.isSelected) return cur._id

      return acc

    }, '')

    try {

      const variables = {
        "id": arrayOfSelectedTags
      }

      const { data: { delete_expense: { status } } } = await deletedItem(
        {
          variables
        }
      )

      if (status == 200) {
        refetch()
      }

    } catch (error) {
      console.log(error);
    }
  }

  console.log("some new tags : ", somenewtags[0]);

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

    <m.div initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}>
      <div className='grid grid-cols-4 grid-row-4'>
        <div className='col-span-4'>
          <div className='flex m-[2vw] flex-4 justify-center items-center'><ChartComponent /></div>
        </div>
        <div className='col-span-4 row-span-2 m-[2vw] flex justify-center items-center'>
          <table>
            <thead>
              <th>عنوان</th>
              <th>تاریخ</th>
              <th>میزان هزینه</th>
              <th>عملیات</th>
            </thead>
            {somenewtags.map((expense, i) => {
              console.log('ex in sm t = ', somenewtags);
              const date = new Date(expense.date)
              if (expense.tags.length > 0) {
                return (
                  <tr key={i}>
                    <td>{expense.tags[0].name}</td>
                    <td>{date.getDate()} {months[date.getMonth()]},{date.getFullYear()}</td>
                    <td>{expense.amount}</td>
                    <td className='flex justify-center items-center'>
                      <div className='m-[1vw]'>
                        <img width={"20vw"} height={"20vw"} onClick={() => {
                          const arr = [...somenewtags]
                          arr[i].isSelected = !arr[i].isSelected
                          setsomenewtags(arr)

                          handleSubmit();
                        }} src={trash} />
                      </div>
                      <div className='m-[1vw]'>
                        <img width={"20vw"} height={"20vw"} src={edit} />
                      </div>
                    </td>
                  </tr>
                )
              }
            })}
          </table>
        </div>
      </div>
    </m.div>

  )
}

export default AllExpenses