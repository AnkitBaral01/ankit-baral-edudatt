'use client'

import Loader from '@/components/Loader';
import { showError, showSuccess } from '@/lib/toast';
import { verifyToken } from '@/store/slices/auth.slice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const query = usePathname()

  const splitToken = query?.split("/verify/");

  const token = splitToken?.length > 1 ? splitToken[1] : "";

  const verifyAccount = async () => {
    const { payload } = await dispatch(verifyToken(token))
    
    if(payload?.success) {
      showSuccess("Account verified successfully")
      router.push("/login");
    } else {
      showError("Failed to verify account")
      router.push("/");
    }
  }

  useEffect(() => {
    if (token) {
      verifyAccount()
    }
  }, [token])
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Loader />
    </div>
  )
}

export default VerifyAccount