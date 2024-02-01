// ** React Imports
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import logo from '../../assest/images/kaptlogo.svg'
// ** Next Imports
import Link from 'next/link'

// ** MUI Components

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
// import login from '../../../public/images/pages/man_2.png'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAuth } from 'src/hooks/useAuth'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import BASE_URL from '../constant/Constant'
import login from '../../assest/images/man_2.png'
import Image from 'next/image'
// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 460
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 400
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
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: '123456',
  email: 'sufyankhurshid405@gmail.com'
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { email, password } = data
    handlelogin(email, password)
  }
  const router = useRouter()
  const { setUser } = useAuth()
  const handlelogin = async (email, password) => {
    try {
      const postData = {
        email: email,
        password: password
      }
      console.log('Email password', postData)

      const response = await fetch(`${BASE_URL}tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          tenant: 'root'
        },
        body: JSON.stringify(postData)
      })
      const responseData = await response.json()
      console.log(responseData)
      if (responseData?.success === true) {
        const isAdmin = responseData.data.roles.includes('admin')
        const obj = responseData?.data?.user
        console.log('obj', obj)
        const roles = responseData?.data?.roles[0]
        console.log('roles', roles)
        const mergedObj = Object.assign(obj, { role: roles.toLowerCase() })
        console.log('megre', mergedObj)
        localStorage.setItem('user', JSON.stringify(mergedObj))
        localStorage.setItem('roles', JSON.stringify(responseData.data.roles))
        localStorage.setItem('permissions', JSON.stringify(responseData.data.permissions))
        localStorage.setItem('token', responseData.data.token.token)
        localStorage.setItem('refreshToken', responseData.data.token.refreshToken)
        localStorage.setItem('refreshTokenExpiryTime', responseData.data.token.refreshTokenExpiryTime)
        setUser({ ...mergedObj })
        router.push('/dashboards/crm')

        // if (isAdmin) {
        //   const router = useRouter()
        //   router.push({
        //     pathname: '/register', // Replace with your actual page path
        //     query: { email: email, password: password }
        //   })
        // } else {
        //   toast.success('POST request successful!')
        // }
      } else {
        toast.error(responseData?.exception)
      }
    } catch (error) {
      console.error('Error during fetch:', error)

      toast.error(`Error: ${error.message}`)
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
          <Image src={login} style={{ height: '93vh', objectFit: 'contain', width: '50%' }} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [5, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
              <Image src={logo} width={180} />
            </Box>
            <Box sx={{ mb: 2, mt: -6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {t(`Welcome to ${themeConfig.templateName}! 👋🏻`)}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t('Please sign-in to your account and start the adventure')}
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label={t('Email')}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='admin@vuexy.com'
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label={t('Password')}
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword ? 'text' : 'password'}
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
                  )}
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label={t('Remember Me')}
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography component={LinkStyled} href='/forgot-password'>
                  {t('Forgot Password?')}
                </Typography>
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                {t('Login')}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>{t('New on our platform?')}</Typography>
                <Typography href='/register' component={LinkStyled}>
                  {t('Create an account')}
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
