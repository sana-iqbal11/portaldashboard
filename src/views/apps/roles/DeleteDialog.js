// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import BASE_URL from 'src/pages/constant/Constant'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '-5px' // Adjust margin to align with the IconButton
})

const DeleteDialog = ({ roleName, roleID, handleRowOptionsClose, fetchData }) => {
  // ** State
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    handleRowOptionsClose()
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    console.log('delete role ja ye', roleID)
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      setIsLoading(true)

      const response = await fetch(`${BASE_URL}roles/${roleID}`, {
        method: 'DELETE',
        headers: headers
      })

      const result = await response.json()

      console.log('delete ha ye data ', result)
      if (response?.ok) {
        toast.success('Data deleted successfully')
        handleClose()
      } else {
        toast.error(response?.messages)

        setIsLoading(true)
      }
      fetchData()
      handleRowOptionsClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <MenuItem onClick={handleClickOpen} sx={{ '& svg': { mr: 2 } }}>
        <Icon icon='tabler:trash' fontSize={20} />
        Delete
      </MenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <CustomCloseButton aria-label='close' onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: 'center' }}>
            Are you sure you want to delete this role <span style={{ fontWeight: 'bold' }}>{roleName}</span>
          </Typography>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              className='d-flex justify-content-center align-items-center'
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255, 107, 107, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon icon='tabler:trash' color='BLACK' fontSize={40} />
            </div>
          </Box> */}
        </DialogContent>
        <DialogContent>
          <Box sx={{ marginTop: '-30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '100px', width: '100px' }}>
              <img
                src='/images/icons/project-icons/trashimage.png'
                alt='abc'
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant='contained' onClick={handleDelete}>
                Yes
              </Button>
              <Button variant='contained' onClick={handleClose}>
                No
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteDialog
