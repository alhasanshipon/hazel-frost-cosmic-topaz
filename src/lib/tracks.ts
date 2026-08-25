export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
};

/** Classic Bangladeshi highway / bus-stereo songs. YouTube is the sound source. */
export const TRACKS: Track[] = [
  {
    id: "_vZxuod-Db8",
    title: "হায়রে মানুষ রঙ্গিন ফানুস",
    artist: "এন্ড্রু কিশোর",
    duration: 213,
  },
  {
    id: "Z0VBxhbIVTQ",
    title: "আমার বুকের মধ্যেখানে",
    artist: "এন্ড্রু কিশোর",
    duration: 245,
  },
  {
    id: "gWLTujAcDQc",
    title: "পদ্ম পাতার পানি নয়",
    artist: "এন্ড্রু কিশোর",
    duration: 204,
  },
  {
    id: "SJFjv5CaX5o",
    title: "বেদের মেয়ে জোছনা",
    artist: "এন্ড্রু কিশোর ও লুইপা",
    duration: 352,
  },
  {
    id: "_MtlE_kpRZY",
    title: "ভালো আছি ভালো থেকো",
    artist: "এন্ড্রু কিশোর ও কনক চাঁপা",
    duration: 336,
  },
  {
    id: "YMfLQUQ2EWo",
    title: "তোমাকে চাই শুধু",
    artist: "এন্ড্রু কিশোর ও কনক চাঁপা",
    duration: 268,
  },
  {
    id: "YFWmgMz0-XM",
    title: "আমি ড্রাইভার ভালো",
    artist: "রুনা লায়লা ও এন্ড্রু কিশোর",
    duration: 297,
  },
  {
    id: "e09tp6MIH5k",
    title: "বাসিওয়ালা",
    artist: "ফেরদৌস ওয়াহিদ ও ন্যান্সি",
    duration: 295,
  },
  {
    id: "T41Ik7ksmAM",
    title: "গুরু ঘর বানাইলা কি দিয়া",
    artist: "জেমস",
    duration: 221,
  },
  {
    id: "lWhI5WWI9aI",
    title: "ও প্রিয়া তুমি কোথায়",
    artist: "আসিফ আকবর",
    duration: 316,
  },
  {
    id: "IJY4wdFDi2g",
    title: "কখনো ভালোবাসনি",
    artist: "আসিফ আকবর",
    duration: 310,
  },
  {
    id: "e2Ii5gsfeho",
    title: "দিন গেল",
    artist: "হাবিব ওয়াহিদ",
    duration: 341,
  },
  {
    id: "vqOP9sww1Jk",
    title: "এতো মায়া",
    artist: "তাহসান",
    duration: 298,
  },
  {
    id: "RVOLINktTF8",
    title: "বন্ধু নাকি শত্রু তুমি",
    artist: "কনক চাঁপা",
    duration: 322,
  },
  {
    id: "H3DEs8BsyVY",
    title: "আমি বেবি ট্যাক্সি ড্রাইভার",
    artist: "এন্ড্রু কিশোর",
    duration: 251,
  },
];

export function coverUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeMixUrl(ids: string[]): string {
  return `https://www.youtube.com/watch_videos?video_ids=${ids.join(",")}`;
}
