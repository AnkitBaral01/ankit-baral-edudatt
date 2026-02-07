import LayoutWrapper from '@/components/hocs/LayoutWrapper';
import React from 'react';

const privacyPolicy = [
  {
    title: 'What information do we collect?',
    body: 'We collect personal information such as your name, email address, company details, and any information you provide while using the app. Additionally, we collect usage data to improve user experience.'
  },
  {
    title: 'How do we use your information?',
    body: 'Your information is used to provide and improve our services, facilitate communication, enhance security, and ensure compliance with legal requirements.'
  },
  {
    title: 'Do we share your data with third parties?',
    body: 'No, we do not sell, trade, or share your personal data with third-party organizations except when required by law or to improve our services through trusted partners.'
  },
  {
    title: 'How do we protect your data?',
    body: 'We use industry-standard security measures, including encryption and secure storage, to protect your personal data from unauthorized access, alteration, or disclosure.'
  },
  {
    title: 'Do we use cookies and tracking technologies?',
    body: 'Yes, we use cookies and similar tracking technologies to analyze usage patterns and improve the user experience. You can control cookie settings from your device preferences.'
  },
  {
    title: 'What are your rights regarding your data?',
    body: 'You have the right to access, update, or delete your personal information. You can also opt out of marketing communications and tracking features.'
  },
  {
    title: 'How can you contact us regarding privacy concerns?',
    body: 'If you have any questions regarding our privacy practices, you can contact us at support@edudatt.com.'
  }
];

const PrivacyPolicy = () => {
  return (
    <LayoutWrapper>
      <div className="px-2 lg:px-0 py-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Privacy and Policy</h1>
        <div className="bg-white rounded-2xl space-y-6">
          {privacyPolicy.map((item, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="mt-2 ps-2 text-sm text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default PrivacyPolicy;
