export interface Movies {
  results?: (ResultsEntity)[] | null;
  page: number;
  total_results: number;
  dates: Dates;
  total_pages: number;
}
export interface ResultsEntity {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: (number)[] | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DistributionEntity {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string
}

export interface BasicResponse {
  imageBaseUrl: string
}

export interface ComposedResponseType <T> extends BasicResponse {
  data: T,
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export type PeopleResponse = ComposedResponseType<DistributionEntity>
