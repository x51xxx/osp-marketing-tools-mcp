import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export class ContentReader {
  private readonly resourcesDir: string;
  private cache: Map<string, string> = new Map();

  constructor(resourcesDir?: string) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.resourcesDir = resourcesDir || join(__dirname, '..', '..', 'prompts');
  }

  async readMarkdownFile(filename: string): Promise<string> {
    // Check cache
    if (this.cache.has(filename)) {
      return this.cache.get(filename)!;
    }

    try {
      const filePath = join(this.resourcesDir, filename);
      const content = await readFile(filePath, 'utf-8');
      
      // Store in cache
      this.cache.set(filename, content);
      
      return content;
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      throw new Error(`Required file '${filename}' not found`);
    }
  }
}
