// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'

// ** Demo Components Imports
import SiteLeftInfo from './SiteLeftInfo'
import SiterightInfo from './SiterightInfo'

const SitesReportDetials = () => {
  const router = useRouter()
  const { data } = router.query
  console.log('data', data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <SiteLeftInfo userData={data} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <SiterightInfo />
      </Grid>
    </Grid>
  )
}

export default SitesReportDetials
