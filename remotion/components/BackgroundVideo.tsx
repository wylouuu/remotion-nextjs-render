// remotion/components/BackgroundVideo.tsx
import React from 'react';
import { Video, AbsoluteFill } from 'remotion';

type BackgroundVideoProps = {
	src: string;
};

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
	return (
		<AbsoluteFill>
			<Video src={src} />
		</AbsoluteFill>
	);
};

export default BackgroundVideo;
