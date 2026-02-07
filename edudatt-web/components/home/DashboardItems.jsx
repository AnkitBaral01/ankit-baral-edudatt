"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { DASHBOARD_ITEMS } from '@/config/utils';

const DashboardItems = () => {
  const router = useRouter();

  const onLinkOpen = (link) => {
    router.push("/dashboard/details" + link);
  };

  const renderItem = (item) => (
    <div
      key={item.id}
      onClick={() => onLinkOpen(item.link)}
      className="py-2 ps-2 lg:p-4 flex items-center bg-yellow-100 border border-yellow-300 rounded-lg cursor-pointer hover:bg-yellow-200"
    >
      <div
        className="rounded-md"
        style={{ backgroundColor: item.bgColor, minWidth: "3rem", minHeight: "3rem" }}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={48}
          height={48}
          className="object-cover p-2"
        />
      </div>

      <span className="ml-2 text-sm font-semibold">{item.title}</span>

      <FaChevronRight className="hidden lg:block ml-2 text-primary" />
    </div>
  );

  return (
    <div className="mb-8 px-2 lg:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-8">
      {DASHBOARD_ITEMS.map((item) => renderItem(item))}
      </div>
    </div>
  );
};

export default DashboardItems;
