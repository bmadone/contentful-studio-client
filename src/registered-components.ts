import { defineComponents } from "@contentful/experiences-sdk-react";
import { Button } from "./components/button/button";
import { Heading } from "./components/heading/heading";

defineComponents([
  {
    component: Button,
    definition: {
      id: "button",
      name: "Button",
      category: "Custom Components",
      variables: {
        text: {
          displayName: "Text",
          type: "Text",
          defaultValue: "Click me!",
        },
      },
    },
  },

  {
    component: Heading,
    definition: {
      id: "heading",
      name: "Heading",
      category: "Custom Components",
      variables: {
        text: {
          displayName: "Text",
          type: "Text",
          defaultValue: "Heading",
        },
      },
    },
  },
]);
