"use client";

import { useRef } from "react";
import styles from "./ContactModal.module.css";

export default function ContactModal({ photographerName }) {
  const dialogRef = useRef(null);

  function openModal() {
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    closeModal();
  }

  return (
    <>
      <button type="button" className={styles.openButton} onClick={openModal}>
        Contactez-moi
      </button>

      <dialog
        ref={dialogRef}
        className={styles.modal}
        aria-labelledby="contact-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={closeModal}
          aria-label="Fermer le formulaire de contact"
        >
          ×
        </button>

        <h2 id="contact-title" className={styles.title}>
          Contactez-moi
          <br />
          {photographerName}
        </h2>

        <form method="dialog" className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="firstName">Prénom</label>
          <input id="firstName" name="firstName" type="text" />

          <label htmlFor="lastName">Nom</label>
          <input id="lastName" name="lastName" type="text" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />

          <label htmlFor="message">Votre message</label>
          <textarea id="message" name="message" rows="5" />

          <button type="submit" className={styles.submitButton}>
            Envoyer
          </button>
        </form>
      </dialog>
    </>
  );
}