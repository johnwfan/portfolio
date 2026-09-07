import { ACCENT } from "@/lib/accent";

export default function SectionMarker({ accent }) {
  return <span aria-hidden="true" className={`inline-block size-2 shrink-0 ${ACCENT[accent].dot}`} />;
}
