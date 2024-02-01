import { useState } from 'react'
import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import AddUserDrawer from './AddUserDrawer'
import { useTranslation } from 'react-i18next'
import BASE_URL from 'src/pages/constant/Constant'
import toast from 'react-hot-toast'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

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

const RowOptions = ({ row, datafetchuser }) => {
  console.log('row props', row)

  // ** Hooks

  // ** State

  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteopen, setdeleteOpen] = useState(false)
  const handleClickdeleteOpen = () => setdeleteOpen(true)
  const handleClose = () => setdeleteOpen(false)
  const [isLoading, setIsLoading] = useState(false)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    console.log('delete', row.id)
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)
      setIsLoading(true)

      const response = await fetch(`${BASE_URL}users/${row.id}/admin.user.deleteuserasync`, {
        method: 'POST',
        headers: headers
      })

      const result = await response.json()

      console.log('delete ha ye data ', result)
      if (response?.ok) {
        toast.success('Data deleted successfully')
        handleClose()
        datafetchuser()
      } else {
        toast.error(response?.messages)
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    handleRowOptionsClose()
  }

  const toggleEditDrawer = () => {
    setAnchorEl(null) // Close the Menu
    setEditOpen(prevEditOpen => !prevEditOpen) // Toggle the Edit drawer
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={toggleEditDrawer} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          {t('Edit')}
        </MenuItem>

        <MenuItem onClick={handleClickdeleteOpen} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          {t('Delete')}
        </MenuItem>
      </Menu>
      <Dialog
        open={deleteopen}
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
            Are you sure you want to delete this name<br></br>{' '}
            <span style={{ fontWeight: 'bold' }}>
              {row?.firstName} {row?.lastName}
            </span>
          </Typography>
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
      <AddUserDrawer open={editOpen} row={row} datafetchuser={datafetchuser} toggle={toggleEditDrawer} />
    </>
  )
}

export default RowOptions
