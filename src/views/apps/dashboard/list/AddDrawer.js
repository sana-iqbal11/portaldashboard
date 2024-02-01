// ** React Imports
import React, { useState } from 'react'
import BASE_URL from 'src/pages/constant/Constant'
import toast from 'react-hot-toast'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { CircularProgress } from '@mui/material'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const defaultValues = {
  internalid: '',
  name: '',

  description: '',
  lat: '',
  lon: '',

  maxCheckinVicinity: '',
  qrCode: 'abc123',
  qrCodeStr: 'abc456',
  isOperational: ''
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, row, id, fetchData } = props
  const { t } = useTranslation()

  // ** State
  const [group, setGroup] = useState([])
  const [route, setRoute] = useState([])
  const [routeId, setrouteId] = useState(false)

  const [internalId, setinternalId] = useState('')

  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [lat, setlat] = useState('')
  const [lon, setlon] = useState('')
  const [maxCheckinVicinity, setmaxCheckinVicinity] = useState(0)
  const [qrCode, setqrCode] = useState('')
  const [qrCodeStr, setqrCodeStr] = useState('')
  const [isOperational, setisOperational] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGroupChange = event => {
    setSelectedGroup(event.target.value)

    console.log('Selected Group ID:', event.target.value)
  }

  const handleRouteChange = value => {
    setrouteId(value)

    console.log('Selected Route ID:', value)
  }

  const { reset, handleSubmit, control, setValue } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const handleClose = () => {
    toggle()
    resetData()
  }

  const handleAdd = async () => {
    const userToken = localStorage.getItem('token')
    if (!internalId || !name || !description || !lat || !lon || !maxCheckinVicinity || !qrCodeStr) {
      toast.error('All fields are required')

      return
    }

    console.log('The encoded base64 string is:', base64String)

    const postdata = {
      internalId: internalId,
      name: name,
      description: description,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      maxCheckinVicinity: parseInt(maxCheckinVicinity, 10),

      isOperational: isOperational,
      routeId: routeId
    }

    try {
      setIsLoading(true)
      console.log('sites ha data', postdata)

      const response = await fetch(`${BASE_URL}v1/sites/sites.createsitesasync`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postdata)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP error! Status: ${response.status}. ${errorData.message}`)
      }

      const responseData = await response.json()
      console.log('Response data:', responseData)
      if (responseData.success === true) {
        toast.success(responseData.message)
      } else {
        toast.error(responseData.message)
      }
      handleClose()

      // fetchdataroute()
      fetchData()
      resetData() // Typo, should be fetchRouteData()
    } catch (error) {
      console.error('Error:', error.message)
      setIsLoading(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleupdate = async () => {
    const userToken = localStorage.getItem('token')

    const postdata = {
      id: row.id,
      name: name,
      description: description,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      maxCheckinVicinity: parseInt(maxCheckinVicinity, 10),

      isOperational: isOperational
    }

    console.log('data for edit is here', postdata)
    try {
      setIsLoading(true)

      const response = await fetch(`${BASE_URL}v1/sites/sites.updatesitesasync`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postdata)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP error! Status: ${response.status}. ${errorData.message}`)
      }

      const responseData = await response.json()
      console.log('Response data:', responseData)
      if (responseData.success === true) {
        toast.success(responseData.message)
      } else {
        toast.error(responseData.message)
      }
      handleClose()

      resetData()
      fetchData()
    } catch (error) {
      console.error('Error:', error.message)
      setIsLoading(true)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRouteData = async () => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      const response = await fetch(`${BASE_URL}v1/routes/route.getallrouteasync`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setRoute(result.data.data)

      console.log('data  route', result)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('false')
    }
  }

  const fetchgroupData = async () => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      const response = await fetch(`${BASE_URL}v1/group/group.getallgroupasync`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setGroup(result.data.data)

      console.log('data group ', result)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('false')
    }
  }

  React.useEffect(() => {
    if (id) {
      setrouteId(id)
    }
    fetchRouteData()
    fetchgroupData()

    if (row) {
      setinternalId(row.internalId)
      setname(row.name)
      setdescription(row.description)
      setlat(row.lat)
      setlon(row.lon)
      setmaxCheckinVicinity(row.maxCheckinVicinity)
      setqrCodeStr(row.qrCodeStr)
      setqrCode(row.qrCode)

      // setqrCodeStr(row.qrCodeStr)
      setisOperational(row.isOperational) // Fix the typo in the property name
      setrouteId(row.routeId)
    } else {
      resetData()
    }
  }, [row])

  const resetData = () => {
    setinternalId('')
    setname('')
    setdescription('')
    setlat('')
    setlon('')
    setmaxCheckinVicinity('')
    setqrCode('')
    setqrCodeStr('')
    setisOperational('') // Fix the typo in the property name
    setrouteId('')
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
        <Typography variant='h5'>{row ? t('Update Site') : t('Add Site')}</Typography>
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
        <CustomTextField
          fullWidth
          value={name}
          sx={{ mb: 4 }}
          label={t('Name')}
          onChange={e => setname(e.target.value)}
          placeholder='Enter Site Name/Label'
        />

        <CustomTextField
          fullWidth
          value={internalId}
          sx={{ mb: 4 }}
          label={t('Internal ID')}
          onChange={e => setinternalId(e.target.value)}
          placeholder='42101'
        />

        <CustomTextField
          fullWidth
          label={t('Description')}
          placeholder='description here'
          value={description}
          sx={{ mb: 4 }}
          onChange={e => setdescription(e.target.value)}
        />

        <CustomTextField
          fullWidth
          value={lat}
          sx={{ mb: 4 }}
          label={t('Latitude')}
          onChange={e => setlat(e.target.value)}
          placeholder='10.123455'
        />

        <CustomTextField
          fullWidth
          value={lon}
          sx={{ mb: 4 }}
          label={t('Longitude')}
          onChange={e => setlon(e.target.value)}
          placeholder='10.123455'
        />

        <CustomTextField
          fullWidth
          value={maxCheckinVicinity}
          sx={{ mb: 1 }}
          label={t('Checkin Vicinity')}
          onChange={e => setmaxCheckinVicinity(e.target.value)}
          placeholder='20'
        />

        {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Switch
            checked={isOperational}
            onChange={() => setisOperational(!isOperational)}
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
          <Typography onClick={e => setoperational(e.target.value)}>{t('Is Operational')}</Typography>
        </Box> */}
        {/* <CustomTextField
            select
            fullWidth
            value={group}
            sx={{ mb: 4 }}
            label={t('Group')}
            onChange={e => setGroup(e.target.value)}
            SelectProps={{ value: group, onChange: e => setGroup(e.target.value) }}
          >
            <MenuItem value='Stage1'>Stage 1</MenuItem>
            <MenuItem value='Stage2'>Stage 2</MenuItem>
            <MenuItem value='Stage3'>Stage 3</MenuItem>
            <MenuItem value='Stage4'>Stage 4</MenuItem>
            <MenuItem value='Stage5'>Stage 5</MenuItem>
          </CustomTextField> */}

        {/* <CustomTextField
            select
            fullWidth
            sx={{ mb: 6 }}
            label={t('Route(s)')}
            SelectProps={{ value: route, onChange: e => setRoute(e.target.value) }}
          >
            <MenuItem value='Route ABC'>Route ABC</MenuItem>
            <MenuItem value='Route AC'>Route AC</MenuItem>
            <MenuItem value='Route ACA'>Route ACA</MenuItem>
            <MenuItem value='Route ADC'>Route ADC</MenuItem>
          </CustomTextField> */}

        <FormControl fullWidth sx={{ mb: 1 }}>
          <InputLabel id='demo-simple-select-label'>Route</InputLabel>
          <Select
            labelId='route-select-label'
            id='route-select'
            value={routeId ? routeId : ''}
            label='Route'
            onChange={e => handleRouteChange(e.target.value)}
          >
            {route?.map(route => (
              <MenuItem key={route.id} value={route.id}>
                {route.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Switch
            checked={isOperational}
            onChange={() => setisOperational(!isOperational)}
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
          <Typography onClick={e => setoperational(e.target.value)}>{t('Is Operational')}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading ? (
            <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
          ) : (
            <>
              <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={row ? handleupdate : handleAdd}>
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
