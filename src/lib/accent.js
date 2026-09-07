// Central map for the Xbox ABXY accent system. Tailwind v4 can't interpolate
// dynamic class names like `text-xbox-${color}`, so every literal class string
// needed anywhere in the app lives here once, and components look it up by key.
//
// Underlined text links never recolor the link's own text on hover (uniform
// across all four colors, and not just a style choice: green/yellow fail
// WCAG contrast against white as text, ~2.7:1 / ~2:1 vs blue/red's ~4.76:1).
// Only `hoverDecoration` (the underline) and `groupHoverIcon` (the arrow,
// needs `group` on the link) ever change color on hover.
export const ACCENT = {
  blue: {
    dot: "bg-xbox-blue",
    border: "border-xbox-blue",
    borderTop: "border-t-xbox-blue",
    hoverBorder: "hover:border-xbox-blue",
    hoverBorderSoft: "hover:border-xbox-blue/40",
    hoverBgSoft: "hover:bg-xbox-blue-soft",
    hoverDecoration: "hover:decoration-xbox-blue",
    groupHoverIcon: "group-hover:text-xbox-blue",
    afterBg: "after:bg-xbox-blue",
    text: "text-xbox-blue",
  },
  red: {
    dot: "bg-xbox-red",
    border: "border-xbox-red",
    borderTop: "border-t-xbox-red",
    hoverBorder: "hover:border-xbox-red",
    hoverBorderSoft: "hover:border-xbox-red/40",
    hoverBgSoft: "hover:bg-xbox-red-soft",
    hoverDecoration: "hover:decoration-xbox-red",
    groupHoverIcon: "group-hover:text-xbox-red",
    afterBg: "after:bg-xbox-red",
    text: "text-xbox-red",
  },
  green: {
    dot: "bg-xbox-green",
    border: "border-xbox-green",
    borderTop: "border-t-xbox-green",
    hoverBorder: "hover:border-xbox-green",
    hoverBorderSoft: "hover:border-xbox-green/40",
    hoverBgSoft: "hover:bg-xbox-green-soft",
    hoverDecoration: "hover:decoration-xbox-green",
    groupHoverIcon: "group-hover:text-xbox-green",
    afterBg: "after:bg-xbox-green",
    text: "text-xbox-green",
  },
  yellow: {
    dot: "bg-xbox-yellow",
    border: "border-xbox-yellow",
    borderTop: "border-t-xbox-yellow",
    hoverBorder: "hover:border-xbox-yellow",
    hoverBorderSoft: "hover:border-xbox-yellow/40",
    hoverBgSoft: "hover:bg-xbox-yellow-soft",
    hoverDecoration: "hover:decoration-xbox-yellow",
    groupHoverIcon: "group-hover:text-xbox-yellow",
    afterBg: "after:bg-xbox-yellow",
    text: "text-xbox-yellow",
  },
};
