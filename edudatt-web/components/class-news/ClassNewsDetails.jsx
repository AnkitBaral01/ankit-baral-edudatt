"use client"

import {  FaTrophy } from 'react-icons/fa'
import { BsBell } from "react-icons/bs"
import ModalWrapper from '../hocs/ModalWrapper'

const ClassNewsDetails = ({ newsItem, visible, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (!newsItem) return null

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-center">
          {newsItem.is_reminder && (
            <div className='flex gap-2 items-center mb-4'>
              <BsBell className="text-primary text-3xl mr-2" />
              <span className="font-bold text-2xl text-primary">Reminder</span>
            </div>
          )}
          {newsItem.is_achievement && (
            <div className='flex gap-2 items-center mb-4'>
              <FaTrophy className="text-primary text-3xl mr-2" />
              <span className="font-bold text-2xl text-primary">Achievement</span>
            </div>
          )}
        </div>
        <h3 className="font-bold text-2xl mb-4">{newsItem.heading}</h3>
        <p className="text-gray-700 text-lg whitespace-pre-line">
          {newsItem.content}
        </p>
        <div className="text-sm text-gray-500 mt-4">
          {formatDate(newsItem.createdAt)}
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ClassNewsDetails