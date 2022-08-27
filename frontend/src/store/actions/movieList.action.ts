import { SERVER_BASE_URL } from '../../constants/constants';
import {
    IGetDashboardMoviesResponse,
    IGetMovieDetails,
    IGetMovieDetailsResponse,
    IGetMovies,
    IGetMoviesResponse,
} from '../../interfaces/movieList.interface';
import { createGetUrl } from '../../utils/helper';
import { getCookie } from './cookies.action';

export const getDashboardMovies =
    async (): Promise<IGetDashboardMoviesResponse> => {
        const accessToken = getCookie('accessToken')
            ? getCookie('accessToken')
            : null;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `${accessToken}`,
            },
        };

        try {
            const url = `${SERVER_BASE_URL}/movie-list/get-dashboard-movies`;
            const response = await fetch(url, requestOptions);
            return await response.json();
        } catch (error) {
            return {
                statusCode: 502,
                data: [],
                message: 'Could not connect to the server',
            };
        }
    };

export const getMovies = async (
    payload: IGetMovies
): Promise<IGetMoviesResponse> => {
    const accessToken = getCookie('accessToken')
        ? getCookie('accessToken')
        : null;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `${accessToken}`,
        },
    };

    try {
        const url = createGetUrl(
            `${SERVER_BASE_URL}/movie-list/get-movies`,
            payload
        );

        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return {
            statusCode: 502,
            responseCount: 0,
            paginationData: {
                totalNumberOfResults: 0,
                numberOfPages: 0,
            },
            data: [],
            message: 'Could not connect to the server',
        };
    }
};

export const getMovieDetails = async (
    payload: IGetMovieDetails
): Promise<IGetMovieDetailsResponse> => {
    const accessToken = getCookie('accessToken')
        ? getCookie('accessToken')
        : null;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `${accessToken}`,
        },
    };

    try {
        const url = `${SERVER_BASE_URL}/movie-list/movie-details?id=${payload.id}`;
        const response = await fetch(url, requestOptions);
        return await response.json();
    } catch (error) {
        return {
            statusCode: 502,
            data: null,
            message: 'Could not connect to the server',
        };
    }
};
