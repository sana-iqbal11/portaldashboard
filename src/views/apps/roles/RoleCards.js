// ** React Imports
import { useEffect, useState } from 'react'
import BASE_URL from 'src/pages/constant/Constant'

// ** Next Import
import Link from 'next/link'
import toast from 'react-hot-toast'
import DeleteDailog from './DeleteDialog'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [userRoledata, setUserRoleData] = useState([])
  const [permisiondata, setpermisionData] = useState([])
  const [makepermisiondata, setMakepermisionData] = useState([])
  const [cardData, setcardData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [roleID, setroleID] = useState('')
  const [roleName, setRoleName] = useState('')
  const [roleDecription, setroleDecription] = useState('')

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setroleID('')
    setRoleName('')
    setroleDecription('')
    setDialogTitle('Add')
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
    console.log('checboxes', arr)
  }

  const handleClickOpen = () => {
    setpermisionData([])
    setOpen(true)
  }

  const handleClickOpenEdit = data => {
    setOpen(true)
    setDialogTitle(data ? 'Edit' : 'Add')

    fetchpermisionData(data.id)
    setroleID(data.id)
    setRoleName(data.name)
    setroleDecription(data.description)
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      permisiondata.forEach(row => {
        // const id = row.toLowerCase().split(' ').join('-')
        // setIsIndeterminateCheckbox(true)

        togglePermission(`${row}-read`)
        togglePermission(`${row}-write`)
        togglePermission(`${row}-create`)
      })
    }
    console.log('checkbox ha ye', selectedCheckbox)
  }

  const handleAddRole = async () => {
    if (DialogTitle === 'Edit') {
      try {
        const userToken = localStorage.getItem('token')

        const postData = {
          ...(dialogTitle === 'Edit' ? { roleId: roleID } : {}),
          permissions: selectedCheckbox
        }
        console.log('permission create data', postData)
        setIsLoading(true)

        const response = await fetch(`${BASE_URL}roles/${roleID}/permissions`, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })

        const responseData = await response.json()

        console.log(responseData)
        if (responseData?.success === true) {
          console.log('add', responseData)
          if (dialogTitle === 'Edit') {
            toast.success(responseData.data)
          }
          handleClose()
          setDialogTitle('Add')
        } else {
          toast.error(responseData?.exception)
        }
      } catch (error) {
        console.error('Error during edit:', error)

        toast.error(`Error: ${error.message}`)
      }
    } else {
      try {
        const userToken = localStorage.getItem('token')
        setIsLoading(true)

        const postData = {
          ...(dialogTitle === 'Edit' ? { id: roleID } : {}),
          name: roleName,
          description: roleDecription
        }
        console.log('role add data', postData)

        const response = await fetch(`${BASE_URL}roles`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })

        // if (!response.ok) {
        //   throw new Error('Network response was not ok')
        // }

        const responseData = await response.json()

        console.log(responseData)
        if (responseData?.success === true) {
          console.log('add', responseData)

          toast.success('POST request successful!')

          handleClose()
        } else {
          toast.error(responseData?.exception)
          setIsLoading(true)
        }
      } catch (error) {
        console.error('Error during fetch:', error)

        toast.error(`Error: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    }
    setroleID('')
    setRoleName('')
    setroleDecription('')
  }

  const fetchpermisionData = async id => {
    const userToken = localStorage.getItem('token')
    try {
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      const response = await fetch(`${BASE_URL}roles/${id}/permissions`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      const permissionsArray = result.data.permissions // Access 'permissions' directly
      setpermisionData(permissionsArray)
      console.log('data permision ', permissionsArray)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('false')
    }
  }

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('token')

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      const response = await fetch(`${BASE_URL}roles`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setUserRoleData(result)
      const transformedData = {}

      // Iterate over the data array
      result.data.forEach(item => {
        const { name, id, description } = item

        if (transformedData.hasOwnProperty(name)) {
          // Merge the current item with the existing object
          transformedData[name].totaluser += 1
          console.log('ye hn name ha ', transformedData[name].totaluser)
        } else {
          transformedData[name] = {
            totaluser: 1,
            id,
            description,
            name
          }
        }
      })

      // Convert the transformedData object into an array
      const newList = Object.values(transformedData)

      console.log('new list is here', newList)

      setcardData(newList)
      console.log('data ', result)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('false')
    }
  }
  console.log('data ha role', userRoledata)
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])
  console.log('per', permisiondata)

  const renderCards = () =>
    cardData.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        {/* <Card>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.totaluser} users`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography
                  href='/'
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                  onClick={e => {
                    e.preventDefault()
                    handleClickOpenEdit(item)
                  }}
                >
                  Edit {item.name}
                </Typography>
              </Box>
              <IconButton size='small' sx={{ color: 'text.disabled' }}>
                <Icon icon='tabler:copy' />
              </IconButton>
            </Box>
          </CardContent>
        </Card> */}
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      {/* <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <img height={122} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent sx={{ pl: 0, height: '100%' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add New Role
                  </Button>
                  <Typography sx={{ color: 'text.secondary' }}>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid> */}
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <DeleteDailog dailogtitle={dialogTitle} roleName={roleName} roleID={roleID} maindailogclose={handleClose} />

          <Typography color='text.secondary'>Set Role Permissions</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          {dialogTitle === 'Edit' ? (
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <CustomTextField
                  fullWidth
                  label='Role ID'
                  value={roleID}
                  onChange={e => setroleID(e.target.value)}
                  placeholder='Enter Role id'
                />
              </FormControl>
            </Box>
          ) : (
            ''
          )}
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <CustomTextField
                fullWidth
                label='Role Name'
                value={roleName}
                onChange={e => setRoleName(e.target.value)}
                placeholder='Enter Role Name'
              />
            </FormControl>
          </Box>
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <CustomTextField
                fullWidth
                label='Role decription'
                value={roleDecription}
                onChange={e => setroleDecription(e.target.value)}
                placeholder='Enter Role decription'
              />
            </FormControl>
          </Box>
          {permisiondata.length !== 0 ? (
            <>
              <Typography variant='h4'>Role Permissions</Typography>
              <TableContainer>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: '0 !important' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' },
                            color: theme => theme.palette.text.secondary,
                            fontSize: theme => theme.typography.h6.fontSize
                          }}
                        >
                          Administrator Access
                          <Tooltip placement='top' title='Allows a full access to the system'>
                            <Box sx={{ display: 'flex' }}>
                              <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                            </Box>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell colSpan={3}>
                        <FormControlLabel
                          label={selectedCheckbox.length !== 0 ? 'UnSelect ' : 'Select All'}
                          sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              onChange={handleSelectAllCheckbox}
                              indeterminate={isIndeterminateCheckbox}
                              checked={selectedCheckbox.length === rolesArr.length * 3}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permisiondata?.map((i, index) => {
                      // const id = i.toLowerCase().split(' ').join('-')

                      return (
                        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              fontSize: theme => theme.typography.h6.fontSize
                            }}
                          >
                            {i}
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              label='Read'
                              sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                              control={
                                <Checkbox
                                  size='small'
                                  id={`${i}-read`}
                                  onChange={() => togglePermission(`${i}-read`)}
                                  checked={selectedCheckbox.includes(`${i}-read`)}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              label='Write'
                              sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                              control={
                                <Checkbox
                                  size='small'
                                  id={`${i}-write`}
                                  onChange={() => togglePermission(`${i}-write`)}
                                  checked={selectedCheckbox.includes(`${i}-write`)}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              label='Create'
                              sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                              control={
                                <Checkbox
                                  size='small'
                                  id={`${i}-create`}
                                  onChange={() => togglePermission(`${i}-create`)}
                                  checked={selectedCheckbox.includes(`${i}-create`)}
                                />
                              }
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            {isLoading ? (
              <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
            ) : (
              <>
                <Button type='submit' variant='contained' onClick={handleAddRole}>
                  Submit
                </Button>
                <Button color='secondary' variant='tonal' onClick={handleClose}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
