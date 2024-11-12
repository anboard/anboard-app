import React from "react"
import IProfile from "../interface/IProfile"

const ProfilePageView: React.FC<IProfile> = ({
    name,
    date_of_birth,
    state_of_origin,
    local_government,
    base_location,
    association_chapter,
    post_held,
    radio_shows,
    station,
    year_started,
    educational_background,
}) => {
    return  (
        <div>
            <div className="personal-profile-section">
                <h2>Personal</h2>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Name</h3>
                    <p className="profile-data-value">{name}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Postion held</h3>
                    <p className="profile-data-value">{post_held}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">State of Origin</h3>
                    <p className="profile-data-value">{state_of_origin}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Local Government</h3>
                    <p className="profile-data-value">{local_government}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Date of Birth</h3>
                    <p className="profile-data-value">{date_of_birth && date_of_birth.split('T')[0]}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Educational Background</h3>
                    <p className="profile-data-value">{educational_background}</p>
                </div>
            </div>

            <div className="station-profile-section">
                <h2>Station</h2>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Station Name</h3>
                    <p className="profile-data-value">{station}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Base Location</h3>
                    <p className="profile-data-value">{base_location}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Association Chapter</h3>
                    <p className="profile-data-value">{association_chapter}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Year Started</h3>
                    <p className="profile-data-value">{year_started}</p>
                </div>
                <div className="profile-data-group">
                    <h3 className="profile-data-label">Radio Shows</h3>
                    <ol>
                        {
                        radio_shows &&
                        radio_shows.map((show) => (
                            <li key={show}>{show}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageView