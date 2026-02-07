"use client"

import DashboardWrapper from '@/components/hocs/DashboardWrapper';
import LayoutWrapper from '@/components/hocs/LayoutWrapper'
import LinkSchool from '@/components/school/LinkSchool';
import { getSchools } from '@/store/slices/school.slice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const LinkChild = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSchools())
  }, [])
  return (
    <LayoutWrapper>
      <DashboardWrapper>
        <LinkSchool isAnother={true} />
      </DashboardWrapper>
    </LayoutWrapper>
  )
}

export default LinkChild