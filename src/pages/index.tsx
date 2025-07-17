import React from "react";
import styled from "@emotion/styled";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

type Post = {
  node: {
    frontmatter: {
      category: string;
      title: string;
      url: string;
      image?: {
        childImageSharp?: {
          gatsbyImageData: any;
          id: string;
        };
      };
    };
    id: string;
  };
};

type HomePageProps = {
  data: {
    allMarkdownRemark: {
      edges: Post[];
    };
  };
};

export default function HomePage({ data }: HomePageProps) {
  const edges = data.allMarkdownRemark.edges;
  // console.log("🚀 ~ HomePage ~ edges:", edges);

  return (
    <Container>
      {edges.map((post: Post) => {
        const { category, title, url, image } = post.node.frontmatter;
        const img = image?.childImageSharp?.gatsbyImageData;

        return (
          <PostContainer key={post.node.id}>
            <GatsbyImage image={img} alt={title} />
            <Link to={`/${category}/${url}`}>{title}</Link>
          </PostContainer>
        );
      })}
    </Container>
  );
}
export const query = graphql`
  query MainPageQuery {
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            category
            title
            url
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 200
                  formats: [AUTO, WEBP, AVIF]
                  placeholder: BLURRED
                )
                id
              }
            }
          }
          id
        }
      }
    }
  }
`;
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const PostContainer = styled.div`
  /* height: 300px; */
  flex-basis: 20vw;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  text-align: center;
`;
