import { storageService } from "@services/localstorage";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

// Atoms states

export const tokenAtom = atom(
  async () => {
    const storageToken = await storageService.get<string>("token");

    return storageToken ?? "";
  },
  async (_, __, token: string | null) => {
    await storageService.set("token", token ?? "");

    return token;
  }
);

// actions

export const setTokenToNullAtom = atom(null, async (_, set) => {
  await set(tokenAtom, null);
});

// Selectors

export const storageTokenLoadableAtom = loadable(tokenAtom);



export const isLoggedAtom = atom((get) => {
  const token = get(storageTokenLoadableAtom);

  if (token.state === "loading" || token.state === "hasError" || (token.state === "hasData" && !token.data)) return false;

  if (token.state === "hasData" && token.data) return true;
});