import React from "react";
import dash from "../styles/dash.module.css";


const DashNotifCard: React.FC = () => {

    return (
        <div className={`${dash.notif_body}`}>
          <div className={`${dash.notif_item}`}>
            <img src="/images/logo.png" alt="log" className={`${dash.notif_image}`} />
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
          </div>
        </div>
    )
}

export default DashNotifCard