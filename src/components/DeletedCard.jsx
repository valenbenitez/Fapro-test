import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTask } from '../services'
import BasicModal from '../components/BasicModal'

export default function DeletedCard({ name, date_of_create, id }) {
  return (
    <div
      style={{
        marginTop: '20px',
        marginBottom: '20px',
        backgroundColor: '#F3F4F8',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <label style={{ width: '40%', fontFamily: 'Montserrat' }}>{name} </label>
      <label style={{ width: '40%', fontFamily: 'Montserrat' }}>{date_of_create}</label>
    </div>
  )
}
