import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AddDrawer from 'src/views/apps/dashboard/list/AddDrawer'
import BASE_URL from 'src/pages/constant/Constant'

// import mui
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CustomTextField from 'src/@core/components/mui/text-field'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { InputLabel, Select, CircularProgress, FormControl } from '@mui/material'

// import components
import AccordionItem from 'src/views/apps/sites/AccordionItem'
import dynamic from 'next/dynamic'

const LeafletMapcomponents = dynamic(
  () => import('src/views/apps/sites/Map'),
  { ssr: false } // <-- Disable server-side rendering
)

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const SitesShow = () => {
  const [role, setRole] = useState('')
  const [site, setSite] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [route, setroute] = useState([])
  const [routeID, setrouteID] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const { t } = useTranslation()

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    fetchDataRoute()
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

  const fetchSiteAgainstRoute = async id => {
    try {
      const userToken = localStorage.getItem('token')
      setIsLoading(true)

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      const response = await fetch(`${BASE_URL}v1/sites/sites.getallsitesbyrouteasync?RouteId=${id}`, {
        method: 'POST',
        headers: headers
      })

      const result = await response.json()
      setSite(result.data.data)
      console.log('data sties group map ki against route ', result)

      // console.log('data ha grpoup', group)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDataRoute = async () => {
    try {
      const userToken = localStorage.getItem('token')
      setIsLoading(true)

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }
      console.log('authorization', `Bearer ${userToken}`)

      const response = await fetch(`${BASE_URL}v1/routes/route.getallrouteasync`, {
        method: 'GET',
        headers: headers
      })

      const result = await response.json()
      setroute(result.data.data)
      console.log('data group ', result)

      // console.log('data ha grpoup', group)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRouteChange = e => {
    setrouteID(e.target.value)
    fetchSiteAgainstRoute(e.target.value)
  }

  const [selectedCity, setSelectedCity] = useState({})
  const [addSiteOpen, setAddSiteOpen] = useState(false)
  const [value, setValue] = useState('')
  const [openAccordion, setOpenAccordion] = useState(null)
  const [flag, setflag] = useState(false)

  const toggleAddSiteDrawer = () => setAddSiteOpen(!addSiteOpen)

  const handleAccordionChange = panel => (_event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null)
    if (!isExpanded) {
      setflag(false)
    }
  }

  const handleFilter = val => {
    console.log('Site data:', site)

    setValue(val)

    const filteredRows = site?.filter(row => row.name.includes(val))

    console.log('Filtered data:', filteredRows)

    setFilteredData(filteredRows)
  }

  const handleCityNameClick = city => {
    setSelectedCity(city)
    console.log('city is here', selectedCity)
    setflag(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <CardContent sx={{ margin: 0 }}>
            <Grid item sm={12} xs={12}>
              {/* <Typography sx={{ fontSize: '14px' }}>{t('Select another route to view')}</Typography> */}

              <Grid container spacing={2} justifyContent='space-between'>
                {/* CustomTextField */}
                <Grid item sm={3} xs={12}>
                  {/* <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-autowidth-label'>Route</InputLabel>
                    <Select
                      labelId='demo-simple-select-autowidth-label'
                      id='demo-simple-select'
                      value={routeID}
                      onOpen={fetchDataRoute}
                      onChange={e => handleRouteChange(e)}
                      fullWidth
                    >
                      {route?.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <CustomTextField
                    select
                    fullWidth
                    sx={{ mb: 4 }}
                    defaultValue='Route'
                    value={routeID}
                    onOpen={fetchDataRoute}
                    onChange={e => handleRouteChange(e)}

                    // SelectProps={{ value: routeID, onChange: e => setrouteID(e.target.value) }}
                  >
                    <MenuItem value='Routes'>Route</MenuItem>
                    {route?.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                <Grid item sm={3} xs={12}>
                  {/* <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-autowidth-label'>Route</InputLabel>
                    <Select
                      labelId='demo-simple-select-autowidth-label'
                      id='demo-simple-select'
                      value={routeID}
                      onOpen={fetchDataRoute}
                      onChange={e => handleRouteChange(e)}
                      fullWidth
                    >
                      {route?.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <CustomTextField
                    select
                    fullWidth
                    sx={{ mb: 4 }}
                    // value={routeID}
                    defaultValue='Route'
                    // onOpen={fetchDataRoute}
                    // onChange={e => handleRouteChange(e)}
                    SelectProps={{ value: routeID, onChange: e => setrouteID(e.target.value) }}
                  >
                    <MenuItem value='Routes'>All</MenuItem>
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Inactive'>Inactive</MenuItem>

                    {/* {route?.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))} */}
                  </CustomTextField>
                </Grid>

                {/* Button */}
                <Grid item sm={3} xs={12}>
                  <CustomTextField
                    value={value}
                    sx={{ mr: 4 }}
                    fullWidth
                    placeholder='Search User'
                    onChange={e => handleFilter(e.target.value)}
                  />
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Box
                    sx={{
                      rowGap: 2,
                      columnGap: 4,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'end'
                    }}
                  >
                    <Button variant='contained' onClick={toggleAddSiteDrawer} sx={{ width: '100%' }}>
                      <Icon fontSize='1.125rem' icon='tabler:plus' />
                      Add new Site
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        {isLoading ? (
          <Card
            sx={{ height: { md: 'calc(80vh - 4.0625rem)', xs: 'calc(50vh - 4.0625rem)' } }}
            style={{ textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
          >
            <CircularProgress />
          </Card>
        ) : (
          // Display content when isLoading is false
          <>
            <Card sx={{ height: { md: 'calc(80vh - 4.0625rem)', xs: 'calc(50vh - 4.0625rem)' } }}>
              <ScrollWrapper hidden={false}>
                <CardContent sx={{ margin: 0 }}>
                  <Typography sx={{ fontSize: '16px' }}>
                    {t('Sites')}
                    <span style={{ fontSize: '11px', marginLeft: '5px' }}>(total {site?.length})</span>
                  </Typography>
                  {site?.map((bustStop, index) => (
                    <AccordionItem
                      key={bustStop.id}
                      index={index}
                      bustStop={bustStop}
                      fetchData={fetchData}
                      openAccordion={openAccordion}
                      handleAccordionChange={handleAccordionChange}
                      handleCityNameClick={handleCityNameClick}
                    />
                  ))}
                  {site?.length === 0 ? (
                    <>
                      <dv style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography
                          sx={{
                            fontSize: '16px',
                            textAlign: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          No site against Route
                        </Typography>
                      </dv>
                    </>
                  ) : (
                    ''
                  )}
                </CardContent>
              </ScrollWrapper>
            </Card>
          </>
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <LeafletMapcomponents cities={site} selectedCity={selectedCity} flag={flag} />
        </Card>
      </Grid>
      <AddDrawer open={addSiteOpen} toggle={toggleAddSiteDrawer} fetchData={fetchData} />
    </Grid>
  )
}

export default SitesShow
