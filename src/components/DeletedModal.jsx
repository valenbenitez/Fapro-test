import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DeletedCard from './DeletedCard'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #B3B5BD',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  height: '60%',
}

export default function DeletedBasicModal({ deletedOpen, setDeletedOpen, deletedTasks }) {
  const handleOpen = () => setDeletedOpen(true)
  const handleClose = () => setDeletedOpen(false)

  return (
    <div>
      <Modal
        open={deletedOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: 'Montserrat', textTransform: 'uppercase' }}
          >
            Tareas eliminadas
          </Typography>
          <div style={{ width: '100%', height: '40px' }}>
            {Object.values(deletedTasks).length > 0 ? (
              deletedTasks.map(task => (
                <DeletedCard key={task.id} name={task.name} date_of_create={task.date_of_create} id={task.id} />
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
                <label style={{ fontFamily: 'Raleway', fontSize: '26px' }}>No tienes tareas eliminadas.</label>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
