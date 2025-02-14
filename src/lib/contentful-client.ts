import { createClient } from "contentful";
import { contentfulConfig } from "./contentful-config";

export const client = createClient({
  space: contentfulConfig.space,
  accessToken: contentfulConfig.accessToken,
  environment: contentfulConfig.environment,
});
