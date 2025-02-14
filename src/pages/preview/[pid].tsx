import React from "react";
import { createClient } from "contentful";
import { contentfulConfig } from "@/lib/contentful-config";
import { NextPage } from "next";
import {
  ExperienceRoot,
  detachExperienceStyles,
  useFetchBySlug,
} from "@contentful/experiences-sdk-react";
import "@/registered-components";
import "@/registered-tokens";

interface PreviewProps {
  slug: string;
}

const client = createClient({
  space: contentfulConfig.space,
  accessToken: contentfulConfig.accessToken,
  environment: contentfulConfig.environment,
});

const Preview: NextPage<PreviewProps> = ({ slug }) => {
  console.log("slug", slug);

  const { isLoading, experience } = useFetchBySlug({
    client,
    experienceTypeId: contentfulConfig.experienceTypeId,
    localeCode: contentfulConfig.localeCode,
    slug,
  });

  console.log("experience", experience);

  if (!experience || isLoading) {
    return (
      <div>
        <h1>Loading experience...</h1>
      </div>
    );
  }

  const experienceStyles = detachExperienceStyles(experience);
  console.log("experienceStyles", experienceStyles);

  return (
    <div>
      <style>{experienceStyles}</style>
      <ExperienceRoot
        experience={experience}
        locale={contentfulConfig.localeCode}
      />
    </div>
  );
};

export default Preview;
