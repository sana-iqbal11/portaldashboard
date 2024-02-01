// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (auth.user === null && !window.localStorage.getItem('user')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (router.pathname === '/dashboards/crm') {
    return <>{children}</>
  } else if (router.pathname === '/apps/questionnaires') {
    return <>{children}</>
  } else if (router.pathname === '/apps/dashboard') {
    return <>{children}</>
  } else if (router.pathname === '/apps/routes') {
    return <>{children}</>
  } else if (router.pathname === '/apps/sites') {
    return <>{children}</>
  } else if (router.pathname === '/apps/inspectors') {
    return <>{children}</>
  } else if (router.pathname === '/apps/groups') {
    return <>{children}</>
  } else if (router.pathname === '/apps/userManagement') {
    return <>{children}</>
  } else if (router.pathname === '/apps/user/list') {
    return <>{children}</>
  } else if (router.pathname === '/apps/roles') {
    return <>{children}</>
  } else if (router.pathname === '/user-profile/profile') {
    return <>{children}</>
  } else if (router.pathname === '/apps/questionnaires/components/AddNewQuestionnaires') {
    return <>{children}</>
  } else if (router.pathname === '/pages/user-profile/profile') {
    return <>{children}</>
  } else if (router.pathname === '/apps/userView/UserViewPage') {
    return <>{children}</>
  } else if (router.pathname === '/apps/permissions') {
    return <>{children}</>
  } else if (router.pathname === '/apps/userView/UsersReports') {
    return <>{children}</>
  } else if (router.pathname === '/apps/userView/SitesReport') {
    return <>{children}</>
  }
  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
