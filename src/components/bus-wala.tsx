import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BUMPER_LINES } from "@/lib/bumper-lines";
import { formatTime, shuffledOrder } from "@/lib/format-time";
import { coverUrl, TRACKS, youtubeMixUrl, type Track } from "@/lib/tracks";
import {
  createYtPlayer,
  loadYouTubeApi,
  YT_BUFFERING,
  YT_ENDED,
  YT_PAUSED,
  YT_PLAYING,
  type YtPlayer,
} from "@/lib/youtube-player";

const HORN_SRC = "/horn.mp3";

function currentTrack(order: number[], pos: number): Track {
  const idx = order[pos] ?? 0;
  return TRACKS[idx] ?? TRACKS[0]!;
}

export function BusWala() {
  const [order, setOrder] = useState<number[]>(() =>
    Array.from({ length: TRACKS.length }, (_, i) => i),
  );
  const [pos, setPos] = useState(0);
  const [shuffleOn, setShuffleOn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [hornOn, setHornOn] = useState(false);
  const [logoShake, setLogoShake] = useState(false);
  const [clock, setClock] = useState("—");
  const [listeners, setListeners] = useState(240);
  const [tCur, setTCur] = useState(0);
  const [tDur, setTDur] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bg, setBg] = useState(0);
  const [bumper, setBumper] = useState(BUMPER_LINES[0]!);
  const [bumperSwap, setBumperSwap] = useState(false);

  const ytRef = useRef<YtPlayer | null>(null);
  const startedRef = useRef(false);
  const playingRef = useRef(false);
  const orderRef = useRef(order);
  const posRef = useRef(pos);
  const seekingRef = useRef(false);
  const sampleRef = useRef({ t: 0, d: 0, at: 0, playing: false });
  const fillRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef<HTMLDivElement>(null);
  const ytHostRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const hornBufRef = useRef<AudioBuffer | null>(null);
  const hornBytesRef = useRef<ArrayBuffer | null>(null);
  const hornSrcRef = useRef<AudioBufferSourceNode | null>(null);
  const duckFromRef = useRef<number | null>(null);
  const duckTimerRef = useRef<number | null>(null);
  const bumperOrderRef = useRef<number[]>([]);
  const bumperPosRef = useRef(0);
  const goRef = useRef<(n: number) => void>(() => {});

  orderRef.current = order;
  posRef.current = pos;
  playingRef.current = playing;

  const track = currentTrack(order, pos);
  const mixUrl = useMemo(() => youtubeMixUrl(TRACKS.map((t) => t.id)), []);

  const samplePlayer = useCallback(() => {
    const yt = ytRef.current;
    if (!yt || typeof yt.getCurrentTime !== "function") return;
    try {
      const t = yt.getCurrentTime() || 0;
      const d = yt.getDuration() || 0;
      sampleRef.current = { t, d, at: performance.now(), playing: playingRef.current };
      setTCur(t);
      if (d > 0) {
        setTDur(d);
        setProgress(Math.max(0, Math.min(1, t / d)));
      }
    } catch {
      /* player not ready */
    }
  }, []);

  const go = useCallback(
    (nextPos: number) => {
      const ord = orderRef.current;
      if (!ord.length) return;
      const wrapped = ((nextPos % ord.length) + ord.length) % ord.length;
      setPos(wrapped);
      posRef.current = wrapped;
      const next = currentTrack(ord, wrapped);
      setSwapping(true);
      window.setTimeout(() => setSwapping(false), 240);
      setBg((b) => (b + 1) % 2);
      setTCur(0);
      setProgress(0);
      const yt = ytRef.current;
      if (!yt) return;
      try {
        if (startedRef.current) {
          yt.loadVideoById(next.id);
          setPlaying(true);
          playingRef.current = true;
        } else {
          yt.cueVideoById(next.id);
        }
        yt.setPlaybackQuality?.("tiny");
      } catch {
        /* ignore */
      }
    },
    [],
  );
  goRef.current = go;

  useEffect(() => {
    let cancelled = false;
    let player: YtPlayer | null = null;
    let sampleTimer: number | undefined;
    let wait: number | undefined;
    const mount = document.createElement("div");
    ytHostRef.current?.appendChild(mount);

    loadYouTubeApi().then(() => {
      if (cancelled) return;
      const first = currentTrack(orderRef.current, posRef.current);
      player = createYtPlayer(mount, first.id, {
        onReady: (p) => {
          ytRef.current = p;
          setReady(true);
          try {
            p.setPlaybackQuality?.("tiny");
          } catch {
            /* ignore */
          }
        },
        onStateChange: (state) => {
          if (state === YT_PLAYING) {
            setPlaying(true);
            playingRef.current = true;
            startedRef.current = true;
            try {
              ytRef.current?.setPlaybackQuality?.("tiny");
            } catch {
              /* ignore */
            }
          } else if (state === YT_PAUSED) {
            setPlaying(false);
            playingRef.current = false;
          } else if (state === YT_BUFFERING) {
            /* keep playing flag */
          } else if (state === YT_ENDED) {
            goRef.current(posRef.current + 1);
          }
        },
        onError: () => {
          if (startedRef.current) goRef.current(posRef.current + 1);
        },
      });
      if (player) {
        ytRef.current = player;
        wait = window.setInterval(() => {
          if (typeof player?.playVideo === "function") {
            setReady(true);
            try {
              player.setPlaybackQuality?.("tiny");
            } catch {
              /* ignore */
            }
            if (wait) window.clearInterval(wait);
          }
        }, 200);
        window.setTimeout(() => {
          if (wait) window.clearInterval(wait);
        }, 12000);
      }
      sampleTimer = window.setInterval(samplePlayer, 250);
    });

    return () => {
      cancelled = true;
      if (sampleTimer) window.clearInterval(sampleTimer);
      if (wait) window.clearInterval(wait);
      try {
        player?.destroy();
      } catch {
        /* ignore */
      }
      mount.remove();
    };
  }, [samplePlayer]);

  useEffect(() => {
    let raf = 0;
    const paint = () => {
      const s = sampleRef.current;
      let t = s.t;
      if (s.playing && !seekingRef.current) {
        t += (performance.now() - s.at) / 1000;
      }
      const d = s.d || currentTrack(orderRef.current, posRef.current).duration || 1;
      const p = Math.max(0, Math.min(1, t / d));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
      if (knobRef.current) knobRef.current.style.left = `${p * 100}%`;
      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const tick = () => {
      setClock(
        new Date()
          .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Dhaka",
          })
          .toLowerCase(),
      );
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const MIN = 180;
    const MAX = 420;
    let count = MIN + Math.floor(Math.random() * (MAX - MIN));
    setListeners(count);
    let timer: number;
    const step = () => {
      const mid = (MIN + MAX) / 2;
      const up = Math.random() < (count < mid ? 0.58 : 0.42);
      count = Math.max(MIN, Math.min(MAX, count + (up ? 1 : -1) * (1 + Math.floor(Math.random() * 4))));
      setListeners(count);
      timer = window.setTimeout(step, 2500 + Math.random() * 3500);
    };
    timer = window.setTimeout(step, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const next = shuffledOrder(TRACKS.length);
    setOrder(next);
    orderRef.current = next;
    setPos(0);
    posRef.current = 0;
  }, []);

  useEffect(() => {
    bumperOrderRef.current = shuffledOrder(BUMPER_LINES.length);
    bumperPosRef.current = 0;
    setBumper(BUMPER_LINES[bumperOrderRef.current[0] ?? 0] ?? BUMPER_LINES[0]!);
  }, []);

  const nextBumper = useCallback(() => {
    let p = bumperPosRef.current + 1;
    if (p >= bumperOrderRef.current.length) {
      const last = bumperOrderRef.current[bumperOrderRef.current.length - 1];
      bumperOrderRef.current = shuffledOrder(BUMPER_LINES.length);
      if (bumperOrderRef.current[0] === last && bumperOrderRef.current.length > 1) {
        const a = bumperOrderRef.current[0];
        const b = bumperOrderRef.current[1];
        if (a !== undefined && b !== undefined) {
          bumperOrderRef.current[0] = b;
          bumperOrderRef.current[1] = a;
        }
      }
      p = 0;
    }
    bumperPosRef.current = p;
    setBumperSwap(true);
    window.setTimeout(() => {
      const idx = bumperOrderRef.current[p] ?? 0;
      setBumper(BUMPER_LINES[idx] ?? BUMPER_LINES[0]!);
      setBumperSwap(false);
    }, 250);
  }, []);

  useEffect(() => {
    const id = window.setInterval(nextBumper, 12000);
    return () => window.clearInterval(id);
  }, [nextBumper]);

  useEffect(() => {
    fetch(HORN_SRC)
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .then((b) => {
        if (b) hornBytesRef.current = b;
      })
      .catch(() => {});
  }, []);

  const ensureAudio = () => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!audioCtxRef.current) audioCtxRef.current = new AC();
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const duckMusic = (ms: number) => {
    const yt = ytRef.current;
    if (!yt || typeof yt.getVolume !== "function") return;
    if (duckFromRef.current === null) duckFromRef.current = yt.getVolume();
    yt.setVolume(Math.round((duckFromRef.current ?? 100) * 0.4));
    if (duckTimerRef.current) window.clearTimeout(duckTimerRef.current);
    duckTimerRef.current = window.setTimeout(() => {
      if (duckFromRef.current !== null) yt.setVolume(duckFromRef.current);
      duckFromRef.current = null;
    }, ms + 120);
  };

  const honk = async () => {
    const ctx = ensureAudio();
    if (!ctx) return;
    if (!hornBufRef.current) {
      let bytes = hornBytesRef.current;
      if (!bytes) {
        try {
          const r = await fetch(HORN_SRC);
          bytes = r.ok ? await r.arrayBuffer() : null;
          hornBytesRef.current = bytes;
        } catch {
          return;
        }
      }
      if (!bytes) return;
      try {
        hornBufRef.current = await ctx.decodeAudioData(bytes.slice(0));
      } catch {
        return;
      }
    }
    try {
      hornSrcRef.current?.stop();
    } catch {
      /* already finished */
    }
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = hornBufRef.current;
    gain.gain.value = 0.9;
    source.connect(gain).connect(ctx.destination);
    source.start();
    hornSrcRef.current = source;
    duckMusic(hornBufRef.current.duration * 1000);
    setHornOn(false);
    void document.body.offsetWidth;
    setHornOn(true);
    setLogoShake(true);
    window.setTimeout(() => setHornOn(false), 450);
    window.setTimeout(() => setLogoShake(false), 720);
  };

  const togglePlay = () => {
    const yt = ytRef.current;
    if (!yt) return;
    startedRef.current = true;
    try {
      if (playingRef.current) yt.pauseVideo();
      else yt.playVideo();
    } catch {
      /* ignore */
    }
  };

  const toggleShuffle = () => {
    setShuffleOn((on) => {
      const next = !on;
      const currentIdx = orderRef.current[posRef.current] ?? 0;
      if (next) {
        const rest = shuffledOrder(TRACKS.length).filter((i) => i !== currentIdx);
        const neu = [currentIdx, ...rest];
        setOrder(neu);
        orderRef.current = neu;
        setPos(0);
        posRef.current = 0;
      } else {
        const neu = Array.from({ length: TRACKS.length }, (_, i) => i);
        setOrder(neu);
        orderRef.current = neu;
        setPos(currentIdx);
        posRef.current = currentIdx;
      }
      return next;
    });
  };

  const seekToClientX = (clientX: number) => {
    const el = seekRef.current;
    const yt = ytRef.current;
    if (!el || !yt) return;
    const rect = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const d = sampleRef.current.d || track.duration;
    yt.seekTo(p * d, true);
    sampleRef.current = { t: p * d, d, at: performance.now(), playing: playingRef.current };
    setProgress(p);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight" || e.key === "n") {
        go(posRef.current + 1);
      } else if (e.code === "ArrowLeft" || e.key === "p") {
        go(posRef.current - 1);
      } else if (e.key === "h" || e.key === "H") {
        void honk();
      } else if (e.key === "l" || e.key === "L") {
        setListOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onSeekPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    seekingRef.current = true;
    seekToClientX(e.clientX);
  };

  const onSeekMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!seekingRef.current) return;
    seekToClientX(e.clientX);
  };

  const onSeekUp = () => {
    seekingRef.current = false;
    samplePlayer();
  };

  const pickFromList = (orderIndex: number) => {
    startedRef.current = true;
    go(orderIndex);
    setListOpen(false);
  };

  const knobX = `${progress * 100}%`;

  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className={`bg__layer bg__layer--1 ${bg === 0 ? "is-active" : ""}`} />
        <div className={`bg__layer bg__layer--2 ${bg === 1 ? "is-active" : ""}`} />
        <div className="bg__scrim" />
      </div>

      <div className="yt-host" aria-hidden="true" ref={ytHostRef} />

      <header className="topbar">
        <div className="clock" aria-label="Dhaka time">
          {clock}
        </div>
        <div className="presence" aria-live="polite">
          <span className="presence__dot" aria-hidden="true" />
          <span className="presence__count">{listeners}</span>
          <span className="presence__label">on the highway</span>
        </div>
        <nav className="links" aria-label="Listen elsewhere">
          <a
            className="link"
            href={mixUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the playlist on YouTube"
            title="Open the playlist on YouTube"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
            </svg>
          </a>
        </nav>
      </header>

      <aside className="horns">
        <button
          className={`horn ${hornOn ? "is-blaring" : ""}`}
          type="button"
          aria-label="Sound the horn"
          onClick={() => void honk()}
        >
          <span className="horn__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z" />
              <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M15.4 8.4a5.2 5.2 0 010 7.2" />
                <path d="M18.2 5.6a9.2 9.2 0 010 12.8" />
              </g>
            </svg>
          </span>
          <span className="horn__text">
            <span className="horn__deva" lang="bn">
              হর্ন ওকে প্লিজ
            </span>
            <span className="horn__en">Horn ok pleaseeee</span>
          </span>
        </button>
      </aside>

      <main className="scene">
        <h1 className={`logo ${logoShake ? "is-shaking" : ""}`} lang="bn">
          <span className="logo__line">বাস</span>
          <span className="logo__line">ওয়ালা</span>
          <span className="sr-only" lang="en">
            Bus Wala — Bangladeshi bus driver songs
          </span>
        </h1>

        <div className="dock">
          <section className={`list ${listOpen ? "is-open" : ""}`} aria-label="Playlist">
            <ol>
              {order.map((trackIndex, i) => {
                const item = TRACKS[trackIndex];
                if (!item) return null;
                return (
                  <li key={`${item.id}-${i}`} className={i === pos ? "is-current" : ""}>
                    <button type="button" onClick={() => pickFromList(i)}>
                      <span className="t-title">{item.title}</span>
                      <span className="t-artist">{item.artist}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>

          <p className="bumper">
            <span className={`bumper__text ${bumperSwap ? "is-swapping" : ""}`} lang="bn" aria-live="polite">
              {bumper}
            </span>
            <button className="bumper__next" type="button" aria-label="Another line" onClick={nextBumper}>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 11.5A8 8 0 106.3 17.7" />
                <path d="M20 5.5v6h-6" />
              </svg>
            </button>
          </p>

          <section
            className={`player ${playing ? "is-playing" : ""} ${swapping ? "is-swapping" : ""}`}
            aria-label="Player"
          >
            <div className="disc">
              <div className="disc__ring">
                <img className="disc__art" alt="" src={coverUrl(track.id)} />
              </div>
              <span className="disc__hub" aria-hidden="true" />
            </div>

            <div className="meta">
              <p className="meta__title">{ready ? track.title : "ক্যাসেট চড়াচ্ছি…"}</p>
              <p className="meta__artist">{ready ? track.artist : "\u00a0"}</p>
              <div
                className="seek"
                ref={seekRef}
                role="slider"
                tabIndex={0}
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                onPointerDown={onSeekPointer}
                onPointerMove={onSeekMove}
                onPointerUp={onSeekUp}
                onPointerCancel={onSeekUp}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") go(pos + 1);
                  if (e.key === "ArrowLeft") go(pos - 1);
                }}
              >
                <div className="seek__rail">
                  <div className="seek__fill" ref={fillRef} />
                </div>
                <div
                  className="seek__knob"
                  ref={knobRef}
                  style={{ left: knobX, transform: "translate(-50%, -50%)" }}
                />
              </div>
              <div className="time">
                <span>{formatTime(tCur)}</span> / <span>{formatTime(tDur || track.duration)}</span>
              </div>
            </div>

            <div className="controls">
              <button
                type="button"
                className={`btn btn--toggle ${shuffleOn ? "is-on" : ""}`}
                aria-label="Shuffle"
                aria-pressed={shuffleOn}
                onClick={toggleShuffle}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                  <path d="M17 3l4 4-4 4V8h-2.2l-2.3 3.1 2.3 3.1H17V11l4 4-4 4v-3h-3.2l-2.6-3.5L8.6 15H3v-2h4.6l2.6-3.5L12.8 6H17V3zM3 9h3.4l1.5 2H3V9z" />
                </svg>
              </button>
              <button type="button" className="btn" aria-label="Previous track" onClick={() => go(pos - 1)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              <button
                type="button"
                className="btn btn--play"
                aria-label={playing ? "Pause" : "Play"}
                disabled={!ready}
                onClick={togglePlay}
              >
                <svg className="i-play" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg className="i-pause" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              </button>
              <button type="button" className="btn" aria-label="Next track" onClick={() => go(pos + 1)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M16 6h2v12h-2zm-2 6L5.5 6v12z" />
                </svg>
              </button>
              <button
                type="button"
                className={`btn btn--toggle ${listOpen ? "is-on" : ""}`}
                aria-label="Playlist"
                aria-expanded={listOpen}
                onClick={() => setListOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                  <path d="M3 6h13v2H3zm0 5h13v2H3zm0 5h9v2H3zm15-6.5l4 3-4 3z" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
