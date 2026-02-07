"use client"

import Link from 'next/link';
import dynamic from 'next/dynamic';
const LottiePlayer = dynamic(() => import('@/components/LottiePlayer'), { ssr: false });
import LayoutWrapper from '@/components/hocs/LayoutWrapper';
import { useSelector } from 'react-redux';

export default function Home() {
  const {auth} = useSelector(state => state.auth);

  return (
    <LayoutWrapper>
      <main className="flex-grow px-4 lg:px-0">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight md:leading-snug">
                Empowering Parents in Their Child's Education Journey
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                EduDatt provides real-time insights into your child's academic performance,
                attendance, and school activities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={auth ? "/dashboard" : "/login"}
                  className="bg-yellow hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="border-2 border-yellow text-yellow hover:bg-primary-light px-8 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  See Demo
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md">
                <LottiePlayer
                  animationData={require("@/assets/lottie/welcome.json")}
                  className="w-full h-auto aspect-square"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="hidden bg-transparent py-16 mb-12 rounded-sm">
          <div className="max-w-7xl mx-auto px:0 lg:px-6">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">
              Why Choose EduDatt?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                <div className="w-full max-w-xs h-60 px-8 flex items-center justify-center overflow-hidden">
                  <LottiePlayer
                    animationData={require("@/assets/lottie/learning-insight.json")}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2 text-center">
                  Real-Time Learning Insight
                </h3>
                <p className="text-gray-600 text-center">
                  Stay connected and monitor your child's academic progress with comprehensive tracking of grades, attendance, and school activities—all in one intuitive dashboard.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                <div className="w-full max-w-xs h-60 px-8 flex items-center justify-center overflow-hidden">
                  <LottiePlayer
                    animationData={require("@/assets/lottie/teaching.json")}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2 text-center">
                  Educator Collaboration
                </h3>
                <p className="text-gray-600 text-center">
                  Connect directly with teachers to receive personalized updates and guidance, ensuring your child gets tailored support for their learning journey.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                <div className="w-full max-w-xs h-60 px-8 flex items-center justify-center overflow-hidden">
                  <LottiePlayer
                    animationData={require("@/assets/lottie/report-card.json")}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-secondary mt-4 mb-2 text-center">
                  Progress Analytics
                </h3>
                <p className="text-gray-600 text-center">
                  Access detailed performance reports and visual analytics to track improvements, identify strengths, and address learning gaps effectively.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LayoutWrapper>
  );
}