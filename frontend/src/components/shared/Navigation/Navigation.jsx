import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../http'
import styles from './Navigation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'

const Navigation = () => {

    const navContent = {
        textDecoration: 'none',
        color: 'rgba(255, 255, 255, 0.75)',
        fontWeight: 'bold',
        // fontStyle: 'italic',
        fontFamily: 'MonteCarlo',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center'

    }


    const logoText = {
        marginLeft: '10px'
    }

    // const logoText2 = {
    //     color: 'rgba(246, 145, 255, 0.90)',
    // }

    const logo = {
        color: 'white',
        width: '35px',
        transform: 'rotate(5deg)'
    }
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);
    async function logoutUser() {
        try {
            const { data } = await logout();
            dispatch(setAuth(data))
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={navContent} to="/">
                <img style={logo} src="images/logo10.svg" alt="logo" />
                <span style={logoText} className={styles.navContent}>Namaste Homies</span>
            </Link>
            {isAuth &&
                (<div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                        <Link to='/'>
                            <img className={styles.avatar} src={user.avatar ? user.avatar : '/images/demo.png'} alt='avatar' />
                        </Link>
                    <button className={styles.logoutButton} onClick={logoutUser}>
                        <img src="/images/logout1.svg" width='45' alt="logout" />
                    </button>
                </div>
                )}
        </nav>

    )
}

export default Navigation
