import React from 'react';
import { Link } from 'react-router-dom';
import { IDiscoversPayload } from '../../../interfaces/discover.interface';
import { truncateString } from '../../../utils/helper';
import styles from './Discovers.module.css';

function Discovers({
    banner,
    title,
    des,
    rating,
    Icon,
    releaseYear,
    type,
    id,
}: IDiscoversPayload) {
    const image = require(`../../../images/moviePhotos/3840x2160/${banner}`);
    return (
        <React.Fragment>
            <div className={styles.discovers}>
                <div className={styles.discover__img}>
                    <img src={image} alt={title} />
                </div>
                <div className={styles.discover__content}>
                    <div className={styles.discover__left}>
                        <h3>
                            {title} <span>( {releaseYear} )</span>
                        </h3>
                        <div className={styles.button__box}>
                            <Link to={`${type}/${id}`}>
                                <button className={styles.btn1}>Details</button>
                            </Link>
                            <button className={styles.btn2}>Trailer</button>
                        </div>
                        <p>{truncateString(des, 120)}</p>
                    </div>
                    <div className={styles.right__discover}>
                        <Icon />
                        <span>{rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Discovers;
