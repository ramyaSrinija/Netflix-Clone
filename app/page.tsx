import { Data } from '@/typings';
import { fetchRequests } from '@/utils/requests'
import HomeScreen from '@/components/HomeScreen';

export default async function Home() {
  const { 
    netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow
  }: Data = await fetchRequests();


  return (
    <HomeScreen 
      netflixOriginals={netflixOriginals} 
      trendingNow={trendingNow} 
      topRated={topRated} 
      actionMovies={actionMovies} 
      comedyMovies={comedyMovies} 
      horrorMovies={horrorMovies} 
      romanceMovies={romanceMovies} 
      documentaries={documentaries}       
    />
  )
}