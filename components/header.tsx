"use client";

import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import { BellIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth';
import BasicMenu from './BasicMenu';

const Header = () => {
  const [isScrolling, setScrolling] = useState(false);
  const {logOut} = useAuth()
  useEffect(() => {
    const handleScrolling = () => {
        if(window.scrollY > 0) setScrolling(true);
        else setScrolling(false);
    }
    
    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("scroll", handleScrolling);
    }
  }, [])
  
  return (
    <header className={`${isScrolling && 'bg-[#141414]'}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="/Netflix_logo.svg"
          alt='Netflix-Logo'
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <BasicMenu />
        <ul className='hidden space-x-4 md:flex'>
            <li className='headerLink'>Home</li>
            <li className='headerLink'>TV Shows</li>
            <li className='headerLink'>Movies</li>
            <li className='headerLink'>New & Popular</li>
            <li className='headerLink'>My List</li>
        </ul>
        </div>
        <div className='flex items-center space-x-4 text-sm font-light'>
            <MagnifyingGlassIcon className='hidden h-6 w-6 sm:inline' />
            <p className='hidden lg:inline'>Kids</p>
            <BellIcon className='h-6 w-6'/>
            <Link href="/account">
                <Image src="/Account.png" alt='account' width={30} height={30} className='cursor-pointer object-contain rounded'/>
            </Link>
            <button className='text-small' onClick={() => logOut()}>Logout</button>
        </div> 
    </header>
  )
}

export default Header