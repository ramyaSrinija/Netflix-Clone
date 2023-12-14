"use client";

import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react'
import Loader from './Loader';
import { useRouter } from 'next/navigation';

const Membership = () => {
  const { user, loading, setSubscription } = useAuth();
  const router = useRouter();
  const restartMembership = () => {
    router.push('/')
  }


  return (
    <div className='accountDiv py-0'>
      <div className='space-y-2 py-4 '>
        <h4 className='text-lg text-[gray]'>Membership & Billing</h4>
        {
          user?.subscription ? (
            <button
              disabled={loading || !user?.subscription}
              className='subscriptionButton'
              onClick={() => setSubscription('', false)}
            >
              {
                loading ? <Loader /> : 'Cancel Subscription'
              }
            </button>
          ) : (
            <button className='subscriptionButton' disabled={user?.subscription} onClick={restartMembership}>Restart Membership</button>
          )
        }
      </div>

      <div className='col-span-3'>
          <div className='flex flex-col md:flex-row justify-between border-b border-white/10 py-4'>
            <div>
              <p className='font-medium'>{user?.email}</p>
              <p className='text-[gray]'>Password: **********</p>
            </div>
            <div className='md:text-right'>
              <p className='membershipLink'>Change Email</p>
              <p className='membershipLink'>Change Password</p>
            </div>
          </div>

          <div className='flex flex-col justify-between py-4 md:flex-row md:pb-0'>
            <div>
              <p>Your membership options: </p>
            </div>
            <div className='md:text-right'>
              <p className='membershipLink'>Manage payment info</p>
              <p className='membershipLink'>Add backup payment method</p>
              <p className='membershipLink'>Billing Details</p>
              <p className='membershipLink'>Change Billing day</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Membership;