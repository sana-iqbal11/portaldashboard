// ** React Imports
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BASE_URL from '../constant/Constant'
import { useRouter } from 'next/router'
import logo from '../../assest/images/kaptlogo.svg'
// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import toast from 'react-hot-toast'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import signup from '../../assest/images/man_13.png'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import Image from 'next/image'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 470
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  // ** States
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  // fuunctions

  const handleRegister = async () => {
    const apiUrl = `${BASE_URL}users/self-register`

    if (!username || !firstName || !lastName || !email || !contact || !password || !confirmPassword) {
      toast.error('All fields are required')

      return
    }

    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match')

      return
    }

    try {
      console.log(username, firstName, lastName, email, contact, password, confirmPassword)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          accept: ' application/json',
          tenant: 'root',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          userName: username,
          password: password,
          confirmPassword: confirmPassword,
          phoneNumber: contact
        })
      })
      const responseData = await response.json()
      if (responseData?.success === true) {
        toast.success('POST request successful!')
        router.push({
          pathname: '/login', // Replace with your actual page path
          query: { email: email, password: password }
        })
      } else {
        toast.error(responseData?.messages)
        console.log(responseData?.messages)
      }
    } catch (error) {
      console.error('Error during registration:', error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',

            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(5, 0, 5, 8)
          }}
        >
          <Image src={signup} style={{ height: '93vh', objectFit: 'contain', width: '50%' }} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          md={{
            // p: [4, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          sx={{
            p: [4, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box md={{ width: '100%', maxWidth: 400, mt: -20 }} sx={{ width: '100%', maxWidth: 400, mt: -10 }}>
            <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
              <Image src={logo} width={180} />
            </Box>
            <Box sx={{ mb: 3, mt: -6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {t('Adventure starts here 🚀')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('Make your app management easy and fun!')}</Typography>
            </Box>
            <form
              noValidate
              autoComplete='off'
              onSubmit={e => e.preventDefault()}
              style={{ height: '50vh', overflowY: 'scroll' }}
            >
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4, mt: 4 }}
                label={t('Username')}
                placeholder='johndoe'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label={t('FirstName')}
                placeholder='john'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label={t('LastName')}
                placeholder='doe'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <CustomTextField
                fullWidth
                label={t('Email')}
                sx={{ mb: 4 }}
                placeholder='user@email.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <CustomTextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label={t('Contact')}
                placeholder='Number'
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
              <CustomTextField
                fullWidth
                label={t('Password')}
                sx={{ mb: 4 }}
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <CustomTextField
                fullWidth
                label='Confirm Password'
                id='confirm-password'
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <FormControlLabel
                control={<Checkbox />}
                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize } }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary' }}>{t('I agree to')}</Typography>
                    <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                      {t('privacy policy & terms')}
                    </Typography>
                  </Box>
                }
              />
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 2 }} onClick={handleRegister}>
                {t('Sign up')}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>{t('Already have an account?')}</Typography>
                <Typography component={LinkStyled} href='/login'>
                  {t('Sign in instead')}
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
