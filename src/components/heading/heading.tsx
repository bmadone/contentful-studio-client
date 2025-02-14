import React from "react";
import styles from "./heading.module.css";

interface HeadingProps {
  text: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ 
  text, 
  level = "h2",
  className = ""
}) => {
  const Tag = level;
  return <Tag className={`${styles.heading} ${className}`}>{text}</Tag>;
}; 