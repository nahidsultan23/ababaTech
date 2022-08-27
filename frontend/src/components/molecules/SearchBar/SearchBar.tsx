import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

export const SearchBar = ({ Icon }: any) => {
    const [searchString, setSearchString] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const queryString = location.search;
    const queryParams = new URLSearchParams(queryString);
    const movieName = queryParams.get('name');

    useEffect(() => {
        setSearchString(movieName ?? '');
    }, [movieName]);

    const onForSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchString) {
            navigate(`/?name=${searchString}`);
        }
    };

    return (
        <React.Fragment>
            <form className={styles.search} onSubmit={(e) => onForSubmit(e)}>
                <div className={styles.search}>
                    <Icon className={styles.icon} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                </div>
            </form>
        </React.Fragment>
    );
};
