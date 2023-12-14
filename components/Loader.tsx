"use client";
import useAuth from '@/hooks/useAuth';
import React from 'react'

const Loader = () => {
  const {loading} = useAuth();
  if(loading) {
    return (
      <div 
        className='h-[40px] w-[40px] text-center rounded-full border-gray-400 border-4 border-t-4 border-t-gray-500/20 animate-spin'
       >
      </div>
    )
  }
  return <></>
}

export default Loader