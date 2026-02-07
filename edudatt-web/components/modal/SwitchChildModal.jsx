"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalWrapper from '../hocs/ModalWrapper';
import Image from 'next/image';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { setCurrentChild } from '@/store/slices/auth.slice';
import { FaPlus } from 'react-icons/fa';

const SwitchChildModal = ({ onClose, isOpen }) => {
    const router = useRouter();

    const { auth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const students = auth?.students || [];

    const handleStudentSelect = (student) => {
        localStorage.setItem('CURRENT_CHILD', student?._id);
        dispatch(setCurrentChild(student))
        onClose();
    };

    const onNewChild = () => {
        onClose();
        router.push('/dashboard/school/link-child');
    };

    const renderStudentIcon = (gender) => {
        if (gender.toLowerCase() === 'male') {
            return "/others/boy.png";
        } if (gender.toLowerCase() === 'female') {
            return "/others/girl.png";
        }
    };

    return (
        <ModalWrapper onClose={onClose} visible={isOpen}>
            <div className='flex flex-col'>
                <h1 className='text-lg font-semibold text-center'>Select to Switch Student</h1>
                <div className="flex overflow-x-auto gap-4 pb-2 pt-6 justify-center">
                    {students.map((student) => (
                        <div
                            key={student._id}
                            className="flex flex-col items-center justify-center space-x-2 space-y-2 cursor-pointer"
                            onClick={() => handleStudentSelect(student)}
                        >
                            <Image
                                src={renderStudentIcon(student.gender)}
                                alt={student.first_name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <span className="text-sm font-semibold text-center">{student.first_name} {student.last_name}</span>
                        </div>
                    ))}
                </div>
                <button className='mt-8 flex flex-col justify-center items-center' onClick={onNewChild}>
                    <FaPlus className='text-primary mb-2' />
                    <span className='text-primary'>New Student</span>
                </button>
            </div>
        </ModalWrapper>
    );
};

export default SwitchChildModal;
