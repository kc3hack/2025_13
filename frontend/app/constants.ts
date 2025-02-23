import { atom } from "jotai";

type Page = "landing" | "recording" | "result";

export const pageAtom = atom<Page>("landing");
export const resultAtom = atom<Record<string, number>>({});
