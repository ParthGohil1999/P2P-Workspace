import React, { useState } from 'react'
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './StepPhoneEmail.module.css'

const phoneEmailMap = {
    phone: Phone,
    email: Email
}

const StepPhoneEmail = ({ onNext }) => {
    const [type, setType] = useState("phone");
    const Component = phoneEmailMap[type]



    return (
        <>

            <div className={styles.cardWrapper}>
                <div className={styles.buttonWrap}>
                    <button className={`${styles.btn} ${type === 'phone' ? styles.active: ''}`} onClick={() => setType('phone')}>
                        <img src="images/phone.svg" alt="phone" />
                    </button>
                    <button className={`${styles.btn} ${type === 'email' ? styles.active: ''}`} onClick={() => setType('email')}>
                    <img src="images/mail.svg" alt="email" />
                    </button>
                </div>
                <Component onNext={onNext}/>
            </div>


        </>
    )
}

export default StepPhoneEmail
