import { IMovie } from './movieList.interface';

export interface IMovieListFilteredPayload {
    title: string;
    movies: IMovie[];
    loading?: boolean;
}
