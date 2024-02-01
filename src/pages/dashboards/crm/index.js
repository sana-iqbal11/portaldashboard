// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CrmSessions from 'src/views/dashboards/crm/CrmSessions'
import CrmRevenueGrowth from 'src/views/dashboards/crm/CrmRevenueGrowth'
import CrmBrowserStates from 'src/views/dashboards/crm/CrmBrowserStates'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'
import CrmActiveProjects from 'src/views/dashboards/crm/CrmActiveProjects'
import CrmLastTransaction from 'src/views/dashboards/crm/CrmLastTransaction'
import CrmActivityTimeline from 'src/views/dashboards/crm/CrmActivityTimeline'
import CrmSalesWithAreaChart from 'src/views/dashboards/crm/CrmSalesWithAreaChart'
import CrmSalesWithRadarChart from 'src/views/dashboards/crm/CrmSalesWithRadarChart'
import CrmEarningReportsWithTabs from 'src/views/dashboards/crm/CrmEarningReportsWithTabs'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import AnalyticsWebsiteAnalyticsSlider from 'src/views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import CrmSitesSession from 'src/views/dashboards/crm/CrmSitesSession'

const CrmDashboard = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <AnalyticsWebsiteAnalyticsSlider />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CrmSalesWithAreaChart />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CrmSessions />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CrmSitesSession />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CrmEarningReportsWithTabs />
          </Grid>
          <Grid item xs={12} md={6}>
            <CrmActivityTimeline />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CrmSalesWithRadarChart />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default CrmDashboard
