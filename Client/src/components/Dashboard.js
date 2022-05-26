import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { gql, useQuery } from '@apollo/client';

const Me = gql`
  query Query {
    me {
      _id
      name
      username
      myTags {
        _id
        name
        color
      }
    }
  }
`

function Dashboard() {

  const { loading, error, data,refetch } = useQuery(Me);

  console.log('data in me query : ', data);

  useEffect(() => {

    refetch()

  },[data])

  return (
    <div>
      {
        data ?
          <div>
            <Navbar />
            <Outlet />
          </div>
          :
          <></>
      }
    </div>
  )
}

export default Dashboard