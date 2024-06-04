import React from 'react'
import styles from './Home.module.css';
import { Link, useHistory } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';


const Home = () => {

    const history = useHistory();

    function startRegister(){
        history.push("/authenticate");
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title='Welcome to Namaste Homies!' icon='logo10'>
                <p className={styles.text}>We’re working hard to get ready for everyone! While we wrap up the finishing touches, we’re adding people gradually to make sure nothing breaks.
                </p>
                <div>
                    <Button onClick={startRegister} text="Get's started"/>
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>Have an invite text?</span>
                    {/* <Link className={styles.signIn} to='/login'>SignIn?</Link> */}
                </div>
            </Card>
        </div>
    )
}

export default Home
