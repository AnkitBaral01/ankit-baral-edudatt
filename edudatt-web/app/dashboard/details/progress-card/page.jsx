"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DetailsWrapper from '@/components/hocs/DetailsWrapper'
import ModalWrapper from '@/components/hocs/ModalWrapper'
import { getProgressReport } from '@/store/slices/progress-card.slice'

const ProgressCard = () => {
    const dispatch = useDispatch()
    const { report } = useSelector(state => state.progress)
    const { currentChild } = useSelector(state => state.auth)
    const [selectedSubject, setSelectedSubject] = useState(null)

    useEffect(() => {
        dispatch(getProgressReport())
    }, [currentChild])

    return (
        <DetailsWrapper>
            <div className="space-y-6 p-2 lg:-0">
                <div className="border-b pb-4">
                    <h2 className="text-xl font-bold">{report?.name}</h2>
                    <p className="text-sm text-gray-600">Class: {report?.class}</p>
                </div>

                {report?.exams && Object.entries(report?.exams).map(([examPhase, subjects], index) => (
                    <div key={examPhase} className="space-y-2 border border-gray-300 rounded-lg px-4 py-3">
                        <h3 className="text-lg font-semibold">{examPhase} Exams - <span className={index % 2 === 0 ? "text-green" : "text-danger"}>{index % 2 === 0 ? "Pass" : "Fail"}</span></h3>

                        <div className="flex space-x-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] pt-1">
                            {subjects.map((subject, index) => (
                                <div
                                    key={subject.id}
                                    className={`min-w-[160px] p-4 rounded-lg cursor-pointer shadow flex flex-col justify-center`}
                                    style={{ backgroundColor: subject.bg_color }}
                                    onClick={() => setSelectedSubject({ ...subject, examPhase })}
                                >
                                    <h4 className="font-bold text-lg text-center" style={{ color: subject.text_color }}>{subject.name}</h4>
                                    <p className="text-sm font-semibold mt-1 text-center" style={{ color: subject.text_color }}>
                                        {subject.obtained_marks} / {subject.total_marks}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <ModalWrapper visible={!!selectedSubject} onClose={() => setSelectedSubject(null)}>
                {selectedSubject && (
                    <div className="space-y-4">
                        <div className='border border-gray-300 rounded-lg p-4'>
                            <h3 className="text-xl mb-4 pb-4 font-bold text-center border-b">{selectedSubject.name}</h3>
                            <p><span className="font-semibold">Exam:</span> {selectedSubject.examPhase}</p>
                            <p><span className="font-semibold">Marks:</span> {selectedSubject.obtained_marks} / {selectedSubject.total_marks}</p>
                            <p><span className="font-semibold">Feedback:</span> {selectedSubject.feedback}</p>

                            {selectedSubject.papers?.length > 0 && (
                                <div className="space-y-2 space-x-4">
                                    <p className="font-semibold">Papers:</p>
                                    {selectedSubject.papers.map((paper, idx) => (
                                        <a
                                            key={paper.id || idx}
                                            href={paper.image_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline block"
                                        >
                                            View Paper {idx + 1}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </ModalWrapper>
        </DetailsWrapper>
    )
}

export default ProgressCard
