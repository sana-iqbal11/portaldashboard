// ** React Imports
import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'
import BASE_URL from 'src/pages/constant/Constant'

// ** Next Imports
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress'
import AddDrawer from 'src/views/apps/dashboard/list/AddDrawer'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import RowOptions from 'src/views/apps/user/userManagement/list/RowOptions'
import { IconButton, Menu, MenuItem } from '@mui/material'

const renderClient = row => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(row?.name)}
    </CustomAvatar>
  )
}

const SitesReport = () => {
  // ** State
  const [editOpen, setEditOpen] = useState(false)
  const [value, setValue] = useState([])

  const [addUserOpen, setAddUserOpen] = useState(false)

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { t } = useTranslation()
  const [site, setSite] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const toggleEditDrawer = () => {
    setEditOpen(!editOpen)
  }
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
      </>
    )
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 250,
      field: 'fullName',
      headerName: <Translations text={'Sites'} />,
      renderCell: ({ row }) => {
        // const name = ro

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                href={{
                  pathname: '/apps/userView/SitesReportDetials',
                  query: { data: JSON.stringify(row) } // Pass the entire row object as a string
                }}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'lat',
      headerName: <Translations text={'Routes'} />,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.lat}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'lon',
      headerName: <Translations text={'Inspection'} />,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.lon}
          </Typography>
        )
      }
    },

    {
      flex: 0.15,
      minWidth: 140,
      field: 'maxCheckinVicinity}',
      headerName: <Translations text={'maxCheckinVicinity}'} />,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.maxCheckinVicinity}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: <Translations text={'Actions'} />,
      renderCell: ({ row }) => <RowOptions row={row} />
    }
  ]

  const [filteredData, setFilteredData] = useState([])

  const handleFilter = val => {
    setValue(val)

    const filteredRows = userdata?.filter(row => row.firstName.toLowerCase().includes(val.toLowerCase()))

    setFilteredData(filteredRows)
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

      const response = await fetch(`${BASE_URL}v1/sites/sites.getallsitesasync`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setSite(result.data.data)
      console.log('data sties group ', result)

      // console.log('data ha grpoup', group)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              py: 4,
              px: 6,
              rowGap: 2,
              columnGap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:upload' />}>
              {t('Export')}
            </Button>
            <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <CustomTextField
                value={value}
                sx={{ mr: 4 }}
                placeholder={t('Search...')}
                onChange={e => handleFilter(e.target.value)}
              />
            </Box>
          </Box>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={site}
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
      <AddDrawer open={editOpen} toggle={toggleEditDrawer} />
    </Grid>
  )
}

export default SitesReport
