"use client";

import useAuth from '@/hooks/useAuth';
import React from 'react'
import Membership from './Membership';
import { plansState } from '@/atoms/modalAtom';
import { Products } from '@/typings';

const AccountScreen = () => {
    const {user, logOut} = useAuth();
    console.log('user--- acco', user);
    const planName: Products | undefined = plansState.find(plan => plan.key === user?.subPlan)
    return (
        <main className='mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10'>
            <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
                <h1 className='text-3xl md:text-4xl'>Account</h1>
                <div className='-ml-0.5 flex items-center gap-x-1.5'>
                    <img src="/account_play.svg" alt="account" width={30} height={30} />
                    <p className='text-xs font-semibold text-[#555]'>
                        {user?.subscription ? `Member Since ${user?.created}` : `Cancelled On ${user?.cancelled}`}
                    </p>
                </div>
            </div>

            <Membership />

            <div className='accountDiv'>
                <h4 className='text-lg text-[gray]'>Plan Details</h4>
                <div className='col-span-2 font-medium'>
                    {planName?.planName}
                </div>
                <p className='cursor-pointer text-blue-500 hover:underline md:text-right'>Change Plan</p>
            </div>

            <div className='accountDiv'>
                <h4>Settings</h4>
                <p className='col-span-3 cursor-pointer text-blue-500 hover:underline' onClick={logOut}>Sign Out of all Devices</p>
            </div>
        </main>
    )
}

export default AccountScreen