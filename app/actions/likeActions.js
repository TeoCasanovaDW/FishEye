"use server";

import { updateNumberOfLikes } from "../lib/prisma-db";

export async function updateLikeAction(mediaId, newLikes) {
  await updateNumberOfLikes(mediaId, newLikes);
}