// remotion/Video.tsx
import React from 'react';
import { AbsoluteFill, Audio, staticFile, getInputProps } from 'remotion';
import BackgroundVideo from './components/BackgroundVideo';
import IMessageChat from './components/IMessageChat';

type VideoProps = {
	messages: Array<{ sender: string; text: string }>;
};

const MyVideo: React.FC = () => {
	const { messages } = getInputProps<VideoProps>();

	console.log('MyVideo inputProps:', messages);

	const bgVideoSrc = staticFile('assets/bgvideo.mp4');
	const bgAudioSrc = staticFile('assets/bgaudio.mp3');

	return (
		<AbsoluteFill>
			{/* Background Video */}
			<BackgroundVideo src={bgVideoSrc} />

			{/* iMessage Chat */}
			<IMessageChat messages={messages} />

			{/* Background Audio */}
			<Audio src={bgAudioSrc} />
		</AbsoluteFill>
	);
};

export default MyVideo;
