import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import config from '../config';

const ProfilePage: React.FC = () => {
    const { accessToken } = useAuth();

    // State variables to hold form input values
    const [upn, setUpn] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [baseLocation, setBaseLocation] = useState('');
    const [associationChapter, setAssociationChapter] = useState('');
    const [postHeld, setPostHeld] = useState('');
    const [radioShows, setRadioShows] = useState<string[]>([]);
    const [station, setStation] = useState('');
    const [yearStarted, setYearStarted] = useState<number | ''>('');
    const [educationalBackground, setEducationalBackground] = useState('');

    // State variable for error messages
    const [error, setError] = useState('');

    // Form submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous error

        // Create the profile data object
        const profileData = {
            upn,
            name,
            date_of_birth: new Date(dateOfBirth).toISOString(), // Convert to ISO string
            state_of_origin: stateOfOrigin,
            local_government: localGovernment,
            base_location: baseLocation,
            association_chapter: associationChapter,
            post_held: postHeld,
            radio_shows: radioShows,
            station,
            year_started: yearStarted,
            educational_background: educationalBackground
        };

        try {
            // Send data to the server
            const response = await fetch(`${config.API_BASE_URL}/profile`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            // Check if response is ok
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred.');
                return;
            }

            const result = await response.json();
            if (result.status === 'success') {
                alert('Profile submitted successfully!');
            } else {
                // Handle validation or server errors
                setError(result.message || 'An error occurred.');
            }

        } catch (error: any) {
            // Handle network errors
            console.error('Fetch Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={upn}
                    onChange={(e) => setUpn(e.target.value)}
                    placeholder="UPN"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
            </div>
            <div>
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={stateOfOrigin}
                    onChange={(e) => setStateOfOrigin(e.target.value)}
                    placeholder="State of Origin"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={localGovernment}
                    onChange={(e) => setLocalGovernment(e.target.value)}
                    placeholder="Local Government"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={baseLocation}
                    onChange={(e) => setBaseLocation(e.target.value)}
                    placeholder="Base Location"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={associationChapter}
                    onChange={(e) => setAssociationChapter(e.target.value)}
                    placeholder="Association Chapter"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={postHeld}
                    onChange={(e) => setPostHeld(e.target.value)}
                    placeholder="Post Held"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={radioShows.join(', ')}
                    onChange={(e) => setRadioShows(e.target.value.split(',').map(show => show.trim()))}
                    placeholder="Radio Shows (comma-separated)"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    placeholder="Station"
                    required
                />
            </div>
            <div>
                <input
                    type="number"
                    value={yearStarted}
                    onChange={(e) => setYearStarted(e.target.value ? parseInt(e.target.value, 10) : '')}
                    placeholder="Year Started"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    value={educationalBackground}
                    onChange={(e) => setEducationalBackground(e.target.value)}
                    placeholder="Educational Background"
                    required
                />
            </div>
            <button type="submit">Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default ProfilePage;
 