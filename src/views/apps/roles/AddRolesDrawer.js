// ** React Imports
import React, { useState } from 'react'
import BASE_URL from 'src/pages/constant/Constant'
import toast from 'react-hot-toast'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'

import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const defaultValues = {
  name: ''
}
const validationSchema = yup.object().shape({
  name: yup.string().required('Role Name is required'),
  description: yup.string().required('Role Description is required')
})
const SidebarAddGroup = props => {
  // ** Props
  const { open, toggle, row, fetchData } = props
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const [roleName, setRoleName] = useState('')
  const [roleDecription, setroleDecription] = useState('')

  const handleAddRole = async () => {
    try {
      const userToken = localStorage.getItem('token')
      setIsLoading(true)

      const postData = {
        name: roleName,
        description: roleDecription
      }
      console.log('role add data', postData)

      const response = await fetch(`${BASE_URL}roles`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      // if (!response.ok) {
      //   throw new Error('Network response was not ok')
      // }

      const responseData = await response.json()

      console.log(responseData)
      if (responseData?.success === true) {
        console.log('add', responseData)

        toast.success('POST request successful!')

        handleClose()
      } else {
        toast.error(responseData?.exception)
        setIsLoading(true)
      }
      fetchData()
    } catch (error) {
      console.error('Error during fetch:', error)

      toast.error(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }

    setRoleName('')
    setroleDecription('')
  }

  const handleUpdateRole = async () => {
    try {
      const userToken = localStorage.getItem('token')
      setIsLoading(true)

      const postData = {
        id: row.id,
        name: roleName,
        description: roleDecription
      }
      console.log('role add data', postData)

      const response = await fetch(`${BASE_URL}roles/${row.id}/permissions`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      // if (!response.ok) {
      //   throw new Error('Network response was not ok')
      // }

      const responseData = await response.json()

      console.log(responseData)
      if (responseData?.success === true) {
        console.log('add', responseData)

        toast.success('POST request successful!')

        handleClose()
      } else {
        toast.error(responseData?.exception)
        setIsLoading(true)
      }
      fetchData()
    } catch (error) {
      console.error('Error during fetch:', error)

      toast.error(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }

    setRoleName('')
    setroleDecription('')
  }

  const handleClose = () => {
    toggle()
    // setRoleName('')
    // setroleDecription('')
  }

  React.useEffect(() => {
    if (row) {
      setRoleName(row.name)
      setroleDecription(row.description)
    } else {
      setRoleName('')
      setroleDecription('')
    }
  }, [row])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{row ? t('Update Group') : t('Add Role')}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label='Role Name'
              value={roleName}
              onChange={e => setRoleName(e.target.value)}
              placeholder='Enter Role Name'
            />
          </FormControl>
        </Box>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label='Role Description'
              value={roleDecription}
              onChange={e => setroleDecription(e.target.value)}
              placeholder='Enter Role Description'
            />
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={row ? handleUpdateRole : handleAddRole}>
            {row ? t('Update') : t('Submit')}
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            {t('Cancel')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default SidebarAddGroup
