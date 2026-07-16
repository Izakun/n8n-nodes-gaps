import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class GapsApi implements ICredentialType {
	name = 'gapsApi';

	displayName = 'Gaps API';

	icon = 'file:gapsApi.svg' as const;

	documentationUrl = 'https://github.com/JasonHHouse/gaps';

	// Gaps runs with no auth by default. If "login" is enabled it uses HTTP Basic
	// (username "user" + an auto-generated password); the node adds the header
	// only when a username/password is supplied here.
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://gaps:8484',
			required: true,
			description: 'Base URL of the Gaps instance (e.g. http://gaps:8484). No trailing slash.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			description: 'HTTP Basic username (only if login is enabled in Gaps; usually "user")',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'HTTP Basic password (only if login is enabled in Gaps)',
		},
	];
}
