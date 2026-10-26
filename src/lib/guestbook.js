// Guestbook message checks. Returns { text } when OK, or { error } with one of:
// "length" (empty or over 60), "link", "profanity".

const MAX = 60;

// Control characters plus zero-width and bidi-override characters.
const INVISIBLE = /[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁠-⁩﻿]/g;

const LINK =
  /(https?:\/\/|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\[dot\])\s*(com|net|org|io|gg|co|me|ly|xyz|app|dev|link|site|info|biz|ru|tk|to|cc|us|uk)\b)/i;

// Deliberately short; extend as needed. Text is lower-cased and common
// character swaps (0→o, 1→i, @→a, …) are undone before matching.
// ANYWHERE: matched even inside words or spelled with gaps ("f u c k").
// WORDS: whole words only (plus simple endings), so "grape" or "spice" pass.
const ANYWHERE = ["fuck", "cunt", "nigger", "nigga", "faggot"];
const WORDS = [
  "shit", "shitty", "bitch", "dick", "cock", "pussy", "asshole", "bastard", "whore", "slut",
  "fag", "retard", "chink", "spic", "kike", "tranny", "rape", "porn",
];
const WORD_RE = new RegExp(`^(${WORDS.join("|")})(s|es|ed|ing|er|ers)?$`);

const SWAPS = { 0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t", "@": "a", $: "s", "!": "i" };

function unswap(text) {
  return text.toLowerCase().replace(/[013457@$!]/g, (c) => SWAPS[c]);
}

function isProfane(text) {
  const plain = unswap(text);
  if (ANYWHERE.some((w) => plain.replace(/[^a-z]/g, "").includes(w))) return true;
  return plain
    .split(/[^a-z]+/)
    .some((word) => WORD_RE.test(word));
}

export function checkMessage(input) {
  if (typeof input !== "string") return { error: "length" };
  const text = input.replace(INVISIBLE, "").replace(/\s+/g, " ").trim();
  const length = [...text].length;
  if (length < 1 || length > MAX) return { error: "length" };
  if (LINK.test(text)) return { error: "link" };
  if (isProfane(text)) return { error: "profanity" };
  return { text };
}
