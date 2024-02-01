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

const schema = yup.object().shape({
  name: yup.string().required()
})
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

const SidebarAddGroup = props => {
  // ** Props
  const { open, toggle, row, fetchData } = props
  const { t } = useTranslation()
  const [roleList, setroleList] = useState([])
  const [role, setrole] = useState([])
  const [userList, setuserList] = useState([])
  const [user, setuser] = useState([])
  const [isuseractive, setUserActive] = useState(false)
  const [isactive, setActive] = useState(false)
  const [route, setroute] = useState([])
  const [routeList, setrouteList] = useState([])

  const [isRouteactive, setRouteActive] = useState(false)
  const [site, setsite] = useState([])
  const [questionList, setquestionList] = useState([])
  const [question, setquestion] = useState([])
  const [isSiteactive, setSiteActive] = useState(false)
  const [isquestionnaireactive, setQuestionnaireActive] = useState(false)

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleDelete = chipToDelete => event => {
    // Prevent the default behavior of the event
    event.preventDefault()

    console.log('checking dropdown', chipToDelete)

    // Assuming you have dd state variable named role
    const updatedRoles = role.filter(r => r.roleId !== chipToDelete.roleId)
    setrole(updatedRoles)
    if (updatedRoles.length === 0) {
      setUserActive(false)
    }
    fetchUserData()
  }

  const handleuserDelete = chipToDelete => event => {
    // Prevent the default behavior of the event
    event.preventDefault()

    console.log('checking dropdown', chipToDelete)

    // Assuming you have dd state variable named role
    const updatedRoles = user.filter(r => r.id !== chipToDelete.id)
    setuser(updatedRoles)
    if (updatedRoles.length === 0) {
      setRouteActive(false)
    }
    fetchUserData()
  }

  const handlerouterDelete = chipToDelete => event => {
    // Prevent the default behavior of the event
    event.preventDefault()

    console.log('checking dropdown', chipToDelete)

    // Assuming you have dd state variable named role
    const updatedRoles = route?.filter(r => r.id !== chipToDelete.id)
    setroute(updatedRoles)
    if (updatedRoles.length === 0) {
      setSiteActive(false)
    }
    fetchUserData()
  }

  const handlesiteDelete = chipToDelete => event => {
    // Prevent the default behavior of the event
    event.preventDefault()

    console.log('checking dropdown', chipToDelete)

    // Assuming you have dd state variable named role
    const updatedRoles = site?.filter(r => r.id !== chipToDelete.id)
    setsite(updatedRoles)
    if (updatedRoles.length === 0) {
      setQuestionnaireActive(false)
    }
    fetchUserData()
  }

  const handlequestionDelete = chipToDelete => event => {
    // Prevent the default behavior of the event
    event.preventDefault()

    console.log('checking dropdown', chipToDelete)

    // Assuming you have dd state variable named role
    const updatedRoles = role.filter(r => r.id !== chipToDelete.id)
    setquestion(updatedRoles)

    fetchUserData()
  }

  const fetchUserData = async () => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      const response = await fetch(`${BASE_URL}users`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()

      const excludedPerson = result.data.filter(
        person1 => !role.some(person2 => person1.roles.roleName === person2.roleName)
      )

      setuserList(excludedPerson)
      console.log('data  user', result)
      console.log('data ha user', excludedPerson)
    } catch (error) {
      console.log(error)
    } finally {
      console.log(false)
    }
  }

  const handledropdown = value => {
    setrole(value)
    console.log('checking dropdown', value)
    setUserActive(true)
    fetchUserData()
  }

  const handledropdownuser = value => {
    setuser(value)
    console.log('checking dropdown', value)
    setRouteActive(true)
  }

  const handledropdownroute = value => {
    setroute(value)
    console.log('checking dropdown', value)
    setSiteActive(true)
  }

  const handledropdownsite = value => {
    setsite(value)
    console.log('checking dropdown', value)
    setQuestionnaireActive(true)
  }

  const onSubmit = async data => {
    console.log('ass', data)

    // console.log('post data ', postData)

    const userToken = localStorage.getItem('token')
    try {
      let response

      if (row) {
        console.log('ass', data)

        response = await fetch(`${BASE_URL}v1/group/group.updategroupasync`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      } else {
        response = await fetch(`${BASE_URL}v1/group/group.creategroupasync`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      }
      const responseData = await response.json()
      console.log('group edit ha', responseData)
      if (response?.ok) {
        console.log(row ? 'group updated successfully' : 'group added successfully')
        toast.success('group added successfully')
        fetchData()
      } else {
        toast.error(response?.messages)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }

    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  React.useEffect(() => {
    fetchrole()
    if (row) {
      // Set the form fields with data from the editedRow
      reset({
        id: row.id,
        name: row.name
      })
    } else {
      // If editedRow is null, reset the form to default values
      reset(defaultValues)
    }
  }, [row, reset])

  const fetchrole = async () => {
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

      console.log('data ', result)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('false')
    }
  }

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
        <Typography variant='h5'>{row ? t('Update Group') : t('Add Group')}</Typography>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Group Name')}
                onChange={onChange}
                placeholder='Group A'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Description')}
                onChange={onChange}
                placeholder='Group A'
                error={Boolean(errors.description)}
                {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Switch
              checked={isactive}
              onChange={() => setActive(!isactive)}
              inputProps={{ 'aria-label': 'controlled' }}
              label={
                <span>
                  <Typography component='span' level='inherit' sx={{ ml: '10px' }}>
                    On
                  </Typography>
                  <Typography component='span' level='inherit' sx={{ mr: '8px' }}>
                    Off
                  </Typography>
                </span>
              }
              sx={{
                '--Switch-thumbSize': '27px',
                '--Switch-trackWidth': '100px',
                '--Switch-trackHeight': '45px'
              }}
            />
            <Typography onClick={() => setActive(!isactive)}>{t('Is Active')}</Typography>
          </Box>
          <FormControl sx={{ m: 1, mb: 4, width: '100%' }}>
            <InputLabel id='demo-multiple-chip-label'>Role</InputLabel>
            <Select
              labelId='demo-multiple-chip-label'
              id='demo-multiple-chip'
              multiple
              value={role}
              onChange={e => handledropdown(e.target.value)}
              input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
              renderValue={selected => (
                <Box
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                  SelectProps={{ value: role, onChange: e => setrole(e.target.value) }}
                >
                  {selected?.map(value => (
                    <>
                      <Chip
                        key={value.roleId}
                        label={value.roleName}
                        onMouseDown={event => {
                          event.stopPropagation()
                        }}
                        onDelete={event => handleDelete(value)(event)}
                      />
                    </>
                  ))}
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
                    permissions: item.permissions
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isuseractive ? (
            <>
              <FormControl sx={{ m: 1, mb: 4, width: '100%' }}>
                <InputLabel id='demo-multiple-chip-label'>Users</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={user}
                  onChange={e => handledropdownuser(e.target.value)}
                  input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={selected => (
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                      SelectProps={{ value: user, onChange: e => setuser(e.target.value) }}
                    >
                      {selected?.map(value => (
                        <>
                          <Chip
                            key={value.id}
                            label={value.firstName}
                            onMouseDown={event => {
                              event.stopPropagation()
                            }}
                            onDelete={event => handleuserDelete(value)(event)}
                          />
                        </>
                      ))}
                      {console.log('.......', selected)}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {console.log('.......role', role)}
                  {userList?.map(item => (
                    <MenuItem
                      key={item.id}
                      value={{
                        item
                      }}
                    >
                      {item.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            ''
          )}

          {isRouteactive ? (
            <>
              <FormControl sx={{ m: 1, mb: 4, width: '100%' }}>
                <InputLabel id='demo-multiple-chip-label'>Routes</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={role}
                  onChange={e => handledropdownroute(e.target.value)}
                  input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={selected => (
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                      SelectProps={{ value: route, onChange: e => setroute(e.target.value) }}
                    >
                      {selected?.map(value => (
                        <>
                          <Chip
                            key={value.id}
                            label={value.name}
                            onMouseDown={event => {
                              event.stopPropagation()
                            }}
                            onDelete={event => handlerouterDelete(value)(event)}
                          />
                        </>
                      ))}
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
                        item
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            ''
          )}
          {isSiteactive ? (
            <>
              <FormControl sx={{ m: 1, mb: 4, width: '100%' }}>
                <InputLabel id='demo-multiple-chip-label'>Sites</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={site}
                  onChange={e => handledropdownsite(e.target.value)}
                  input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={selected => (
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                      SelectProps={{ value: site, onChange: e => setsite(e.target.value) }}
                    >
                      {selected?.map(value => (
                        <>
                          <Chip
                            key={value.id}
                            label={value.name}
                            onMouseDown={event => {
                              event.stopPropagation()
                            }}
                            onDelete={event => handlesiteDelete(value)(event)}
                          />
                        </>
                      ))}
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
                        item
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            ''
          )}
          {isquestionnaireactive ? (
            <>
              <FormControl sx={{ m: 1, mb: 4, width: '100%' }}>
                <InputLabel id='demo-multiple-chip-label'>Questionnairs</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={question}
                  onChange={e => setquestion(e.target.value)}
                  input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={selected => (
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                      SelectProps={{ value: question, onChange: e => setquestion(e.target.value) }}
                    >
                      {selected?.map(value => (
                        <>
                          <Chip
                            key={value.id}
                            label={value.name}
                            onMouseDown={event => {
                              event.stopPropagation()
                            }}
                            onDelete={event => handlequestionDelete(value)(event)}
                          />
                        </>
                      ))}
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
                        item
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            ''
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {row ? t('Update') : t('Submit')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddGroup
