"use client";

import { modelState, movieState } from '@/atoms/modalAtom';
import { baseUrl } from '@/constants/movie';
import { Movie } from '@/typings'
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';

interface Props {
    netflixOriginals: Movie[]
}
const Banner = ({netflixOriginals}: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modelState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * netflixOriginals.length);
    setMovie(netflixOriginals[randomNumber]);
  }, [netflixOriginals]);
  
  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:justify-end lg:pb-12 px-1 lg:h-auto'>
        <div className='absolute top-0 left-0 h-[95vh] w-full -z-10'>
            <Image 
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path || ''}`}
            alt={movie?.title || movie?.name || movie?.original_name || ''} 
            layout='fill'
            className="object-cover"
            />
        </div>
        <h1 className='font-bold text-2xl md:text-4xl lg:text-7xl'>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className='max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
            {movie?.overview}
        </p>
        <div className='flex space-x-3'>
            <button 
            className='bannerButton text-black bg-white'
            onClick={() => {
                setCurrentMovie(movie)
                setShowModal(true)
              }}
            >
                <PlayIcon className='h-4 w-4 md:h-7 md:w-7' />
                Play
            </button>
            <button className='bannerButton bg-gray-400/70' onClick={() => {
                setCurrentMovie(movie)
                setShowModal(true)
            }}>
                <InformationCircleIcon className='h-4 w-4 md:h-7 md:w-7' />
                More Info
            </button>
        </div>
    </div>
  )
}

export default Banner