import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Input,
  TextField,
  Typography
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React, { useState } from 'react'
import { SliderPicker } from 'react-color'
function index() {
  const [mobile, setmobile] = React.useState('')

  const handleChange = event => {
    setmobile(event.target.value)
  }
  const [selectedFile, setSelectedFile] = useState(null)

  // Set a default image URL
  const defaultImageUrl = 'https://example.com/default-avatar.png'
  const defaultImageUrlLogo = 'default-icon-image-url'

  // Set the default image when the component loads
  useState(() => {
    setSelectedFile(new File([], ''))
  }, [])

  const handleFileChange = event => {
    const file = event.target.files[0]

    if (file) {
      setSelectedFile(file)
    }
  }
  const [selectedLogo, setSelectedLogo] = useState(null)

  const handleLogoChange = event => {
    const file = event.target.files[0]
    setSelectedLogo(file)
  }

  const handleUploadLogo = () => {
    // Implement your logic for icon upload
    console.log('Icon uploaded:', selectedLogo)
  }
  const [selectedColor, setSelectedColor] = useState('#4e83d9') // Initial color

  const handleColorChange = color => {
    setSelectedColor(color.hex)
  }
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState('#8ebbe8') // Initial color

  const handleColorSecondaryChange = colors => {
    setSelectedSecondaryColor(colors.hex)
  }
  const handleUpload = () => {
    console.log('File to upload:', selectedFile)
  }
  return (
    <div>
      {' '}
      <Card>
        <CardContent>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='Name'
              id='outlined-size-small'
              //   defaultValue={fullName}
              size='small'
              fullWidth
              //   onChange={handleNameChange}
            />
            <TextField
              label='Phone'
              id='outlined-size-small'
              //   defaultValue={fullEmail}
              // value={userData?.email}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
              //   onChange={handleEmailChange}
            />
            <TextField
              label='Email'
              id='outlined-size-small'
              typeof='email'
              //   defaultValue={fullEmail}
              // value={userData?.email}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
              //   onChange={handleEmailChange}
            />
          </FormControl>
          <Grid container xs={6} md={8}>
            <Grid item>
              <Typography variant='h5' style={{ marginTop: '12px' }} gutterBottom>
                Logo
              </Typography>
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
                  alt='Uploaded Logo'
                  src={selectedFile ? URL.createObjectURL(selectedFile) : defaultImageUrl}
                  sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
                />
                <Typography variant='body1'>{selectedFile ? selectedFile.name : 'Default Avatar'}</Typography>
              </div>

              <label htmlFor='logo-upload' style={{ display: 'flex', alignItems: 'center' }}>
                <Input type='file' id='logo-upload' style={{ display: 'none' }} onChange={handleFileChange} />
                <Button variant='contained' color='primary' component='span' onClick={handleUpload}>
                  Choose Logo
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid container xs={6} md={8}>
            <Grid item>
              <Typography variant='h5' style={{ marginTop: '12px' }} gutterBottom>
                Marker Icon{' '}
              </Typography>
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
                  alt='marker Icon'
                  src={selectedLogo ? URL.createObjectURL(selectedLogo) : defaultImageUrlLogo}
                  sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
                />
                <Typography variant='body1'>{selectedLogo ? selectedLogo.name : ''}</Typography>
              </div>

              <label htmlFor='icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
                <Input type='file' id='icon-upload' style={{ display: 'none' }} onChange={handleLogoChange} />
                <Button variant='contained' color='primary' component='span' onClick={handleUploadLogo}>
                  Choose Icon
                </Button>
              </label>
            </Grid>
          </Grid>
          <div style={{ marginTop: '50px' }}>
            <div>
              <label htmlFor='colorPicker' style={{ fontSize: '18px', marginBottom: '10px', display: 'block' }}>
                Select Primary Color:
              </label>
              <SliderPicker
                color={selectedColor}
                onChange={handleColorChange}
                styles={{ default: { wrap: { marginBottom: '20px' } } }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: selectedColor,
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginRight: '10px'
                }}
              ></div>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedColor}</span>
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <div>
              <label htmlFor='colorPicker' style={{ fontSize: '18px', marginBottom: '10px', display: 'block' }}>
                Select Secondary Color:
              </label>
              <SliderPicker
                color={selectedSecondaryColor}
                onChange={handleColorSecondaryChange}
                styles={{ default: { wrap: { marginBottom: '20px' } } }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: selectedSecondaryColor,
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginRight: '10px'
                }}
              ></div>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedSecondaryColor}</span>
            </div>
          </div>

          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='timeZone'
              id='outlined-size-small'
              defaultValue={'asia/Riyadh'}
              size='small'
              fullWidth
              //   onChange={handleNameChange}
            />
            <TextField
              label='checkinVicinity'
              type='number'
              id='outlined-size-small'
              defaultValue={'50'}
              // value={userData?.email}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
              //   onChange={handleEmailChange}
            />
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            // onClick={handleSave}
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
      <Card style={{ marginTop: '10px' }}>
        <CardContent>
          <Typography variant='h4' style={{ marginBottom: '20px' }}>
            Version Updates
          </Typography>
          <FormControl fullWidth style={{ padding: '0px 0px' }}>
            <InputLabel id='demo-simple-select-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={mobile}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value={10}>Android</MenuItem>
              <MenuItem value={20}>IOS</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='Build Number'
              id='outlined-size-small'
              //   defaultValue={fullEmail}
              // value={userData?.email}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '0rem' }}
              //   onChange={handleEmailChange}
            />
          </FormControl>
        </CardContent>

        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            // onClick={handleSave}
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default index
