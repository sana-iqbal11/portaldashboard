import mock from './mock'
import './auth/jwt'
import './pages/profile'
import './iconify-icons'
import './app-bar-search'
import './apps/permissions'
import './server-side-menu/vertical'
import './server-side-menu/horizontal'

mock.onAny().passThrough()
