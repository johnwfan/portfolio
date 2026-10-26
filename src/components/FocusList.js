"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { selectTick } from "@/lib/sound";
import styles from "./FocusList.module.css";

// Selected = weight 640, sharp, opaque. Everything else = 220, blurred, faded.
export function focusClass(selected) {
  return `${styles.focus} ${selected ? styles.on : styles.off}`;
}

// The "focus + weight" list (HANDOFF §4). Selection follows mouseenter and
// focus; leaving the list keeps it. Items are { key, label, href?, external? }:
// internal hrefs render a <Link>, external ones an <a target="_blank">, and
// items without an href a <button>.
//
// With `keyboard`, ↑/↓ move the selection and Enter opens it. The listener only
// acts when nothing else has focus or focus is inside this list, so it never
// takes keys from inputs or other controls.
export default function FocusList({
  items,
  selected,
  onSelect,
  renderItem,
  className = "",
  itemClassName = "",
  keyboard = false,
  label,
}) {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const router = useRouter();

  const select = (i) => {
    if (i === selected) return;
    selectTick();
    onSelect(i);
  };

  const selectRef = useRef(select);
  useEffect(() => {
    selectRef.current = select;
  });

  useEffect(() => {
    if (!keyboard) return;
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const active = document.activeElement;
      const inList = listRef.current?.contains(active);
      const nothingFocused = !active || active === document.body;
      if (!inList && !nothingFocused) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const step = e.key === "ArrowDown" ? 1 : -1;
        const next = Math.min(items.length - 1, Math.max(0, selected + step));
        if (inList) itemRefs.current[next]?.focus();
        else selectRef.current(next);
      } else if (e.key === "Enter" && nothingFocused) {
        const item = items[selected];
        if (!item?.href) return;
        e.preventDefault();
        if (item.external) window.open(item.href, "_blank", "noopener");
        else router.push(item.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboard, items, selected, router]);

  return (
    <ul ref={listRef} className={`${styles.list} ${className}`} aria-label={label}>
      {items.map((item, i) => {
        const isSelected = i === selected;
        const props = {
          ref: (el) => {
            itemRefs.current[i] = el;
          },
          className: itemClassName,
          onMouseEnter: () => select(i),
          onFocus: () => select(i),
        };
        const content = renderItem ? (
          renderItem(item, isSelected)
        ) : (
          <span className={focusClass(isSelected)}>{item.label}</span>
        );
        let el;
        if (!item.href) {
          el = (
            <button type="button" {...props} onClick={item.onClick}>
              {content}
            </button>
          );
        } else if (item.external) {
          el = (
            <a href={item.href} target="_blank" rel="noopener" {...props}>
              {content}
            </a>
          );
        } else {
          el = (
            <Link href={item.href} {...props}>
              {content}
            </Link>
          );
        }
        return <li key={item.key}>{el}</li>;
      })}
    </ul>
  );
}
