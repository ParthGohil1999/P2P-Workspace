import React, { useState, useEffect } from 'react'
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import RoomCard from '../../components/RoomCard/RoomCard';
import styles from './Rooms.module.css'
import { getAllRooms } from '../../http';

// const rooms = [
//     {
//         id: 1,
//         topic: 'Which framework best for frontend ?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/demo.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/demo.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 3,
//         topic: 'What’s new in machine learning?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/demo.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/demo.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 4,
//         topic: 'Why people use stack overflow?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/demo.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/demo.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 5,
//         topic: 'Artificial inteligence is the future?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/demo.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/demo.png',
//             },
//         ],
//         totalPeople: 40,
//     },
// ];

const Rooms = () => {

    const [showModal, setShowModal] = useState(false)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await getAllRooms()
            setRooms(data);
        }
        fetchRooms();
    }, [])
    function openModal() {
        setShowModal(true)
    }
    return (
        <>
            <div className='container'>
                <div className={styles.roomHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>
                            All homie's rooms
                        </span>
                        <div className={styles.searchBox}>
                            <img src="/images/search.png" alt="search" />
                            <input type="text" className={styles.searchInputs} placeholder='Search rooms' />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button onClick={openModal} className={styles.startRoomButton}>
                            <img src="/images/startRoom.svg" width='20' alt="add-room" />
                            <span>Create a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {
                        rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))
                    }
                </div>
            </div>
            {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
        </>
    )
}

export default Rooms