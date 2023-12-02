/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useState, useEffect } from 'react'
import _ from 'lodash'

const ThongKe = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody></CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ThongKe
