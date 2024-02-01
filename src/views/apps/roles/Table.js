// ** React Imports
import { useState, useCallback, useEffect } from 'react'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'
import BASE_URL from 'src/pages/constant/Constant'

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
import CircularProgress from '@mui/material/CircularProgress'

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
import AddUserDrawer from './AddRolesDrawer'
import DeleteDialog from './DeleteDialog'

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
        <MenuItem onClick={toggleEditDrawer} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          {t('Edit')}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          {t('Delete')}
        </MenuItem>
      </Menu>
      <AddUserDrawer open={editOpen} row={row} toggle={toggleEditDrawer} fetchData={fetchData} />
    </>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 300,
    field: 'groupName',
    headerName: <Translations text={'Roles Name'} />,
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
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
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
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: <Translations text={'Actions'} />,
    renderCell: ({ row }) => <RowOptions row={row} />
  }
]

const GroupsList = () => {
  // ** State
  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [roles, setRoles] = useState([])
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { t } = useTranslation()

  useEffect(() => {
    fetchData()
  }, [])

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
          <MenuItem onClick={toggleEditDrawer} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            {t('Edit')}
          </MenuItem>
          <DeleteDialog
            roleName={row.name}
            roleID={row.id}
            handleRowOptionsClose={handleRowOptionsClose}
            fetchData={fetchData}
          />
          {/* <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            {t('Delete')}
          </MenuItem> */}
        </Menu>
        <AddUserDrawer open={editOpen} row={row} toggle={toggleEditDrawer} fetchData={fetchData} />
      </>
    )
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 300,
      field: 'groupName',
      headerName: <Translations text={'Roles Name'} />,
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
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
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
      flex: 0.25,
      minWidth: 300,
      field: 'description',
      headerName: <Translations text={'Description'} />,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.description}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 90,
      field: 'active',
      headerName: <Translations text={'Active'} />,
      renderCell: ({ row }) => {
        return (
          <Typography
            noWrap
            sx={{
              color: false ? theme => theme.palette.success.main : theme => theme.palette.error.main,
              marginLeft: '15px'
            }}
          >
            <Icon icon={false ? 'tabler:shield-check' : 'tabler:shield-x'} fontSize={24} />
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

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('token')
      setIsLoading(true)

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      const response = await fetch(`${BASE_URL}roles`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setRoles(result.data)
      console.log('data ', result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const cardData = [{ title: 'Groups', subtitle: 'Total Groups', stats: 12, trendDiff: 100, icon: 'tabler:user' }]

  const [filteredData, setFilteredData] = useState([])

  const handleFilter = val => {
    setValue(val)

    // Assuming `userdata` is an array of objects with a property `firstName`
    const filteredRows = roles?.filter(row => row.name.toLowerCase().includes(val.toLowerCase()))

    setFilteredData(filteredRows)
  }
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={value}
            btntitle={'Add New Role'}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={filteredData.length > 0 ? filteredData : roles}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading} // Set loading prop
            loadingOverlayComponent={<CircularProgress />}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} fetchData={fetchData} />
    </Grid>
  )
}

export default GroupsList
