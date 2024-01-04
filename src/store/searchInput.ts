import { atom } from "jotai";

export const searchInputAtom = atom("");

export const clearSearchInputAtom = atom(null, (_, set) => {
  set(searchInputAtom, "");
});

export const parsedInputValueAtom = atom((get) => get(searchInputAtom).trim());
