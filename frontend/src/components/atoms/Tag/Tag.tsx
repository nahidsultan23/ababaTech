import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ITagPayload } from '../../../interfaces/tag.interface';
import styles from './Tag.module.css';

export const Tag = ({ tag, active }: ITagPayload) => {
    const navigate = useNavigate();

    const onTagClicked = (tagString: string) => {
        navigate(`/?type=${tagString}`);
    };

    return (
        <React.Fragment>
            <div
                className={
                    active ? `${styles.tag} ${styles.active}` : styles.tag
                }
                onClick={() => onTagClicked(tag)}
            >
                <span>{tag}</span>
            </div>
        </React.Fragment>
    );
};
