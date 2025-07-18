//rafce
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
          original?: {
            width: number;
            height: number;
            src: string;
          };
        };
      };
    };
  };
};
type Props = { data: SinglePostData };

const SinglePost = ({ data }: Props) => {
  // console.log("🚀 ~ SinglePost ~ data:", data);
  const { html, frontmatter } = data.markdownRemark;
  const { category, title, image } = frontmatter;

  const img = image?.childImageSharp?.gatsbyImageData
    ? getImage(image.childImageSharp.gatsbyImageData)
    : null;
  const original = image?.childImageSharp?.original;
  // console.log("🚀 ~ SinglePost ~ original:", original);
  const aspect = original ? original.width / original.height : 1.5;
  // console.log("🚀 ~ SinglePost ~ aspect:", aspect);
  const isWide = aspect > 1.2 && aspect <= 2;

  return (
    <Container>
      <Breadcrumbs>
        <span>{category}</span>
        <span>&nbsp;»&nbsp;</span>
        <span>{title}</span>
      </Breadcrumbs>
      <ImageWrapper $floatRight={isWide}>
        <GatsbyImage image={img!} alt={title} />
      </ImageWrapper>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export default SinglePost;

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
            original {
              width
              height
              src
            }
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
  /* border: 5px solid red; */
`;
const Breadcrumbs = styled.nav`
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  color: #888;
  a {
    color: inherit;
    text-decoration: underline;
  }
  span:last-child {
    font-weight: bold;
    color: ${(p) => p.theme.colors.color};
  }
`;
const ImageWrapper = styled.div<{ $floatRight?: boolean }>`
  width: ${({ $floatRight }) => ($floatRight ? "45%" : "100%")};
  float: ${({ $floatRight }) => ($floatRight ? "right" : "none")};
  margin: ${({ $floatRight }) =>
    $floatRight ? "0 0 1.5rem 2rem" : "0 0 1.5rem 0"};
  display: block;

  @media (max-width: 900px) {
    width: 100%;
    float: none;
    margin: 0 0 1.5rem 0;
  }
`;
