export type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  getVolume: () => number;
  setVolume: (n: number) => void;
  setPlaybackQuality?: (q: string) => void;
  destroy: () => void;
};

export const YT_PLAYING = 1;
export const YT_PAUSED = 2;
export const YT_BUFFERING = 3;
export const YT_ENDED = 0;

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: {
          height: string;
          width: string;
          videoId: string;
          host?: string;
          playerVars: Record<string, number | string>;
          events: {
            onReady?: (e: { target: YtPlayer }) => void;
            onStateChange?: (e: { data: number }) => void;
            onError?: () => void;
          };
        },
      ) => YtPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let loadPromise: Promise<void> | null = null;

export function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.append(s);
    }
    if (window.YT?.Player) resolve();
  });

  return loadPromise;
}

export function createYtPlayer(
  element: HTMLElement,
  videoId: string,
  handlers: {
    onReady: (player: YtPlayer) => void;
    onStateChange: (state: number) => void;
    onError: () => void;
  },
): YtPlayer | null {
  if (!window.YT?.Player) return null;
  return new window.YT.Player(element, {
    height: "1",
    width: "1",
    videoId,
    host: "https://www.youtube-nocookie.com",
    playerVars: {
      playsinline: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
      origin: window.location.origin,
    },
    events: {
      onReady: (e) => handlers.onReady(e.target),
      onStateChange: (e) => handlers.onStateChange(e.data),
      onError: handlers.onError,
    },
  });
}
