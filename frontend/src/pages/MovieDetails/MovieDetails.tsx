import React, { useEffect, useState } from 'react';
import {
    IGetMovieDetails,
    IGetMovieDetailsResponse,
} from '../../interfaces/movieList.interface';
import { getCookie } from '../../store/actions/cookies.action';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../store/actions/movieList.action';
import { isEmptyObject, truncateString } from '../../utils/helper';
import { Loading } from '../../components/molecules/Loading/Loading';
import { Error } from '../../components/atoms/Error/Error';
import styles from './MovieDetails.module.css';

export const MovieDetails = () => {
    const [serverResponse, setServerResponse] =
        useState<IGetMovieDetailsResponse>({
            statusCode: 200,
            data: null,
            message: '',
        });
    const [stringLength, setStringLength] = useState(150);
    const [show, setShow] = useState('More');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const image =
        serverResponse.data && !isEmptyObject(serverResponse.data)
            ? require(`../../images/moviePhotos/3840x2160/${serverResponse.data.coverPhoto}`)
            : '';

    const stringHandler = () => {
        setStringLength(1500);
        setShow('');
    };

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        if (!(accessToken && accessToken.length > 30)) {
            navigate('/log-in');
        }

        const fetchMovieDetails = async () => {
            const payload: IGetMovieDetails = {
                id: params.id ?? '',
            };
            setLoading(true);

            const response = await getMovieDetails(payload);
            setLoading(false);
            setServerResponse(response);
            setLoading(false);
        };

        fetchMovieDetails();
    }, []);

    return (
        <React.Fragment>
            {loading ? (
                <Loading />
            ) : serverResponse.statusCode === 200 ? (
                <>
                    <div
                        className={styles.movieDashboard}
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${image})`,
                            backgroundPosition: 'center center',
                        }}
                    ></div>
                    <div className={styles.layer}></div>

                    <div className={styles.movie__content}>
                        <div className={styles.vote}>
                            <span>
                                {serverResponse?.data?.imdbRating.toFixed(1)}
                            </span>
                        </div>
                        <div className={styles.name}>
                            <h3>{serverResponse?.data?.name}</h3>
                            <p>
                                {truncateString(
                                    serverResponse?.data?.description ?? '',
                                    stringLength
                                )}{' '}
                                {serverResponse?.data?.description &&
                                    serverResponse?.data?.description.length >
                                        150 && (
                                        <span onClick={() => stringHandler()}>
                                            {show}
                                        </span>
                                    )}
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <Error text={serverResponse.message} />
            )}
        </React.Fragment>
    );
};
