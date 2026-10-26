// Visitor number, zero-padded to 6. Placeholder until the counter API (step e).
export function pad6(n) {
  return String(n).padStart(6, "0");
}

export function VisitorNo() {
  return <span>visitor no. {pad6(1)}</span>;
}
