// remotion/compositions.ts
import { Composition } from 'remotion';
import MyVideo from './Video';

export const RemotionCompositions = () => {
	return (
		<>
			<Composition
				id='MyVideo'
				component={MyVideo}
				durationInFrames={150} // 5 seconds at 30 fps
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					messages: [{ sender: 'Default', text: 'Default message' }],
				}}
			/>
		</>
	);
};
