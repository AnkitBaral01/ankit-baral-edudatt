'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../hocs/ModalWrapper';
import Input from '../Input';
import Button from '../Button';
import { changePassword } from '@/store/slices/auth.slice';
import { showSuccess } from '@/lib/toast';

const initialPasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
}

const ChangePasswordModal = ({ visible, onClose }) => {
    const { changePasswordLoading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialPasswordData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleClose = () => {
        onClose();
        setErrors({});
        setFormData(initialPasswordData);
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } 

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const payloadData = {
                old_password: formData.currentPassword,
                new_password: formData.newPassword,
                confirm_password: formData.confirmPassword,
            };

            const { payload } = await dispatch(changePassword(payloadData))

            if (payload?.success) {
                showSuccess("Password changed successfully")

                handleClose();
            }
        }
    };

    return (
        <ModalWrapper visible={visible} onClose={handleClose}>
            <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    placeholder="Enter your current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    error={errors.currentPassword}
                    showToggle={true}
                    required={true}
                />

                <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter a new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    error={errors.newPassword}
                    showToggle={true}
                    required={true}
                />

                <Input
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    showToggle={true}
                    required={true}
                />

                <Button
                    type='submit'
                    label={changePasswordLoading ? 'Changing Password...' : 'Change Password'}
                    disabled={changePasswordLoading}
                    className='w-full'
                />
            </form>
        </ModalWrapper>
    );
};

export default ChangePasswordModal;
