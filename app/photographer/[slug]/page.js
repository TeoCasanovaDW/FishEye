import Link from "next/link";
import Image from "next/image";
import { getPhotographer, getAllMediasForPhotographer } from "../../lib/prisma-db";
import styles from "./page.module.css";
import ContactModal from "../../components/ContactModal/ContactModal";
import MediaGallery from "../../components/MediaGallery/MediaGallery";

export default async function photographerDetail({ params }) {
    const { slug } = await params;

    const photographer = await getPhotographer(Number(slug))
    const photographerMedias = await getAllMediasForPhotographer(photographer.id)

    if (!photographer) {
        return <p>Photographe introuvable</p>;
    }

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
                    <ContactModal photographerName={photographer.name} />
                    <Image
                        src={`/assets/${photographer.portrait}`}
                        alt={`Portrait de ${photographer.name}`}
                        width={200}
                        height={200}
                        className={styles.portrait}
                        priority
                    />
                </section>

                <section className={styles.photosList}>
                    <MediaGallery medias={photographerMedias} />
                </section>
            </main>
        </>
    )
}