import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import type { IGatsbyImageData } from "gatsby-plugin-image";

type SinglePostData = {
  markdownRemark: {
    html: string;
    id: string;
    frontmatter: {
      category: string;
      title: string;
      url: string;
      image?: {
        childImageSharp?: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
};
type Props = { data: SinglePostData };
const SinglePost = ({ data }: Props) => {
  // console.log("🚀 ~ SinglePost ~ data:", data);
  const { html, frontmatter } = data.markdownRemark;
  const { category, title, url, image } = frontmatter;
  const img = image?.childImageSharp?.gatsbyImageData
    ? getImage(image.childImageSharp.gatsbyImageData)
    : null;

  return (
    <Container>
      <h3>{title}</h3>
      <GatsbyImage image={img!} alt={title} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export default SinglePost;
//rafce
export const query = graphql`
  query Post($url: String) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      html
      frontmatter {
        category
        title
        url
        image {
          childImageSharp {
            gatsbyImageData(width: 600)
          }
        }
      }
      id
    }
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 5px solid red;
`;
