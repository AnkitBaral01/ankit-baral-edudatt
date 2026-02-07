'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { validateRequired, validateDate } from '@/lib/utils';
import LottiePlayer from '../LottiePlayer';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../DatePicker';
import AutoCompleteAhead from '../AutoCompleteAhead';
import { getClasses, linkChild } from '@/store/slices/school.slice';
import AlertModal from '../modal/AlertModal';
import { initialAlertData } from '@/config/utils';
import { useRouter } from 'next/navigation';
import { refresh } from '@/store/slices/auth.slice';
import { showSuccess } from '@/lib/toast';

const initialFormData = {
    school: '',
    firstName: '',
    lastName: '',
    class: '',
    dob: ''
};

const LinkChild = ({isAnother}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {auth} = useSelector(state => state.auth);
    const {schools, classes, submitting} = useSelector(state => state.school);

    const [alertData, setAlertData] = useState(initialAlertData)

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const handleChange = (e, nm, val) => {
        let name = nm;
        let value = val;
        if(e) {
            name = e.target.name;
            value = e.target.value;
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({ ...prev, dob: date }));
        setErrors(prev => ({ ...prev, dob: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validateRequired(formData.school)) {
            newErrors.school = 'School is required';
        }
        if (!validateRequired(formData.firstName)) {
            newErrors.firstName = 'First name is required';
        }
        if (!validateRequired(formData.lastName)) {
            newErrors.lastName = 'Last name is required';
        }
        if (!validateRequired(formData.class)) {
            newErrors.class = 'Class year is required';
        }
        if (!validateDate(formData.dob)) {
            newErrors.dob = 'Valid date of birth is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            const payloadData = {
                school: formData.school,
                first_name: formData.firstName,
                last_name: formData.lastName,
                date_of_birth: formData.dob,
                class: formData.class
            };

            console.log(payloadData);
            

            const {payload} = await dispatch(linkChild(payloadData))
            
            if(!payload?.data) {
                setAlertData({
                    visible: true,
                    type:'error',
                    title: 'Child not found',
                    message: "Please enter the correct first name, last name, class and DOB",
                    buttonText: 'Try Again',
                    onButtonClick: () => setAlertData(initialAlertData),
                    onClose: () => {
                        setAlertData(initialAlertData)
                    }
                })
            } else {
                dispatch(refresh());
                showSuccess("Child has been linked successfully")
                router.push('/dashboard/profile')
            }
        }
    };

    return (
        <div className={`flex justify-center min-h-screen ${isAnother ? "" : "py-16"}`}>
            <LottiePlayer
                animationData={require('@/assets/lottie/teaching.json')}
                className={`w-1/2 px-20 hidden lg:flex justify-center ${isAnother ? "lg:hidden" : ""}`}
            />
            <div className="w-full px-4 lg:px-0 max-w-md">
                <h2 className="text-xl font-semibold text-center mb-8">Welcome {auth?.user?.first_name}! Please link your child</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AutoCompleteAhead
                        options={schools}
                        label="School"
                        required={true}
                        placeholder='School Name'
                        error={errors.school}
                        handleOnSelect={(value) => {
                            handleChange(null, "school", value?._id)
                            dispatch(getClasses({ id: value?._id }))
                        }}
                    />

                    <Input
                        label="First Name"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        required
                    />

                    <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        required
                    />

                    <AutoCompleteAhead
                        options={classes}
                        label="Class"
                        placeholder='Class Year'
                        required={true}
                        error={errors.class}
                        handleOnSelect={(value) => handleChange(null, "class", value?._id)}
                    />

                    <DatePicker
                        label="Date of Birth (DOB)"
                        value={formData.dob}
                        onChange={handleDateChange}
                        error={errors.dob}
                        required
                    />

                    <Button
                        label={submitting ? "Searching..." : "Search"}
                        type="submit"
                        bgColor="bg-yellow"
                        textColor="text-white"
                        className="w-full mt-6"
                        disabled={submitting}
                    />
                </form>
            </div>
            <AlertModal
                {...alertData}
            />
        </div>
    );
};

export default LinkChild;