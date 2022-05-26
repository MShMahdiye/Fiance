import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ChartComponent } from './Chart'
import { Button } from '@mui/material'

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

  const { loading, error, data, refetch } = useQuery(getMyExpenses)

  useEffect(() => {

    if (data) {

      setsomenewtags(data.getMyExpenses.map(item => ({ ...item, isSelected: false })))
    }

    refetch()

  }, [data])

  if (error) return <h1> error </h1>

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



  return (

    <>
      <div className='mb-[2vw]'>همه هزینه ها</div>
      <div className='mb[2vw]'><div>{somenewtags.map((expense,i) => {
        if (expense.tags.length > 0) {
          return (
            <div className='flex justify-between' key={expense._id}><div className='p-[1vw]'>{expense.tags[0].name}</div>
              <div className='p-[1vw] flex'><div className='flex items-center'>{expense.amount}</div><div className='mr-[3vw]'>
                <Button fullWidth size='large' variant='contained'
                  onClick={() => {
                      const arr = [...somenewtags]
                      arr[i].isSelected = !arr[i].isSelected
                      setsomenewtags(arr)
                    
                    handleSubmit();
                  }}>حذف هزینه</Button></div></div></div>
          )
        }
      })}</div></div>
      <div className='flex justify-center items-center'><ChartComponent /></div>
    </>

  )
}

export default AllExpenses