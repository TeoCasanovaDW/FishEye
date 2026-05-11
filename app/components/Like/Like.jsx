"use client";

import { FaHeart } from "react-icons/fa";
import styles from "./Like.module.css";
import { updateLikeAction } from "../../actions/likeActions";

export default function Like({ media, onLike }) {
  async function handleLike() {
    const newLikes = media.likes + 1;

    onLike(media.id, newLikes);

    await updateLikeAction(media.id, newLikes);
  }

  return (
    <button
      type="button"
      className={styles.mediaLikes}
      onClick={handleLike}
      aria-label={`Ajouter un like à ${media.title}`}
    >
      <span>{media.likes}</span>
      <FaHeart aria-hidden="true" />
    </button>
  );
}