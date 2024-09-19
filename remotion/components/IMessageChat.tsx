// remotion/components/IMessageChat.tsx
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

type IMessageChatProps = {
	messages?: Array<{ sender: string; text: string }>;
};

const IMessageChat: React.FC<IMessageChatProps> = ({ messages = [] }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);

	// For debugging purposes, log the messages
	console.log('IMessageChat messages:', messages);

	return (
		<AbsoluteFill
			style={{ justifyContent: 'center', alignItems: 'center', opacity }}>
			{/* Render your chat bubbles here */}
			{messages.map((msg, index) => (
				<div
					key={index}
					style={{
						margin: '10px',
						backgroundColor: '#fff',
						padding: '10px',
						borderRadius: '10px',
					}}>
					<strong>{msg.sender}</strong>: {msg.text}
				</div>
			))}
		</AbsoluteFill>
	);
};

export default IMessageChat;
