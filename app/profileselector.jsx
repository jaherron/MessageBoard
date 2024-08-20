"use client";

import { useState, useEffect } from 'react';

export default function ProfileSelector(){
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [newProfileId, setNewProfileId] = useState('');
    const [profileIds, setProfileIds] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const storedProfileIds = JSON.parse(localStorage.getItem('profileIds')) || [];
            setProfileIds(storedProfileIds);
            if (storedProfileIds.length === 0 || !storedProfileIds) {
                alert(`You have no profiles. If you have a profile, you can import it with its ID on this page. Otherwise, click "Create New Profile" to make a new one.`);
            }

            Promise.all(storedProfileIds.map((id) => fetch(`/api/profiles/${id}`)))
                .then((responses) => Promise.all(responses.map((response) => response.json())))
                .then((data) => setProfiles(data));
        }
    }, []);

    const handleSelectedProfileChange = (event) => {
        const profileId = event.target.value;
        const profile = profiles.find(p => p.id === profileId);
        setSelectedProfile(profile);
        console.log(selectedProfile);
    };

    function setDefaultProfile() {
        if (selectedProfile.id !== localStorage.getItem('defaultProfileId')) {
            localStorage.setItem('defaultProfileId', selectedProfile.id);
            alert('Default profile set!');
            window.location.reload();
        }
    }

    function deleteProfileGlobal() {
        if(selectedProfile.id === localStorage.getItem('defaultProfileId')) {
            alert(`You can't delete your active profile. Please switch to another profile and try again.`);
            return;
        }

        if (window.confirm('Are you sure you want to delete this profile FOR EVERYONE? Posts made with it will remain on the board but will be anonymized. You will not be able to re-import this profile.')) {
            fetch(`/api/profiles/${selectedProfile.id}`, {
                method: 'DELETE',
            }).then(() => {
                // Remove the profile ID from the profileIds array
                const updatedProfileIds = profileIds.filter(id => id !== selectedProfile.id);
                // Save the updated array back to localStorage
                localStorage.setItem('profileIds', JSON.stringify(updatedProfileIds));
                // Update the profiles state
                setProfiles(profiles.filter(profile => profile.id !== selectedProfile.id));
                // Clear the selected profile
                setSelectedProfile('');

                alert(`Profile deleted. Its ID was ${selectedProfile.id}. If you really need to recover the profile, contact LittleBit (email on about page) and provide the ID.`);
            });
        }
    }

    function deleteProfileLocal() {
        if(selectedProfile.id === localStorage.getItem('defaultProfileId')) {
            alert(`You can't delete your active profile. Please switch to another profile and try again.`);
            return;
        }

        if (window.confirm('Are you sure you want to delete this profile from your device? Posts made with it will remain intact, and it can be re-imported as long as you keep its ID.')) {
            // Remove the profile ID from the profileIds array
            const updatedProfileIds = profileIds.filter(id => id !== selectedProfile.id);
            // Save the updated array back to localStorage
            localStorage.setItem('profileIds', JSON.stringify(updatedProfileIds));
            // Update the profiles state
            setProfiles(profiles.filter(profile => profile.id !== selectedProfile.id));

            alert(`Profile deleted from this browser. Its ID was ${selectedProfile.id}. Keep this ID if you want to re-import the profile.`);

            // Clear the selected profile
            setSelectedProfile('');
        }
    }

    const handleSaveProfileId = (event) => {
        event.preventDefault();
        saveProfileIdToBrowser(newProfileId);
    };

    const handleNewProfileIdChange = (event) => {
        setNewProfileId(event.target.value);
    };

    function localDataWipe() {
        if (window.confirm(`Do you REALLY want to WIPE ALL OF THIS WEBSITE'S LOCAL DATA from your device? This will delete all profiles from this device. Posts made with your profiles will remain intact, and you can re-import profiles with their IDs.`)) {
            localStorage.clear();
            alert('Local data wiped. You will be sent to the main LittleBit website.');
            window.location.href = 'https://littlebitstudios.com';
        }
    }

    function globalDataWipe() {
        if (window.confirm(`Do you REALLY want to DELETE ALL OF YOUR PROFILES from the server? This will delete all profiles your browser holds FOR EVERYONE. Posts made with your profiles remain on the board but will be anonymized. You will not be able to re-import these profiles.`)) {
            const deleteRequests = profileIds.map(id => 
                fetch(`/api/profiles/${id}`, {
                    method: 'DELETE',
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to delete profile with ID ${id}`);
                    }
                    return response;
                })
            );
    
            Promise.all(deleteRequests)
                .then(() => {
                    localStorage.clear();
                    alert('All profiles your browser held have been deleted from the server. You will be sent to the main LittleBit website. Contact LittleBit (email on about page) with a profile ID if you need to recover any profiles.');
                    window.location.href = 'https://littlebitstudios.com';
                })
                .catch(error => {
                    console.error('Error deleting profiles:', error);
                    alert('Something went wrong. Your profiles may not have been deleted. Please try again later.');
                });
        }
    }

    function saveProfileIdToBrowser(id) {
        if (profileIds.includes(id)) {
            alert('Profile already imported.');
            return;
        } else {
            fetch(`/api/profiles`)
                .then((response) => response.json())
                .then((data) => {
                    if (!data.find(profile => profile.id === id)) {
                        alert('That profile does not exist! Make sure you entered the correct ID.');
                        return;
                    } else {
                        // Proceed with importing the profile
                        profileIds.push(id);
                        localStorage.setItem('profileIds', JSON.stringify(profileIds));

                        fetch(`/api/profiles/${id}`)
                            .then((response) => response.json())
                            .then((data) => {
                                alert(`Profile imported. Welcome back, ${data.displayname}! The page will refresh.`);
                                window.location.reload();
                            });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching profiles:', error);
                    alert('An error occurred while fetching profiles. Please try again later.');
                });
        }
    }

    return (
        <>
            <h2>Import Profile</h2>
            <form onSubmit={handleSaveProfileId}>
                <input
                    size="30"
                    type="text" 
                    value={newProfileId} 
                    onChange={handleNewProfileIdChange} 
                    placeholder="Enter Profile ID to import"  
                    required 
                />
                <button type="submit">Save</button><br/>
            </form>
            <h2>Edit Existing Profiles</h2>
            <select value={selectedProfile.id || ''} onChange={handleSelectedProfileChange}>
                <option value="" disabled>Select a profile</option>
                {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                        {profile.displayname} (@{profile.username})
                    </option>
                ))}
            </select>
            {selectedProfile.id && (
                <div>
                    <p>
                        <img width="64" height="64" src={selectedProfile.profilePicture || 'https://img.icons8.com/fluency/64/person-male.png'} alt="Profile Picture" /><br />
                        ID: {selectedProfile.id}<br />
                        Display Name: {selectedProfile.displayname}<br />
                        Username: {selectedProfile.username}<br />
                        Profile Picture URL: {selectedProfile.profilePicture || 'None'}
                    </p>
                    <a className="button" href={`/profile/${selectedProfile.id}`}>Edit Profile</a>
                    <button className={selectedProfile.id === localStorage.getItem('defaultProfileId') ? 'grey-button' : ''} onClick={setDefaultProfile}>
                        {selectedProfile.id === localStorage.getItem('defaultProfileId') ? 'Profile in use' : 'Use this Profile'}
                    </button>
                    <a className="button" href={`/profile/import/qrgen/${selectedProfile.id}`}>Generate QR Code</a>
                    <br/>
                    <button className="destructive-button" onClick={deleteProfileGlobal}>Delete Profile (for everyone)</button>
                    <button className="destructive-button" onClick={deleteProfileLocal}>Delete Profile (this device)</button>
                </div>
            )}
            <h2>Advanced Options</h2>
            <button className="destructive-button" onClick={localDataWipe}>Remove ALL PROFILES (this browser)</button>
            <button className="destructive-button" onClick={globalDataWipe}>Remove ALL PROFILES (for everyone)</button>
        </>
    );
}