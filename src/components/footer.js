import LocalClock from "@/components/local-clock";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-[900px] items-center justify-between border-t border-border px-6 py-8">
        <p className="text-xs text-muted-foreground">john fan · {new Date().getFullYear()}</p>
        <p className="text-xs text-muted-foreground">
          <LocalClock />
        </p>
      </div>
    </footer>
  );
}
