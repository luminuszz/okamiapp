import { setOneSignalEmail } from "@services/notifications";
import { atom } from "jotai";

type UserDetails = {
  name?: string;
  email?: string;
  avatar?: string;
};

export const userDetailsAtom = atom<UserDetails | null>(null);

export const userEmailAtom = atom(null, (get) => get(userDetailsAtom)?.email);

export const saveUserEmailAtom = atom(null, async (_, set, email: string) => {
  set(userDetailsAtom, (prev) => ({ ...prev, email }));

  await setOneSignalEmail(email);
});
