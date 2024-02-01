// ** React Imports
import { useState, useCallback, useEffect } from 'react'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'
import BASE_URL from 'src/pages/constant/Constant'
import CircularProgress from '@mui/material/CircularProgress'
import toast from 'react-hot-toast'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
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
import AddUserDrawer from 'src/views/apps/groups/list/AddGroupDrawer'

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

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const RowOptions = ({ row }) => {
  // ** Hooks

  // ** State

  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const rowOptionsOpen = Boolean(anchorEl)
  const [deleteopen, setdeleteOpen] = useState(false)
  const handleClickdeleteOpen = () => setdeleteOpen(true)
  const handleClose = () => setdeleteOpen(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  // const handleDelete = () => {
  //   console.log('delete', row.id)
  //   handleRowOptionsClose()
  //   handleClickdeleteOpen()
  // }

  const toggleEditDrawer = () => {
    setAnchorEl(null)
    setEditOpen(!editOpen)
  }

  const handleDelete = async () => {
    console.log('delete', row.id)
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)
      setIsLoading(true)

      const response = await fetch(`${BASE_URL}users/${row.id}/admin.user.deleteuserasync`, {
        method: 'POST',
        headers: headers
      })

      const result = await response.json()

      console.log('delete ha ye data ', result)
      if (response?.ok) {
        toast.success('Data deleted successfully')
        handleClose()
        // datafetchuser()
      } else {
        toast.error(response?.messages)
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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
      <Dialog
        open={deleteopen}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <CustomCloseButton aria-label='close' onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: 'center' }}>
            Are you sure you want to delete this Group<br></br> <span style={{ fontWeight: 'bold' }}>{row?.name}</span>
          </Typography>
        </DialogContent>
        <DialogContent>
          <Box sx={{ marginTop: '-30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '100px', width: '100px' }}>
              <img
                src='/images/icons/project-icons/trashimage.png'
                alt='abc'
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant='contained' onClick={handleDelete}>
                Yes
              </Button>
              <Button variant='contained' onClick={handleClose}>
                No
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <AddUserDrawer open={editOpen} row={row} toggle={toggleEditDrawer} />
    </>
  )
}

const columns = [
  // {
  //   flex: 0.2,
  //   minWidth: 100,
  //   field: 'id',
  //   headerName: <Translations text={'ID'} />,
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         {row.id}
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.25,
    minWidth: 300,
    field: 'groupName',
    headerName: <Translations text={'Group Name'} />,
    renderCell: ({ row }) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
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
    flex: 0.2,
    minWidth: 100,
    field: 'id',
    headerName: <Translations text={'Description'} />,
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.description}
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

const GroupsList = () => {
  // ** State
  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [groupData, setGroupData] = useState([])
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { t } = useTranslation()

  useEffect(() => {
    console.log('useEffect triggered')
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('token')
      setIsLoading(true)

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      const response = await fetch(`${BASE_URL}v1/group/group.getallgroupasync`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setGroupData(result.data.data)
      console.log('data g roup ', result)
      console.log('data ha group', userdata)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const questions = [
    {
      id: 1,
      name: 'stage1'
    },
    { id: 2, name: 'stage2' },
    {
      id: 3,
      name: 'stage3'
    },
    { id: 4, name: 'stage4' },
    {
      id: 5,
      name: 'stage5'
    },
    { id: 6, name: 'stage6' }
  ]

  const cardData = [{ title: 'Groups', subtitle: 'Total Groups', stats: 12, trendDiff: 100, icon: 'tabler:user' }]

  const [filteredData, setFilteredData] = useState([])

  const handleFilter = val => {
    setValue(val)

    // Assuming `userdata` is an array of objects with a property `firstName`
    const filteredRows = groupData?.filter(row => row.name.toLowerCase().includes(val.toLowerCase()))

    setFilteredData(filteredRows)
  }

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
            btntitle={'Add New Group'}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={filteredData.length > 0 ? filteredData : questions}
            columns={columns}
            loading={isLoading} // Set loading prop
            loadingOverlayComponent={<CircularProgress />}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default GroupsList
