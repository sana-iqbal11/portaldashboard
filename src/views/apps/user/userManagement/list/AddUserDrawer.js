// ** React Imports
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import BASE_URL from 'src/pages/constant/Constant'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import resetpasswordimage from '../../../../../assest/images/resetpass.jpg'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input } from '@mui/material'
import Image from 'next/image'
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
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, row, datafetchuser } = props
  const { t } = useTranslation()
  const [roleList, setroleList] = useState([])
  const [role, setrole] = useState([])
  const [approved, setApproved] = useState(false)
  const [verified, setVerified] = useState(false)
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userName, setUserData] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [email, setemail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitch1On, setSwitch1On] = useState(false)
  const [isSwitch2On, setSwitch2On] = useState(false)
  const [resetpass, setresetpassword] = useState(false)
  const [file, setFile] = useState('')
  const [uploadImage, setuploadImage] = useState('')

  const handleCloseResetPassword = () => setresetpassword(false)
  const handleResetPasswordOpen = () => setresetpassword(true)
  const handleImageChange = event => {
    const file = event.target.files[0]
    console.log('image upload', file)

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should not exceed 2 MB')

        return
      } else {
        setFile(file)
        handleImageUpload(file)
      }
    }
  }

  const handleImageUpload = async file => {
    try {
      const formData = new FormData()
      formData.append('File', file)

      const response = await fetch(`${BASE_URL}file/file.uploadfileasync`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          tenant: 'root',
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })

      const responseData = await response.json()

      console.log('forgot page', responseData)
      if (responseData?.success === true) {
        setuploadImage(responseData)
        // handleCloseResetPassword()
        // toast.success('POST request successful!')
      } else {
        setFile(new File([], ''))
        toast.error(responseData?.message)
      }
    } catch (error) {
      console.error('Error during fetch:', error)

      toast.error(`Error: ${error.message}`)
    }
  }
  const handleApproved = () => {
    setApproved(!approved)
  }
  const handleselectRole = value => {
    const updatedRoles = value.map(role => {
      if (role.enabled === false) {
        role.enabled = true
      }

      return role
    })

    setrole(updatedRoles)
    console.log('ye values select ha bhai', role)
  }
  const handleDelete = chipToDelete => event => {
    // Prevent the default behavior of the event
    event.preventDefault()

    // Assuming you have a state variable named role
    const updatedRoles = role.map(r => {
      if (r.roleId === chipToDelete.roleId) {
        return { ...r, enabled: false } // Update the enabled property
      }

      return r
    })

    setrole(updatedRoles)
  }

  const handledropdown = value => {
    console.log('checking dropdown', value)
  }

  const handleVerified = () => {
    setVerified(!verified)
  }

  const handleSendResetLink = async () => {
    try {
      const postData = {
        email: email
      }
      console.log('Email password', postData)

      const response = await fetch(`${BASE_URL}users/forgot-password`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          tenant: 'root',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const responseData = await response.json()

      console.log('forgot page', responseData)
      if (responseData?.success === true) {
        handleCloseResetPassword()
        toast.success('POST request successful!')
      } else {
        toast.error(responseData?.exception)
      }
    } catch (error) {
      console.error('Error during fetch:', error)

      toast.error(`Error: ${error.message}`)
    }
  }

  const handleSwitch1Change = () => {
    setSwitch1On(!isSwitch1On)
    setSwitch2On(false)
  }

  const handleSwitch2Change = () => {
    setSwitch2On(!isSwitch2On)
    setSwitch1On(false)
  }

  const handleupdate = async () => {
    setIsLoading(true)
    const userToken = localStorage.getItem('token')

    const postData = {
      firstName: firstName,
      lastName: lastName,
      imageUrl: null,
      email: email,

      // password: password,
      // confirmPassword: confirmPassword,
      mobileNo: phoneNumber,
      userRoles: []
    }

    console.log('post data for edit: ', postData)

    role?.forEach(singleRole => {
      postData.userRoles.push({
        roleId: singleRole.roleId,
        roleName: singleRole.roleName,
        description: singleRole.description,
        enabled: singleRole.enabled,
        isActive: isSwitch1On
      })
    })

    try {
      const response = await fetch(`${BASE_URL}users/${row.id}/admin.user.updateuserasync`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log('User added successfully:', responseData.data)
        toast.success('update  successfully')
      } else {
        console.error('Error adding user:', responseData.messages)
        toast.error(responseData.messages)
      }
      datafetchuser()
      handleClose()
    } catch (error) {
      console.error('Error:', error.message)
      toast.error('Error occurred while processing the request')
    } finally {
      setIsLoading(false) // Set loading to false after receiving the response
    }
  }

  const handleAddUser = async () => {
    setIsLoading(true)
    const userToken = localStorage.getItem('token')
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error('All fields are required')

      return
    }

    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match')

      return
    }
    setIsLoading(true)

    const postData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber,
      imageUrl: uploadImage
    }

    try {
      const response = await fetch(`${BASE_URL}users`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log('User added successfully:', responseData)
        toast.success('User added successfully')
      } else {
        console.error('Error adding user:', responseData.messages)
        toast.error(responseData.messages)
      }
      datafetchuser()

      handleClose()
    } catch (error) {
      console.error('Error:', error.message)
      toast.error('Error occurred while processing the request')
    } finally {
      setIsLoading(false) // Set loading to false after receiving the response
    }
  }

  const handleClose = () => {
    handleCloseResetPassword()
    toggle()

    // handlereset()

    // datafetchuser()
  }

  const handlereset = () => {
    setlastName('')
    setfirstName('')
    setUserData('')
    setemail('')
    setpassword('')
    setconfirmPassword('')
    setphoneNumber('')
    setrole([])
    setFile(new File([], ''))
  }

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      const response = await fetch(`${BASE_URL}roles`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setroleList(result.data)

      // console.log('data ', result)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('false')
    }
  }
  React.useEffect(() => {
    // fetchData()
  }, [])

  React.useEffect(() => {
    console.log('why row not update..', row)

    if (row) {
      setfirstName(row?.firstName)
      setlastName(row?.lastName)
      setemail(row?.email)
      setUserData(row?.userName) // Set userName in edit mode
      setphoneNumber(row?.phoneNumber)
      setFile(row?.imageUrl) // Set userName in edit mode

      // Assuming row.roles is an array
      setrole([...row.roles])
    } else {
      handlereset()
    }
  }, [row])
  useState(() => {
    setFile(new File([], ''))
  }, [])
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
        <Typography variant='h5'>{row ? t('Update User') : t('Add User')}</Typography>
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
        <Grid item>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              marginBottom: '10px',
              marginLeft: '10px'
            }}
          >
            <Avatar
              alt='Choose Image'
              src={file instanceof Blob ? URL.createObjectURL(file) : file && `data:image/png;base64,${file}`}
              sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
            />
            {/* <Typography variant='body1'>{selectedLogo ? selectedLogo.name : ''}</Typography> */}
          </div>

          <label htmlFor='icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
            <Input type='file' id='icon-upload' style={{ display: 'none' }} onChange={handleImageChange} />
            <Button variant='contained' color='primary' component='span'>
              Choose Image
            </Button>
          </label>
        </Grid>
        {/* <Box sx={{ mb: 4, padding: '15px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '100px', width: '100px' }}>
            <img
              src={file instanceof Blob ? URL.createObjectURL(file) : file && `data:image/png;base64,${file}`}
              alt='abc'
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
              onError={e => console.error('Image load error:', e)}
            />
          </div>
          <label htmlFor='icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
            <Input type='file' id='icon-upload' style={{ display: 'none' }} onChange={handleImageChange} />
            <Button variant='contained' color='primary' component='span'>
              Choose Image
            </Button>
          </label>
        </Box> */}
        <CustomTextField
          fullWidth
          value={firstName}
          sx={{ mb: 4, mt: 4 }}
          label={t('First Name')}
          onChange={e => setfirstName(e.target.value)}
          placeholder='John'
        />

        <CustomTextField
          fullWidth
          value={lastName}
          sx={{ mb: 4 }}
          label={t('Last Name')}
          onChange={e => setlastName(e.target.value)}
          placeholder='Doe'
        />
        {row?.emailConfirmed ? (
          ''
        ) : (
          <>
            <CustomTextField
              fullWidth
              type='email'
              label={t('Email')}
              value={email}
              sx={{ mb: 4 }}
              onChange={e => setemail(e.target.value)}
              placeholder='johndoe@email.com'
            />
          </>
        )}
        <>
          {row ? (
            ''
          ) : (
            <>
              <CustomTextField
                fullWidth
                value={password}
                sx={{ mb: 4 }}
                label={t('Password')}
                onChange={e => setpassword(e.target.value)}
                placeholder='123'
              />

              <CustomTextField
                fullWidth
                value={confirmPassword}
                sx={{ mb: 4 }}
                label={t('Confirm Password')}
                onChange={e => setconfirmPassword(e.target.value)}
                placeholder='123'
              />
            </>
          )}

          <CustomTextField
            fullWidth
            value={phoneNumber}
            sx={{ mb: 2 }}
            label={t('Phone Number')}
            onChange={e => setphoneNumber(e.target.value)}
            placeholder='123'
          />
        </>

        {row ? (
          <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id='demo-multiple-chip-label'>Role</InputLabel>
            <Select
              labelId='demo-multiple-chip-label'
              id='demo-multiple-chip'
              multiple
              value={role}
              onOpen={e => fetchData(e.target.value)}
              onChange={e => handleselectRole(e.target.value)}
              input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
              renderValue={selected => (
                <Box
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                  SelectProps={{ value: role, onChange: e => handledropdown(e.target.value) }}
                >
                  {selected?.map(
                    value =>
                      // Only render the Chip if enabled is true
                      value.enabled && (
                        <Chip
                          key={value.roleId}
                          label={value.roleName}
                          onMouseDown={event => {
                            event.stopPropagation()
                          }}
                          onDelete={event => handleDelete(value)(event)}
                        />
                      )
                  )}
                  {console.log('.......', selected)}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {console.log('.......role', role)}
              {roleList?.map(item => (
                <MenuItem
                  key={item.id}
                  value={{
                    roleId: item.id,
                    roleName: item.name,
                    description: item.description,
                    enabled: false
                  }}
                  disabled={role.some(role => role.roleId === item.id && role.enabled === true)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          ''
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Switch
            checked={isSwitch1On}
            onChange={handleSwitch1Change}
            inputProps={{ 'aria-label': 'controlled' }}
            label={
              <span>
                <Typography component='span' level='inherit' sx={{ ml: '10px' }}>
                  {isSwitch1On ? 'On' : 'Off'}
                </Typography>
                <Typography component='span' level='inherit' sx={{ mr: '8px' }}>
                  {isSwitch1On ? 'Off' : 'On'}
                </Typography>
              </span>
            }
            sx={{
              '--Switch-thumbSize': '27px',
              '--Switch-trackWidth': '100px',
              '--Switch-trackHeight': '45px'
            }}
          />
          <Typography>{isSwitch1On ? t('Inactive') : t('Active')}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row ? (
            <>
              {' '}
              <Button
                type='submit'
                variant='contained'
                sx={{ mr: 3, p: 3, pt: 3, pb: 3 }}
                style={{ textAlign: 'start', fontSize: '12.7px' }}
                onClick={handleResetPasswordOpen}
              >
                Reset Password
              </Button>
              <Dialog
                open={resetpass}
                onClose={handleCloseResetPassword}
                aria-labelledby='customized-dialog-title'
                sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
              >
                <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
                  <CustomCloseButton aria-label='close' onClick={handleCloseResetPassword}>
                    <Icon icon='tabler:x' fontSize='1.25rem' />
                  </CustomCloseButton>
                </DialogTitle>
                <DialogContent>
                  <Typography style={{ textAlign: 'center' }}>
                    Are you sure you want to reset your password<br></br>{' '}
                    <span style={{ fontWeight: 'bold' }}>{row?.email}</span>
                  </Typography>
                </DialogContent>
                <DialogContent>
                  <Box sx={{ marginTop: '-30px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ height: '150px', width: '150px' }}>
                      <Image
                        src={resetpasswordimage}
                        alt='reset password'
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
                      <Button variant='contained' onClick={handleSendResetLink}>
                        Yes
                      </Button>
                      <Button variant='contained' onClick={handleCloseResetPassword}>
                        No
                      </Button>
                    </>
                  )}
                </DialogActions>
              </Dialog>
            </>
          ) : (
            ''
          )}
          {isLoading ? (
            <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
          ) : (
            <>
              <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={row ? handleupdate : handleAddUser}>
                {row ? t('Update') : t('Submit')}
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleClose}>
                {t('Cancel')}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
