import React from "react";
import Layout from "../components/Layout";

export const wrapPageElement = ({
  element,
  props,
}: {
  element: React.ReactNode;
  props: any;
}) => {
  return <Layout {...props}>{element}</Layout>;
};
