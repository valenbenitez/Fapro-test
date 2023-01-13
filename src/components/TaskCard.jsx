import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTask, getTasks } from '../services'
import BasicModal from '../components/BasicModal'

export default function TaskCard({ name, date_of_create, id, setTasks }) {
  const [open, setOpen] = React.useState(false)

  async function handleDelete(id) {
    await deleteTask(id, name)
    let allTasks = await getTasks()
    allTasks = allTasks['data'].filter(task => task.status !== 'deleted')
    setTasks(allTasks)
  }

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
      <EditIcon onClick={() => setOpen(!open)} sx={{ width: '10%', cursor: 'pointer' }} />
      <DeleteIcon onClick={() => handleDelete(id)} sx={{ width: '10%', cursor: 'pointer' }} />
      <BasicModal open={open} setOpen={setOpen} toUpdate={true} id={id} setTasks={setTasks} />
    </div>
  )
}
