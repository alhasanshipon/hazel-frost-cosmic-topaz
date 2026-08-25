import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhHMf0CC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Lines painted on the back of Bangladeshi buses. */
var BUMPER_LINES = [
	"হর্ন ওকে প্লিজ",
	"আল্লাহর ওপর ভরসা",
	"মায়ের দোয়া নিয়ে চলি",
	"সাবধানে চালাও, সুখে থাকো",
	"ঢাকা এখনো দূরে",
	"চা খাইয়া যাইও",
	"সাইড প্লিজ",
	"ধীরে চালাও, ঘরে কেউ অপেক্ষা করছে",
	"আল্লাহ হাফেজ",
	"দোয়া করবেন",
	"ফিরে আসব ইনশাআল্লাহ",
	"গতি নয়, নিরাপত্তা",
	"বাংলাদেশ আমার অহংকার",
	"পথে পথে গান",
	"হর্ন বাজাও, রাস্তা নাও",
	"রাত জাগা চালক, ঘুমন্ত যাত্রী",
	"ঢাকা–চট্টগ্রাম, রাতভর পথ",
	"ওকে টাটা, আবার দেখা হবে",
	"বিসমিল্লাহ বলে যাত্রা শুরু",
	"রাস্তা সবার, দায়িত্ব আপনার",
	"তাড়াহুড়ো করলে দুর্ঘটনা",
	"সবুজ সংকেত, এগিয়ে চলো",
	"মা বলতেই শান্তি",
	"আল্লাহ মালিক",
	"জীবন একটা যাত্রা",
	"চট্টগ্রাম এক্সপ্রেস",
	"গ্রাম ছাড়ি, শহর ধরি",
	"ভালোবাসা নিয়ে চলো",
	"এই পথ নয় শেষ পথ",
	"হাত নাড়লেই হর্ন",
	"চা–বিস্কুট, তারপর হাইওয়ে",
	"যাত্রী সাহেব, সিট বেল্ট",
	"মেঘনা পার হয়েই বাড়ি",
	"নদীর ওপর ব্রিজ, বুকের ওপর গান",
	"এক গ্লাস চা, এক রাতের পথ",
	"বাসের হর্ন মানেই পথ চলা",
	"আমার সোনার বাংলা, আমি তোমায় ভালোবাসি",
	"ধীরস্থির চালকই আসল হিরো",
	"রাত বাড়লে গান বাড়ে",
	"কক্সবাজার এখনো বাকি",
	"সিলেটের চা, চট্টগ্রামের হর্ন",
	"পদ্মা সেতু পার, মনটা উড়াল"
];
function formatTime(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}
function shuffleInPlace(items) {
	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = items[i];
		const b = items[j];
		if (a === void 0 || b === void 0) continue;
		items[i] = b;
		items[j] = a;
	}
	return items;
}
function shuffledOrder(length) {
	return shuffleInPlace(Array.from({ length }, (_, i) => i));
}
/** Classic Bangladeshi highway / bus-stereo songs. YouTube is the sound source. */
var TRACKS = [
	{
		id: "_vZxuod-Db8",
		title: "হায়রে মানুষ রঙ্গিন ফানুস",
		artist: "এন্ড্রু কিশোর",
		duration: 213
	},
	{
		id: "Z0VBxhbIVTQ",
		title: "আমার বুকের মধ্যেখানে",
		artist: "এন্ড্রু কিশোর",
		duration: 245
	},
	{
		id: "gWLTujAcDQc",
		title: "পদ্ম পাতার পানি নয়",
		artist: "এন্ড্রু কিশোর",
		duration: 204
	},
	{
		id: "SJFjv5CaX5o",
		title: "বেদের মেয়ে জোছনা",
		artist: "এন্ড্রু কিশোর ও লুইপা",
		duration: 352
	},
	{
		id: "_MtlE_kpRZY",
		title: "ভালো আছি ভালো থেকো",
		artist: "এন্ড্রু কিশোর ও কনক চাঁপা",
		duration: 336
	},
	{
		id: "YMfLQUQ2EWo",
		title: "তোমাকে চাই শুধু",
		artist: "এন্ড্রু কিশোর ও কনক চাঁপা",
		duration: 268
	},
	{
		id: "YFWmgMz0-XM",
		title: "আমি ড্রাইভার ভালো",
		artist: "রুনা লায়লা ও এন্ড্রু কিশোর",
		duration: 297
	},
	{
		id: "e09tp6MIH5k",
		title: "বাসিওয়ালা",
		artist: "ফেরদৌস ওয়াহিদ ও ন্যান্সি",
		duration: 295
	},
	{
		id: "T41Ik7ksmAM",
		title: "গুরু ঘর বানাইলা কি দিয়া",
		artist: "জেমস",
		duration: 221
	},
	{
		id: "lWhI5WWI9aI",
		title: "ও প্রিয়া তুমি কোথায়",
		artist: "আসিফ আকবর",
		duration: 316
	},
	{
		id: "IJY4wdFDi2g",
		title: "কখনো ভালোবাসনি",
		artist: "আসিফ আকবর",
		duration: 310
	},
	{
		id: "e2Ii5gsfeho",
		title: "দিন গেল",
		artist: "হাবিব ওয়াহিদ",
		duration: 341
	},
	{
		id: "vqOP9sww1Jk",
		title: "এতো মায়া",
		artist: "তাহসান",
		duration: 298
	},
	{
		id: "RVOLINktTF8",
		title: "বন্ধু নাকি শত্রু তুমি",
		artist: "কনক চাঁপা",
		duration: 322
	},
	{
		id: "H3DEs8BsyVY",
		title: "আমি বেবি ট্যাক্সি ড্রাইভার",
		artist: "এন্ড্রু কিশোর",
		duration: 251
	}
];
function coverUrl(id) {
	return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
function youtubeMixUrl(ids) {
	return `https://www.youtube.com/watch_videos?video_ids=${ids.join(",")}`;
}
var loadPromise = null;
function loadYouTubeApi() {
	if (typeof window === "undefined") return Promise.resolve();
	if (window.YT?.Player) return Promise.resolve();
	if (loadPromise) return loadPromise;
	loadPromise = new Promise((resolve) => {
		const prev = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = () => {
			prev?.();
			resolve();
		};
		if (!document.querySelector("script[src=\"https://www.youtube.com/iframe_api\"]")) {
			const s = document.createElement("script");
			s.src = "https://www.youtube.com/iframe_api";
			document.head.append(s);
		}
		if (window.YT?.Player) resolve();
	});
	return loadPromise;
}
function createYtPlayer(element, videoId, handlers) {
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
			origin: window.location.origin
		},
		events: {
			onReady: (e) => handlers.onReady(e.target),
			onStateChange: (e) => handlers.onStateChange(e.data),
			onError: handlers.onError
		}
	});
}
var HORN_SRC = "/horn.mp3";
function currentTrack(order, pos) {
	return TRACKS[order[pos] ?? 0] ?? TRACKS[0];
}
function BusWala() {
	const [order, setOrder] = (0, import_react.useState)(() => Array.from({ length: TRACKS.length }, (_, i) => i));
	const [pos, setPos] = (0, import_react.useState)(0);
	const [shuffleOn, setShuffleOn] = (0, import_react.useState)(true);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [listOpen, setListOpen] = (0, import_react.useState)(false);
	const [swapping, setSwapping] = (0, import_react.useState)(false);
	const [hornOn, setHornOn] = (0, import_react.useState)(false);
	const [logoShake, setLogoShake] = (0, import_react.useState)(false);
	const [clock, setClock] = (0, import_react.useState)("—");
	const [listeners, setListeners] = (0, import_react.useState)(240);
	const [tCur, setTCur] = (0, import_react.useState)(0);
	const [tDur, setTDur] = (0, import_react.useState)(0);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [bg, setBg] = (0, import_react.useState)(0);
	const [bumper, setBumper] = (0, import_react.useState)(BUMPER_LINES[0]);
	const [bumperSwap, setBumperSwap] = (0, import_react.useState)(false);
	const ytRef = (0, import_react.useRef)(null);
	const startedRef = (0, import_react.useRef)(false);
	const playingRef = (0, import_react.useRef)(false);
	const orderRef = (0, import_react.useRef)(order);
	const posRef = (0, import_react.useRef)(pos);
	const seekingRef = (0, import_react.useRef)(false);
	const sampleRef = (0, import_react.useRef)({
		t: 0,
		d: 0,
		at: 0,
		playing: false
	});
	const fillRef = (0, import_react.useRef)(null);
	const knobRef = (0, import_react.useRef)(null);
	const seekRef = (0, import_react.useRef)(null);
	const ytHostRef = (0, import_react.useRef)(null);
	const audioCtxRef = (0, import_react.useRef)(null);
	const hornBufRef = (0, import_react.useRef)(null);
	const hornBytesRef = (0, import_react.useRef)(null);
	const hornSrcRef = (0, import_react.useRef)(null);
	const duckFromRef = (0, import_react.useRef)(null);
	const duckTimerRef = (0, import_react.useRef)(null);
	const bumperOrderRef = (0, import_react.useRef)([]);
	const bumperPosRef = (0, import_react.useRef)(0);
	const goRef = (0, import_react.useRef)(() => {});
	orderRef.current = order;
	posRef.current = pos;
	playingRef.current = playing;
	const track = currentTrack(order, pos);
	const mixUrl = (0, import_react.useMemo)(() => youtubeMixUrl(TRACKS.map((t) => t.id)), []);
	const samplePlayer = (0, import_react.useCallback)(() => {
		const yt = ytRef.current;
		if (!yt || typeof yt.getCurrentTime !== "function") return;
		try {
			const t = yt.getCurrentTime() || 0;
			const d = yt.getDuration() || 0;
			sampleRef.current = {
				t,
				d,
				at: performance.now(),
				playing: playingRef.current
			};
			setTCur(t);
			if (d > 0) {
				setTDur(d);
				setProgress(Math.max(0, Math.min(1, t / d)));
			}
		} catch {}
	}, []);
	const go = (0, import_react.useCallback)((nextPos) => {
		const ord = orderRef.current;
		if (!ord.length) return;
		const wrapped = (nextPos % ord.length + ord.length) % ord.length;
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
			} else yt.cueVideoById(next.id);
			yt.setPlaybackQuality?.("tiny");
		} catch {}
	}, []);
	goRef.current = go;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let player = null;
		let sampleTimer;
		let wait;
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
					} catch {}
				},
				onStateChange: (state) => {
					if (state === 1) {
						setPlaying(true);
						playingRef.current = true;
						startedRef.current = true;
						try {
							ytRef.current?.setPlaybackQuality?.("tiny");
						} catch {}
					} else if (state === 2) {
						setPlaying(false);
						playingRef.current = false;
					} else if (state === 3) {} else if (state === 0) goRef.current(posRef.current + 1);
				},
				onError: () => {
					if (startedRef.current) goRef.current(posRef.current + 1);
				}
			});
			if (player) {
				ytRef.current = player;
				wait = window.setInterval(() => {
					if (typeof player?.playVideo === "function") {
						setReady(true);
						try {
							player.setPlaybackQuality?.("tiny");
						} catch {}
						if (wait) window.clearInterval(wait);
					}
				}, 200);
				window.setTimeout(() => {
					if (wait) window.clearInterval(wait);
				}, 12e3);
			}
			sampleTimer = window.setInterval(samplePlayer, 250);
		});
		return () => {
			cancelled = true;
			if (sampleTimer) window.clearInterval(sampleTimer);
			if (wait) window.clearInterval(wait);
			try {
				player?.destroy();
			} catch {}
			mount.remove();
		};
	}, [samplePlayer]);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const paint = () => {
			const s = sampleRef.current;
			let t = s.t;
			if (s.playing && !seekingRef.current) t += (performance.now() - s.at) / 1e3;
			const d = s.d || currentTrack(orderRef.current, posRef.current).duration || 1;
			const p = Math.max(0, Math.min(1, t / d));
			if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
			if (knobRef.current) knobRef.current.style.left = `${p * 100}%`;
			raf = requestAnimationFrame(paint);
		};
		raf = requestAnimationFrame(paint);
		return () => cancelAnimationFrame(raf);
	}, []);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			setClock((/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
				timeZone: "Asia/Dhaka"
			}).toLowerCase());
		};
		tick();
		const id = window.setInterval(tick, 15e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		const MIN = 180;
		const MAX = 420;
		let count = MIN + Math.floor(Math.random() * 240);
		setListeners(count);
		let timer;
		const step = () => {
			count = Math.max(MIN, Math.min(MAX, count + (Math.random() < (count < 300 ? .58 : .42) ? 1 : -1) * (1 + Math.floor(Math.random() * 4))));
			setListeners(count);
			timer = window.setTimeout(step, 2500 + Math.random() * 3500);
		};
		timer = window.setTimeout(step, 2e3);
		return () => window.clearTimeout(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		const next = shuffledOrder(TRACKS.length);
		setOrder(next);
		orderRef.current = next;
		setPos(0);
		posRef.current = 0;
	}, []);
	(0, import_react.useEffect)(() => {
		bumperOrderRef.current = shuffledOrder(BUMPER_LINES.length);
		bumperPosRef.current = 0;
		setBumper(BUMPER_LINES[bumperOrderRef.current[0] ?? 0] ?? BUMPER_LINES[0]);
	}, []);
	const nextBumper = (0, import_react.useCallback)(() => {
		let p = bumperPosRef.current + 1;
		if (p >= bumperOrderRef.current.length) {
			const last = bumperOrderRef.current[bumperOrderRef.current.length - 1];
			bumperOrderRef.current = shuffledOrder(BUMPER_LINES.length);
			if (bumperOrderRef.current[0] === last && bumperOrderRef.current.length > 1) {
				const a = bumperOrderRef.current[0];
				const b = bumperOrderRef.current[1];
				if (a !== void 0 && b !== void 0) {
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
			setBumper(BUMPER_LINES[idx] ?? BUMPER_LINES[0]);
			setBumperSwap(false);
		}, 250);
	}, []);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(nextBumper, 12e3);
		return () => window.clearInterval(id);
	}, [nextBumper]);
	(0, import_react.useEffect)(() => {
		fetch(HORN_SRC).then((r) => r.ok ? r.arrayBuffer() : null).then((b) => {
			if (b) hornBytesRef.current = b;
		}).catch(() => {});
	}, []);
	const ensureAudio = () => {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return null;
		if (!audioCtxRef.current) audioCtxRef.current = new AC();
		if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
		return audioCtxRef.current;
	};
	const duckMusic = (ms) => {
		const yt = ytRef.current;
		if (!yt || typeof yt.getVolume !== "function") return;
		if (duckFromRef.current === null) duckFromRef.current = yt.getVolume();
		yt.setVolume(Math.round((duckFromRef.current ?? 100) * .4));
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
			if (!bytes) try {
				const r = await fetch(HORN_SRC);
				bytes = r.ok ? await r.arrayBuffer() : null;
				hornBytesRef.current = bytes;
			} catch {
				return;
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
		} catch {}
		const source = ctx.createBufferSource();
		const gain = ctx.createGain();
		source.buffer = hornBufRef.current;
		gain.gain.value = .9;
		source.connect(gain).connect(ctx.destination);
		source.start();
		hornSrcRef.current = source;
		duckMusic(hornBufRef.current.duration * 1e3);
		setHornOn(false);
		document.body.offsetWidth;
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
		} catch {}
	};
	const toggleShuffle = () => {
		setShuffleOn((on) => {
			const next = !on;
			const currentIdx = orderRef.current[posRef.current] ?? 0;
			if (next) {
				const neu = [currentIdx, ...shuffledOrder(TRACKS.length).filter((i) => i !== currentIdx)];
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
	const seekToClientX = (clientX) => {
		const el = seekRef.current;
		const yt = ytRef.current;
		if (!el || !yt) return;
		const rect = el.getBoundingClientRect();
		const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		const d = sampleRef.current.d || track.duration;
		yt.seekTo(p * d, true);
		sampleRef.current = {
			t: p * d,
			d,
			at: performance.now(),
			playing: playingRef.current
		};
		setProgress(p);
	};
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			if (e.code === "Space") {
				e.preventDefault();
				togglePlay();
			} else if (e.code === "ArrowRight" || e.key === "n") go(posRef.current + 1);
			else if (e.code === "ArrowLeft" || e.key === "p") go(posRef.current - 1);
			else if (e.key === "h" || e.key === "H") honk();
			else if (e.key === "l" || e.key === "L") setListOpen((v) => !v);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go]);
	const onSeekPointer = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		seekingRef.current = true;
		seekToClientX(e.clientX);
	};
	const onSeekMove = (e) => {
		if (!seekingRef.current) return;
		seekToClientX(e.clientX);
	};
	const onSeekUp = () => {
		seekingRef.current = false;
		samplePlayer();
	};
	const pickFromList = (orderIndex) => {
		startedRef.current = true;
		go(orderIndex);
		setListOpen(false);
	};
	const knobX = `${progress * 100}%`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `bg__layer bg__layer--1 ${bg === 0 ? "is-active" : ""}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `bg__layer bg__layer--2 ${bg === 1 ? "is-active" : ""}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg__scrim" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "yt-host",
			"aria-hidden": "true",
			ref: ytHostRef
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "topbar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "clock",
					"aria-label": "Dhaka time",
					children: clock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "presence",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "presence__dot",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "presence__count",
							children: listeners
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "presence__label",
							children: "on the highway"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "links",
					"aria-label": "Listen elsewhere",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "link",
						href: mixUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "Open the playlist on YouTube",
						title: "Open the playlist on YouTube",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							width: "20",
							height: "20",
							fill: "currentColor",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" })
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "horns",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `horn ${hornOn ? "is-blaring" : ""}`,
				type: "button",
				"aria-label": "Sound the horn",
				onClick: () => void honk(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "horn__icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 24 24",
						width: "20",
						height: "20",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "currentColor",
							d: "M3 9v6h4l5 4V5L7 9H3z"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.8",
							strokeLinecap: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.4 8.4a5.2 5.2 0 010 7.2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.2 5.6a9.2 9.2 0 010 12.8" })]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "horn__text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "horn__deva",
						lang: "bn",
						children: "হর্ন ওকে প্লিজ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "horn__en",
						children: "Horn ok pleaseeee"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "scene",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: `logo ${logoShake ? "is-shaking" : ""}`,
				lang: "bn",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "logo__line",
						children: "বাস"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "logo__line",
						children: "ওয়ালা"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						lang: "en",
						children: "Bus Wala — Bangladeshi bus driver songs"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dock",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: `list ${listOpen ? "is-open" : ""}`,
						"aria-label": "Playlist",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: order.map((trackIndex, i) => {
							const item = TRACKS[trackIndex];
							if (!item) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: i === pos ? "is-current" : "",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => pickFromList(i),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "t-title",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "t-artist",
										children: item.artist
									})]
								})
							}, `${item.id}-${i}`);
						}) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "bumper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `bumper__text ${bumperSwap ? "is-swapping" : ""}`,
							lang: "bn",
							"aria-live": "polite",
							children: bumper
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bumper__next",
							type: "button",
							"aria-label": "Another line",
							onClick: nextBumper,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 24 24",
								width: "14",
								height: "14",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 11.5A8 8 0 106.3 17.7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 5.5v6h-6" })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: `player ${playing ? "is-playing" : ""} ${swapping ? "is-swapping" : ""}`,
						"aria-label": "Player",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "disc",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "disc__ring",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "disc__art",
										alt: "",
										src: coverUrl(track.id)
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "disc__hub",
									"aria-hidden": "true"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "meta__title",
										children: ready ? track.title : "ক্যাসেট চড়াচ্ছি…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "meta__artist",
										children: ready ? track.artist : "\xA0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "seek",
										ref: seekRef,
										role: "slider",
										tabIndex: 0,
										"aria-label": "Seek",
										"aria-valuemin": 0,
										"aria-valuemax": 100,
										"aria-valuenow": Math.round(progress * 100),
										onPointerDown: onSeekPointer,
										onPointerMove: onSeekMove,
										onPointerUp: onSeekUp,
										onPointerCancel: onSeekUp,
										onKeyDown: (e) => {
											if (e.key === "ArrowRight") go(pos + 1);
											if (e.key === "ArrowLeft") go(pos - 1);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "seek__rail",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "seek__fill",
												ref: fillRef
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "seek__knob",
											ref: knobRef,
											style: {
												left: knobX,
												transform: "translate(-50%, -50%)"
											}
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "time",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(tCur) }),
											" / ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(tDur || track.duration) })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "controls",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `btn btn--toggle ${shuffleOn ? "is-on" : ""}`,
										"aria-label": "Shuffle",
										"aria-pressed": shuffleOn,
										onClick: toggleShuffle,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											width: "17",
											height: "17",
											fill: "currentColor",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 3l4 4-4 4V8h-2.2l-2.3 3.1 2.3 3.1H17V11l4 4-4 4v-3h-3.2l-2.6-3.5L8.6 15H3v-2h4.6l2.6-3.5L12.8 6H17V3zM3 9h3.4l1.5 2H3V9z" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn",
										"aria-label": "Previous track",
										onClick: () => go(pos - 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											width: "18",
											height: "18",
											fill: "currentColor",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 6h2v12H6zm3.5 6l8.5 6V6z" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "btn btn--play",
										"aria-label": playing ? "Pause" : "Play",
										disabled: !ready,
										onClick: togglePlay,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "i-play",
											viewBox: "0 0 24 24",
											width: "20",
											height: "20",
											fill: "currentColor",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 5v14l11-7z" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "i-pause",
											viewBox: "0 0 24 24",
											width: "20",
											height: "20",
											fill: "currentColor",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 5h4v14H6zm8 0h4v14h-4z" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn",
										"aria-label": "Next track",
										onClick: () => go(pos + 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											width: "18",
											height: "18",
											fill: "currentColor",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 6h2v12h-2zm-2 6L5.5 6v12z" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `btn btn--toggle ${listOpen ? "is-on" : ""}`,
										"aria-label": "Playlist",
										"aria-expanded": listOpen,
										onClick: () => setListOpen((v) => !v),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											width: "17",
											height: "17",
											fill: "currentColor",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h13v2H3zm0 5h13v2H3zm0 5h9v2H3zm15-6.5l4 3-4 3z" })
										})
									})
								]
							})
						]
					})
				]
			})]
		})
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusWala, {});
}
//#endregion
export { Home as component };
