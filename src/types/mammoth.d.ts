declare module 'mammoth' {
  interface ExtractOptions {
    buffer?: Buffer;
    path?: string;
    [key: string]: any;
  }

  interface ExtractionResult {
    value: string;
    messages: any[];
  }

  export function extractRawText(options: ExtractOptions): Promise<ExtractionResult>;
  export function convertToHtml(options: ExtractOptions): Promise<ExtractionResult>;
} 