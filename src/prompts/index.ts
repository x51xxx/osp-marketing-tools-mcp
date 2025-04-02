import { z } from 'zod';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerPrompts(server: McpServer) {
  // 1. Content editing prompt
  server.prompt(
    "edit-content",
    { content: z.string() },
    ({ content }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Review this technical content using OSP editing codes:\n\n${content}`
        }
      }]
    })
  );

  // 2. Meta information generation prompt
  server.prompt(
    "generate-meta",
    { 
      topic: z.string(),
      keyword: z.string().optional(),
      audience: z.string().optional(), 
      contentType: z.string().optional() 
    },
    ({ topic, keyword, audience, contentType }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Use the OSP meta tool to generate metadata for an article about ${topic}.${
            keyword ? ` Primary keyword: ${keyword},` : ''
          }${
            audience ? ` audience: ${audience},` : ''
          }${
            contentType ? ` content type: ${contentType}` : ''
          }`
        }
      }]
    })
  );

  // 3. Product value map generation prompt
  server.prompt(
    "generate-value-map",
    { 
      productName: z.string(),
      targetAudience: z.string(),
      features: z.string()
    },
    ({ productName, targetAudience, features }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Generate an OSP value map for ${productName} focusing on ${targetAudience} with the following key features: ${features}`
        }
      }]
    })
  );

  // 4. Technical writing guide application prompt
  server.prompt(
    "apply-writing-guide",
    {
      documentType: z.string(),
      topic: z.string(),
      audience: z.string()
    },
    ({ documentType, topic, audience }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Apply the OSP writing guide to create a ${documentType} about ${topic} for ${audience}`
        }
      }]
    })
  );

  // 5. SEO optimization prompt
  server.prompt(
    "optimize-seo",
    { content: z.string() },
    ({ content }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Apply the OSP on-page SEO guide to optimize this content:\n\n${content}`
        }
      }]
    })
  );
}
