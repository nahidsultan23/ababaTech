import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import QueueIcon from '@mui/icons-material/Queue';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { SideItem } from '../../molecules/SideItem/SideItem';
import styles from './Sidebar.module.css';
import logo from '../../../images/logo/logo.png';
import { logOut } from '../../../store/actions/auth.action';
import { truncateString } from '../../../utils/helper';
import { Button } from '@mui/material';

export const Sidebar = () => {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : {};

    const handleLogOut = () => {
        logOut();
        navigate('/log-in');
    };

    return (
        <React.Fragment>
            <div
                className={
                    show
                        ? `${styles.sidebar} ${styles.side__show}`
                        : styles.sidebar
                }
            >
                <Link to="/">
                    {' '}
                    <div className={styles.logo}>
                        <img src={logo} alt="logo" />
                        <h3>Movies</h3>
                    </div>
                </Link>
                <div className={styles.side__box}>
                    <div className={styles.box__one}>
                        <span className={styles.heading}>Menu</span>
                        <SideItem
                            Icon={HomeMaxIcon}
                            Name="Home"
                            active
                            link="/"
                        />
                        <SideItem
                            Icon={SearchIcon}
                            Name="Search"
                            link="/search"
                        />
                        <SideItem
                            Icon={FavoriteBorderIcon}
                            Name="Favorite"
                            link="/favorite"
                        />
                        <SideItem
                            Icon={AccessTimeIcon}
                            Name="Reminder"
                            link="/reminder"
                        />
                    </div>
                    <div className={styles.box__two}>
                        <span className={styles.heading}>Others</span>
                        <SideItem
                            Icon={QueueIcon}
                            Name="Playlist"
                            link="/playlist"
                        />
                        <SideItem
                            Icon={PlayCircleOutlineIcon}
                            Name="Live"
                            link="/live"
                        />
                        <SideItem
                            Icon={SettingsIcon}
                            Name="Setting"
                            link="/setting"
                        />
                    </div>
                </div>
                <div
                    className={styles.menu__icon}
                    onClick={() => setShow(!show)}
                >
                    <MenuIcon />
                </div>
                <div className={styles.auth_box}>
                    <div className={styles.user}>
                        <div>
                            <div>
                                <PersonOutlineIcon />
                            </div>
                            <div>
                                {currentUser && currentUser.username
                                    ? truncateString(currentUser.username, 12)
                                    : ''}
                            </div>
                        </div>
                    </div>
                    <div className={styles.logout}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleLogOut}
                        >
                            Log out
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className={
                    show
                        ? `${styles.layer} ${styles.layer__show}`
                        : styles.layer
                }
                onClick={() => setShow(false)}
            ></div>
        </React.Fragment>
    );
};
