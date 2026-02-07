"use client"

import LayoutWrapper from '@/components/hocs/LayoutWrapper'
import LinkSchool from '@/components/school/LinkSchool';
import { getSchools } from '@/store/slices/school.slice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const School = () => {
  const dispatch = useDispatch();
  
  const { auth } = useSelector(state => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (auth && auth.students?.length) {
      router.push("/dashboard")
    } else if (auth) {
      dispatch(getSchools())
    }
  }, [auth])

  return (
    <LayoutWrapper>
      <LinkSchool />
    </LayoutWrapper>
  )
}

export default School