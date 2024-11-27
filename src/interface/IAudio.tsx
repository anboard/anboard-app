export interface AudioContext {
    audioList: IAudio[];
    setAudioList: React.Dispatch<React.SetStateAction<IAudio[]>>;
  }
  
export interface IAudio {
    id: string;
    title: string;
    description: string;
    url: string;
  }