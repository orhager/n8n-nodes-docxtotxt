# n8n-nodes-docxtotxt

This is an n8n community node. It lets you convert DOCX files to TXT format in your n8n workflows, with special handling for right-to-left languages like Hebrew.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node Installation

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Select **Install**
4. Enter `n8n-nodes-docxtotxt` in **Enter npm package name**
5. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a third party**
6. Select **Install**

## Operations

- **Convert DOCX to TXT**: Converts a DOCX file to plain text format
  - Properly handles right-to-left text (like Hebrew)
  - Preserves as much formatting as possible in the text output

## Example Usage

This example workflow shows how to use the DOCX to TXT node to convert uploaded documents to text format:

1. HTTP Request node (Webhook) configured to accept file uploads
2. DOCX to TXT node configured to convert the uploaded DOCX file to text

## Compatibility

Tested with n8n version 0.214.3 and later. It should work with earlier versions as well.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [mammoth.js](https://github.com/mwilliamson/mammoth.js) - The library used to extract text from DOCX

## License

[MIT](https://github.com/orhager/n8n-nodes-docxtotxt/blob/master/LICENSE.md) 