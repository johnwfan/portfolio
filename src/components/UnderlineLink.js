import Link from "./TransitionLink";
import styles from "./UnderlineLink.module.css";

// A link with the growing underline (UPDATE §4): a 1px line at 18% that grows
// to full width on hover. Internal hrefs use the page transition; `external`
// opens in a new tab.
export default function UnderlineLink({ href, external = false, className = "", children, ...rest }) {
  const cls = `${styles.link} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls} {...rest}>
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
