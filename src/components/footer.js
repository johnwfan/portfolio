export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-[900px] border-t border-border px-6 py-8">
        <p className="text-xs text-muted-foreground">john fan · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
