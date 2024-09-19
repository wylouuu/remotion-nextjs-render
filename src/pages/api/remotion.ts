// src/pages/api/remotion.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { bundle } from '@remotion/bundler';
import { getCompositions } from '@remotion/renderer';
import path from 'path';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const entry = 'remotion/index.ts';
	const fullPath = path.join(process.cwd(), entry);

	try {
		const bundled = await bundle(fullPath);

		const comps = await getCompositions(bundled, { inputProps: {} });

		res.status(200).json(comps);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to get compositions' });
	}
}
