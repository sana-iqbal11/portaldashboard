// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab from '@mui/material/Tab'
import MuiTabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Imports
import AssignedSites from './AssignedSites'

import Inspection from './Inspection'
import UserNotification from './UserNotification'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

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
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const SiterightInfo = ({}) => {
  // ** State
  const [activeTab, setActiveTab] = useState('AssignedSites')
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const router = useRouter()

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab)
  }

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleTabChange} // Make sure to use the handleTabChange function
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab
          value='AssignedSites'
          label='Assigned Sites'
          icon={<Icon fontSize='1.125rem' icon='tabler:user-check' />}
        />
        <Tab value='Inspection' label='Inspection' icon={<Icon fontSize='1.125rem' icon='tabler:lock' />} />
        <Tab value='Notification' label='Notification' icon={<Icon fontSize='1.125rem' icon='tabler:bell' />} />
      </TabList>
      <Box sx={{ mt: 4 }}>
        <TabPanel value='AssignedSites'>
          <AssignedSites />
        </TabPanel>

        <TabPanel value='Inspection'>
          <Inspection />
        </TabPanel>

        <TabPanel value='Notification'>
          <UserNotification />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default SiterightInfo
