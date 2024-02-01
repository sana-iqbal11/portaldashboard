import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import BASE_URL from 'src/pages/constant/Constant'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ChromePicker } from 'react-color'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useForm, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const defaultValues = {
  name: ''
}

const AddRouteDrawer = props => {
  const { open, toggle, row, fetchdataroute } = props
  const [selectedColor, setSelectedColor] = useState('black')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const { t } = useTranslation()
  const [file, setFile] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker)
  }

  const handleColorChange = color => {
    setSelectedColor(color.hex)
    console.log('color hn yw', selectedColor)
  }

  function fileToBinaryString(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file provided')
      }

      const reader = new FileReader()

      reader.onload = event => {
        resolve(event.target.result)
      }

      reader.onerror = error => {
        reject(error)
      }

      reader.readAsBinaryString(file)
    })
  }

  const handleAdd = async () => {
    const userToken = localStorage.getItem('token')
    console.log('checking file', file)
    if (!name || !file || !description) {
      toast.error('All fields are required')

      return
    }

    let formData = new FormData()
    formData.append('name', name)
    formData.append('color', selectedColor)
    formData.append('MarkerIcon', file)
    formData.append('description', description)

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`
    }

    try {
      setIsLoading(true)

      const response = await fetch(`${BASE_URL}v1/routes/route.createrouteasync`, {
        method: 'POST',
        headers: headers,
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP error! Status: ${response.status}. ${errorData.message}`)
      }

      const responseData = await response.json()
      console.log('Response data:', responseData)
      toast.success('Successful route add')
      handleClose()
      fetchdataroute()
    } catch (error) {
      console.error('Error:', error.message)
      toast.error('Unsuccessful route add')
      setIsLoading(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleupdate = async () => {
    const userToken = localStorage.getItem('token')
    let formData = new FormData()
    formData.append('Id', row.id)
    formData.append('name', name)
    formData.append('color', selectedColor)
    formData.append('MarkerIcon', file)
    formData.append('description', description)
    try {
      setIsLoading(true)

      const response = await fetch(`${BASE_URL}v1/routes/route.updaterouteasync`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log('Response data:', responseData)
      handleClose()
      fetchdataroute()
      toast.success('Successful route add')
    } catch (error) {
      console.error('Error:', error.message)
      toast.error('Unsuccessful route add')
      setIsLoading(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handlereset = () => {
    setname('')
    setdescription('')
    setSelectedColor('')
    setFile(new File([], ''))
  }

  const handleClose = () => {
    toggle()
    handlereset()
  }

  React.useEffect(() => {
    if (row) {
      setname(row.name)
      setdescription(row.description)
      setSelectedColor(row.color)
      setFile(row.markerIcon)
    } else {
      handlereset()
    }
  }, [row])

  // useState(() => {
  //   setFile(new File([], ''))
  // }, [])

  const handleImageChange = event => {
    const file = event.target.files[0]

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should not exceed 2 MB')

        return
      } else {
        setFile(file)
      }
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
        <Typography variant='h5'>{row ? t('Update Route') : t('Add Route')}</Typography>
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
          label={t('Route Name')}
          onChange={e => setname(e.target.value)}
          placeholder='Route A'
        />

        <CustomTextField
          fullWidth
          value={description}
          sx={{ mb: 4 }}
          label={t('Description')}
          onChange={e => setdescription(e.target.value)}
          placeholder='Route A'
        />

        <div>
          <Box sx={{ mb: 4 }}>
            <CustomTextField
              fullWidth
              label={t('Color codes')}
              type='color'
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
            />
          </Box>
          {showColorPicker && <ChromePicker color={selectedColor} onChange={color => handleColorChange(color)} />}
        </div>

        <Box sx={{ mb: 4 }}>
          <Card>
            <Typography variant='h5' sx={{ padding: '15px' }}>
              {t('Marker Icon')}
            </Typography>

            <Box sx={{ mb: 2, padding: '15px' }}>
              <CustomTextField fullWidth type='file' onChange={handleImageChange} />
            </Box>
            <Box sx={{ mb: 4, padding: '15px', display: 'flex', justifyContent: 'center' }}>
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
            </Box>
          </Card>
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

export default AddRouteDrawer
