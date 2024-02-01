// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
import BASE_URL from 'src/pages/constant/Constant'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

// const authConfig = {
//   storageTokenKeyName: 'accessToken', // Update with your token key name
//   meEndpoint: 'http://45.85.250.95:8044/api/tokens', // Update with your me endpoint
//   loginEndpoint: 'http://your-api-url/login', // Update with your login endpoint
//   onTokenExpiration: 'logout' // Update as needed
// }
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  // useEffect(() => {
  //   const initAuth = async () => {
  //     const storedToken = window.localStorage.getItem('token')
  //     if (storedToken) {
  //       console.log('token', storedToken)
  //       setLoading(true)
  //       await axios
  //         .get(authConfig.meEndpoint, {
  //           headers: {
  //             Authorization: storedToken
  //           }
  //         })
  //         .then(async response => {
  //           setLoading(false)
  //           setUser({ ...response.data.user.userData })
  //         })
  //         .catch(() => {
  //           localStorage.removeItem('user')
  //           localStorage.removeItem('refreshToken')
  //           localStorage.removeItem('token')
  //           setUser(null)
  //           setLoading(false)
  //           if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
  //             router.replace('/login')
  //           }
  //         })
  //     } else {
  //       setLoading(false)
  //     }
  //   }
  //   initAuth()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem('token')
      const userStored = JSON.parse(window.localStorage.getItem('user'))
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            // setUser({ ...response.data.user })
            setUser(userStored)
          })
          .catch(() => {
            localStorage.removeItem('user')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('token')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleLogin = async ({ params, errorCallback }) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        console.log('first', returnUrl)
        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('user', JSON.stringify(response.data.user)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        console.log('reditect', redirectURL)
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })

    // try {
    //   const postData = {
    //     email: email,
    //     password: password
    //   }
    //   console.log('Email password', postData)

    //   const response = await fetch(`${BASE_URL}tokens`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       accept: 'application/json',
    //       tenant: 'root'
    //     },
    //     body: JSON.stringify(postData)
    //   })
    //   const responseData = await response.json()
    //   console.log(responseData)
    //   if (responseData?.success === true) {
    //     localStorage.setItem('userData', JSON.stringify(responseData.data.user))
    //     localStorage.setItem('roles', JSON.stringify(responseData.data.roles))
    //     localStorage.setItem('permissions', JSON.stringify(responseData.data.permissions))
    //     localStorage.setItem('authConfig.storageTokenKeyName', responseData.data.token.token)
    //     localStorage.setItem('refreshToken', responseData.data.token.refreshToken)
    //     localStorage.setItem('refreshTokenExpiryTime', responseData.data.token.refreshTokenExpiryTime)
    //     const isAdmin = responseData.data.roles.includes('admin')
    //     // setUser({ ...responseData.data.user })
    //     const returnUrl = router.query.returnUrl
    //     console.log('first', returnUrl)
    //     // params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
    //     const redirectURL = returnUrl && returnUrl !== '/dashboards/analytics' ? returnUrl : '/dashboards/analytics'
    //     console.log('reditect', redirectURL)
    //     router.replace(redirectURL)

    //     // const returnUrl = router.query.returnUrl
    //     // console.log('first', returnUrl)
    //     // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //     // console.log('firstsss', redirectURL)
    //     // router.replace('/dashboards/analytics')
    //     // if (isAdmin) {
    //     //   const router = useRouter()
    //     //   router.push({
    //     //     pathname: '/register', // Replace with your actual page path
    //     //     query: { email: email, password: password }
    //     //   })
    //     // } else {
    //     //   toast.success('POST request successful!')
    //     // }
    //   } else {
    //     toast.error(responseData?.exception)
    //   }
    // } catch (error) {
    //   console.error('Error during fetch:', error)

    //   toast.error(`Error: ${error.message}`)
    // }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('firstname')
    window.localStorage.removeItem('lastname')
    window.localStorage.removeItem('roles')
    window.localStorage.removeItem('permissions')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('refreshToken')
    window.localStorage.removeItem('refreshTokenExpiryTime')
    window.localStorage.removeItem('token')
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
