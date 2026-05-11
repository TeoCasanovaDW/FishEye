"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./Like.module.css";
import { updateLikeAction } from "../../actions/likeActions";

export default function Like({ media }) {
  const [likes, setLikes] = useState(media.likes);

  async function handleLike() {
    const newLikes = likes + 1;
    setLikes(newLikes);
    await updateLikeAction(media.id, newLikes);
  }

  return (
    <button
      type="button"
      className={styles.mediaLikes}
      onClick={handleLike}
      aria-label={`Ajouter un like à ${media.title}`}
    >
      <span>{likes}</span>
      <FaHeart aria-hidden="true" />
    </button>
  );
}