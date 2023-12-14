import AccountScreen from '@/components/AccountScreen'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Account = () => {
    return (
        <>
            <header className='bg-[#141414'>
                <Link href='/'>
                    <Image
                        src='/Netflix_logo.svg'
                        alt='Netflix'
                        width={100}
                        height={100}
                        className='object-contain cursor-pointer'
                    />
                </Link>

                <Link href='/account'>
                    <Image
                        src='/Account.png'
                        alt='Account'
                        width={30}
                        height={30}
                        className='rounded cursor-pointer'
                    />
                </Link>
            </header>

            <AccountScreen />
        </>
    )
}

export default Account