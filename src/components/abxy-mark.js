// One-time easter egg: four dots in the Xbox 360 controller's ABXY diamond
// arrangement (Y/yellow top, X/blue left, B/red right, A/green bottom).
// Used exactly once on the site, by design -- don't reuse elsewhere.
export default function AbxyMark() {
  return (
    <div aria-hidden="true" className="relative inline-block size-7">
      <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-xbox-yellow" />
      <span className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-xbox-blue" />
      <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-xbox-red" />
      <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-xbox-green" />
    </div>
  );
}
