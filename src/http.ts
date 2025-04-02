import express from 'express';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ContentReader } from './utils/contentReader.js';
import { registerTools } from './tools/index.js';
import { registerPrompts } from './prompts/index.js';
import { registerResources } from './resources/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Create MCP server
const server = new McpServer({
  name: "OSPMarketingTools",
  version: "1.0.0"
});

// Create content reader
const contentReader = new ContentReader();

// Register tools, prompts and resources
registerTools(server, contentReader);
registerPrompts(server);
registerResources(server, contentReader);

// For supporting multiple simultaneous connections, we have a lookup object
// from sessionId to transport
const transports: {[sessionId: string]: SSEServerTransport} = {};

// Set up static content
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());

// Main page
app.get('/', (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>OSP Marketing Tools MCP Server</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        .status { padding: 15px; background-color: #e8f5e9; border-radius: 4px; margin-bottom: 20px; }
        .tools { background-color: #f5f5f5; padding: 15px; border-radius: 4px; }
        ul { padding-left: 20px; }
        footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee; font-size: 0.8em; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>OSP Marketing Tools MCP Server</h1>
        
        <div class="status">
          <h2>Server Status</h2>
          <p>✅ The server is running properly on port ${PORT}</p>
          <p>Version: 1.0.0</p>
        </div>
        
        <div class="tools">
          <h2>Available Tools</h2>
          <ul>
            <li>health_check - Server health status</li>
            <li>get_editing_codes - OSP Editing Codes</li>
            <li>get_writing_guide - OSP Writing Guide</li>
            <li>get_meta_guide - OSP Meta Information Generator</li>
            <li>get_value_map_positioning_guide - OSP Value Map Generator</li>
            <li>get_on_page_seo_guide - OSP SEO Guide</li>
          </ul>
          
          <h2>Available Prompts</h2>
          <ul>
            <li>edit-content - Review content using OSP editing codes</li>
            <li>generate-meta - Generate metadata for web content</li>
            <li>generate-value-map - Create OSP value map for a product</li>
            <li>apply-writing-guide - Apply OSP writing guide</li>
            <li>optimize-seo - Apply OSP SEO optimization</li>
          </ul>
        </div>
        
        <footer>
          &copy; ${new Date().getFullYear()} Open Strategy Partners - MCP Server
        </footer>
      </div>
    </body>
    </html>
  `);
});

// Set up SSE endpoint
app.get("/sse", async (_, res) => {
  console.log("New SSE connection");
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  
  res.on("close", () => {
    console.log(`Connection closed for session ${transport.sessionId}`);
    delete transports[transport.sessionId];
  });
  
  await server.connect(transport);
});

// Set up endpoint for messages
app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`OSP Marketing Tools MCP Server is running on http://localhost:${PORT}`);
});
