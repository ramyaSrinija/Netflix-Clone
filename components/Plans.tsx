"use client";

import useAuth from '@/hooks/useAuth';
import { CheckIcon } from '@heroicons/react/24/solid';
import Image from 'next/image'
import Link from 'next/link';
import Table from '@/components/Table';
import { useState } from 'react';
import { plansState } from '@/atoms/modalAtom';
import Loader from './Loader';

const Plans = () => {
    const { logOut, user, setSubscription, loading } = useAuth();
    const [selectedPlan, setSelectedPlan] = useState('U');
    const renderTips = (tip: string) => (
        <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" />{tip}
        </li>
    )
    return (
        <>
            <header className='border-b border-white/10 bg-[#141414]'>
                <Link href="/" >
                    <Image
                        src="/Netflix_logo.svg"
                        alt="Netflix"
                        width={150}
                        height={90}
                        className="cursor-pointer object-contain"
                    />
                </Link>
                <button className='text-lg font-medium hover:underline' onClick={logOut}>
                    Sign Out
                </button>
            </header>

            <main className='relative top-28 max-w-5xl px-5 pb-12 transition-all md:px-10'>
                <h1 className='mb-3 text-3xl font-medium'>Choose the plan that&apos;s right for you</h1>

                <ul>
                    {renderTips(' Watch all you want. Ad-free.')}
                    {renderTips(' Recommendations just for you.')}
                    {renderTips(' Change or cancel your plan anytime.')}
                </ul>

                <div className='mt-4 flex flex-col space-y-4'>
                    <div className='flex items-center w-full justify-end self-end md:w-3/5'>
                        {
                            plansState?.map(plan => (
                                <div className={`planBox ${selectedPlan === plan?.key ? 'opacity-100' : 'opacity-60'}`} onClick={() => setSelectedPlan(plan?.key)} key={plan?.key}>{plan?.planName}</div>
                            ))
                        }
                        {/* <div className={`planBox ${selectedPlan === 'S' ? 'opacity-100' : 'opacity-60'}`} onClick={() => setSelectedPlan('S')}>Standard</div>
                        <div className={`planBox ${selectedPlan === 'P' ? 'opacity-100' : 'opacity-60'}`} onClick={() => setSelectedPlan('P')}>Premium</div>
                        <div className={`planBox ${selectedPlan === 'U' ? 'opacity-100' : 'opacity-60'}`} onClick={() => setSelectedPlan('U')}>Ultimate</div> */}
                    </div>

                    <Table selectedPlan={selectedPlan} />

                    <button className='mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] text-center' onClick={() => setSubscription(selectedPlan, true)}>
                        {
                            loading ? <Loader /> : 'Subscribe'
                        }
                    </button>
                </div>
            </main>
        </>
    )
}

export default Plans;