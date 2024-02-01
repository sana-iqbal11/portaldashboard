// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const defaultValues = {
  email: '',
  password: '',
  jobtitle: '',

  fullName: ''
}

const SidebarAddEmployee = props => {
  // ** Props
  const { open, toggle, row } = props

  const [group, setgroup] = useState('')
  const [date, setDate] = useState(new Date())
  const { t } = useTranslation()

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit = data => {
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }
  React.useEffect(() => {
    if (row) {
      reset({
        email: row.email,
        password: row.password,
        jobtitle: row.jobtitle,
        fullName: row.name
      })
      setgroup(row.group)
      setDate(row.date)
    } else {
      reset(defaultValues)
    }
  }, [row, reset])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{row ? t('Update Employee') : t('Add Employee')}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='fullName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Full Name')}
                onChange={onChange}
                placeholder='John Doe'
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='email'
                label={t('Email')}
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                placeholder='johndoe@email.com'
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Password')}
                onChange={onChange}
                placeholder='123'
              />
            )}
          />
          <Controller
            name='jobtitle'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Job Title')}
                onChange={onChange}
                placeholder='Site Inspector'
              />
            )}
          />
          <DatePickerWrapper>
            <DatePicker
              todayButton='Ok'
              selected={date}
              id='basic-input'
              onChange={date => setDate(date)}
              placeholderText='mm/dd/yyyy'
              customInput={
                <CustomTextField
                  fullWidth
                  sx={{ mb: 4 }}
                  label={t('Hiring Date')}
                  InputProps={{
                    endAdornment: <Icon icon={'tabler:calendar'} fontSize={24} />
                  }}
                />
              }
            />
          </DatePickerWrapper>
          <CustomTextField
            select
            fullWidth
            value={group}
            sx={{ mb: 4 }}
            label={t('Group')}
            onChange={e => setRole(e.target.value)}
            SelectProps={{ value: group, onChange: e => setgroup(e.target.value) }}
          >
            <MenuItem value='Stage1'>Stage 1</MenuItem>
            <MenuItem value='Stage2'>Stage 2</MenuItem>
            <MenuItem value='Stage3'>Stage 3</MenuItem>
            <MenuItem value='Stage4'>Stage 4</MenuItem>
            <MenuItem value='Stage5'>Stage 5</MenuItem>
          </CustomTextField>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {row ? t('Update') : t('Submit')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddEmployee
