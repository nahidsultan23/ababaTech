import React from 'react';
import { Link } from 'react-router-dom';
import { IPopularMoviesPayload } from '../../../interfaces/popularMovies.interface';
import { truncateString } from '../../../utils/helper';
import styles from './PopularMovies.module.css';

function PopularMovies({
    banner,
    title,
    description,
    id,
    type,
}: IPopularMoviesPayload) {
    const image = require(`../../../images/moviePhotos/3840x2160/${banner}`);

    return (
        <React.Fragment>
            <Link to={`${type}/${id}`}>
                <div className={styles.popularMovies} key={id}>
                    <div className={styles.banner__img}>
                        <img src={image} alt={title} />
                    </div>
                    <div className={styles.popular__content}>
                        <span>{title}</span>
                        <p>{truncateString(description, 90)}</p>
                    </div>
                </div>
            </Link>
        </React.Fragment>
    );
}

export default PopularMovies;
