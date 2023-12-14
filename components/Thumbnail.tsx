import { modelState, movieState } from '@/atoms/modalAtom';
import { thumbnailBaseUrl } from '@/constants/movie'
import { Movie } from '@/typings'
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image'
import {useRecoilState} from 'recoil';


interface Props {
    movie: Movie | DocumentData
}
const Thumbnail = ({movie}: Props) => {
  const [showModal, setShowModal] = useRecoilState(modelState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  return (
    <div 
      className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
     <Image 
        src={`${thumbnailBaseUrl}${movie?.backdrop_path || movie?.poster_path || ''}`}
        alt={movie?.title || movie?.name || movie?.original_name || ''} 
        layout='fill'
        className='object-cover rounded-sm md:rounded'
     />
    </div>
  )
}

export default Thumbnail