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

// Setup CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// Main endpoint now redirects to index.html
app.get('/', (_, res) => {
  res.redirect('/index.html');
});

// API status endpoint
app.get('/api/status', (_, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0',
    serverName: 'OSPMarketingTools',
    tools: [
      'health_check',
      'get_editing_codes',
      'get_writing_guide',
      'get_meta_guide',
      'get_value_map_positioning_guide',
      'get_on_page_seo_guide'
    ],
    prompts: [
      'edit-content',
      'generate-meta',
      'generate-value-map',
      'apply-writing-guide',
      'optimize-seo'
    ]
  });
});

// Set up SSE endpoint
app.get("/sse", async (_, res) => {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;

  // Send the session ID to the client
  res.write(`event: sessionId\ndata: ${JSON.stringify({ sessionId: transport.sessionId })}\n\n`);

  res.on("close", () => {
    console.log(`Connection closed for session ${transport.sessionId}`);
    delete transports[transport.sessionId];
  });

  await server.connect(transport);
});

// Set up endpoint for messages
app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  console.log(`Received message for session ${sessionId}:`, req.body.method);

  const transport = transports[sessionId];

  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send({ error: 'No transport found for sessionId' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`OSP Marketing Tools MCP Server is running on http://localhost:${PORT}`);
  console.log(`Web interface available at: http://localhost:${PORT}/`);
  console.log(`SSE endpoint available at: http://localhost:${PORT}/sse`);
});
