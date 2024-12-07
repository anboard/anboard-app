import { IAudio } from "../interface/IAudio";
import Ivideo from "../interface/IVideo";

export function getMostRecentVidUploadDate(videos: Ivideo[]): Ivideo | null {
    if (videos.length === 0) return null;

    return videos.reduce((mostRecent, current) => {
        if (!current.upload_date) return mostRecent;
        if (!mostRecent || current.upload_date > mostRecent.upload_date) {
            return current;
        }
        return mostRecent;
    }, null as Ivideo | null);
}

export function getMostRecentAudioUploadDate(audios: IAudio[]): IAudio | null {
    if (audios.length === 0) return null;

    return audios.reduce((mostRecent, current) => {
        if (!current.upload_date) return mostRecent;
        if (!mostRecent || current.upload_date > mostRecent.upload_date) {
            return current;
        }
        return mostRecent;
    }, null as IAudio | null);
}
