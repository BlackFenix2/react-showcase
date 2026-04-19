type AudioMap = {
  gameSound: HTMLAudioElement | null;
  crossSound: HTMLAudioElement | null;
  circleSound: HTMLAudioElement | null;
};

const createAudio = (path: string): HTMLAudioElement | null => {
  if (typeof window === "undefined" || typeof Audio === "undefined") {
    return null;
  }

  return new Audio(path);
};

const sounds: AudioMap = {
  gameSound: createAudio("/games/game.mp3"),
  crossSound: createAudio("/games/cross.mp3"),
  circleSound: createAudio("/games/circle.mp3"),
};

const status = {
  muted: false,
};

const forEachAudio = (callback: (audio: HTMLAudioElement) => void) => {
  Object.values(sounds)
    .filter((audio): audio is HTMLAudioElement => audio !== null)
    .forEach(callback);
};

export const checkMute = () => status.muted;

export const muteAll = () => {
  forEachAudio((audio) => {
    audio.load();
    audio.muted = true;
  });
  status.muted = true;
};

export const unMuteAll = () => {
  forEachAudio((audio) => {
    audio.load();
    audio.muted = false;
  });
  status.muted = false;
};

export const toggleMute = () => {
  if (status.muted) {
    unMuteAll();
    return status.muted;
  }
  muteAll();
  return status.muted;
};

export const playCircle = () => {
  sounds.circleSound?.load();
  sounds.circleSound?.play();
};

export const playCross = () => {
  sounds.crossSound?.load();
  sounds.crossSound?.play();
};

export const playGame = () => {
  sounds.gameSound?.load();
  sounds.gameSound?.play();
};
