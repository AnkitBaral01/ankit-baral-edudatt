"use client"

import { getClassNews } from '@/store/slices/class-news.slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrophy } from 'react-icons/fa'
import { BsBell } from "react-icons/bs"
import ClassNewsDetails from '@/components/class-news/ClassNewsDetails'
import DetailsWrapper from '@/components/hocs/DetailsWrapper'

const ClassNews = () => {
    const dispatch = useDispatch()
    const { classNews } = useSelector(state => state.classNews)
    const { currentChild } = useSelector(state => state.auth)
    const [selectedNews, setSelectedNews] = useState(null)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const groupByDate = (newsItems) => {
        return newsItems?.reduce((acc, newsItem) => {
            const date = formatDate(newsItem.createdAt)
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(newsItem)
            return acc
        }, {})
    }

    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem)
    }

    const closeModal = () => {
        setSelectedNews(null)
    }

    useEffect(() => {
        dispatch(getClassNews())
    }, [currentChild])

    const groupedNews = groupByDate(classNews)

    return (
        <DetailsWrapper>
            <div className="p-1 lg:p-6">
                <h1 className="text-2xl font-bold mb-6">Class News</h1>

                {groupedNews && Object.entries(groupedNews).map(([date, newsItems]) => (
                    <div key={date} className="mb-4 border border-gray-300 p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">{date}</h2>
                        <div className="flex overflow-x-auto space-x-4 [scrollbar-width:none] [-ms-overflow-style:none]">
                            {newsItems.map((newsItem, index) => (
                                <div
                                    key={`${newsItem._id}-${index}`}
                                    onClick={() => handleNewsClick(newsItem)}
                                    className={`flex-shrink-0 min-w-72 max-w-72 rounded-[2rem] shadow-sm p-4 border cursor-pointer ${newsItem.is_reminder
                                            ? 'bg-yellow'
                                            : newsItem.is_achievement
                                                ? 'bg-turquise'
                                                : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center mt-2 mb-4">
                                        {newsItem.is_reminder && (
                                            <div className='mb-2 flex gap-2'>
                                                <BsBell className="text-primary text-3xl mr-2" />
                                                <span className="font-bold text-2xl text-primary">Reminder</span>
                                            </div>
                                        )}
                                        {newsItem.is_achievement && (
                                            <div className='mb-2 flex gap-2'>
                                                <FaTrophy className="text-primary text-3xl mr-2" />
                                                <span className="font-bold text-2xl text-primary">Achievement</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-lg lg:text-xl mb-2">{newsItem.heading}</h3>
                                    <p className="text-gray-600 mb-3 line-clamp-2">
                                        {newsItem.content.slice(0, 70)}{newsItem.content.length > 100 && '...'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {Object.entries(classNews).length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-2xl font-semibold mb-4">No Class News Available</h2>
                        <p className="text-gray-600">Stay tuned for updates!</p>
                    </div>
                )}

                <ClassNewsDetails
                    newsItem={selectedNews}
                    visible={!!selectedNews}
                    onClose={closeModal}
                />
            </div>
        </DetailsWrapper>
    )
}

export default ClassNews