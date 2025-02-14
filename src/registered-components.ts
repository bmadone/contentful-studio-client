// @ts-ignore
import { defineComponents } from "@contentful/experiences-sdk-react";
import type { ComponentRegistration } from "@contentful/experiences-core/types";
import { Button } from "./components/button/button";
import { Heading } from "./components/heading/heading";

const components: ComponentRegistration[] = [
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
          type: "Text",
          defaultValue: "primary",
          validations: {
            in: [
              { value: "primary" },
              { value: "secondary" },
              { value: "outline" },
            ],
          },
        },
        size: {
          displayName: "Size",
          type: "Text",
          defaultValue: "medium",
          validations: {
            in: [{ value: "small" }, { value: "medium" }, { value: "large" }],
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
        level: {
          displayName: "Level",
          type: "Text",
          defaultValue: "h2",
          validations: {
            in: [
              { value: "h1" },
              { value: "h2" },
              { value: "h3" },
              { value: "h4" },
              { value: "h5" },
              { value: "h6" },
            ],
          },
        },
      },
    },
  },
];

defineComponents(components);
