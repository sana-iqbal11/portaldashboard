import React, { createRef, useEffect, useState } from 'react'
import { Button, Grid, Box } from '@mui/material'
import ReactJson from 'react-json-view'
import $ from 'jquery'
import 'jquery-ui-sortable'
import 'formBuilder'
import { useTranslation } from 'react-i18next'

import CustomTextField from 'src/@core/components/mui/text-field'

const FormBuilder = ({ form, setForm }) => {
  const fb = createRef()
  const [formData, setFormData] = useState(null)
  const [formBuilder, setFormBuilder] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    // To create form
    if (!formBuilder || !formBuilder.formData) {
      setFormBuilder(
        $(fb.current).formBuilder({
          disabledActionButtons: ['data', 'clear', 'save'],
          formData: []
        })
      )
    }
  }, [])

  async function saveData() {
    setFormData(formBuilder.formData)
    console.log('data ha form', Json.stringfy(formData.formData))
  }

  function clearData() {
    formBuilder.actions.clearFields()
    setFormData({})
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={9} xs={12}>
          <Grid item sm={11} xs={12}>
            <CustomTextField fullWidth sx={{ mb: 4 }} placeholder='John Doe' />
          </Grid>
          {/* <Grid item sm={1} xs={12}></Grid> */}
        </Grid>
        <Grid item sm={3} xs={12}>
          <Button variant='contained' sx={{ ml: 2 }} onClick={saveData}>
            {t('Save')}
          </Button>
          <Button variant='contained' sx={{ ml: 2 }} onClick={clearData}>
            {t('Clear')}
          </Button>
        </Grid>
      </Grid>
      <Grid item sm={12} xs={12}>
        <div
          style={{
            marginLeft: '5px',
            marginRight: '5px',
            marginTop: '30px',
            overflow: 'auto',
            height: '500px'
          }}
        >
          <div id='fb-editor' ref={fb} style={{ height: '500px' }} />
        </div>
      </Grid>
    </>
  )
}

export default FormBuilder
