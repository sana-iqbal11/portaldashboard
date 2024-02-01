// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components
import Teams from 'src/views/pages/user-profile/teams'
import Profile from 'src/views/pages/user-profile/profile'
import Projects from 'src/views/pages/user-profile/projects'
import Connections from 'src/views/pages/user-profile/connections'
import UserProfileHeader from 'src/views/pages/user-profile/UserProfileHeader'
import { Card, CardActions, CardContent, FormControl, Input, InputLabel, TextField } from '@mui/material'
import { Button } from '@mui/base'

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const UserProfile = ({ tab, data }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [isLoading, setIsLoading] = useState(true)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleChange = (event, value) => {
    setIsLoading(true)
    setActiveTab(value)
    router
      .push({
        pathname: `/pages/user-profile/${value.toLowerCase()}`
      })
      .then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')) || {})
  const [fullName, setFullName] = useState(`${userData?.firstName} ${userData?.lastName}`)
  const [fullEmail, setEmail] = useState(userData?.email)
  const [imageAvatar, setimageAvatar] = useState(userData?.imageUrl)
  // const [imageAvatar, setImageAvatar] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const handleImageAvatarChange = event => {
    const file = event.target.files[0]
    const newimageAvatar = event.target.value
    setimageAvatar(newimageAvatar)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setimageAvatar(reader.result)
      }
      reader.readAsDataURL(file)
      setUploadedPhoto(URL.createObjectURL(file))
      setShowDeleteButton(true)
    }
  }
  const handleDeletePhoto = () => {
    // Logic to delete the photo
    setUploadedPhoto(false)
  }
  const handleNameChange = event => {
    const newName = event.target.value
    setFullName(newName)
  }
  const handleEmailChange = event => {
    const newEmail = event.target.value
    setEmail(newEmail)
    console.log('............', newEmail)
  }
  const handleimageAvatarChange = event => {
    console.log('............', newEmail)
  }

  const handleSave = () => {
    // Update the userData with the new values
    const [firstName, lastName] = fullName.split(' ')
    const [email] = fullEmail.split(' ')
    const [imageUrl] = imageAvatar.split(' ')
    console.log('............', email)
    console.log('............', email)

    const updatedUserData = {
      ...userData,
      firstName,
      lastName,
      email,
      imageUrl // You can update other fields as needed
    }

    // Update localStorage with the new userData
    localStorage.setItem('user', JSON.stringify(updatedUserData))
    setUserData(updatedUserData)
  }

  const tabContentList = {
    profile: <Profile data={data} />,
    teams: <Teams data={data} />,
    projects: <Projects data={data} />,
    connections: <Connections data={data} />
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h4'>Profile Information</Typography>
          <Typography sx={{ fontSize: 16, mt: 4 }} color='text.secondary' gutterBottom>
            Update your account's profile information and email address.
          </Typography>
          <Grid container sx={{ mb: 4, mt: 5 }}>
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              {uploadedPhoto ? (
                <Avatar alt='Full Name' src={imageAvatar} sx={{ width: 80, height: 80 }} />
              ) : (
                <Avatar alt='Full Name' sx={{ width: 80, height: 80 }}>
                  {/* Placeholder or default avatar when no photo is uploaded */}
                </Avatar>
              )}
            </StyledBadge>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <input
                accept='image/*'
                style={{ display: 'none' }}
                id='upload-photo'
                type='file'
                onChange={handleImageAvatarChange}
              />

              <label
                htmlFor='upload-photo'
                style={{
                  backgroundColor: '#EAEBEC',
                  border: 'none',
                  padding: '10px 20px',
                  color: '#BFC0C3',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '16px'
                }}
              >
                <Button
                  variant='contained'
                  component='span'
                  sx={{ border: 0 }}
                  style={{
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '17px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Select A New Photo
                </Button>
              </label>
              {uploadedPhoto && (
                <Button
                  variant='contained'
                  component='span'
                  sx={{ border: 0 }}
                  style={{
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '17px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    cursor: 'pointer',
                    backgroundColor: '#D34C4D',
                    padding: '10px 20px',
                    color: 'white',
                    marginLeft: '10px'
                  }}
                  onClick={handleDeletePhoto}
                >
                  Delete Photo
                </Button>
              )}
            </Grid>
          </Grid>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='Name'
              // value={fullName}
              id='outlined-size-small'
              defaultValue={fullName}
              size='small'
              fullWidth
              onChange={handleNameChange}
            />
            <TextField
              label='Email'
              id='outlined-size-small'
              defaultValue={fullEmail}
              // value={userData?.email}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
              onChange={handleEmailChange}
            />
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            onClick={handleSave}
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
      <Card style={{ marginTop: '2rem' }}>
        <CardContent>
          <Typography variant='h4'>Update Password</Typography>
          <Typography sx={{ fontSize: 16, mt: 4 }} color='text.secondary' gutterBottom>
            Ensure your account is using a long, random password to stay secure.
          </Typography>
          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label='Current Password'
              id='outlined-size-small'
              defaultValue='Enter a password'
              size='small'
              fullWidth
            />
            <TextField
              label='New Password'
              id='outlined-size-small'
              defaultValue='Enter a New Password'
              size='small'
              fullWidth
              style={{ marginTop: '2rem' }}
            />
            <TextField
              label='Confirm Password'
              id='outlined-size-small'
              defaultValue='Confirm Password'
              size='small'
              fullWidth
              style={{ marginTop: '2rem' }}
            />
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            onClick={handleSave}
            style={{
              backgroundColor: '#24C6B7',
              border: 'none',
              padding: '10px 40px',
              color: 'white',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </>
    // <div className='container-xxl flex-grow-1 container-p-y border-0 rounded bg-white '>
    //   <div className='mb-4'>
    //     <div className='card'>
    //       <h5 className='card-header'>Profile Information</h5>
    //     </div>
    //   </div>
    // </div>
    // <Grid container spacing={6}>
    //   <Grid item xs={12}>
    //     {/* <UserProfileHeader /> */}
    //   </Grid>
    //   {/* {activeTab === undefined ? null : (
    //     <Grid item xs={12}>
    //       <TabContext value={activeTab}>
    //         <Grid container spacing={6}>
    //           <Grid item xs={12}>
    //             <TabList
    //               variant='scrollable'
    //               scrollButtons='auto'
    //               onChange={handleChange}
    //               aria-label='customized tabs example'
    //             >
    //               <Tab
    //                 value='profile'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
    //                     <Icon fontSize='1.125rem' icon='tabler:user-check' />
    //                     {!hideText && 'Profile'}
    //                   </Box>
    //                 }
    //               />
    //               <Tab
    //                 value='teams'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
    //                     <Icon fontSize='1.125rem' icon='tabler:users' />
    //                     {!hideText && 'Teams'}
    //                   </Box>
    //                 }
    //               />
    //               <Tab
    //                 value='projects'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
    //                     <Icon fontSize='1.125rem' icon='tabler:layout-grid' />
    //                     {!hideText && 'Projects'}
    //                   </Box>
    //                 }
    //               />
    //               <Tab
    //                 value='connections'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
    //                     <Icon fontSize='1.125rem' icon='tabler:link' />
    //                     {!hideText && 'Connections'}
    //                   </Box>
    //                 }
    //               />
    //             </TabList>
    //           </Grid>
    //           <Grid item xs={12}>
    //             {isLoading ? (
    //               <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    //                 <CircularProgress sx={{ mb: 4 }} />
    //                 <Typography>Loading...</Typography>
    //               </Box>
    //             ) : (
    //               <TabPanel sx={{ p: 0 }} value={activeTab}>
    //                 {tabContentList[activeTab]}
    //               </TabPanel>
    //             )}
    //           </Grid>
    //         </Grid>
    //       </TabContext>
    //     </Grid>
    //   )} */}
    // </Grid>
  )
}

export default UserProfile
