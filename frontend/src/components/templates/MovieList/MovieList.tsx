import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { IMovieListPayload } from '../../../interfaces/movieList.interface';
import Discovers from '../../organisms/Discovers/Discovers';
import MoviesRow from '../../organisms/MoviesRow/MoviesRow';
import styles from './MovieList.module.css';
import { Loading } from '../../molecules/Loading/Loading';

export const MovieList = ({
    allGroups,
    trending,
    topRated,
    comedy,
    romance,
    horror,
    documentaries,
    loading = false,
}: IMovieListPayload) => {
    const discovers =
        allGroups[Math.floor(Math.random() * allGroups.length - 1)];

    return (
        <React.Fragment>
            <div className={styles.dashboard}>
                {loading ? (
                    <Loading innerLoading={true} />
                ) : allGroups && allGroups.length ? (
                    <>
                        <div
                            className={`${styles.heading} ${styles.top__heading}`}
                        >
                            <h3>Discovers</h3>{' '}
                        </div>
                        <div className={styles.dashboard__boxx}>
                            <Discovers
                                banner={discovers.coverPhoto}
                                title={discovers.name}
                                des={discovers.description}
                                Icon={StarIcon}
                                rating={discovers.imdbRating}
                                releaseYear={discovers.releaseYear}
                                id={discovers._id}
                                type="movie"
                            />
                        </div>

                        <div className={styles.heading}>Trending Movies</div>
                        <div className={styles.dashboard__box}>
                            {trending &&
                                trending.map((data) => (
                                    <MoviesRow
                                        id={data._id}
                                        img={data.photo}
                                        title={data.name}
                                        releaseYear={data.releaseYear}
                                        rating={data.imdbRating}
                                        type="movie"
                                        key={data._id}
                                    />
                                ))}
                        </div>

                        <div className={styles.heading}>Top Rated</div>
                        <div className={styles.dashboard__box}>
                            {topRated &&
                                topRated.map((data) => (
                                    <MoviesRow
                                        id={data._id}
                                        img={data.photo}
                                        title={data.name}
                                        releaseYear={data.releaseYear}
                                        rating={data.imdbRating}
                                        type="movie"
                                        key={data._id}
                                    />
                                ))}
                        </div>

                        <div className={styles.heading}>Comedy Movies</div>
                        <div className={styles.dashboard__box}>
                            {comedy &&
                                comedy.map((data) => (
                                    <MoviesRow
                                        id={data._id}
                                        img={data.photo}
                                        title={data.name}
                                        releaseYear={data.releaseYear}
                                        rating={data.imdbRating}
                                        type="movie"
                                        key={data._id}
                                    />
                                ))}
                        </div>

                        <div className={styles.heading}>Romance Movies</div>
                        <div className={styles.dashboard__box}>
                            {romance &&
                                romance.map((data) => (
                                    <MoviesRow
                                        id={data._id}
                                        img={data.photo}
                                        title={data.name}
                                        releaseYear={data.releaseYear}
                                        rating={data.imdbRating}
                                        type="movie"
                                        key={data._id}
                                    />
                                ))}
                        </div>

                        <div className={styles.heading}>Horror Movies</div>
                        <div className={styles.dashboard__box}>
                            {horror &&
                                horror.map((data) => (
                                    <MoviesRow
                                        id={data._id}
                                        img={data.photo}
                                        title={data.name}
                                        releaseYear={data.releaseYear}
                                        rating={data.imdbRating}
                                        type="movie"
                                        key={data._id}
                                    />
                                ))}
                        </div>

                        <div className={styles.heading}>
                            Documentaries Movies
                        </div>
                        <div className={styles.dashboard__box}>
                            {documentaries &&
                                documentaries.map((data) => (
                                    <MoviesRow
                                        id={data._id}
                                        img={data.photo}
                                        title={data.name}
                                        releaseYear={data.releaseYear}
                                        rating={data.imdbRating}
                                        type="movie"
                                        key={data._id}
                                    />
                                ))}
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </React.Fragment>
    );
};
