import React from 'react';

const Stat = ({ statName, statNumber, statWord }) => (
	<div className="w-third tc pa3 ba bw2 b--light-gray" style={{ marginRight: -2 }}>
		<div className="f6 biryani ttu">{statName}</div>
		<div className="f5 b biryani-black ttu tracked">
			{statNumber} {statWord}
		</div>
	</div>
);

const About = ({ mixes }) => (
	<div className="ph3 ph4-l">
		<div className="measure center lh-copy f4 ph3">
			<p className="mt0">
				Melissa's Mix!
			</p>
			<p>
				Relaxing mixes, fun fixes, and podcasts!
			</p>
		</div>

		<div className="flex pt3 ">
			<Stat statName="featuring..." statNumber={mixes.length} statWord="mixes" />
			{/* play_count*/}
			<Stat
				statName="featuring..."
				statNumber={mixes.reduce((accum, current) => accum + current.play_count, 0)}
				statWord="times"
			/>
			{/* audio_length*/}
			<Stat
				statName="featuring..."
				statNumber={mixes.reduce((accum, current) => accum + current.audio_length, 0)}
				statWord="seconds"
			/>
		</div>
	</div>
);

export default About;
