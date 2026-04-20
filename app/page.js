import Image from "next/image";
import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";
import { use } from "react";


export default function Home() {
  // console.log(await getAllPhotographers())
  // console.log(await getPhotographer(0))
  // console.log(await getAllMediasForPhotographer())

  const photographers = use(getAllPhotographers())
  console.log(photographers);

  return (
    <div></div>
  );
}
