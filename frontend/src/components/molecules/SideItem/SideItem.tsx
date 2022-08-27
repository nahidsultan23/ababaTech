import React from 'react';
import { NavLink } from 'react-router-dom';
import { SideItemInput } from '../../../interfaces/sideItem.interface';
import styles from './SideItem.module.css';

export const SideItem = ({
    Icon,
    Name,
    link,
    active = false,
    close,
}: SideItemInput) => {
    const buttonHandler = (isActive: boolean) => {
        return {
            background: isActive ? 'var(--fifth-color)' : '',
            color: isActive ? '#fff' : 'gray',
            borderLeft: isActive ? '1px solid var(--second-color)' : '',
        };
    };

    return (
        <React.Fragment>
            <NavLink
                to={link ? link : '/'}
                style={buttonHandler(active)}
                className={
                    close
                        ? `${styles.close} ${styles.sideitem}`
                        : styles.sideitem
                }
            >
                <Icon className={styles.icon} />
                <span>{Name}</span>
            </NavLink>
        </React.Fragment>
    );
};
