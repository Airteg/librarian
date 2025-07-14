const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  const dir = path.join(process.cwd(), "src/content/posts");
  console.log("Directory:", dir); // Діагностика
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    return {
      statusCode: 200,
      body: JSON.stringify(files),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error:", error.message); // Діагностика
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
