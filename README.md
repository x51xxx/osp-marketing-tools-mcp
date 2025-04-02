# OSP Marketing Tools for Node.js

![Model Context Protocol](https://img.shields.io/badge/protocol-MCP-blue)
![Language](https://img.shields.io/badge/language-TypeScript-blue)
![License](https://img.shields.io/badge/license-CC--BY--SA--4.0-green)

A comprehensive suite of tools for technical marketing content creation, optimization, and product positioning based on [Open Strategy Partners](https://openstrategypartners.com)' proven methodologies. This is a TypeScript implementation of the MCP server for OSP Marketing Tools.

## Why TypeScript Implementation?

This TypeScript/Node.js implementation offers significant advantages over the original Python version:

- **Simplified Installation**: Fewer dependencies and more straightforward setup process
- **Cross-Platform Compatibility**: Works seamlessly on Windows without the common Python dependency issues
- **Faster Performance**: Node.js typically offers better performance for this type of server
- **Modern JavaScript Ecosystem**: Leverages the robust npm package ecosystem
- **Easier Integration**: Simpler to integrate with web applications and other JavaScript tools
- **Lower Resource Usage**: Generally requires less memory and system resources

Perfect for those who want to use OSP Marketing Tools without dealing with Python dependencies, virtual environments, or compatibility issues.

## Features

### 1. OSP Product Value Map Generator
Generate structured [OSP product value maps](https://openstrategypartners.com/the-osp-value-map/) that effectively communicate your product's worth and positioning. This tool provides:
- Strategic tagline creation and refinement
- Position statements across market, technical, UX, and business dimensions
- Persona development with roles, challenges, and needs
- Value case documentation with clear benefits, challenges, and solutions
- Feature categorization in a structured hierarchy

### 2. OSP Meta Information Generator
Create optimized metadata for web content with proper keyword placement and SEO-friendly structure. This tool delivers:
- Article titles (H1) with strategic keyword placement
- Meta titles optimized for search (50-60 characters)
- Meta descriptions with compelling value propositions (155-160 characters)
- SEO-friendly URL slugs
- Search intent analysis and optimization
- Mobile display considerations

### 3. OSP Content Editing Codes
Apply [OSP's semantic editing codes](https://openstrategypartners.com/resources/the-osp-editing-codes/) for comprehensive content review. This system provides:
- Scope and narrative structure analysis
- Flow and readability enhancement
- Style and phrasing optimization
- Word choice and grammar verification
- Technical accuracy validation
- Inclusive language guidance
- Constructive feedback with before/after examples

### 4. OSP Technical Writing Guide
Systematic approach to creating high-quality technical content with proper narrative structure and flow. The guide covers:
- Narrative structure principles and logical progression
- Flow optimization and content organization
- Style guidelines for clarity and precision
- Technical accuracy verification
- Content-type specific guidance (tutorials, reference docs, API docs)
- Accessibility and internationalization best practices

### 5. OSP On-Page SEO Guide
Comprehensive system for optimizing web content for search engines and user experience. This guide includes:
- Meta content optimization strategies
- Content depth enhancement techniques
- Search intent alignment across different query types
- Keyword research and integration protocols
- Internal linking best practices
- Structured data implementation
- Content promotion strategies

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/x51xxx/osp-marketing-tools-mcp.git
cd osp-marketing-tools-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

### Configuration for Claude Desktop

Add to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "osp_marketing_tools": {
      "command": "node",
      "args": ["path/to/osp-marketing-tools-mcp/dist/index.js"]
    }
  }
}
```

### Configuration for Cursor

Add to your Cursor configuration:

```json
{
  "mcpServers": {
    "osp_marketing_tools": {
      "command": "node",
      "args": ["path/to/osp-marketing-tools-mcp/dist/index.js"]
    }
  }
}
```

## Usage

### Running the server in stdio mode (for Claude Desktop, Cursor, etc.)

```bash
npm start
```

### Running the server in HTTP/SSE mode

```bash
npm run start:sse
```

This will start a web server on port 3000 (configurable via PORT environment variable) that exposes the MCP API via Server-Sent Events (SSE).

## Available Tools

- `health_check` - Server health status and resource availability check
- `get_editing_codes` - OSP Editing Codes documentation and usage protocol for semantic content review
- `get_writing_guide` - OSP Writing Guide with principles for creating high-quality technical content
- `get_meta_guide` - OSP Meta Information Generator for web content metadata optimization
- `get_value_map_positioning_guide` - OSP Product Value Map Generator for effective product positioning
- `get_on_page_seo_guide` - OSP On-Page SEO Guide for comprehensive content optimization

## Available Prompts

- `edit-content` - Review content using OSP editing codes for improved quality and clarity
- `generate-meta` - Generate optimized metadata for web content with proper keyword placement
- `generate-value-map` - Create a structured OSP value map for product positioning
- `apply-writing-guide` - Apply OSP writing principles to create technical content
- `optimize-seo` - Apply on-page SEO strategies to optimize content for search

## Example Usage

To use the OSP editing codes to review content, simply send this prompt to Claude (after configuring the MCP server):

```
Review this technical content using OSP editing codes:

Kubernetes is a container orchestration platform. It handles deploying applications and scaling them as needed. There's lots of things it can do. It's really good. You should use it for your applications to make them more resilient.
```

For generating a product value map:

```
Generate an OSP value map for [Product Name] focusing on [target audience] with the following key features: [list features]

Example:
Generate an OSP value map for CloudDeploy focusing on DevOps engineers with these key features:
- Automated deployment pipeline
- Infrastructure as code support
- Real-time monitoring
- Multi-cloud compatibility
```

## Development

```bash
# Run in development mode (stdio)
npm run dev

# Run in development mode (HTTP/SSE)
npm run dev:sse
```

## Project Structure

```
osp-marketing-tools-mcp/
├── prompts/             # Markdown resources from OSP tools
├── src/
│   ├── utils/           # Utility functions
│   │   └── contentReader.ts
│   ├── tools/           # MCP tool implementations
│   │   └── index.ts
│   ├── prompts/         # MCP prompt templates
│   │   └── index.ts
│   ├── resources/       # MCP resource implementations
│   │   └── index.ts
│   ├── index.ts         # Main entry point (stdio)
│   └── http.ts          # HTTP/SSE server
├── dist/                # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

## Attribution

This software is based on the content creation and optimization methodologies developed by [Open Strategy Partners](https://openstrategypartners.com). It implements their LLM-enabled marketing tools and professional content creation frameworks.

For more information and original resources, visit:
1. [The OSP Writing and Editing Guide](https://openstrategypartners.com/osp-writing-editing-guide/)
2. [Editing Codes Quickstart Guide](https://openstrategypartners.com/blog/osp-editing-codes-quick-start-guide/)
3. [OSP Free Resources](https://openstrategypartners.com/resources/)

## License

This software is licensed under the Attribution-ShareAlike 4.0 International license from Creative Commons Corporation ("Creative Commons").
