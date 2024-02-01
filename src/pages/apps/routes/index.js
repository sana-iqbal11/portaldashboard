// ** React Imports
import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Next Imports
import Link from 'next/link'
import BASE_URL from 'src/pages/constant/Constant'

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
import TableHeader from 'src/views/apps//routes/list/TableHeader'
import AddRouteDrawer from 'src/views/apps/routes/list/AddRouteDrawer'
import AccordionItem from 'src/views/apps/routes/list/AccordionItem'
import dynamic from 'next/dynamic'

import { InputLabel, Select, CircularProgress, FormControl } from '@mui/material'

const LeafletMapcomponents = dynamic(
  () => import('src/views/apps/routes/list/Map'),
  { ssr: false } // <-- Disable server-side rendering
)

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const RoutesList = () => {
  // ** State
  const [routeID, setrouteID] = useState('')
  const [value, setValue] = useState('')
  const [route, setroute] = useState([])
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [site, setSite] = useState([])

  const { t } = useTranslation()

  const [selectedCity, setSelectedCity] = useState({})

  const [openAccordion, setOpenAccordion] = useState(null)
  const [flag, setflag] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    fetchDataSite()
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

  const fetchDataSite = async () => {
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
    }
  }

  const handleAccordionChange = panel => (_event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null)
    if (!isExpanded) {
      setflag(false)
    }
  }

  const handleSiteNameClick = item => {
    // fetchSiteAgainstRoute(item)

    setSite(item)
  }

  const cardData = [
    { title: 'Routes', subtitle: 'Total Routes', stats: route?.length, trendDiff: 100, icon: 'tabler:user' }
  ]

  const handleRouteChange = e => {
    setrouteID(e.target.value)
    fetchSiteAgainstRoute(e.target.value)
  }

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      {/* <Grid item xs={12}>
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
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title={t('Search Filters')} /> */}
          <CardContent>
            <Grid container spacing={6}>
              <Grid item md={4} sm={3} xs={12}>
                {/* <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-autowidth-label'>Route</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select'
                    value={routeID}
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
              </Grid>
              <Grid item md={8} sm={9} xs={12}>
                <TableHeader value={value} btntitle={'Add New Route'} toggle={toggleAddUserDrawer} />
              </Grid>
            </Grid>
          </CardContent>

          <Grid
            container
            spacing={6}
            sx={{
              py: 2,
              px: 4
            }}
          >
            <Grid item xs={12} md={4}>
              {isLoading ? (
                <Card
                  sx={{ height: { md: 'calc(80vh - 4.0625rem)', xs: 'calc(50vh - 4.0625rem)' } }}
                  style={{ textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
                >
                  <CircularProgress />
                </Card>
              ) : (
                <>
                  <Card
                    sx={{ height: { md: 'calc(80vh - 4.0625rem)', xs: 'calc(50vh - 4.0625rem)', marginRight: '10px' } }}
                  >
                    <ScrollWrapper hidden={false}>
                      <CardContent sx={{ margin: 0 }}>
                        <Typography sx={{ fontSize: '16px' }}>
                          {t('Route')}
                          <span style={{ fontSize: '11px', marginLeft: '5px' }}>(total {route?.length})</span>
                        </Typography>
                        {route?.map((bustStop, index) => (
                          <AccordionItem
                            fetchdataroute={fetchData}
                            key={index}
                            index={index}
                            totalSites={site?.length}
                            bustStop={bustStop}
                            openAccordion={openAccordion}
                            handleAccordionChange={handleAccordionChange}
                            handleSiteNameClick={handleSiteNameClick}
                          />
                        ))}
                      </CardContent>
                    </ScrollWrapper>
                  </Card>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              <Card>
                <LeafletMapcomponents cities={site} selectedCity={selectedCity} flag={flag} />
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <AddRouteDrawer open={addUserOpen} toggle={toggleAddUserDrawer} fetchdataroute={fetchData} />
    </Grid>
  )
}

export default RoutesList
