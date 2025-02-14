import React from "react";
import ErrorPage from "next/error";
import { createClient } from "contentful";
import {
  ExperienceRoot,
  detachExperienceStyles,
  fetchBySlug,
} from "@contentful/experiences-sdk-react";
import Head from "next/head";
import { defineComponents } from "@contentful/experiences-sdk-react";
import { Button } from "@/components/experience-components/button";
import { contentfulConfig } from "@/lib/contentful-config";

// Experience components setup
defineComponents([
  {
    component: Button,
    definition: {
      id: "custom-button",
      name: "Button",
      category: "Custom Components",
      variables: {
        text: {
          displayName: "Text",
          type: "Text",
          defaultValue: "Click me",
        },
      },
    },
  },
]);

const experienceClient = createClient({
  space: contentfulConfig.space,
  environment: contentfulConfig.environment,
  accessToken: contentfulConfig.accessToken,
});

interface PreviewProps {
  experienceJSON: string | null;
  stylesheet: string | null;
}

const Preview = (props: PreviewProps) => {
  if (!props.experienceJSON) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {props.stylesheet && (
        <Head>
          <style data-ssg>{props.stylesheet}</style>
        </Head>
      )}
      <main style={{ width: "100%" }}>
        <ExperienceRoot
          experience={props.experienceJSON}
          locale={contentfulConfig.localeCode}
        />
      </main>
    </>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params?: { pid?: string };
}) => {
  const pid = Array.isArray(params?.pid) ? params.pid[0] : params?.pid || "";

  const experience = await fetchBySlug({
    client: experienceClient,
    slug: pid,
    experienceTypeId: contentfulConfig.experienceTypeId,
    localeCode: contentfulConfig.localeCode,
    isEditorMode: false,
  });

  const stylesheet = experience ? detachExperienceStyles(experience) : null;
  const experienceJSON = experience ? JSON.stringify(experience) : null;

  console.log("stylesheet", stylesheet);
  console.log("experienceJSON", experienceJSON);

  return {
    props: {
      experienceJSON,
      stylesheet,
    },
  };
};

export default Preview;
