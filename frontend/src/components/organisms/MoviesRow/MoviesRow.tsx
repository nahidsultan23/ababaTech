import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import styles from './MoviesRow.module.css';
import { IMoviesRowPayload } from '../../../interfaces/moviesRow.interface';
import { truncateString } from '../../../utils/helper';

const MoviesRow = ({
    img,
    id,
    title,
    type,
    releaseYear,
    rating,
}: IMoviesRowPayload) => {
    const image = require(`../../../images/moviePhotos/2000x3000/${img}`);

    return (
        <React.Fragment>
            <div className={styles.moviesRow} key={id}>
                <Link to={`/${type}/${id}`}>
                    <img src={image} alt="thumbnail" />
                </Link>

                <div className={styles.movies_info}>
                    <div className={styles.movie__name}>
                        <h3>{truncateString(title, 18)}</h3>
                    </div>
                    <div className={styles.movie__other}>
                        <p>
                            {releaseYear}
                            <span>
                                {rating.toFixed(1)}
                                <StarIcon />
                            </span>
                        </p>
                        <p>{type}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MoviesRow;
