import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ContentReader } from '../utils/contentReader.js';

export function registerResources(server: McpServer, contentReader: ContentReader) {
  // Main resource for marketing tools
  server.resource(
    "osp-tools",
    "osp://tools",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: "OSP Marketing Tools: editing-codes, writing-guide, meta-guide, value-map, seo-guide"
      }]
    })
  );

  // Resource for editing codes
  server.resource(
    "editing-codes",
    "osp://tools/editing-codes",
    async (uri) => {
      try {
        const content = await contentReader.readMarkdownFile('codes-llm.md');
        return {
          contents: [{
            uri: uri.href,
            text: content
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );

  // Resource for writing guide
  server.resource(
    "writing-guide",
    "osp://tools/writing-guide",
    async (uri) => {
      try {
        const content = await contentReader.readMarkdownFile('guide-llm.md');
        return {
          contents: [{
            uri: uri.href,
            text: content
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );

  // Resource for meta guide
  server.resource(
    "meta-guide",
    "osp://tools/meta-guide",
    async (uri) => {
      try {
        const content = await contentReader.readMarkdownFile('meta-llm.md');
        return {
          contents: [{
            uri: uri.href,
            text: content
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );

  // Resource for product value map
  server.resource(
    "value-map",
    "osp://tools/value-map",
    async (uri) => {
      try {
        const content = await contentReader.readMarkdownFile('product-value-map-llm.md');
        return {
          contents: [{
            uri: uri.href,
            text: content
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );

  // Resource for SEO guide
  server.resource(
    "seo-guide",
    "osp://tools/seo-guide",
    async (uri) => {
      try {
        const content = await contentReader.readMarkdownFile('on-page-seo-guide.md');
        return {
          contents: [{
            uri: uri.href,
            text: content
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );
}
