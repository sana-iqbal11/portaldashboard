// ** React Imports
import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
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
import AddDrawer from 'src/views/apps/dashboard/list/AddDrawer'

const renderClient = row => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(row.name ? row.name : ' ')}
    </CustomAvatar>
  )
}

const operationStatusObj = {
  true: 'success',
  false: 'warning'
}

const RowOptions = ({ row }) => {
  // ** Hooks

  // ** State

  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    console.log('delete', row.id)
    handleRowOptionsClose()
  }

  const toggleEditDrawer = () => {
    setAnchorEl(null)
    setEditOpen(!editOpen)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick} sx={{ marginLeft: '15px' }}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/apps/user/view/account'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          {t('View')}
        </MenuItem>
        <MenuItem onClick={toggleEditDrawer} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          {t('Edit')}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          {t('Delete')}
        </MenuItem>
      </Menu>
      <AddDrawer open={editOpen} row={row} toggle={toggleEditDrawer} />
    </>
  )
}

const columns = [
  {
    flex: 0.15,
    minWidth: 130,
    field: 'id',

    headerName: <Translations text={'ID'} />,
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.id}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'internalid',
    headerName: <Translations text={'Internal ID'} />,
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.internalId}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 280,
    field: 'fullName',
    headerName: <Translations text={'Name'} />,
    renderCell: ({ row }) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary'
              }}
            >
              {name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 135,
    field: 'operational',
    headerName: <Translations text={'Operational'} />,
    renderCell: ({ row }) => {
      return (
        <Typography
          sx={{ color: row.operational ? theme => theme.palette.success.main : theme => theme.palette.error.main }}
        >
          <Icon icon={row.operational ? 'tabler:check' : 'tabler:x'} fontSize={24} />
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'route',
    headerName: <Translations text={'Route'} />,
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.route}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'group',
    headerName: <Translations text={'Group'} />,
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.group}
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
    renderCell: ({ row }) => <RowOptions row={row} />
  }
]

const DashboardList = () => {
  // ** State
  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { t } = useTranslation()

  const questions = [
    { id: 1, internalId: 68911, name: 'Sidra Test Site', operational: true, route: '8', group: 'stage 1' },
    { id: 2, internalId: 68910, name: 'Ibn Al Talaa 201-1', operational: true, route: '8', group: 'stage 1' },
    { id: 3, internalId: 68980, name: 'Al-Yarmuk 611', operational: false, route: '8', group: 'stage 1' },
    { id: 4, internalId: 68911, name: 'Madina Munwarah 319', operational: false, route: 'Route abc', group: 'stage 1' },
    {
      id: 5,
      internalId: 68911,
      name: 'Abdulrahman Bin Owf 202',
      operational: true,
      route: 'Route abc',
      group: 'stage 1'
    },
    { id: 6, internalId: 68911, name: 'Olaya 102', operational: true, route: 'Route abc', group: 'stage 1' },
    { id: 7, internalId: 68911, name: 'Saeed Bin Zaid 102', operational: true, route: '8', group: 'stage 1' },
    { id: 8, internalId: 68911, name: 'Turki Bin Madhi 201', operational: true, route: '8', group: 'stage 1' },
    { id: 9, internalId: 68911, name: 'Musa Bin Nusair 407', operational: true, route: '8', group: 'stage 1' },
    { id: 10, internalId: 68911, name: 'Al-Olaya 517', operational: true, route: '8', group: 'stage 1' }
  ]

  const cardData = [
    {
      title: 'Total Sites',

      // subtitle: 'Total Sites',
      stats: 1015,
      trendDiff: 100,
      icon: 'tabler:location'
    },
    {
      title: 'Operational Sites',

      // subtitle: 'Recent Analytics',
      stats: 1013,
      trendDiff: 99.8,
      icon: 'tabler:check',
      avatarColor: 'success'
    },
    {
      title: 'Non Operational',

      // subtitle: 'Recent Analytics',
      stats: 2,
      trendDiff: 0.2,
      icon: 'tabler:x',
      avatarColor: 'warning'
    },
    {
      title: 'Routes',

      // subtitle: 'Recent Analytics',
      stats: 5,
      trendDiff: 100,
      icon: 'tabler:arrow-fork',
      avatarColor: 'error'
    }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {cardData && (
          <Grid container spacing={6}>
            {cardData.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={t('Search Filters')} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='10'
                  SelectProps={{
                    value: role,
                    displayEmpty: true,
                    onChange: e => handleRoleChange(e)
                  }}
                >
                  <MenuItem value=''>10</MenuItem>
                  <MenuItem value='admin'>25</MenuItem>
                  <MenuItem value='author'>50</MenuItem>
                  <MenuItem value='editor'>100</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            value={value}
            btntitle={'Add New Site'}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={questions}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default DashboardList
