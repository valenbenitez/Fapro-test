import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { postTask, updateTask, getTasks } from '../services'
import ErrorIcon from '@mui/icons-material/Error'
import CircularIndeterminate from './Progress'

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
}

export default function BasicModal({ open, setOpen, toUpdate = false, id = 0, setTasks }) {
  const [input, setInput] = React.useState({
    name: '',
  })
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  React.useEffect(() => {}, [errors])
  React.useEffect(() => {
    return () => {
      setErrors({})
    }
  }, [])

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit() {
    const error = {}
    if (input.name === '') {
      error.name = 'Ingrese el nombre de la tarea para poder guardarla.'
    }
    setErrors(error)
    if (Object.values(error).length === 0) {
      setLoading(true)
      await postTask(input.name)
      let allTasks = await getTasks()
      allTasks = allTasks['data'].filter(task => task.status !== 'deleted')
      setTasks(allTasks)
      setOpen(false)
      setLoading(false)
    }
  }

  async function handleUpdate() {
    const error = {}
    if (input.name === '') {
      error.name = 'Ingrese el nombre de la tarea para poder guardarla.'
    }
    setErrors(error)
    setLoading(true)

    await updateTask(id, input.name)
    let allTasks = await getTasks()
    allTasks = allTasks['data'].filter(task => task.status !== 'deleted')
    setTasks(allTasks)
    setOpen(false)
    setLoading(false)
  }

  if (toUpdate) {
    return (
      <div>
        <Modal
          open={open}
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
              Modificar tarea
            </Typography>
            <label style={{ fontFamily: 'Montserrat', fontSize: '12px', color: '#B4B8BD' }}>
              Fecha de modificacion: {new Date().toLocaleDateString()}
            </label>
            <br />
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'normal' }}>
                <input
                  onChange={e => handleChange(e)}
                  name="name"
                  type={'text'}
                  placeholder="Agregar nueva tarea"
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: '2px solid #B3B5BD',
                    width: '80%',
                    marginBottom: '20px',
                  }}
                ></input>
                {errors['name'] && <ErrorIcon color="error" sx={{ marginTop: '8px', marginLeft: '6px' }} />}
              </div>
              {loading ? (
                <CircularIndeterminate color="inherit" />
              ) : (
                <Button disabled={input.name === '' ?? true} onClick={handleUpdate} variant="contained" color="inherit">
                  Guardar
                </Button>
              )}
            </div>
          </Box>
        </Modal>
      </div>
    )
  }

  return (
    <div>
      <Modal
        open={open}
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
            Agregar tarea
          </Typography>
          <label style={{ fontFamily: 'Montserrat', fontSize: '12px', color: '#B4B8BD' }}>
            Fecha de creacion: {new Date().toLocaleDateString()}
          </label>
          <br />
          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'normal' }}>
              <input
                onChange={e => handleChange(e)}
                name="name"
                type={'text'}
                placeholder="Agregar nueva tarea"
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '2px solid #B3B5BD',
                  width: '80%',
                  marginBottom: '20px',
                  // borderColor: errors['name'] ? 'red' : '#B3B5BD',
                }}
              ></input>
              {errors['name'] && <ErrorIcon color="error" sx={{ marginTop: '8px', marginLeft: '6px' }} />}
            </div>

            {loading ? (
              <CircularIndeterminate color="inherit" />
            ) : (
              <Button disabled={input.name === '' ?? true} onClick={handleSubmit} variant="contained" color="inherit">
                Guardar
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
