import React from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import { fetchBySlug } from "@contentful/experiences-sdk-react";
import { contentfulConfig } from "@/lib/contentful-config";
import { NextPage, GetServerSidePropsContext } from "next";

// Add getServerSideProps for SSR data fetching
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const client = createClient({
    space: contentfulConfig.space,
    accessToken: contentfulConfig.accessToken,
  });

  try {
    if (!params?.pid) {
      return { notFound: true };
    }
    const entry = await client.getEntry(params.pid as string);

    return {
      props: {
        entry,
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
  entry: any; // You can type this more specifically based on your content model
}

const Preview: NextPage<PreviewProps> = ({ entry }) => {
  // Remove any client-side fetching logic since data is now from props

  return (
    <div>
      {/* Render your preview content using the entry prop */}
      <pre>{JSON.stringify(entry, null, 2)}</pre>
    </div>
  );
};

export default Preview;
