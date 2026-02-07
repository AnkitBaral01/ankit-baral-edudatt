"use client";

import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import { validateEmail } from '@/lib/utils';
import ModalWrapper from '../hocs/ModalWrapper';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '@/store/slices/auth.slice';
import { showSuccess } from '@/lib/toast';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const { forgotPasswordLoading } = useSelector(state => state.auth)

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        const { payload } = await dispatch(forgotPassword({ email: email }))

        if(payload.success) {
            showSuccess("Link to reset password has been sent successfully");
            handleClose()
        }
    };

    const handleClose = () => {
        setEmail("");
        setError("")
        onClose();
    }

    return (
        <ModalWrapper onClose={handleClose} visible={isOpen}>
            <h2 className="text-center font-semibold mb-6 text-xl">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input
                        label="Email Address"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                        error={error}
                        required
                    />
                </div>
                <Button
                    label={forgotPasswordLoading ? "Submitting..." : "Submit"}
                    type="submit"
                    bgColor="bg-yellow-500"
                    textColor="text-white"
                    disabled={forgotPasswordLoading}
                    className="w-full"
                />
            </form>
        </ModalWrapper>
    );
};

export default ForgotPasswordModal;
