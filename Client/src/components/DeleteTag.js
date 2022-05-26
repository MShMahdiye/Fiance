import { gql, useMutation } from '@apollo/client'
import React from 'react'

const delete_Mutation = gql`
  mutation Mutation($id: ID!) {
    delete_expense(_id: $id) {
      status
      msg
    }
  }
`

function DeleteTag() {

  const [del] = useMutation(delete_Mutation);
 
  return (
    <div>DeleteTag</div>
  )
}

export default DeleteTag