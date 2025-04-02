import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {ContentReader} from './utils/contentReader.js';
import {registerTools} from './tools/index.js';
import {registerPrompts} from './prompts/index.js';
import {registerResources} from './resources/index.js';

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

// Start server
async function main() {
    try {
        console.log("Starting OSP Marketing Tools MCP server...");
        const transport = new StdioServerTransport();
        await server.connect(transport);
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

// Call main if file is executed directly
main()
    .then(() => {
        console.log("OSP Marketing Tools MCP server started.");
    })
    .catch((error) => {
        console.error("Error starting server:", error);
        process.exit(1);
    });
