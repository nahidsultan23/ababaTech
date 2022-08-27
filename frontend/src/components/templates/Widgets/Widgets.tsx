import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';
import PopularMovies from '../../organisms/PopularMovies/PopularMovies';
import { IWidgetsPayload } from '../../../interfaces/widgets.interface';
import styles from './Widgets.module.css';
import { useLocation } from 'react-router-dom';
import { Tag } from '../../atoms/Tag/Tag';

export const Widgets = ({ popular }: IWidgetsPayload) => {
    const location = useLocation();

    const searchString = location.search;
    const searchParams = new URLSearchParams(searchString);
    const movieType = searchParams.get('type');

    return (
        <React.Fragment>
            <div className={styles.widgets}>
                <SearchBar Icon={SearchIcon} />
                <div className={styles.tag__box}>
                    <Tag
                        tag="Action"
                        active={movieType === 'Action' ? true : false}
                    />
                    <Tag
                        tag="Adventure"
                        active={movieType === 'Adventure' ? true : false}
                    />
                    <Tag
                        tag="Sci-Fi"
                        active={movieType === 'Sci-Fi' ? true : false}
                    />
                    <Tag
                        tag="Hulu"
                        active={movieType === 'Hulu' ? true : false}
                    />
                    <Tag
                        tag="Technology"
                        active={movieType === 'Technology' ? true : false}
                    />
                    <Tag
                        tag="Hollywood"
                        active={movieType === 'Hollywood' ? true : false}
                    />
                    <Tag
                        tag="Marvel"
                        active={movieType === 'Marvel' ? true : false}
                    />
                    <Tag
                        tag="Superhero"
                        active={movieType === 'Superhero' ? true : false}
                    />
                    <Tag
                        tag="Disney"
                        active={movieType === 'Disney' ? true : false}
                    />
                    <Tag
                        tag="Netflix"
                        active={movieType === 'Netflix' ? true : false}
                    />
                    <Tag
                        tag="Animation"
                        active={movieType === 'Animation' ? true : false}
                    />
                </div>

                <div className={styles.popular__box}>
                    <div className={styles.heading}>Popular Movies</div>
                    {popular &&
                        popular.map((data) => (
                            <PopularMovies
                                banner={data.coverPhoto}
                                title={data.name}
                                id={data._id}
                                description={data.description}
                                type="movie"
                                key={data._id}
                            />
                        ))}
                </div>
            </div>
        </React.Fragment>
    );
};
