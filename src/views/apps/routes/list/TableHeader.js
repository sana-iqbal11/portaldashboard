// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { handleFilter, btntitle, toggle, value } = props
  const { t } = useTranslation()

  return (
    <Grid item sm={12}>
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
        <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Grid item sm={12}>
            <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
              <Icon fontSize='1.125rem' icon='tabler:plus' />
              {`${t(btntitle)}`}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}

export default TableHeader
