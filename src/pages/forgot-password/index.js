// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import BASE_URL from '../constant/Constant'
import forgetpass from '../../assest/images/46.png'
import logo from '../../assest/images/kaptlogo.svg'
import { useState } from 'react'

//** router import
import { useRouter } from 'next/router'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import Image from 'next/image'

// Styled Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
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
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const router = useRouter()
  const handleSendResetLink = async () => {
    if (!email.trim()) {
      // Display a toast or other UI error for an empty email
      toast.error('Email is required')

      // You can use a toast library or other UI components for better user feedback
      return
    }
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
        toast.success('POST request successful!')
        router.push(`/reset-password`)
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
          <Image src={forgetpass} style={{ height: '93vh', objectFit: 'contain', width: '35%' }} />
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
            <Box sx={{ mb: 6, mt: -6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                {t('Forgot Password? 🔒')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t("Enter your email and we'll send you instructions to reset your password")}
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <CustomTextField
                fullWidth
                autoFocus
                type='email'
                label={t('Email')}
                sx={{ display: 'flex', mb: 4 }}
                onChange={e => setEmail(e.target.value)}
              />
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }} onClick={handleSendResetLink}>
                {t('Send reset link')}
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <LinkStyled href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>{t('Back to login')}</span>
                </LinkStyled>
              </Typography>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
