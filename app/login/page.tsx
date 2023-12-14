"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const {signIn, signUp} = useAuth();
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
    if(login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }
  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Image
          src="/Netflix_bg.jpg"
          alt='Netflix-bg'
          layout='fill'
          className="-z-10 !hidden opacity-60 sm:!inline"
        />
        
        <Image
          src="/Netflix_logo.svg"
          alt='Netflix-Logo'
          width={150}
          height={150}
          className="absolute object-contain top-4 left-4 md:left-10 md:top-6 cursor-pointer"
        />

        <form 
        className='relative mt-24 space-y-8 wrounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14' 
        onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-4xl font-semibold'>Sign In</h1>
          <div className='space-y-4'>
            <label className='inline-block w-full'>
              <input type="email" placeholder='Email Address' className='input' {...register('email', {required: true})} />
              {errors.email && <p className='text-[#e50914] p-1 text-[13px] font-light'>Please enter a valid email!</p>}
            </label>
            <label className='inline-block w-full'>
            <input type="password" placeholder='Password' className='input' {...register('password', {required: true})} />
            {errors.password && <p className='text-[#e50914] p-1 text-[13px] font-light'>Your password must contain between 4 to 18 characters!</p>}
            </label>
          </div>
            <button type="submit" className='w-full rounded bg-[#e50914] font-semibold py-3' onClick={() => setLogin(true)}>
              Sign In
            </button>

          <div>
             New to Netflix? &nbsp;
             <button className='text-white hover:underline' onClick={() => setLogin(false)}>Sign up now</button>
          </div>
        </form>
        
    </div>
  )
}

export default Login