import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class GapsApi implements ICredentialType {
	name = 'gapsApi';

	displayName = 'Gaps API';

	icon = 'file:gapsApi.svg' as const;

	documentationUrl = 'https://github.com/JasonHHouse/gaps';

	// Gaps' API is unauthenticated by default; only the base URL is needed.
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://gaps:8484',
			required: true,
			description: 'Base URL of the Gaps instance (e.g. http://gaps:8484). No trailing slash.',
		},
	];
}
