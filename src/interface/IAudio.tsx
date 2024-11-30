export interface AudioContext {
  audioList: IAudio[];
  setAudioList: React.Dispatch<React.SetStateAction<IAudio[]>>;
}

export interface IAudio {
  title: string;
  description?: string;
  audio_name: string;
  file_name: string;
  file_path: string;
  mime_type: string;
  size: number;
  upload_date?: Date;
}
