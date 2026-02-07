"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import SwitchChildModal from '../modal/SwitchChildModal';
import { MdNotificationsActive } from 'react-icons/md';

export default function Header( { mobile } ) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { auth, currentChild, authLoading } = useSelector(state => state.auth);

  const pathname = usePathname();
  const [isModalVisible, setModalVisible] = useState(false);

  const onLogout = () => {
    dispatch(resetState({ type: "RESET" }));
    localStorage.clear();
    window.location.href = "/";
  };

  const isMale = currentChild?.gender?.toLocaleLowerCase() === "male";

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <header className={`${mobile ? "hidden" : "h-16"} w-full bg-white border-b fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 h-full">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-full.png"
            alt="EduDatt Logo"
            width={90}
            height={40}
            className="rounded-lg"
            priority
          />
        </Link>
        {(!authLoading && !pathname?.includes("dashboard")) ? (
          <Link
            href={auth ? "/dashboard" : "/login"}
            onClick={auth ? onLogout : undefined}
            className="text-yellow px-6 py-2 rounded-lg font-semibold transition-colors hover:bg-yellow-50"
          >
            {auth ? "Logout" : "Login"}
          </Link>
        ) : !authLoading ? (
          <div className="flex items-center space-x-4">
            <button onClick={() => router.push("/dashboard/notifications")}>
            <MdNotificationsActive size={32} className='text-yellow me-2' />
            </button>
            {isMale ? (
              <Image
                src="/others/boy.png"
                alt="Boy Icon"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={toggleModal}
              />
            ) : (
              <Image
                src="/others/girl.png"
                alt="Girl Icon"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={toggleModal}
              />
            )}
          </div>
        ) : null}
      </div>

      {/* Modal */}
      <SwitchChildModal isOpen={isModalVisible} onClose={toggleModal} />
    </header>
  );
}
