// src/pages/api/render-video.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { renderMedia } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';
import { getCompositions } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// Extract data from the request body
		const { messages } = req.body;

		const compositionId = 'MyVideo';

		const entry = 'remotion/index.ts';
		const fullPath = path.join(process.cwd(), entry);

		const outputLocation = `/tmp/video-${Date.now()}.mp4`;

		try {
			// Bundle the Remotion project
			const bundled = await bundle(fullPath);

			// Get the compositions defined in the project
			const comps = await getCompositions(bundled, { inputProps: {} });

			// Select the composition you want to render
			const composition = comps.find((c) => c.id === compositionId);

			if (!composition) {
				throw new Error(`No composition with the ID ${compositionId} found`);
			}

			// For debugging: log the inputProps
			console.log('Rendering with inputProps:', { messages });

			// Render the video
			await renderMedia({
				composition,
				serveUrl: bundled,
				codec: 'h264',
				outputLocation,
				inputProps: {
					messages,
				},
			});

			// Read the rendered video file
			const fileBuffer = fs.readFileSync(outputLocation);

			// Set headers for file download
			res.setHeader('Content-Type', 'video/mp4');
			res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');

			// Send the file
			res.send(fileBuffer);

			// Delete the temporary file
			fs.unlinkSync(outputLocation);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Video rendering failed' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
