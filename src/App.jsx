import React, { useState } from "react";
import GiftBox from "./components/GiftBox";

export default function App() {
  const [reduced, setReduced] = useState(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return (
      <div>
        <GiftBox reducedMotion={reduced} />
      </div>
  );
}
