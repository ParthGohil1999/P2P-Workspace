import React, { useState, useEffect } from 'react'
import styles from './StepAvatar.module.css';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';

const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch();
    const { name, avatar } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/demo.png')
    const [loading, setLoading] = useState(false)
    const [unMounted, setUnMounted] = useState(false)

    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        }
    }
    async function submit() {
        if (!name || !avatar) {
            return alert('Please select a profile picture !')
        };
        setLoading(true);
        try {
            const { data } = await activate({ name, avatar })
            if (data.auth) {
                //check
                if (!unMounted) {
                    dispatch(setAuth(data));
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => {
            setUnMounted(true);
        }
    }, []);

    if (loading) return <Loader message='Activation In Progress...' />;
    return (
        <>
            <div className={styles.cardWrapper}>
                <Card
                    title={`Namaste, ${name} !`}
                    icon="avatar"
                >
                    <p className={styles.subHeading}>How's this photo?</p>
                    <div className={styles.avatarWrapper}>
                        <img className={styles.avatarImage} src={image} alt="avatar" />
                    </div>
                    <div>
                        <input onChange={captureImage} id='avatarInput' type="file" className={styles.avatarInput} />
                        <label className={styles.avatarLabel} htmlFor="avatarInput">Choose a different photo</label>
                    </div>
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                </Card>
            </div>
        </>
    );
};

export default StepAvatar;
