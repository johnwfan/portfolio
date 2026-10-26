import Link from "./TransitionLink";
import styles from "./UnderlineLink.module.css";

// A link with the growing underline (UPDATE §4): a 1px line at 18% that grows
// to full width on hover. Internal paths use the page transition; anything else
// (mailto:, other sites) is a plain link, and `external` opens it in a new tab.
export default function UnderlineLink({ href, external = false, className = "", children, ...rest }) {
  const cls = `${styles.link} ${className}`;
  if (external || !href.startsWith("/")) {
    const tab = external ? { target: "_blank", rel: "noopener" } : {};
    return (
      <a href={href} {...tab} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
