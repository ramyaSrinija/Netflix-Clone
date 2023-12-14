"use client";

import { modelState } from '@/atoms/modalAtom';
import Banner from '@/components/Banner'
import Header from '@/components/header'
import MovieRow from '@/components/movieRow';
import { Data } from '@/typings';
import {useRecoilValue} from 'recoil';
import Modal from './Modal';
import Plans from './Plans';
import useAuth from '@/hooks/useAuth';
import Loader from './Loader';
import useList from '@/hooks/useList';

const HomeScreen = ({netflixOriginals, trendingNow, topRated, actionMovies, comedyMovies, horrorMovies, romanceMovies, documentaries} : Data) => {
    const showModal = useRecoilValue(modelState);
    const {user} = useAuth();
    const list = useList(user?.uid);
    console.log('user--', user)
    if(!user?.subscription) return <Plans />

    return (
        <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
          {/* <Loader /> */}
          <Header/>
          <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
            <Banner netflixOriginals={netflixOriginals} />
            <section className='space-y-8 sm:space-y-24'>
              <MovieRow title="Trending Now" movies={trendingNow} />
              <MovieRow title="Top Rated" movies={topRated} />
              <MovieRow title="Action Thrillers" movies={actionMovies} />
              {
                list?.length && <MovieRow title="My List" movies={list} />
              }
              <MovieRow title="Comedies" movies={comedyMovies} />
              <MovieRow title="Scary Movies" movies={horrorMovies} />
              <MovieRow title="Romance Movies" movies={romanceMovies} />
              <MovieRow title="Documentaries" movies={documentaries} />
            </section>
          </main>
          {showModal && <Modal />}
        </div>
      )
}

export default HomeScreen