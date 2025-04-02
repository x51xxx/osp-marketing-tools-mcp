FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the project
RUN npm run build

# Expose port for HTTP/SSE server
EXPOSE 3000

# Command to run the server (HTTP/SSE mode by default)
CMD ["node", "dist/http.js"]