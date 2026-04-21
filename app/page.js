import Image from "next/image";
import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";
import Link from "next/link";


export default async function Home() {
  
  const photographers = await getAllPhotographers()

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
        <h1>Nos photographes</h1>
      </header>

      <main>
        <section className={styles.cardsContainer}>
          {photographers.map(photographer => (
            <article 
              key={photographer.id}
              className={styles.photographerCard}
            >
              <Link
                href={`/photographer/${photographer.id}`}
                className={styles.photographerLink}
              >
                <Image
                  src={`/assets/${photographer.portrait}`}
                  alt={`Portrait de ${photographer.name}`}
                  width={526}
                  height={358}
                  className={styles.portrait}
                />
                <h2 className={styles.photographerName}>{photographer.name}</h2>
              </Link>

              <div className={styles.photographerInfos}>
                <p className={styles.localisation}>{photographer.city}, {photographer.country}</p>
                <p className={styles.sentence}>{photographer.tagline}</p>
                <p className={styles.price}>{photographer.price}€/jour</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
