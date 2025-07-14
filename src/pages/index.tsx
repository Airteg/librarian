import React from "react";
import styled from "@emotion/styled";
import { graphql, Link } from "gatsby";

type Post = {
  node: {
    frontmatter: {
      category: string;
      title: string;
      url: string;
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
  console.log("🚀 ~ HomePage ~ edges:", edges);

  return (
    <Container>
      {edges.map((post: Post) => {
        const { category, title, url } = post.node.frontmatter;
        return (
          <Link to={`/${category}/${url}`} key={post.node.id}>
            {title}
          </Link>
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
          frontmatter {
            category
            title
            url
          }
          id
        }
      }
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
