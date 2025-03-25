import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

// Since there are no type definitions for mammoth, we use a simple import
// with a module declaration to avoid typescript errors
import * as mammoth from 'mammoth';

export class DocxToTxt implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'DOCX to TXT',
		name: 'docxToTxt',
		icon: 'file:docx.svg',
		group: ['transform'],
		version: 1,
		description: 'Converts DOCX files to TXT format with proper Hebrew text handling',
		defaults: {
			name: 'DOCX to TXT',
			color: '#1976d2',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				description: 'Name of the binary property containing the DOCX file',
				required: true,
			},
			{
				displayName: 'Output Property',
				name: 'outputPropertyName',
				type: 'string',
				default: 'data',
				description: 'Name of the binary property to which to write the TXT file',
				required: true,
			},
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				default: '',
				placeholder: 'document.txt',
				description: 'Name of the output text file. If not set, the input file name with .txt extension will be used',
			},
			{
				displayName: 'Preserve Right-to-Left',
				name: 'preserveRtl',
				type: 'boolean',
				default: true,
				description: 'Ensures proper handling of right-to-left text (like Hebrew)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				// Get parameters
				const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
				const outputPropertyName = this.getNodeParameter('outputPropertyName', i) as string;
				const preserveRtl = this.getNodeParameter('preserveRtl', i) as boolean;
				let fileName = this.getNodeParameter('fileName', i, '') as string;

				// Check if binary data exists
				if (!items[i].binary?.[binaryPropertyName]) {
					throw new NodeOperationError(
						this.getNode(),
						`No binary data found in property "${binaryPropertyName}"`,
					);
				}

				const binaryData = items[i].binary![binaryPropertyName];

				// Get the binary data
				const buffer = Buffer.from(binaryData.data, 'base64');

				// Use mammoth to extract text from DOCX
				const result = await mammoth.extractRawText({
					buffer,
					// Add options if needed for RTL text
				});

				let textContent = result.value;

				// Handle Hebrew text if needed
				if (preserveRtl) {
					// No explicit encoding change needed, as we're maintaining text as is from mammoth
					// If there are specific RTL manipulations needed, they can be added here
				}

				// Determine output filename
				if (!fileName) {
					fileName = binaryData.fileName ? binaryData.fileName.replace(/\.docx$/i, '.txt') : 'document.txt';
				}

				// Ensure it has a .txt extension
				if (!fileName.toLowerCase().endsWith('.txt')) {
					fileName += '.txt';
				}

				// Create the output item with the converted text
				const newItem: INodeExecutionData = {
					json: {
						...items[i].json,
						textContent,
					},
					binary: {
						...items[i].binary,
						[outputPropertyName]: {
							data: Buffer.from(textContent).toString('base64'),
							mimeType: 'text/plain',
							fileName,
						},
					},
				};

				returnData.push(newItem);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
} 