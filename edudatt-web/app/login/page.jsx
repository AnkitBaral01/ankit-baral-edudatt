'use client';

import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/Input';
import LottiePlayer from '@/components/LottiePlayer';
import LayoutWrapper from '@/components/hocs/LayoutWrapper';
import Button from '@/components/Button';
import ForgotPasswordModal from '@/components/modal/ForgotPasswordModal';
import { validateEmail, validatePhoneNumber } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { login, refresh, signup } from '@/store/slices/auth.slice';
import AlertModal from '@/components/modal/AlertModal';
import { initialAlertData } from '@/config/utils';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
}

const Login = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.auth)

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [alertData, setAlertData] = useState(initialAlertData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!isLogin) {
            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
            }
        }

        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        if (!isLogin && formData.mobile && !validatePhoneNumber(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid mobile number with country code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            const payloadData = {
                email: formData.email,
                password: formData.password,
                first_name: formData.firstName,
                last_name: formData.lastName,
                mobile_number: formData.mobile,
                confirm_password: formData.confirmPassword
            }
            if (isLogin) {
                const { payload } = await dispatch(login({ email: formData.email, password: formData.password }))
                
                if(payload?.success) {
                    dispatch(refresh());
                }
            } else {
                const { payload } = await dispatch(signup(payloadData))
                
                if(payload?.success) {
                    setAlertData({
                        visible: true,
                        type:'success',
                        title: 'Registration Successful',
                        message: payload?.message,
                        buttonText: 'Go to Login',
                        onButtonClick: () => setIsLogin(true),
                        onClose: () => {
                            setAlertData(initialAlertData)
                            setFormData(initialState);
                        }
                    });
                }
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData(initialState);
        setErrors({});
    };

    const handleForgotPasswordClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <LayoutWrapper>
            <div className="flex justify-center">
                <LottiePlayer
                    animationData={require('@/assets/lottie/teaching.json')}
                    className="w-1/2 hidden lg:flex justify-center"
                />

                <div className="w-full lg:w-1/2 flex flex-col items-center p-2 pb-12 lg:p-8">
                    <div className="w-full max-w-md">
                        <div className="flex justify-center mb-6">
                            <Image
                                src="/logo-full-trans.png"
                                alt="EduDatt Logo"
                                width={250}
                                height={50}
                                className="rounded-lg"
                                priority
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <>
                                    <div className="grid grid-cols-2 gap-x-4">
                                        <Input
                                            label="First Name"
                                            name="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            error={errors.firstName}
                                            required
                                        />
                                        <Input
                                            label="Last Name"
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            error={errors.lastName}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="john@doe.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                            />
                            {
                                !isLogin && (
                                    <Input
                                        label="Mobile Number"
                                        name="mobile"
                                        type="tel"
                                        placeholder="Enter mobile number (optional)"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        error={errors.mobile}
                                    />
                                )
                            }
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                showToggle
                                error={errors.password}
                                required
                            />

                            {!isLogin && (
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    showToggle
                                    error={errors.confirmPassword}
                                    required
                                />
                            )}

                            <Button
                                label={isLogin ? (loading ? "Logging in..." : "Login") : (loading ? "Creating Account..." : "Create Account")}
                                type="submit"
                                bgColor="bg-yellow"
                                textColor="text-white"
                                className="w-full"
                                disabled={loading}
                            />

                            <div className="text-center text-sm text-gray-600 mt-4">
                                {isLogin ? (
                                    <>
                                        Don't have an account?{' '}
                                        <button
                                            type="button"
                                            className="text-primary font-medium hover:underline"
                                            onClick={toggleForm}
                                        >
                                            Sign up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            className="text-primary font-medium hover:underline"
                                            onClick={toggleForm}
                                        >
                                            Login
                                        </button>
                                    </>
                                )}
                            </div>

                            {isLogin && (
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                        onClick={handleForgotPasswordClick}
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <ForgotPasswordModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />

            <AlertModal
                {...alertData}
            />
        </LayoutWrapper>
    );
};

export default Login;
