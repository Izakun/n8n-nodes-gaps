<img src="nodes/Gaps/gaps.svg" width="90" align="right" alt="Gaps" />

# n8n-nodes-gaps

[![npm version](https://img.shields.io/npm/v/n8n-nodes-gaps.svg)](https://www.npmjs.com/package/n8n-nodes-gaps)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-gaps.svg)](https://www.npmjs.com/package/n8n-nodes-gaps)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-gaps.svg)](./LICENSE)

Community node for **n8n** to interact with **Gaps**. It lets you automate
Gaps directly from your n8n workflows using a secure stored credential.

> 🟡 **Community node** — submitted to n8n for verification (review in progress).
> Until it is approved, install it as a community node (below).

## Installation

In n8n, go to **Settings → Community Nodes → Install** and enter `n8n-nodes-gaps`.
Once it passes n8n's verification it will also be available directly from the **+ (Add node)** panel.

## Operations

| Operation | Description |
|---|---|
| **Get Libraries** | Get libraries for a server |
| **Get Movie Status** | Get the movie status |
| **Get Plex Movies** | Get movies in a library |
| **Get Recommended** | Get recommended missing movies |
| **Get Search Status** | Get the search status |

## Authentication

This node uses the **Gaps API** credential. In n8n, go to **Credentials → New**, pick
**Gaps API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://gaps:8484` (no trailing slash).
- **Username** — your account username.
- **Password** — your account password.

HTTP Basic authentication (username + password).

**Where to find it:** See the service documentation: https://github.com/JasonHHouse/gaps

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Gaps** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Gaps API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Gaps](https://github.com/JasonHHouse/gaps)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
