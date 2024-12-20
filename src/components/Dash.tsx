import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAudio,
  faFileVideo,
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBullhorn,
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import dash from "../styles/dash.module.css";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";
import { useOutletContext } from "react-router-dom";
import { FilteredResponseQueryOptions, type SanityDocument } from "@sanity/client";
import { client, urlFor } from "../sanity/client";
import { PortableText } from "@portabletext/react";

interface LayoutContext {
  menuOpen: boolean;
  videoCount: string;
  audioCount: string;
  lastVideoUpdateDate: string;
  lastAudioUpdateDate: string;
}

const sections = [
  {
    title: "Admin Notifications",
    items: [] as SanityDocument[],
  },
  {
    title: "ANBOARD News",
    items: [] as SanityDocument[],
  },
];

const Dash: React.FC = () => {
  const { menuOpen, audioCount, videoCount, lastVideoUpdateDate, lastAudioUpdateDate }: LayoutContext = useOutletContext();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [adminAnnouncements, setAdminAnnouncements] = useState<any[]>([]);
  adminAnnouncements
  const [anboardNews, setAnboardNews] = useState<any[]>([]);
  anboardNews
  const [popupData, setPopupData] = useState<any | null>(null);

  const handleSwipe = (direction: any) => {
    if (direction === "left") {
      setCurrentSectionIndex((prevIndex) =>
        prevIndex === sections.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "right") {
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

  useEffect(() => {
    const getAdminAnnouncement = async () => {
      const POSTS_QUERY = `*[ _type == "admin_notifications"]|order(publishedAt desc)[0...12]{_id, title, body, publishedAt}`;
      const options = { next: { revalidate: 30 } };
      const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options as unknown as FilteredResponseQueryOptions);
      setAdminAnnouncements(posts);
      sections[0] = { title: "Admin Notifications", items: posts };
    };
    getAdminAnnouncement();
  }, []);

  useEffect(() => {
    const getAnboardNews = async () => {
      const POSTS_QUERY = `*[ _type == "anboard_news"]|order(publishedAt desc)[0...12]{_id, title, image, description,body, publishedAt}`;
      const options = { next: { revalidate: 30 } };
      const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options as unknown as FilteredResponseQueryOptions);
      console.log(posts);
      setAnboardNews(posts);
      sections[1] = { title: "ANBROAD News", items: posts };
    };
    getAnboardNews();
  }, []);

  const openPopup = (item: any) => {
    setPopupData(item);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <div className={`${dash.container}  ${dash.small_grid} ${menuOpen ? dash.single_grid : ""}`}>
      <div className={`${dash.audio_video_wrapper} ${dash.small_flex}`}>
        {/* Videos Section */}
        <div className={`${dash.pill}`}>
          <p className={`${dash.pill_title}`}>Videos</p>
          <div className={`${dash.pill_body}`}>
            <div className={`${dash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${dash.pill_icon}`} icon={faFileVideo} />
            </div>
            <div className={`${dash.pill_info}`}>
              <p>{videoCount}</p>
              <small>
                As of {lastVideoUpdateDate.split(" ")[1]} {lastVideoUpdateDate.split(" ")[2]}, {lastVideoUpdateDate.split(" ")[3]}
              </small>
            </div>
          </div>
        </div>

        {/* Audios Section */}
        <div className={`${dash.pill}`}>
          <p className={`${dash.pill_title}`}>Audios</p>
          <div className={`${dash.pill_body}`}>
            <div className={`${dash.pill_icon_wrapper}`}>
              <FontAwesomeIcon className={`${dash.pill_icon}`} icon={faFileAudio} />
            </div>
            <div className={`${dash.pill_info}`}>
              <p>{audioCount}</p>
              <small>
                {lastAudioUpdateDate
                  ? `As of ${lastAudioUpdateDate.split(" ")[1]} ${lastAudioUpdateDate.split(" ")[2]}, ${lastAudioUpdateDate.split(" ")[3]}`
                  : "-"}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className={`${dash.admin_notif_card} ${dash.notif_card}`} {...swipeHandlers}>
        <div className={`${dash.notif_title_wrapper}`}>
          <div className={`${dash.notif_title}`}>
            <FontAwesomeIcon icon={currentSectionIndex === 0 ? faBullhorn : faNewspaper} />
            {currentSection.title}
          </div>
          <div className={dash.notif_title_control}>
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleSwipe("left")} />
            <FontAwesomeIcon icon={faChevronRight} onClick={() => handleSwipe("right")} />
          </div>
        </div>
        <div className={`${dash.notif_body}`}>
          {currentSection.items.map((item, index) => (
            <div className={`${dash.notif_item}`} key={index} onClick={() => openPopup(item)}>
              <img
                src={item.image ? urlFor(item.image).url() : "/images/logo.png"}
                alt=""
                className={`${dash.notif_image}`}
              />
              <div className="item_text_wrapper">
                <div className={`${dash.item_title}`}>{item.title}</div>
                <div className="item_desc">{item.description}</div>
                <small className="item_date">{item.publishedAt.split("T")[0]}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {popupData && (
        <div className={dash.popup_overlay} onClick={closePopup}>
          <div className={dash.popup_content} onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faTimes} className={dash.close_icon} onClick={closePopup} />
            <img
                src={popupData.image ? urlFor(popupData.image).url() : "/images/logo.png"}
                alt=""
                className={`${dash.notif_imagepop}`}
              />
            <h2>{popupData.title}</h2>
            <p> {popupData.description}</p>
            <div className={`${dash.articlebody}`}><PortableText value={popupData.body} /></div>
            <small>{popupData.publishedAt.split("T")[0]}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dash;
