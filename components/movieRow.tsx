"use client";

import { Movie } from '@/typings'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import React, {useRef, useState} from 'react'
import Thumbnail from './Thumbnail'
import { DocumentData } from 'firebase/firestore';

interface Props {
    title: string,
    movies: Movie[] | DocumentData[]
}

const MovieRow = ({title, movies}: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (dir: string) => {
    setIsMoved(true);
    if(rowRef.current) {
        const {scrollLeft, clientWidth} = rowRef.current
        const scrollTo = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
        
        rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
    }
  }

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
        <h1 className='font-semibold text-sm w-56 cursor-pointer text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
            {title}
        </h1>
        <div className='group relative md:-ml-2'>
            <ChevronLeftIcon className={`carouselIcon left-2 ${!isMoved && 'hidden'}`} onClick={() => {handleClick('left')}} />
            <div className='flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide' ref={rowRef}>
                {movies.map((movie) => <Thumbnail movie={movie} key={movie.id} />)}
            </div>
            <ChevronRightIcon className='carouselIcon right-2' onClick={() => {handleClick('right')}} />
        </div>
    </div>
  )
}

export default MovieRow