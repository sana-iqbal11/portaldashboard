import React, { useState, useEffect, useCallback } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
const AssignedSites = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [role, setRole] = useState('')

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const data = [
    { id: 1, name: 'TFM Inspection Form', route: 'Dammam' },
    { id: 2, name: 'ITS AVM Inspection Form', route: 'Abqaiq' },
    { id: 3, name: 'ITS AVM Inspection Form', route: 'Al-Hofuf' },
    { id: 4, name: 'ITS AFC Inspection Form', route: 'Riyadh' },
    { id: 5, name: 'ITS AFC Inspection (Test)', route: 'Riyadh' },
    { id: 6, name: 'Depot Runout Inspection', route: 'Al-Jawf' },
    { id: 7, name: 'BUS Inspection Form', route: 'Jeddah' }
  ]

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{row.id}</Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.3,
      minWidth: 180,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
    },

    {
      flex: 0.1,
      minWidth: 100,
      field: 'route',
      headerName: 'Route',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{`${row.route}`}</Typography>
    }
  ]

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <Grid sx={{ display: 'flex' }}>
                <Grid sm={3} xs={3}>
                  <Typography sx={{ color: 'text.secondary', marginTop: '8px' }}>Show</Typography>
                </Grid>
                <Grid sm={3} xs={4}>
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
                <Grid sm={5} xs={5}>
                  <Typography sx={{ color: 'text.secondary', marginLeft: '5px', marginTop: '8px' }}>entries</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary', marginTop: '8px' }}>Search:</Typography>
                <CustomTextField placeholder='Search Project' />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <DataGrid
          autoHeight
          rows={data}
          rowHeight={60}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
    </div>
  )
}

export default AssignedSites
