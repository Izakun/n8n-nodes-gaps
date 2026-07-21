import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Gaps implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Gaps',
		name: 'gaps',
		icon: { light: 'file:gaps.svg', dark: 'file:gaps.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Query your Gaps instance (missing movies in Plex collections) through its API',
		defaults: { name: 'Gaps' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'gapsApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Libraries', value: 'getLibraries', action: 'Get libraries for a server' },
					{ name: 'Get Movie Status', value: 'getMovieStatus', action: 'Get the movie status' },
					{ name: 'Get Plex Movies', value: 'getPlexMovies', action: 'Get movies in a library' },
					{
						name: 'Get Recommended',
						value: 'getRecommended',
						action: 'Get recommended missing movies',
					},
					{ name: 'Get Search Status', value: 'getSearchStatus', action: 'Get the search status' },
				],
				default: 'getMovieStatus',
			},
			{
				displayName: 'Machine Identifier',
				name: 'machineIdentifier',
				type: 'string',
				default: '',
				required: true,
				description: 'Plex server machine identifier',
				displayOptions: {
					show: { operation: ['getLibraries', 'getPlexMovies', 'getRecommended'] },
				},
			},
			{
				displayName: 'Library Key',
				name: 'libraryKey',
				type: 'string',
				default: '',
				required: true,
				description: 'Plex library (section) key',
				displayOptions: {
					show: { operation: ['getPlexMovies', 'getRecommended'] },
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('gapsApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;
				const param = <T>(name: string, fallback?: T) =>
					this.getNodeParameter(name, i, fallback as T) as T;

				const withScope = (prefix: string) =>
					`${prefix}/${encodeURIComponent(param<string>('machineIdentifier'))}/${encodeURIComponent(
						param<string>('libraryKey'),
					)}`;

				const URL_BY_OP: Record<string, () => string> = {
					getMovieStatus: () => '/movieStatus',
					getSearchStatus: () => '/searchStatus',
					// Listing libraries only needs the server machine identifier.
					getLibraries: () =>
						`/libraries/${encodeURIComponent(param<string>('machineIdentifier'))}`,
					getPlexMovies: () => withScope('/plex/movies'),
					getRecommended: () => withScope('/recommended'),
				};

				const build = URL_BY_OP[operation];
				if (!build) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const headers: IDataObject = {};
				if (credentials.username || credentials.password) {
					headers.Authorization = `Basic ${Buffer.from(
						`${credentials.username}:${credentials.password}`,
					).toString('base64')}`;
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gapsApi', {
					method: 'GET' as IHttpRequestMethods,
					baseURL,
					url: build(),
					headers,
					json: true,
				} as IHttpRequestOptions);

				if (Array.isArray(response)) {
					for (const element of response) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
