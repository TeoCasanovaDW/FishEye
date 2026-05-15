"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./MediaGallery.module.css";
import Like from "../Like/Like";
import SortListbox from "../SortListbox/SortListbox";

export default function MediaGallery({ medias }) {
    const dialogRef = useRef(null);

    const [galleryMedias, setGalleryMedias] = useState(medias);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortBy, setSortBy] = useState("popularity");

    const sortedMedias = [...galleryMedias].sort((a, b) => {
        if (sortBy === "popularity") {
            return b.likes - a.likes;
        }

        if (sortBy === "date") {
            return new Date(b.date) - new Date(a.date);
        }

        if (sortBy === "title") {
            return a.title.localeCompare(b.title);
        }

        return 0;
    });

    const currentMedia = sortedMedias[currentIndex];

    function openLightbox(index) {
        setCurrentIndex(index);
        dialogRef.current?.showModal();
    }

    function closeLightbox() {
        dialogRef.current?.close();
    }

    function handleSortChange(value) {
        setSortBy(value);
        setCurrentIndex(0);
    }

    function handleLike(mediaId, newLikes) {
        setGalleryMedias((currentMedias) =>
            currentMedias.map((media) =>
                media.id === mediaId ? { ...media, likes: newLikes } : media,
            ),
        );
    }

    function showPrevious() {
        setCurrentIndex((index) =>
            index === 0 ? sortedMedias.length - 1 : index - 1,
        );
    }

    function showNext() {
        setCurrentIndex((index) =>
            index === sortedMedias.length - 1 ? 0 : index + 1,
        );
    }

    useEffect(() => {
        function handleKeyDown(event) {
            if (!dialogRef.current?.open) return;

            if (event.key === "ArrowLeft") {
                setCurrentIndex((index) =>
                    index === 0 ? sortedMedias.length - 1 : index - 1,
                );
            }

            if (event.key === "ArrowRight") {
                setCurrentIndex((index) =>
                    index === sortedMedias.length - 1 ? 0 : index + 1,
                );
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [sortedMedias.length]);

    return (
        <>
            <SortListbox value={sortBy} onChange={handleSortChange} />

            <div className={styles.cardImageContainer}>
                {sortedMedias.map((media, index) => (
                    <article key={media.id} className={styles.cardMedia}>
                        <button
                            type="button"
                            className={styles.mediaButton}
                            onClick={() => openLightbox(index)}
                            aria-label={`Ouvrir ${media.title} en grand`}
                        >
                            <div className={styles.mediaWrapper}>
                                {media.image ? (
                                    <Image
                                        src={`/assets/${media.image}`}
                                        alt={media.title}
                                        fill
                                        sizes="(max-width: 1200px) 50vw, 33vw"
                                        className={styles.media}
                                    />
                                ) : (
                                    <video
                                        className={styles.media}
                                        aria-label={media.title}
                                        preload="metadata"
                                    >
                                        <source
                                            src={`/assets/${media.video}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}
                            </div>
                        </button>

                        <div className={styles.mediaInfos}>
                            <h2 className={styles.mediaTitle}>{media.title}</h2>
                            <Like media={media} onLike={handleLike} />
                        </div>
                    </article>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                className={styles.lightbox}
                aria-label="Image closeup view"
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={closeLightbox}
                    aria-label="Fermer la fenêtre"
                >
                    ×
                </button>

                <button
                    type="button"
                    className={styles.previousButton}
                    onClick={showPrevious}
                    aria-label="Image précédente"
                >
                    ‹
                </button>

                <div className={styles.lightboxContent}>
                    {currentMedia?.image ? (
                        <Image
                            src={`/assets/${currentMedia.image}`}
                            alt={currentMedia.title}
                            width={900}
                            height={700}
                            className={styles.lightboxMedia}
                        />
                    ) : (
                        <video
                            className={styles.lightboxMedia}
                            controls
                            aria-label={currentMedia?.title}
                        >
                            <source
                                src={`/assets/${currentMedia?.video}`}
                                type="video/mp4"
                            />
                        </video>
                    )}

                    <p className={styles.lightboxTitle}>
                        {currentMedia?.title}
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.nextButton}
                    onClick={showNext}
                    aria-label="Image suivante"
                >
                    ›
                </button>
            </dialog>
        </>
    );
}
