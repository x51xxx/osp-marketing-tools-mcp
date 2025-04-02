import { z } from 'zod';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ContentReader } from '../utils/contentReader.js';

export function registerTools(server: McpServer, contentReader: ContentReader) {
  // Health Check Tool
  server.tool(
    "health_check", 
    "Check if the server is running and can access its resources", 
    async (_extra) => ({
      content: [{
        type: "text",
        text: JSON.stringify({
          status: "healthy",
          resources: ["osp://marketing-tools"],
          version: "1.0.0"
        })
      }]
    })
  );

  // Editing Codes Tool
  server.tool(
    "get_editing_codes", 
    "Get the Open Strategy Partners (OSP) editing codes documentation and usage protocol for editing texts. These semantic editing marks provide a standardized framework for content review with a teaching/learning focus.",
    async (_extra) => {
      try {
        const content = await contentReader.readMarkdownFile('codes-llm.md');
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              data: { content }
            })
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : String(error)
            })
          }],
          isError: true
        };
      }
    }
  );

  // Writing Guide Tool
  server.tool(
    "get_writing_guide", 
    "Get the Open Strategy Partners (OSP) writing guide and usage protocol for creating high-quality technical content. This guide provides systematic principles for narrative structure, flow, style, and technical accuracy.",
    async (_extra) => {
      try {
        const content = await contentReader.readMarkdownFile('guide-llm.md');
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              data: { content }
            })
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : String(error)
            })
          }],
          isError: true
        };
      }
    }
  );

  // Meta Guide Tool
  server.tool(
    "get_meta_guide", 
    "Get the Open Strategy Partners (OSP) Web Content Meta Information Generation System for creating optimized article titles, meta titles, meta descriptions, and slugs for web content with proper keyword placement and search intent analysis.",
    async (_extra) => {
      try {
        const content = await contentReader.readMarkdownFile('meta-llm.md');
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              data: { content }
            })
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : String(error)
            })
          }],
          isError: true
        };
      }
    }
  );

  // Value Map Positioning Guide Tool
  server.tool(
    "get_value_map_positioning_guide", 
    "Get the Open Strategy Partners (OSP) Product Communications Value Map Generation System for Product Positioning, including taglines, position statements, personas, value cases, and feature categorization in a structured hierarchy.",
    async (_extra) => {
      try {
        const content = await contentReader.readMarkdownFile('product-value-map-llm.md');
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              data: { content }
            })
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : String(error)
            })
          }],
          isError: true
        };
      }
    }
  );

  // On-Page SEO Guide Tool
  server.tool(
    "get_on_page_seo_guide", 
    "Get the Open Strategy Partners (OSP) On-Page SEO Optimization Guide for comprehensive web content optimization, covering meta content, keyword research, content depth, search intent alignment, internal linking, and structured data.",
    async (_extra) => {
      try {
        const content = await contentReader.readMarkdownFile('on-page-seo-guide.md');
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              data: { content }
            })
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : String(error)
            })
          }],
          isError: true
        };
      }
    }
  );
}
