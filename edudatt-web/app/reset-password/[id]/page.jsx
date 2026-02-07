"use client"

import Button from '@/components/Button';
import LayoutWrapper from '@/components/hocs/LayoutWrapper';
import Input from '@/components/Input';
import { showError, showSuccess } from '@/lib/toast';
import { resetPassword } from '@/store/slices/auth.slice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const initialPasswordData = {
  newPassword: '',
  confirmPassword: ''
}

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const query = usePathname();
  const { resetPasswordLoading } = useSelector(state => state.auth);

  const splitToken = query?.split("/reset-password/");
  const token = splitToken?.length > 1 ? splitToken[1] : "";

  const submitForm = async (e) => {
    e.preventDefault();

    const payloadData = {
      verification_token: token,
      new_password: formData.newPassword,
      confirm_password: formData.confirmPassword
    }

    if(formData.newPassword !== formData.confirmPassword) {
      return showError("New password and confirm password should be same");
    }

    const { payload } = await dispatch(resetPassword(payloadData))
    
    if (payload?.success) {
      showSuccess("Password reset successfully")
      router.push("/login");
    } else {
      showError("Failed to reset password")
      router.push("/");
    }
  }

  const [formData, setFormData] = useState(initialPasswordData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <LayoutWrapper>
      <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={submitForm} className="space-y-4 w-full max-w-md px-3 lg:p-6 rounded-lg">
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          placeholder="Enter a new password"
          value={formData.newPassword}
          onChange={handleChange}
          showToggle={true}
          error={errors.newPassword}
          required={true}
        />

        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          showToggle={true}
          error={errors.confirmPassword}
          required={true}
        />

        <Button
          type="submit"
          label={resetPasswordLoading ? 'Changing Password...' : 'Change Password'}
          disabled={resetPasswordLoading}
          className="w-full"
        />
      </form>
    </div>
    </LayoutWrapper>
  )
}

export default ResetPassword;
