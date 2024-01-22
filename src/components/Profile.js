import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Profile({ userId }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/vi/profile/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);
    console.log(userId)
    return (
        <div>
            <div className='container my-5'>
                <h2>User Profile</h2>
                {user ? (
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ) : (
                    <p>Loading user profile...</p>
                )}
            </div>
        </div>
    )
}

export default Profile