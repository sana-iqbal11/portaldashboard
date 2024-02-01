// ** React Imports
import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'
import BASE_URL from 'src/pages/constant/Constant'
import toast from 'react-hot-toast'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

// ** Next Imports
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/commonTableHeader/TableHeader'
import AddUserDrawer from 'src/views/apps/user/userManagement/list/AddUserDrawer'
import ViewUserModel from 'src/views/apps/user/userManagement/list/ViewUserModel'
import RowOptions from 'src/views/apps/user/userManagement/list/RowOptions'
import PageHeader from 'src/@core/components/page-header'

const renderClient = row => {
  const name = `${row?.firstName} ${row?.lastName}`

  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(name)}
    </CustomAvatar>
  )
}

const UserManagementList = () => {
  // ** State
  const [role, setRole] = useState([])
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [viewUserOpen, setviewUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { t } = useTranslation()
  const [userdata, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleViewUser = () => {
    setviewUserOpen(!viewUserOpen)
  }

  useEffect(() => {
    console.log('useEffect triggered')
    fetchData()
  }, [])

  const columns = [
    // {
    //   flex: 0.1,
    //   minWidth: 80,
    //   field: 'viewdata',
    //   headerName: '',
    //   renderCell: ({ row }) => <ViewUserModel datafetchuser={fetchData} row={row} />
    // },
    {
      flex: 0.25,
      minWidth: 250,
      field: 'fullName',
      headerName: <Translations text={'User Name'} />,
      renderCell: ({ row }) => (
        // const name = ${row.firstName} ${row.lastName}

        // return (
        //   <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //     {renderClient(row)}
        //     <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        //       <Typography
        //         noWrap
        //         component={Link}
        //         href={{
        //           pathname: '/apps/userView/UserViewPage',
        //           query: { data: JSON.stringify(row) } // Pass the entire row object as a string
        //         }}
        //         sx={{
        //           fontWeight: 500,
        //           textDecoration: 'none',
        //           color: 'text.secondary',
        //           '&:hover': { color: 'primary.main' }
        //         }}
        //       >
        //         {name}
        //       </Typography>
        //     </Box>
        //   </Box>
        // )

        <ViewUserModel datafetchuser={fetchData} row={row} />
      )
    },
    {
      flex: 0.15,
      minWidth: 270,
      field: 'email',
      headerName: <Translations text={'Email'} />,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'verified',
      headerName: <Translations text={'Verified'} />,
      renderCell: ({ row }) => {
        return (
          <Typography
            noWrap
            sx={{
              color: row.emailConfirmed ? theme => theme.palette.success.main : theme => theme.palette.error.main,
              marginLeft: '15px'
            }}
          >
            <Icon icon={row.emailConfirmed ? 'tabler:shield-check' : 'tabler:shield-x'} fontSize={24} />
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'role',
      headerName: <Translations text={'Role'} />,
      renderCell: ({ row }) => {
        if (row.roles && row.roles.length > 0) {
          setRole(row.roles)
        } else {
          setRole('')
        }
        console.log('list ha ye', row?.roles[0]?.roleName)

        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.roles.map((role, index) => (
              <Tooltip key={index} title={row?.roles?.map(r => r.roleName).join(', ')}>
                <span style={{ display: 'inline' }}>
                  {role?.roleName}
                  {index < row.roles.length - 1 && ', '}
                </span>
              </Tooltip>
            ))}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: <Translations text={'Actions'} />,
      renderCell: ({ row }) => <RowOptions row={row} datafetchuser={fetchData} />
    }
  ]

  const cardData = [
    { id: 1, title: 'Users', subtitle: 'Total Users', stats: userdata?.length, trendDiff: 100, icon: 'tabler:user' },
    {
      id: 2,
      title: 'Verified Users',
      subtitle: 'Recent analytics',
      stats: 5,
      trendDiff: '+95',
      icon: 'tabler:user-check',
      avatarColor: 'success'
    },

    // {
    //   id: 3,
    //   title: 'Duplicate Users',
    //   subtitle: 'Recent analytics',
    //   stats: 0,
    //   trendDiff: 0,
    //   icon: 'tabler:users',
    //   avatarColor: 'warning'
    // },
    {
      id: 4,
      title: 'Verification Pending',
      subtitle: 'Recent analytics',
      stats: 0,
      trendDiff: '+6',
      icon: 'tabler:user-circle',
      avatarColor: 'error'
    }
  ]
  const [filteredData, setFilteredData] = useState([])

  const handleFilter = val => {
    setValue(val)

    // Assuming `userdata` is an array of objects with a property `firstName`
    const filteredRows = userdata?.filter(row => row.firstName.toLowerCase().includes(val.toLowerCase()))

    setFilteredData(filteredRows)
  }

  const handleRoleChange = e => {
    setRole(e.target.value)
  }

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('token')
      setIsLoading(true)

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      const response = await fetch(`${BASE_URL}users`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setUserData(result.data)
      console.log('data ', result)
      console.log('data ha user', userdata)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <PageHeader
        title={
          <Typography variant='h4' sx={{ mb: -6 }}>
            User Management
          </Typography>
        }
      />
      <Grid item xs={12}>
        {/* {cardData && (
          <Grid container spacing={6}>
            {cardData.map(item => (
              <Grid item xs={12} md={3} sm={6} key={item.id}>
                <CardStatsHorizontalWithDetails {...item} />
              </Grid>
            ))}
          </Grid>
        )} */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={value}
            btntitle={'Add New User'}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={filteredData.length > 0 ? filteredData : userdata}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            loading={isLoading} // Set loading prop
            loadingOverlayComponent={<CircularProgress />}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} datafetchuser={fetchData} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default UserManagementList
