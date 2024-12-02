import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAudio,
  faFileVideo,
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
// import { faBullhorn, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import dash from "../styles/dash.module.css";
// import DashNotifCard from "./DashNotifCard";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";

const sections = [
  {
    title: "Admin Notifications",
    items: [
      { title: "A titular title", body: "Corresponding body for the titular title", date: "Just now" },
      { title: "Another title", body: "Another corresponding body", date: "Yesterday" },
    ],
  },
  {
    title: "ANBOARD News",
    items: [
      { title: "Breaking News", body: "Latest updates about ANBOARD activities", date: "Today" },
      { title: "Event Recap", body: "Details about yesterday's ANBOARD event", date: "Yesterday" },
    ],
  },
];


const Dash: React.FC = () => {

  // const [isAdmin, setIsAdmin] = useState(true)

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleSwipe = (direction: any) => {
    if (direction === "left") {
      // Move to the next section
      setCurrentSectionIndex((prevIndex) =>
        prevIndex === sections.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "right") {
      // Move to the previous section
      setCurrentSectionIndex((prevIndex) =>
        prevIndex === 0 ? sections.length - 1 : prevIndex - 1
      );
    }
  };

  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  const currentSection = sections[currentSectionIndex];
  
  return (
    <div className={`${dash.container} ${dash.small_grid}`}>
      <div className={`${dash.audio_video_wrapper} ${dash.small_flex}`}>
        <div className={`${dash.pill}`}>
          <p className={`${dash.pill_title}`}>Vidoes</p>
          <div className={`${dash.pill_body}`}>
            <div className={`${dash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${dash.pill_icon}`} icon={faFileVideo} />
            </div>
            <div className={`${dash.pill_info}`}>
              <p>15</p>
              <small>As of Dec 1, 2024</small>
            </div>
          </div>
        </div>

        <div className={`${dash.pill}`}>
          <p className={`${dash.pill_title}`}>Audios</p>
          <div className={`${dash.pill_body}`}>
            <div className={`${dash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${dash.pill_icon}`} icon={faFileAudio} />
            </div>
            <div className={`${dash.pill_info}`}>
              <p>15</p>
              <small>As of Dec 1, 2024</small>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* ADMIN NOTIFICATIONS */}
      {/* <div className={`${dash.admin_notif_card} ${dash.notif_card}`}>
        <div className={`${dash.notif_title}`}>
          <FontAwesomeIcon icon={faBullhorn} />
          Admin Notifications
          <FontAwesomeIcon icon={faChevronDown} onClick={() => console.log('clicker')} />
        </div>
        {isAdmin ? <DashNotifCard /> : 'ANBOARD news'}
      </div> */}

      {/* ANBROAD NEWS */}
      <div className={`${dash.admin_notif_card} ${dash.notif_card}`} {...swipeHandlers} >
        <div className={`${dash.notif_title}`}>
          <FontAwesomeIcon icon={faNewspaper} />
          {/* ANBOARD News */}
          {currentSection.title}
        </div>
        <div className={`${dash.notif_body}`}>
          {currentSection.items.map((item, index) => (
            <div className={`${dash.notif_item}`} key={index}>
            <img src="/images/logo.png" alt="" className={`${dash.notif_image}`} />
            <div className="item_text_wrapper">
              <div className={`${dash.item_title}`}>{item.title}</div>
              <div className="item_desc">
                {item.body}
              </div>
              <small className="item_date">
                {item.date}
              </small>
            </div>
          </div>
          ))}
          {/* <div className={`${dash.notif_item}`}>
            <img src="/images/logo.png" alt="" className={`${dash.notif_image}`} />
            <div className="item_text_wrapper">
              <div className={`${dash.item_title}`}>A titular title</div>
              <div className="item_desc">
                Corresponding body for the titular title
              </div>
              <small className="item_date">
                Just now
              </small>
            </div>
          </div>
          <div className={`${dash.notif_item}`}>
            <img src="/images/logo.png" alt="" className={`${dash.notif_image}`} />
            <div className="item_text_wrapper">
              <div className={`${dash.item_title}`}>A titular title</div>
              <div className="item_desc">
                Corresponding body for the titular title
              </div>
              <small className="item_date">Yesterday</small>
            </div>
          </div>
          <div className={`${dash.notif_item}`}>
            <img src="/images/logo.png" alt="" className={`${dash.notif_image}`} />
            <div className="item_text_wrapper">
              <div className={`${dash.item_title}`}>A titular title</div>
              <div className="item_desc">
                Corresponding body for the titular title
              </div>
              <small className="item_date">
                10.11.24
              </small>
            </div>
          </div> */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dash;