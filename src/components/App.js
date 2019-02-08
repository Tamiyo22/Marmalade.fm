/* global Mixcloud*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import mixesData from '../data/mixes';
import Archive from './Archive';
import About from './About';

// const Archive = () => <h1>Archive</h1>;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
			currentMix: '',
			mixIds: mixesData,
			mix: null,
			mixes: []
		};
	}

	fetchMixes = async () => {
		const { mixIds } = this.state;

		mixIds.map(async (id) => {
			try {
				const response = await fetch(`https://api.mixcloud.com${id}`);

				const data = await response.json();

				this.setState((prevState, props) => ({
					mixes: [...prevState.mixes, data]
				}));
			} catch (error) {
				console.log(error);
			}
		});
	};

	mountAudio = async () => {
		this.widget = Mixcloud.PlayerWidget(this.player);

		await this.widget.ready;

		//using the widget events whe can tell when the audio is paused
		//audio is off set state to false
		this.widget.events.pause.on(() => this.setState({ playing: false }));
		//audio is playing set state to true
		this.widget.events.play.on(() => this.setState({ playing: true }));
	};

	componentDidMount() {
		//when our app component loads on the page, componentDidMount will be called
		//everything is ready, so we will run mountAudio
		this.mountAudio();
		this.fetchMixes();
	}

	actions = {
		togglePlay: () => {
			this.widget.togglePlay();
		},

		playMix: (mixName) => {
			//if the mix name is the same as the current mix name playing
			//we want to be able to pause

			const { currentMix } = this.state;
			if (mixName === currentMix) {
				//returning here to stop and exit the function
				return this.widget.togglePlay();
			}

			//load a new mix by its name and start playing
			this.setState({ currentMix: mixName });
			this.widget.load(mixName, true);
		}
	};

	render() {
		//if the array is empty, then assign the value to an empty object
		const [firstMix = {}] = this.state.mixes;

		return (
			//router wraps our whole page and allows us to use react-router
			<Router>
				<div>
					{/* this div contains our page (excluding the audio player)*/}
					<div className="flex-l justify-end">
						{/* featuredMix needs styling*/}
						<FeaturedMix {...this.state} {...this.actions} {...firstMix} id={firstMix.key} />
						<div className="w-50-l relative z-1">
							{/* header  needs styling*/}
							<Header />
							{/* routed page */}

							<Route exact path="/" render={() => <Home {...this.state} {...this.actions} />} />
							<Route path="/archive" render={() => <Archive {...this.state} {...this.actions} />} />
							<Route path="/about" render={() => <About {...this.state} />} />
						</div>
					</div>

					<iframe
						width="100%"
						height="60"
						src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fcoolbeatsradio%2Fcool-beats-006%2F"
						frameBorder="0"
						className="db fixed bottom-0 z-5"
						ref={(player) => (this.player = player)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
