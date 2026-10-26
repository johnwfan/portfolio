"use client";

import { useEffect, useRef } from "react";
import Link from "./TransitionLink";
import { selectTick } from "@/lib/sound";
import { useSite } from "./SiteShell";
import styles from "./FocusList.module.css";

// Selected = weight 640, sharp, opaque. Everything else = 220, blurred, faded
// (`soft`: a lighter blur and fade, for the case study's "on this page").
export function focusClass(selected, soft = false) {
  return `${styles.focus} ${selected ? styles.on : soft ? styles.offSoft : styles.off}`;
}

// The "focus + weight" list (HANDOFF §4). Selection follows mouseenter and
// focus; leaving the list keeps it. Items are { key, label, href?, external? }:
// internal hrefs render a <Link>, external ones an <a target="_blank">, and
// items without an href a <button>.
//
// With `tapToSelect`, a tap on an unselected link only selects it (touch
// screens have no hover); tapping the selected one opens it.
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
  tapToSelect = false,
  soft = false,
  label,
}) {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const tap = useRef(null);
  const { navigate } = useSite();

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
        else navigate(item.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboard, items, selected, navigate]);

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
          onPointerDown: (e) => {
            // remember whether it was already selected before the tap selects it
            tap.current = e.pointerType === "mouse" ? null : { i, was: isSelected };
          },
          onClick: (e) => {
            const t = tap.current;
            tap.current = null;
            if (tapToSelect && item.href && t?.i === i && !t.was) e.preventDefault();
            item.onClick?.(e);
          },
        };
        const content = renderItem ? (
          renderItem(item, isSelected)
        ) : (
          <span className={focusClass(isSelected, soft)}>{item.label}</span>
        );
        let el;
        if (!item.href) {
          el = (
            <button type="button" {...props}>
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
