import React from 'react';
import {
  useFetchBySlug,
  ExperienceRoot,
  detachExperienceStyles,
} from '@contentful/experiences-sdk-react';
import { createClient } from 'contentful';

// Import component and token registrations
import '../registered-components';
import '../registered-tokens';

interface ContentfulExperienceProps {
  locale?: string;
  slug?: string;
}

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID!,
  host: process.env.NEXT_PUBLIC_CONTENTFUL_HOST || 'cdn.contentful.com',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export const ContentfulExperience: React.FC<ContentfulExperienceProps> = ({
  locale = 'en-US',
  slug,
}) => {
  const { isLoading, experience } = useFetchBySlug({
    client,
    experienceTypeId: process.env.NEXT_PUBLIC_CONTENTFUL_EXPERIENCE_TYPE_ID!,
    localeCode: locale,
    slug,
  });

  if (!experience || isLoading) {
    return null;
  }

  const experienceStyles = detachExperienceStyles(experience);

  return (
    <>
      <style>{experienceStyles}</style>
      <ExperienceRoot experience={experience} locale={locale} />
    </>
  );
}; 