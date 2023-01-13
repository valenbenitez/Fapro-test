import React from 'react'
import AppBar from '../components/AppBar'
import AddIcon from '@mui/icons-material/Add'
import { getTasks } from '../services'
import TaskCard from '../components/TaskCard'
import { Divider } from '@mui/material'
import BasicModal from '../components/BasicModal'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'
import DeletedBasicModal from '../components/DeletedModal'

export default function Home() {
  const [tasks, setTasks] = React.useState('')
  const [deletedTasks, setDeletedTasks] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [deletedOpen, setDeletedOpen] = React.useState(false)

  React.useEffect(() => {
    getTasks().then(result => {
      setTasks(result['data'].filter(task => task.status !== 'deleted'))
      const deleted = result['data'].filter(task => task.status === 'deleted')
      setDeletedTasks(deleted.reverse().slice(0, 3))
    })
  }, [])

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AppBar />
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}
        >
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px',
              marginBottom: '20px',
              borderRadius: '20px',
              height: '40px',
              border: '1px solid #B3B5BD',
              cursor: 'pointer',
            }}
          >
            <AddIcon />
          </button>
          <AutoDeleteIcon onClick={() => setDeletedOpen(!open)} color="action" style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ width: '80%' }}>
          {Object.values(tasks).length > 0 && (
            <label style={{ fontFamily: 'Raleway', fontSize: '26px', fontWeight: 600 }}>Tareas creadas:</label>
          )}
          <Divider />
          {Object.values(tasks).length > 0 ? (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                name={task.name}
                date_of_create={task.date_of_create}
                id={task.id}
                setTasks={setTasks}
                description={task.description}
              />
            ))
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
              }}
            >
              <label style={{ fontFamily: 'Raleway', fontSize: '26px' }}>
                No tienes tareas creadas, disfruta tu tiempo...
              </label>
            </div>
          )}
        </div>
      </div>
      <BasicModal open={open} setOpen={setOpen} setTasks={setTasks} />
      <DeletedBasicModal deletedOpen={deletedOpen} setDeletedOpen={setDeletedOpen} deletedTasks={deletedTasks} />
    </>
  )
}
