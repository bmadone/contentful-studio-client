import React from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import { fetchBySlug } from "@contentful/experiences-sdk-react";
import { contentfulConfig } from "@/lib/contentful-config";

const Preview = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [experienceData, setExperienceData] = React.useState<any>(null);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchData() {
      if (!pid) return;

      const experienceClient = createClient({
        space: contentfulConfig.space,
        environment: contentfulConfig.environment,
        accessToken: contentfulConfig.accessToken,
      });

      try {
        const experience = await fetchBySlug({
          client: experienceClient,
          slug: pid as string,
          experienceTypeId: contentfulConfig.experienceTypeId,
          localeCode: contentfulConfig.localeCode,
          isEditorMode: false,
        });

        setExperienceData(experience);
        console.log("Full experience data:", experience); // For debugging
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, [pid]);

  return (
    <main style={{ width: "100%" }}>
      <div style={{ padding: "1rem" }}>
        <p>URL Parameter: {pid}</p>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <p>
          Experience Data:{" "}
          {experienceData
            ? JSON.stringify(experienceData, null, 2)
            : "Loading..."}
        </p>
      </div>
    </main>
  );
};

export default Preview;
