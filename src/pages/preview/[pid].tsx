import React from "react";
import { useRouter } from "next/router";

const Preview = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <main style={{ width: "100%" }}>
      <div style={{ padding: "1rem" }}>
        <p>Current slug: {pid}</p>
      </div>
    </main>
  );
};

export default Preview;
