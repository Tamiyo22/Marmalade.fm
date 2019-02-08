import React from 'react';

const PlayMix = ({ playMix, id, currentMix, playing, children }) => (
	//when our currently playing mix squals the id of the mix
	//we will add a classname of playing
	<div
		className={`pointer ${id === currentMix && playing && 'playing'}`}
		onClick={()=> playMix(id)}
	>
		{children}
	</div>
);

export default PlayMix;
