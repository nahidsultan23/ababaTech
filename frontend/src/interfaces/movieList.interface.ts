export interface IMovieListPayload {
    allGroups: IMovie[];
    trending: IMovie[];
    topRated: IMovie[];
    comedy: IMovie[];
    romance: IMovie[];
    horror: IMovie[];
    documentaries: IMovie[];
    loading?: boolean;
}

export interface IGetMovies {
    name?: string;
    group?: string;
    type?: string;
    page?: number;
}

export interface IGetMovieDetails {
    id: string;
}

interface IPaginationData {
    totalNumberOfResults: number;
    numberOfPages: number;
}

export interface IMovie {
    _id: string;
    name: string;
    description: string;
    group: string;
    type: string;
    coverPhoto: string;
    photo: string;
    releaseYear: number;
    imdbRating: number;
}

export interface IGetDashboardMoviesResponse {
    statusCode: number;
    data: IMovie[];
    message: string;
}

export interface IGetMoviesResponse {
    statusCode: number;
    responseCount: number;
    paginationData: IPaginationData;
    data: IMovie[];
    message: string;
}

export interface IGetMovieDetailsResponse {
    statusCode: number;
    data: IMovie | null;
    message: string;
}
