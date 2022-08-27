import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    IGetDashboardMoviesResponse,
    IGetMovies,
    IGetMoviesResponse,
    IMovie,
} from '../../interfaces/movieList.interface';
import { getCookie } from '../../store/actions/cookies.action';
import {
    getDashboardMovies,
    getMovies,
} from '../../store/actions/movieList.action';
import { Sidebar } from '../../components/templates/Sidebar/Sidebar';
import { Widgets } from '../../components/templates/Widgets/Widgets';
import { MovieList } from '../../components/templates/MovieList/MovieList';
import { Loading } from '../../components/molecules/Loading/Loading';
import { Error } from '../../components/atoms/Error/Error';
import { MovieListFiltered } from '../../components/templates/MovieListFiltered/MovieListFiltered';
import { createFilteredTitle } from '../../utils/helper';

export const Dashboard = () => {
    const [serverResponse, setServerResponse] =
        useState<IGetDashboardMoviesResponse>({
            statusCode: 200,
            data: [],
            message: '',
        });
    const [serverFilteredResponse, setServerFilteredResponse] =
        useState<IGetMoviesResponse>({
            statusCode: 200,
            responseCount: 0,
            paginationData: {
                totalNumberOfResults: 0,
                numberOfPages: 0,
            },
            data: [],
            message: '',
        });
    const [trendingMovies, setTrendingMovies] = useState<IMovie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<IMovie[]>([]);
    const [comedyMovies, setComedyMovies] = useState<IMovie[]>([]);
    const [romanceMovies, setRomanceMovies] = useState<IMovie[]>([]);
    const [horrorMovies, setHorrorMovies] = useState<IMovie[]>([]);
    const [documentariesMovies, setDocumentariesMovies] = useState<IMovie[]>(
        []
    );
    const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
    const [filterdTitle, setFilteredTitle] = useState('');
    const [filtered, setFiltered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [innerLoading, setInnerLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const checkAuthorization = () => {
        const accessToken = getCookie('accessToken');
        if (!(accessToken && accessToken.length > 30)) {
            navigate('/log-in');
        }
    };

    const getQueryParams = () => {
        const searchString = location.search;
        const searchParams = new URLSearchParams(searchString);
        const movieName = searchParams.get('name') ?? '';
        const movieGroup = searchParams.get('group') ?? '';
        const movieType = searchParams.get('type') ?? '';
        const moviePage = Number(searchParams.get('page')) ?? 1;

        return { movieName, movieGroup, movieType, moviePage };
    };

    const fetchMovies = async (
        movieName: string,
        movieGroup: string,
        movieType: string,
        moviePage: number
    ) => {
        const payload: IGetMovies = {};

        if (movieName) {
            payload['name'] = movieName;
        }

        if (movieGroup) {
            payload['group'] = movieGroup;
        }

        if (movieType) {
            payload['type'] = movieType;
        }

        if (moviePage) {
            payload['page'] = moviePage;
        }

        if (payload.name || payload.group || payload.type) {
            setFiltered(true);

            const filteredMoviesTitle = createFilteredTitle(
                movieName,
                movieGroup,
                movieType
            );
            setFilteredTitle(filteredMoviesTitle);

            const response = await getMovies(payload);
            const responsePopularMovies = await getMovies({
                group: 'Popular Movies',
            });

            setServerFilteredResponse(response);

            if (responsePopularMovies.statusCode === 200) {
                setPopularMovies(responsePopularMovies.data);
            } else {
                setServerResponse({
                    statusCode: responsePopularMovies.statusCode,
                    data: [],
                    message: responsePopularMovies.message,
                });
            }
        } else {
            setFiltered(false);
            const response = await getDashboardMovies();
            setServerResponse(response);

            if (response.data && response.data.length) {
                const trendingMoviesArray: IMovie[] = [];
                const topRatedMoviesArray: IMovie[] = [];
                const comedyMoviesArray: IMovie[] = [];
                const romanceMoviesArray: IMovie[] = [];
                const horrorMoviesArray: IMovie[] = [];
                const documentariesMoviesArray: IMovie[] = [];
                const popularMoviesArray: IMovie[] = [];

                response.data.forEach((movie: IMovie) => {
                    if (movie.group === 'Trending Movies') {
                        trendingMoviesArray.push(movie);
                    } else if (movie.group === 'Top Rated') {
                        topRatedMoviesArray.push(movie);
                    } else if (movie.group === 'Comedy Movies') {
                        comedyMoviesArray.push(movie);
                    } else if (movie.group === 'Romance Movies') {
                        romanceMoviesArray.push(movie);
                    } else if (movie.group === 'Horror Movies') {
                        horrorMoviesArray.push(movie);
                    } else if (movie.group === 'Documentaries Movies') {
                        documentariesMoviesArray.push(movie);
                    } else if (movie.group === 'Popular Movies') {
                        popularMoviesArray.push(movie);
                    }
                });

                setTrendingMovies(trendingMoviesArray);
                setTopRatedMovies(topRatedMoviesArray);
                setComedyMovies(comedyMoviesArray);
                setRomanceMovies(romanceMoviesArray);
                setHorrorMovies(horrorMoviesArray);
                setDocumentariesMovies(documentariesMoviesArray);
                setPopularMovies(popularMoviesArray);
            }
        }
    };

    useEffect(() => {
        checkAuthorization();
        const { movieName, movieGroup, movieType, moviePage } =
            getQueryParams();

        const callFetchMoviesFunction = async () => {
            setLoading(true);
            await fetchMovies(movieName, movieGroup, movieType, moviePage);
            setLoading(false);
        };

        callFetchMoviesFunction();
    }, []);

    useEffect(() => {
        checkAuthorization();
        const { movieName, movieGroup, movieType, moviePage } =
            getQueryParams();

        const callFetchMoviesFunction = async () => {
            setInnerLoading(true);
            await fetchMovies(movieName, movieGroup, movieType, moviePage);
            setInnerLoading(false);
        };

        callFetchMoviesFunction();
    }, [location]);

    return (
        <React.Fragment>
            {loading ? (
                <Loading />
            ) : serverResponse.statusCode === 200 &&
              serverFilteredResponse.statusCode === 200 ? (
                <>
                    <Sidebar />
                    {filtered
                        ? serverFilteredResponse.data && (
                              <MovieListFiltered
                                  title={filterdTitle}
                                  movies={serverFilteredResponse.data}
                                  loading={innerLoading}
                              />
                          )
                        : serverResponse.data && (
                              <MovieList
                                  allGroups={serverResponse.data}
                                  trending={trendingMovies}
                                  topRated={topRatedMovies}
                                  comedy={comedyMovies}
                                  romance={romanceMovies}
                                  horror={horrorMovies}
                                  documentaries={documentariesMovies}
                                  loading={innerLoading}
                              />
                          )}
                    <Widgets popular={popularMovies} />
                </>
            ) : (
                <Error
                    text={
                        serverResponse.message || serverFilteredResponse.message
                    }
                />
            )}
        </React.Fragment>
    );
};
