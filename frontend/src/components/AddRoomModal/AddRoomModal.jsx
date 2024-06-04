import React, { useState } from 'react'
import styles from './AddRoomModal.module.css'
import TextInput from '../shared/TextInput/TextInput'
import { createRoom as create } from '../../http'
import { useHistory } from 'react-router-dom'

const AddRoomModal = ({ onClose }) => {
    const history = useHistory()

    const [roomType, setRoomType] = useState('open')
    const [topic, setTopic] = useState('')

    async function createRoom() {
        try {
            if (!topic) return;
            const { data } = await create({ topic, roomType })
            history.push(`/room/${data.id}`)
            console.log(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        < div className={styles.modalMask} >
            <div className={styles.modalBody}>
                <button onClick={onClose} className={styles.colseButton}>
                    <img src="/images/close.png" alt="" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>Enter a title for the room</h3>
                    <TextInput fullwidth="true" value={topic} onChange={(e) => setTopic(e.target.value)} />
                    <h3 className={styles.subHeading}>Select room</h3>
                    <div className={styles.roomTypes}>
                        <div onClick={() => setRoomType('open')} className={`${styles.typeBox} ${roomType === 'open' ? styles.active : ''}`}>
                            <img width='45' src="/images/globe.png" alt="globe" />
                            <span>Open</span>
                        </div>
                        <div onClick={() => setRoomType('social')} className={`${styles.typeBox} ${roomType === 'social' ? styles.active : ''}`}>
                            <img width='45' src="/images/social.png" alt="social" />
                            <span>Social</span>
                        </div>
                        <div onClick={() => setRoomType('private')} className={`${styles.typeBox} ${roomType === 'private' ? styles.active : ''}`}>
                            <img width='45' src="/images/private.png" alt="private" />
                            <span>Private</span>
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <h4>Start a room, open to everyone</h4>
                    <button onClick={createRoom} className={styles.footerButton}>
                        <img width='35' src="/images/broadcast.png" alt="broadcast" />
                        <span>Start room</span>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default AddRoomModal
