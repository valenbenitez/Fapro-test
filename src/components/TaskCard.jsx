import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTask, getTasks } from '../services'
import BasicModal from '../components/BasicModal'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function TaskCard({ name, date_of_create, id, setTasks, description }) {
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
        //   backgroundColor: '#F3F4F8',
        //   padding: '20px',
        //   display: 'flex',
        //   alignItems: 'center',
      }}
    >
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <label style={{ width: '40%', fontFamily: 'Montserrat', fontWeight: 600 }}>{name} </label>
          <label style={{ width: '40%', fontFamily: 'Montserrat' }}>{date_of_create}</label>
          <EditIcon onClick={() => setOpen(!open)} sx={{ width: '12%', cursor: 'pointer' }} />
          <DeleteIcon onClick={() => handleDelete(id)} sx={{ width: '12%', cursor: 'pointer' }} />
        </AccordionSummary>
        <AccordionDetails>
          <label style={{ width: '40%', fontFamily: 'Raleway' }}>{description}</label>
        </AccordionDetails>
      </Accordion>
      <BasicModal open={open} setOpen={setOpen} toUpdate={true} id={id} setTasks={setTasks} />
    </div>
  )
}
