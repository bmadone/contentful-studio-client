import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ExperienceRoot,
  detachExperienceStyles,
  fetchBySlug,
} from "@contentful/experiences-sdk-react";
import "@/registered-components";
import "@/registered-tokens";
import { client } from "@/lib/contentful-client";
import { contentfulConfig } from "@/lib/contentful-config";
import styles from "./slug.module.css";

const Preview = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [experience, setExperience] = useState<any>(null);
  const [stylesheet, setStylesheet] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperience() {
      if (!slug) return;

      try {
        const experienceData = await fetchBySlug({
          client,
          slug: slug as string,
          experienceTypeId: contentfulConfig.experienceTypeId,
          localeCode: contentfulConfig.localeCode,
        });

        if (experienceData) {
          setExperience(experienceData);
          const styles = detachExperienceStyles(experienceData);
          setStylesheet(styles || null);
        }
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    }

    fetchExperience();
  }, [slug]);

  if (!experience || !stylesheet) {
    return (
      <div>
        <h1>Loading experience...</h1>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <style>{stylesheet}</style>
      <ExperienceRoot
        experience={experience}
        locale={contentfulConfig.localeCode}
      />
    </main>
  );
};

export default Preview;
