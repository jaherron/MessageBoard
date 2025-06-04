"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code'; // changed import
import '/styles/main.css';
import ProfileContainer from '/app/profilecontainer';
import Head from 'next/head';

export default function Page() {
    const params = useRouter();
    const [profileId, setProfileId] = useState('');
    const [profile, setProfile] = useState({});
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        if (params.query.id) {
            setProfileId(params.query.id);
        }
    }, [params.query.id]);

    useEffect(() => {
        if (profileId) {
            fetch(`/api/profiles/${profileId}`).then((response) => response.json()).then((data) => {
                setProfile(data);
            });
        }
    }, [profileId]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Profile QR Code - LittleBit's Message Board</title>
                <meta name="description" content="A very simple message board." />
            </Head>
            <div className="header-container">
                <a href="/profile" title="Return to Profile Manager" className='image-button'><img src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF" /></a>
                <h1 style={{ marginRight: "2%" }} className="hide-on-mobile">Edit Profile</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginBottom: "5px" }}>
                    <ProfileContainer id={profileId} />
                    <p style={{ marginTop: "7px" }}>Scan the QR code below to import this profile to another device.</p>
                </div>
                {origin && (
                    <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
                        <QRCode value={`${origin}/profile/import/${profileId}`} />
                    </div>
                )}
            </div>
        </>
    );
}