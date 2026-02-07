"use client";

import LayoutWrapper from '@/components/hocs/LayoutWrapper';
import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqData = [
  {
    question: 'How do I create an account for my institution?',
    answer:
      'To create an account, visit our website or download the EduDatt app. Follow the instructions to register your institution, set up your profile, and begin using the platform.',
  },
  {
    question: 'How do I add students and teachers to my institution?',
    answer:
      'In the “User Management” section of the app, you can add students and teachers by their email addresses. They will receive invites to join your institution and access their respective courses.',
  },
  {
    question: 'How can I monitor student progress with EduDatt?',
    answer:
      'After students have enrolled in courses, you can track their progress through the “Progress Dashboard.” It displays their course completion status, grades, assignments, and overall performance.',
  },
  {
    question: 'How do I assign and track assignments for my students?',
    answer:
      'Go to the “Assignments” section, create new assignments for your students, and assign them to specific classes. You can set deadlines and track submission statuses, with real-time updates.',
  },
  {
    question: 'Can I receive notifications when assignments are submitted or overdue?',
    answer:
      'Yes, EduDatt will notify you when students submit assignments or if any assignments are overdue. Make sure to enable notifications to stay up to date with your students\' progress.',
  },
  {
    question: 'What if I forget to finish setting up my institution? Can I complete it later?',
    answer:
      'Yes! If you missed any part of the setup process, you can always return to the “Institution Setup” section in the app to complete your profile, add more students/teachers, and manage courses.',
  },
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <LayoutWrapper>
      <div className="px-2 lg:px-0 py-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">FAQs</h1>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl bg-white p-4 shadow-sm"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-base font-semibold text-gray-800">
                  {item.question}
                </span>
                {expandedIndex === index ? (
                  <FiMinus className="text-gray-600" />
                ) : (
                  <FiPlus className="text-gray-600" />
                )}
              </button>
              {expandedIndex === index && (
                <p className="mt-3 text-sm text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default FAQ;
