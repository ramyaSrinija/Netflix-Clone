"use client";

import { modelState, movieState } from '@/atoms/modalAtom';
import { movieBaseUrl } from '@/constants/movie';
import { db } from '@/firebase';
import useAuth from '@/hooks/useAuth';
import { Element, Genre, Movie } from '@/typings';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckIcon, HandThumbUpIcon, PlayIcon, PlusIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import MuiModal from '@mui/material/Modal'
import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';


const Modal = () => {
    const [showModal, setShowModal] = useRecoilState(modelState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
    const [trailer, setTrailer] = useState("");
    const [genre, setGenre] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(true);
    const [addedToList, setaddedToList] = useState(false);
    const { user } = useAuth();

    const handleModalClose = () => setShowModal(false);
    const handleList = async () => {
        if (addedToList) {
            await deleteDoc(doc(db, "Users", user!.uid, "myList", movie?.id?.toString()!))
        } else {
            await setDoc(doc(db, "Users", user!.uid, "myList", movie?.id?.toString()!), { ...movie })
        }
    }

    useEffect(() => {
        if (user) {
            return onSnapshot(
                collection(db, 'Users', user.uid, 'myList'),
                (snapshot) => setMovies(snapshot.docs)
            )
        }
    }, [db, movie?.id])

    useEffect(
        () =>
            setaddedToList(
                movies.findIndex((result) => result.data().id === movie?.id) !== -1
            ),
        [movies]
    )

    useEffect(() => {
        if (!movie) return;

        async function fetchMovie() {
            const response = await fetch(`${movieBaseUrl}${movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`)

            const data = await response.json();
            if (data?.videos) {
                const index = data.videos?.results?.findIndex((ele: Element) => ele.type === "Trailer")
                setTrailer(data.videos?.results?.[index]?.key)
            }

            if (data?.genres) {
                setGenre(data.genres)
            }
        }

        fetchMovie()

    }, [movie])

    return (
        <MuiModal open={showModal} onClose={handleModalClose} className='fixed !top-7 left-0 right-0 z-50 w-full mx-auto max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'>
            <>
                <button onClick={handleModalClose} className='modalButton absolute right-5 top-5 !z-40 border-none h-9 w-9 bg-[#181818] hover:bg-[#181818]'><XMarkIcon className='h-6 w-6' /></button>

                <div className='relative pt-[56.25%]'>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}` || 'https://www.youtube.com/watch?v=hXzcyx9V0xw'}
                        width='100%'
                        height='100%'
                        className="absolute top-0 left-0"
                        playing
                        muted={muted}
                    />

                    <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                        <div className='flex items-center space-x-3'>
                            <button className='flex items-center gap-x-2 rounded bg-white px-6 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                                <PlayIcon className='h-7 w-7 text-black' />
                                Play
                            </button>
                            <button className='modalButton' onClick={handleList}>
                                {addedToList ? <CheckIcon className='h-7 w-7' /> : <PlusIcon className='h-7 w-7' />}
                            </button>
                            <button className='modalButton'><HandThumbUpIcon className='h-7 w-7' /></button>
                        </div>
                        <button onClick={() => setMuted(!muted)} className='modalButton'>
                            {muted ? <SpeakerXMarkIcon className='h-7 w-7' /> : <SpeakerWaveIcon className='h-7 w-7' />}
                        </button>
                    </div>
                </div>

                <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
                    <div className='space-y-6 text-lg'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <p className='font-semibold text-green-400'>{movie?.vote_average * 10}% Match</p>
                            <p className='font-light'>{movie?.release_date || movie?.first_air_date}</p>
                            <div className='flex h-4 items-center justify-center rounded border-white/40 px-1.5 text-xs'>HD</div>
                        </div>
                        <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                            <p className='w-5/6'>{movie?.overview}</p>
                            <div className='flex flex-col space-y-3 text-sm'>
                                <div>
                                    <span className='text-[gray]'>Genres: </span>
                                    {genre.map(el => el.name).join(', ')}
                                </div>
                                <div>
                                    <span className='text-[gray]'>Original Language: </span>
                                    {movie?.original_language?.toUpperCase()}
                                </div>
                                <div>
                                    <span className='text-[gray]'>Total Votes: </span>
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal