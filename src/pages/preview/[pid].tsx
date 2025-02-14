import React from "react";
import { createClient } from "contentful";
import { contentfulConfig } from "@/lib/contentful-config";
import { NextPage, GetServerSidePropsContext } from "next";
import {
  ExperienceRoot,
  detachExperienceStyles,
  useFetchBySlug,
} from "@contentful/experiences-sdk-react";

// Import component and token registrations
import "@/registered-components";
import "@/registered-tokens";

// Add getServerSideProps for SSR data fetching
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (!params?.pid) {
    return {
      notFound: true,
    };
  }

  const client = createClient({
    space: contentfulConfig.space,
    accessToken: contentfulConfig.accessToken,
    environment: contentfulConfig.environment,
  });

  try {
    // Assuming pid is the experience slug directly
    return {
      props: {
        slug: params.pid,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

// Update the component to receive props
interface PreviewProps {
  slug: string;
}

const Preview: NextPage<PreviewProps> = ({ slug }) => {
  const client = createClient({
    space: contentfulConfig.space,
    accessToken: contentfulConfig.accessToken,
    environment: contentfulConfig.environment,
  });

  const { isLoading, experience } = useFetchBySlug({
    client,
    experienceTypeId: contentfulConfig.experienceTypeId,
    localeCode: contentfulConfig.localeCode,
    slug,
  });

  if (!experience || isLoading) {
    return (
      <div>
        <h1>Loading experience...</h1>
      </div>
    );
  }

  const experienceStyles = detachExperienceStyles(experience);

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
