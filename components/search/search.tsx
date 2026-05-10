"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { searchCities, type CityMatch } from "@/lib/owm/search-cities";
import styles from "./search.module.css";

export function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<CityMatch[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount, check if there's a city query param and navigate to it
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    // Debounce the search to avoid requests spamming the API while typing
    debounceRef.current = setTimeout(async () => {
      const data = await searchCities(value.trim());
      setSuggestions(data);
      setOpen(data.length > 0);
      setActiveIndex(-1);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function navigate(suggestion: CityMatch) {
    const city = `${suggestion.name},${suggestion.country}`;
    router.push(`/?city=${encodeURIComponent(city)}`);
    setValue("");
    setSuggestions([]);
    setOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigate(suggestions[activeIndex]);
      return;
    }
    const city = value.trim();
    if (!city) return;
    router.push(`/?city=${encodeURIComponent(city)}`);
    setValue("");
    setSuggestions([]);
    setOpen(false);
  }

  // Handle keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  // Format label for dropdown items
  function formatLabel(s: CityMatch) {
    return s.state ? `${s.name}, ${s.state}, ${s.country}` : `${s.name}, ${s.country}`;
  }

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          aria-label="Search city"
          aria-autocomplete="list"
          aria-expanded={open}
          autoComplete="off"
        />
        <button className={styles.button} type="submit" aria-label="Search">
          <SearchIcon size={16} />
        </button>
      </form>
      {open && (
        <ul className={styles.dropdown} role="listbox">
          {suggestions.map((s, i) => (
            <li
              key={`${s.lat}-${s.lon}`}
              role="option"
              aria-selected={i === activeIndex}
              className={`${styles.dropdownItem}${i === activeIndex ? ` ${styles.dropdownItemActive}` : ""}`}
              onMouseDown={() => navigate(s)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {formatLabel(s)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
