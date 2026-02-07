"use client"

import DashboardWrapper from '@/components/hocs/DashboardWrapper'
import LayoutWrapper from '@/components/hocs/LayoutWrapper'
import { getCurrentSchool } from '@/store/slices/school.slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSchool, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaPhoneVolume } from 'react-icons/fa'

const School = () => {
  const dispatch = useDispatch();
  const { currentChild } = useSelector(state => state.auth);
  const { currentSchool } = useSelector(state => state.school);
    
  useEffect(() => {
    if(currentChild?.school) {
      dispatch(getCurrentSchool({ id: currentChild?.school }))
    }
  }, [currentChild?.school])

  return (
    <LayoutWrapper>
      <DashboardWrapper>
        <div className="max-w-6xl mx-auto lg:p-4">
          {/* School Header */}
          <div className="flex flex-row items-center gap-3 lg:gap-6 mb-8">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaSchool className="text-primary text-3xl lg:text-4xl" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-800">{currentSchool?.name}</h1>
              {currentSchool?.is_disabled && (
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md mt-1">
                  Currently Disabled
                </span>
              )}
            </div>
          </div>

          {/* School Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Address Card */}
            <div className="bg-white rounded-lg lg:shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-5">
                <FaMapMarkerAlt className="text-primary" />
                <span>Address</span>
              </h2>
              <div className="space-y-2 text-gray-700 ps-10">
                <p>{currentSchool?.address.street}</p>
                <p>{currentSchool?.address.city}, {currentSchool?.address.state}</p>
                <p>{currentSchool?.address.zip}</p>
                <p>{currentSchool?.address.country}</p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg lg:shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-5">
                <FaPhone className="text-primary" />
                <span>Contact Information</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <FaPhoneVolume className="text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <p className="text-gray-600">{currentSchool?.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <FaEnvelope className="text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-600">{currentSchool?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <FaGlobe className="text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700">Website</p>
                    <a 
                      href={currentSchool?.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {currentSchool?.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="hidden bg-white rounded-lg lg:shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-medium">Created At</p>
                <p>{new Date(currentSchool?.createdAt).toDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Last Updated</p>
                <p>{new Date(currentSchool?.updatedAt).toDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </LayoutWrapper>
  )
}

export default School