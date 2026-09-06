"use client";

import { useEffect, useState } from "react";

export default function LocalClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const update = () => setTime(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span>
      {time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}{" "}
      local
    </span>
  );
}
