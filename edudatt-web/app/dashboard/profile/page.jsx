"use client"

import DashboardWrapper from '@/components/hocs/DashboardWrapper'
import LayoutWrapper from '@/components/hocs/LayoutWrapper'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser, FaEnvelope, FaPhone, FaChild, FaVenusMars, FaCalendarAlt, FaLock, FaExchangeAlt, FaInfo, FaFile } from 'react-icons/fa'
import { MdLogout } from "react-icons/md";
import ChangePasswordModal from '@/components/modal/ChangePasswordModal'
import Link from 'next/link'
import { refresh, setCurrentChild } from '@/store/slices/auth.slice'
import { resetState } from '@/store/store'

const Profile = () => {
  const dispatch = useDispatch()
  const { auth, currentChild } = useSelector(state => state.auth)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const switchProfile = (student) => {
    localStorage.setItem('CURRENT_CHILD', student?._id);
    dispatch(setCurrentChild(student))
  }

  const onLogout = () => {
    dispatch(resetState({ type: "RESET" }));
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    dispatch(refresh())
  }, [])

  return (
    <LayoutWrapper>
      <DashboardWrapper>
        <div className="max-w-6xl mx-auto lg:p-8">
          <div className="bg-white rounded-xl lg:shadow-md overflow-hidden mb-8">
            <div className="px-2 py-4 lg:p-8">
              <div className="flex flex-row items-center gap-4 lg:gap-6">
                <div className="bg-blue-100 p-5 rounded-full">
                  <FaUser className="text-primary text-3xl" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                    {auth?.user?.first_name} {auth?.user?.last_name}
                  </h1>
                  <p className="text-gray-600 mt-1">Parent Account</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold flex items-center gap-3 lg:gap-6 mb-4">
                  <FaUser className="text-primary" />
                  <span>Personal Information</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ps-4 lg:ps-12">
                  <div className="flex items-center gap-6">
                    <FaEnvelope className="text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <p className="text-gray-600">{auth?.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <FaPhone className="text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700">Mobile</p>
                      <p className="text-gray-600">{auth?.user?.mobile_number}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 hidden lg:block">
                <h2 className="text-xl font-semibold flex items-center gap-3 lg:gap-6 mb-4">
                  <FaChild className="text-primary" />
                  <span>Children ({auth?.students?.length || 0})</span>
                </h2>
                {auth?.students?.length > 0 ? (
                  <div className="space-y-4 ms-4 lg:ms-12">
                    {auth?.students.map((student) => (
                      <div
                        key={student._id}
                        className={`p-4 rounded-lg border relative transition-all ${currentChild?._id === student._id
                            ? 'bg-yellow-50 border-yellow-400'
                            : 'bg-gray-50 border-gray-200'
                          }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                          <div className="flex items-center gap-6">
                            <FaUser className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-700">Name</p>
                              <p className="text-gray-600">{student?.first_name} {student?.last_name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <FaVenusMars className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-700">Gender</p>
                              <p className="text-gray-600 capitalize">{student?.gender?.toLowerCase()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <FaCalendarAlt className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-700">Date of Birth</p>
                              <p className="text-gray-600">
                                {new Date(student?.date_of_birth).toDateString()}
                              </p>
                            </div>
                          </div>
                          <div className='flex items-center justify-center lg:justify-end lg:pr-6'>
                            <button
                              disabled={student.is_disabled}
                              className={`transition ${currentChild?._id === student._id
                                  ? 'text-yellow-600 hover:text-yellow-700'
                                  : 'text-primary hover:text-primary-dark'
                                }`}
                              onClick={() => switchProfile(student)}
                            >
                              <FaExchangeAlt className="text-lg" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No children information available</p>
                )}
                {/* Add Child Button */}
                <div className="mt-6 ms-4 lg:ms-12">
                  <Link
                    href="/dashboard/school/link-child"
                    className="flex items-center gap-2 text-primary hover:text-primary-dark transition"
                  >
                    <span>+ New Student</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden bg-white rounded-xl lg:shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Account Status</h2>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${auth?.user?.email_verified_at ? 'bg-green-100' : 'bg-yellow-100'}`}>
                {auth?.user?.email_verified_at ? (
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium">
                  {auth?.user?.email_verified_at ? 'Email Verified' : 'Email Not Verified'}
                </p>
                <p className="text-sm text-gray-600">
                  {auth?.user?.email_verified_at
                    ? `Verified on ${new Date(auth?.user?.email_verified_at).toDateString()}`
                    : 'Please verify your email address'}
                </p>
              </div>
            </div>
          </div>

          <div className="ps-4 lg:pt-8">
            <Link
              href={"/privacy-policy"}
              className='flex items-center gap-2 text-primary'
            >
              <FaFile />
              <span>Privacy Policy</span>
            </Link>
          </div>
          <div className="ps-4 lg:pt-6">
            <Link
              href={"/faq"}
              className='flex items-center gap-2 text-primary'
            >
              <FaInfo />
              <span>FAQs</span>
            </Link>
          </div>
          <div className="ps-4 lg:pt-6">
            <button
              onClick={() => setShowChangePassword(true)}
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition"
            >
              <FaLock />
              <span>Change Password</span>
            </button>
          </div>
          <div className="ps-4 pt-8">
            <button
              onClick={() => onLogout()}
              className="flex items-center gap-2 text-red hover:text-primary-dark transition"
            >
              <MdLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <ChangePasswordModal
          visible={showChangePassword}
          onClose={() => setShowChangePassword(false)}
        />
      </DashboardWrapper>
    </LayoutWrapper>
  )
}

export default Profile