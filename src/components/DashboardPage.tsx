import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../AuthContext";
import config from '../config';
import styles from "../styles/dashboard.module.css";
import logo from '/images/logo.png';
import nas from '/images/nas.jpg';
import IProfile from "../interface/IProfile"




// navigating a single page application

// import Home from  "./DashboardPage";
import Profile from './ProfilePage';
import Video from './VideoList';
// import Picture from './VideoPlayer';
// import Audio from 'gckhj';

// navigating a single page application

const DashboardPage: React.FC = () => {
    const [broadcaster, setBroadcaster] = useState<{upn: string, email: string}>({upn: '', email: ''});
    const [loading, setLoading] = useState(true);
    const { accessToken, logout } = useAuth();
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [searchVisible, setSearchVisible] = useState(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const searchPopupRef = useRef<HTMLDivElement | null>(null);

        // Initialize state
    const [profile, setProfile] = useState<IProfile>({name: '',
        date_of_birth: '',
        state_of_origin: '',
        local_government: '',
        base_location: '',
        association_chapter: '',
        post_held: '',
        radio_shows: [],
        station: '',
        year_started: 0 | 0,
        educational_background: ''});
      
        // Handle input change




    
    const renderContent = () => {
        switch (currentPage) {
            case 'picture':
                return <Video />;
                case 'profile':
                    return <Profile />;
                    case 'video':
                        return <Video />;
                        default:
                            return <p>Welcome to the dashboard!</p>;
                    }
                };
                
                // Sample list of members
                const members = [
        { name: "John Doe", id: "12345" },
        { name: "Jane Smith", id: "67890" },
        { name: "Alice Johnson", id: "54321" }
    ];

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${config.API_BASE_URL}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    setError(error.error);
                    return;
                }
                
                const { broadcaster } = await response.json();
                setBroadcaster(broadcaster);
            } catch (error: any) {
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [accessToken]);
    
    const toggleSearchPopup = () => {
        setSearchVisible(!searchVisible);
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchPopupRef.current &&
        !searchPopupRef.current.contains(event.target as Node)
      ) {
        setSearchVisible(false);
      }
    };
    useEffect(() => {
        if (searchVisible) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
          };
    }, [searchVisible]);

    const searchMember = () => {
        const searchInput = searchInputRef.current?.value.toLowerCase() || '';
        const foundMember = members.find(member =>
            member.name.toLowerCase().includes(searchInput) || member.id.includes(searchInput)
        );

        const searchResult = document.getElementById("searchresultID") as HTMLElement;
        if (foundMember) {
            searchResult.innerHTML = `<p>Member found: ${foundMember.name} (ID: ${foundMember.id})</p>`;
            searchResult.style.color = "green";
        } else {
            searchResult.innerHTML = "<p>Member not found. Please try again.</p>";
            searchResult.style.color = "red";
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, name: e.target.value });
    };
    

    return (
        <div>
            <header className={styles.headerdashboard}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <div className={styles.headertext}>Welcome {broadcaster.upn}</div>
                <div className={styles.headerright}>
                    <div className={styles.icon} onClick={toggleSearchPopup}>
                        <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                        </svg>
                    </div>
                    <div className={styles.icon}>
                <div className={styles.iconcontainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                        <path d="M 25 0 C 22.800781 0 21 1.800781 21 4 C 21 4.515625 21.101563 5.015625 21.28125 5.46875 C 15.65625 6.929688 12 11.816406 12 18 C 12 25.832031 10.078125 29.398438 8.25 31.40625 C 7.335938 32.410156 6.433594 33.019531 5.65625 33.59375 C 5.265625 33.878906 4.910156 34.164063 4.59375 34.53125 C 4.277344 34.898438 4 35.421875 4 36 C 4 37.375 4.84375 38.542969 6.03125 39.3125 C 7.21875 40.082031 8.777344 40.578125 10.65625 40.96875 C 13.09375 41.472656 16.101563 41.738281 19.40625 41.875 C 19.15625 42.539063 19 43.253906 19 44 C 19 47.300781 21.699219 50 25 50 C 28.300781 50 31 47.300781 31 44 C 31 43.25 30.847656 42.535156 30.59375 41.875 C 33.898438 41.738281 36.90625 41.472656 39.34375 40.96875 C 41.222656 40.578125 42.78125 40.082031 43.96875 39.3125 C 45.15625 38.542969 46 37.375 46 36 C 46 35.421875 45.722656 34.898438 45.40625 34.53125 C 45.089844 34.164063 44.734375 33.878906 44.34375 33.59375 C 43.566406 33.019531 42.664063 32.410156 41.75 31.40625 C 39.921875 29.398438 38 25.832031 38 18 C 38 11.820313 34.335938 6.9375 28.71875 5.46875 C 28.898438 5.015625 29 4.515625 29 4 C 29 1.800781 27.199219 0 25 0 Z M 25 2 C 26.117188 2 27 2.882813 27 4 C 27 5.117188 26.117188 6 25 6 C 23.882813 6 23 5.117188 23 4 C 23 2.882813 23.882813 2 25 2 Z M 27.34375 7.1875 C 32.675781 8.136719 36 12.257813 36 18 C 36 26.167969 38.078125 30.363281 40.25 32.75 C 41.335938 33.941406 42.433594 34.6875 43.15625 35.21875 C 43.515625 35.484375 43.785156 35.707031 43.90625 35.84375 C 44.027344 35.980469 44 35.96875 44 36 C 44 36.625 43.710938 37.082031 42.875 37.625 C 42.039063 38.167969 40.679688 38.671875 38.9375 39.03125 C 35.453125 39.753906 30.492188 40 25 40 C 19.507813 40 14.546875 39.753906 11.0625 39.03125 C 9.320313 38.671875 7.960938 38.167969 7.125 37.625 C 6.289063 37.082031 6 36.625 6 36 C 6 35.96875 5.972656 35.980469 6.09375 35.84375 C 6.214844 35.707031 6.484375 35.484375 6.84375 35.21875 C 7.566406 34.6875 8.664063 33.941406 9.75 32.75 C 11.921875 30.363281 14 26.167969 14 18 C 14 12.261719 17.328125 8.171875 22.65625 7.21875 C 23.320313 7.707031 24.121094 8 25 8 C 25.886719 8 26.679688 7.683594 27.34375 7.1875 Z M 21.5625 41.9375 C 22.683594 41.960938 23.824219 42 25 42 C 26.175781 42 27.316406 41.960938 28.4375 41.9375 C 28.792969 42.539063 29 43.25 29 44 C 29 46.222656 27.222656 48 25 48 C 22.777344 48 21 46.222656 21 44 C 21 43.242188 21.199219 42.539063 21.5625 41.9375 Z"></path>
                    </svg>
                </div>
                </div>
                    <img src={nas} alt="Profile Picture" className={styles.profilepic} />
                </div>
            </header>

            {searchVisible && (
                <div  className={styles.searchpopup}>
                    <input
                        type="text"
                        className={styles.searchinput}
                        placeholder="Search for members..."
                        ref={searchInputRef}
                    />
                    <button onClick={searchMember}>Search</button>
                    <div id="searchresultID" className={styles.searchresult}></div>
                </div>
            )}

            <section className={styles.sidebar}>
        <div className={styles.sidebarmain}>

            <div className={styles.profilecontainer}>
                <img src={nas} alt="User Profile" className={styles.profileimage} />
                <h3 className={styles.username}>{profile.name || 'Guest'}</h3>
             </div>
        
            <ul className={styles.linkslist}>
                <li onClick={() => setCurrentPage('profile')}><a className={styles.linkitem}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-people-fill${styles.customanbicon}`} viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg> Profile</a></li>
                <li onClick={() => setCurrentPage('video')}><a className={styles.linkitem}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-play-circle${styles.customanbicon}`} viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/></svg>Videos</a></li>

                <li onClick={() => setCurrentPage('picture')}><a className={styles.linkitem}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-image${styles.customanbicon}`} viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/></svg>Pictures</a></li>
                <li onClick={() => setCurrentPage('audio')}><a className={styles.linkitem}><svg className="w-6 h-6 text-gray-800 white:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2Z"/></svg> Audio</a></li>
            </ul>
        
            <div className={styles.footerlink}>
                <a onClick={() => logout()} href="" className={styles.linkitem}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-power${styles.customanbicon}`} viewBox="0 0 16 16"><path d="M7.5 1v7h1V1z"/><path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/></svg>Log Out</a>
            </div>
        </div>
    </section>

    {/* Main content */}
    <section className={styles.maincontent}>
    {renderContent()}

    </section>
    {/* Main content */}   

        </div>
    );
};

export default DashboardPage;
