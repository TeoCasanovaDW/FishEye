import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { getPhotographer, getAllMediasForPhotographer } from "../../lib/prisma-db";
import styles from "./page.module.css";

export default async function photographerDetail({ params }) {
    const { slug } = await params;

    const photographer = await getPhotographer(slug)
    const photographerMedias = await getAllMediasForPhotographer(photographer.id)

    return (
        <>
            <header className={styles.banner}>
                <Link
                    href="/"
                    className={styles.logoLink}
                >
                    <Image
                        src="/assets/logo.png"
                        alt="Fisheye Home page"
                        width={200}
                        height={50}
                        className={styles.logo}
                    />
                </Link>
            </header>

            <main className={styles.mainContainer}>
                <section className={styles.photographersHeader}>
                    <div className={styles.infos}>
                        <h1>{photographer.name}</h1>
                        <p className={styles.localisation}>{photographer.city}, {photographer.country}</p>
                        <p className={styles.sentence}>{photographer.tagline}</p>
                    </div>
                    <button className={styles.contactButton}>Contactez-moi</button>
                    <Image
                        src={`/assets/${photographer.portrait}`}
                        alt={`Portrait de ${photographer.name}`}
                        width={200}
                        height={200}
                        className={styles.portrait}
                    />
                </section>

                <section className={styles.photosList}>
                    <div className={styles.filter}>
                        <label htmlFor="sort" className={styles.sortLabel}>
                            Trier par
                        </label>
                        <select
                            id="sort"
                            name="sort"
                            className={styles.sortSelect}
                        >
                            <option value="popularity">Popularité</option>
                            <option value="date">Date</option>
                            <option value="title">Titre</option>
                        </select>
                    </div>

                    <div className={styles.cardImageContainer}>
                        {photographerMedias.map((media) => (
                            <article key={media.id} className={styles.cardMedia}>
                                <Link href="/" className={styles.mediaLink}>
                                    {media.image ? (
                                        <Image
                                            src={`/assets/${media.image}`}
                                            alt={media.title}
                                            width={350}
                                            height={300}
                                            className={styles.media}
                                        />
                                    ) : (
                                        <video
                                            className={styles.media}
                                            aria-label={media.title}
                                            preload="metadata"
                                        >
                                            <source src={`/assets/${media.video}`} type="video/mp4" />
                                            Votre navigateur ne supporte pas la vidéo.
                                        </video>
                                    )}
                                </Link>

                                <div className={styles.mediaInfos}>
                                    <h2 className={styles.mediaTitle}>{media.title}</h2>
                                    <p className={styles.mediaLikes}>
                                        {media.likes}
                                        <FaHeart className={styles.heartIcon} aria-label="likes" />
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                </section>
            </main>
        </>
    )
}