export interface Genre {
    id: number
    name: string
  }
  
  export interface Movie {
    title: string
    backdrop_path: string
    media_type?: string
    release_date?: string
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
  }
  
  export interface Element {
    type:
      | 'Bloopers'
      | 'Featurette'
      | 'Behind the Scenes'
      | 'Clip'
      | 'Trailer'
      | 'Teaser'
  }

export interface Data {
    netflixOriginals: Movie[],
    trendingNow: Movie[],
    topRated: Movie[],
    actionMovies: Movie[],
    comedyMovies: Movie[],
    horrorMovies: Movie[],
    romanceMovies: Movie[],
    documentaries: Movie[],
  }

export interface Products {
  key: string,
  planName: string,
  price: number,
  videoQuality: string,
  devices: string,
  resolution: string,
}