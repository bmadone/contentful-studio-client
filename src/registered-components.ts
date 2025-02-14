// @ts-ignore
import { defineComponents } from "@contentful/experiences-sdk-react";
import { Button } from "./components/button/button";
import { Heading } from "./components/heading/heading";

defineComponents([
  {
    component: Button,
    definition: {
      id: "button",
      name: "Button",
      category: "Interactive",
      variables: {
        text: {
          displayName: "Text",
          type: "Text",
          defaultValue: "Click me!",
        },
        variant: {
          displayName: "Variant",
          // @ts-ignore
          type: "Enum",
          defaultValue: "primary",
          validations: {
            // @ts-ignore
            in: ["primary", "secondary", "outline"],
          },
        },
        size: {
          displayName: "Size",
          // @ts-ignore
          type: "Enum",
          defaultValue: "medium",
          validations: {
            // @ts-ignore
            in: ["small", "medium", "large"],
          },
        },
      },
    },
  },
  {
    component: Heading,
    definition: {
      id: "heading",
      name: "Heading",
      category: "Text",
      variables: {
        text: {
          displayName: "Text",
          type: "Text",
          defaultValue: "Heading",
        },
        // @ts-ignore
        level: {
          displayName: "Level",
          // @ts-ignore
          type: "Enum",
          defaultValue: "h2",
          validations: {
            // @ts-ignore
            in: ["h1", "h2", "h3", "h4", "h5", "h6"],
          },
        },
      },
    },
  },
]);
