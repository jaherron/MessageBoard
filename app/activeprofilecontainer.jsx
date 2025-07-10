"use client";

import { useState, useEffect, useRef } from 'react';

export default function ActiveProfileContainer() {
    const [activeProfile, setActiveProfile] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const profileId = localStorage.getItem('defaultProfileId');
            if (profileId) {
                fetch(`/api/profiles`)
                    .then((response) => response.json())
                    .then((profiles) => {
                        if (profiles.find((profile) => profile.id === profileId)) {
                            fetch(`/api/profiles/${profileId}`)
                                .then((response) => response.json())
                                .then((data) => {
                                    setActiveProfile(data);
                                });
                        } else {
                            console.error('Invalid profile ID:', profileId);
                            const anonProfile = {
                                displayname: 'Invalid profile',
                                username: 'unknown',
                                profilePicture: 'https://img.icons8.com/fluency/48/person-male.png',
                            };
                            setActiveProfile(anonProfile);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching profiles:', error);
                        const anonProfile = {
                            displayname: 'Error loading profile',
                            username: 'unknown',
                            profilePicture: 'https://img.icons8.com/fluency/48/person-male.png',
                        };
                        setActiveProfile(anonProfile);
                    });
            } else {
                const anonProfile = {
                    displayname: 'No profile set',
                    username: 'anonymous',
                    profilePicture: 'https://img.icons8.com/fluency/48/person-male.png'
                };
                setActiveProfile(anonProfile);
            }
        }
    }, []);

    return (
        <>
            <a href="/profile" title="Currently active profile; click to open Profile Manager">
                <div className="active-profile-container">
                    <img width="48" height="48" src={activeProfile.profilePicture || 'https://img.icons8.com/fluency/48/person-male.png'} />
                    <div className="text-container">
                        <strong>{activeProfile.displayname}</strong>
                        <br />@{activeProfile.username}
                    </div>
                </div>
            </a>
        </>
    )
}