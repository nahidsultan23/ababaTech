import React from 'react';
import { IMovieListFilteredPayload } from '../../../interfaces/movieListFiltered.interface';
import { Loading } from '../../molecules/Loading/Loading';
import { MoviesRowFiltered } from '../../organisms/MoviesRowFiltered/MoviesRowFiltered';
import styles from './MovieListFiltered.module.css';

export const MovieListFiltered = ({
    title,
    movies,
    loading = false,
}: IMovieListFilteredPayload) => {
    return (
        <React.Fragment>
            <div className={styles.dashboard}>
                {loading ? (
                    <Loading innerLoading={true} />
                ) : (
                    <>
                        <div className={styles.heading}>{title}</div>
                        <div className={styles.dashboard__box}>
                            {movies && movies.length ? (
                                movies.map((data) => (
                                    <MoviesRowFiltered
                                        id={data._id}
                                        img={data.photo}
                                        title={data.name}
                                        releaseYear={data.releaseYear}
                                        rating={data.imdbRating}
                                        type="movie"
                                        key={data._id}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </>
                )}
            </div>
        </React.Fragment>
    );
};
