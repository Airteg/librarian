const path = require("path");
exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query getUrl {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              category
              url
            }
          }
        }
      }
    }
  `);
  console.log("🚀 ~ exports.createPages= ~ data:", data);
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { category, url } = node.frontmatter;
    actions.createPage({
      path: `/${category}/${url}`,
      component: path.resolve(`./src/templates/single-post.tsx`),
      context: { url },
    });
  });
};
