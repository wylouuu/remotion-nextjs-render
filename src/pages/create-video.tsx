// src/pages/index.tsx
import React, { useState } from 'react';

const HomePage: React.FC = () => {
	const [messages, setMessages] = useState([
		{ sender: 'Alice', text: 'Hi there!' },
		{ sender: 'Bob', text: 'Hello!' },
	]);
	const [videoUrl, setVideoUrl] = useState('');
	const [loading, setLoading] = useState(false);

	const handleCreateVideo = async () => {
		setLoading(true);

		try {
			const response = await fetch('/api/render-video', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ messages }),
			});

			if (!response.ok) {
				throw new Error('Video rendering failed');
			}

			// Create a blob from the response
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			setVideoUrl(url);
		} catch (error) {
			console.error(error);
			alert('Error creating video');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>Create Your Video</h1>

			{/* Input form for messages (simplified for this example) */}
			<button onClick={handleCreateVideo}>Create Video</button>

			{loading && (
				<div>
					<p>Rendering your video, please wait...</p>
					{/* Add a spinner or progress bar here */}
				</div>
			)}

			{videoUrl && (
				<div>
					<h2>Preview</h2>
					<video src={videoUrl} controls width='600' />

					<a href={videoUrl} download='video.mp4'>
						<button>Download Video</button>
					</a>
				</div>
			)}
		</div>
	);
};

export default HomePage;
