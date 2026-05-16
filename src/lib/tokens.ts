import type z from "zod";
import { tr } from "zod/locales";
import { tokenSchema } from "./schemas/token";
import { createStorage } from "./utils";

const PREFIX = "backtick:token:";

const tokenStorage = createStorage(PREFIX, tokenSchema);

export const tokenService = {
  saveToken: (shortId: string, deletionToken: string) => {
    tokenStorage.set(shortId, { deletionToken, createdAt: Date.now() });
  },
  getToken: (shortId: string) => {
    return tokenStorage.get(shortId);
  },
  isOwner: (shortId: string, deletionToken: string) => {
    const tokenData = tokenStorage.get(shortId);
    return tokenData?.deletionToken === deletionToken;
  },
};
