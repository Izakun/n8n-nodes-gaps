# n8n-nodes-gaps

[![npm version](https://img.shields.io/npm/v/n8n-nodes-gaps.svg)](https://www.npmjs.com/package/n8n-nodes-gaps)

n8n community node for [Gaps](https://github.com/JasonHHouse/gaps) — find missing movies in Plex collections — via its API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-gaps`.

## Operations
- Get Libraries, Get Configuration

## Credentials
Configure the base URL and authentication in the **Gaps API** credential.

## Usage example

Read the movie status:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Movie Status**.
4. Execute the node — example output:

```json
{ "totalMovieCount": 842, "moviesInPlex": 800, "recommendedCount": 42 }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
