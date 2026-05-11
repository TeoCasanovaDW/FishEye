"use client";

import { useId, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import styles from "./SortListbox.module.css";

const options = [
  { value: "popularity", label: "Popularité" },
  { value: "date", label: "Date" },
  { value: "title", label: "Titre" },
];

export default function SortListbox({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const labelId = useId();
  const buttonId = useId();
  const listRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);
  const availableOptions = options.filter((option) => option.value !== value);

  function openListbox() {
    setIsOpen(true);
    setActiveIndex(0);

    setTimeout(() => {
      listRef.current?.focus();
    }, 0);
  }

  function closeListbox() {
    setIsOpen(false);
  }

  function handleSelect(optionValue) {
    onChange(optionValue);
    closeListbox();
  }

  function handleTriggerKeyDown(event) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      openListbox();
    }

    if (event.key === "Escape") {
      closeListbox();
    }
  }

  function handleListKeyDown(event) {
    if (event.key === "Escape") {
      closeListbox();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        index === availableOptions.length - 1 ? 0 : index + 1
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index === 0 ? availableOptions.length - 1 : index - 1
      );
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(availableOptions[activeIndex].value);
    }
  }

  return (
    <div className={styles.filter}>
      <span id={labelId} className={styles.label}>
        Trier par
      </span>

      <div className={styles.wrapper}>
        <button
          type="button"
          id={buttonId}
          className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${labelId} ${buttonId}`}
          onClick={() => (isOpen ? closeListbox() : openListbox())}
          onKeyDown={handleTriggerKeyDown}
        >
          {selectedOption.label}

          <span className={styles.icon} aria-hidden="true">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            className={styles.listbox}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
          >
            {availableOptions.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={false}
                className={`${styles.option} ${
                  activeIndex === index ? styles.optionActive : ""
                }`}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}