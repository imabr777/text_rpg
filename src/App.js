import React from 'react';
import logo from './logo.svg';
import './App.css';

const myStory = {
	'title': 'MadeUp',
	'author': 'abe',
	'body': [
		{
			'chpNum': 1,
			'id': 'c1a',
			'text': "The story starts here, at the beginning of all things. Nobody could have ever predicted the cataclysm that brought about the end of the old world, but now nobody can imagine how the world would have been if it hadn't happened. A world still in the olden days... that would be both a blessing and a curse.",
			'next': [{'id':'c1b','text':'Next'}]
		},
		{
			'chpNum': 1,
			'id': 'c1b',
			'text': "I open my eyes a crack to see the lights already at around 25% intensity. Too bright.",
			'next': [{'id':'c1c','text':'I close my eyes again to sleep for a bit longer'},{'id':'c1d','text':"I've slept long enough, I should get up"}]
		},
		{
			'chpNum': 1,
			'id': 'c1c',
			'text': '"You need to wake up already, Jems, it\'s already the 3rd hour." It\'s Emmy, my best friend. "Alright, alright, I\'m getting up," I say.',
			'next': [{'id':'c1e','text':'Next'}]
		},
		{
			'chpNum': 1,
			'id': 'c1d',
			'text': '"Oh good, you\'re up, I\'ve been looking for you." It\'s Emmy, my best friend. "Yeah, I\'m up, unfortunately. What do you need?" I ask.',
			'next': [{'id':'c1e','text':'Next'}]
		},
		{
			'chpNum': 1,
			'id': 'c1e',
			'text': 'I need you to help me destroy the world. DooDoom.',
			'next': [{'id':'c2a','text':'Next Chapter'}]
		},
		{
			'chpNum': 2,
			'id': 'c2a',
			'text': 'WHAT?',
			'next': []
		}
	],
	'chpInfo': [
		'The Journey Starts',
		'The Plot Begins'
	]
}

function StoryInfo(props) {
	return (
		<div className="Story-info">
			<h2>{props.title}</h2>
			<span>By {props.author}</span>
		</div>
	)
}

function StoryText(props) {
	return (
		<div className="Story-text">
			<h3>Chapter {props.number}: {props.name}</h3>
			<p>{props.text}</p>
		</div>
	)
}

class Story extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			story: myStory,
			currentChapter: 1,
			currentChapterName: myStory.chpInfo[0],
			currentSection: myStory.body[0].id,
			currentText: myStory.body[0].text,
			previousSections: [],  // This acts as a kind of history
			nextSectionOptions: myStory.body[0].next
		}
	}

	handleClick(id) {
		// Add the page to the previous sections array
		var previous = this.state.previousSections;
		previous.push(this.state.currentSection);

		for (var i = 0; i < this.state.story.body.length; i++) {
			var body = this.state.story.body[i];
			if (body.id === id) {
				let state = {
					currentChapter: body.chpNum,
					currentChapterName: this.state.story.chpInfo[body.chpNum - 1],
					currentSection: body.id,
					currentText: body.text,
					previousSections: previous,
					nextSectionOptions: body.next
				};
				this.setState(state);
			}
		}
	}

	handlePrevious(id) {
		// Remove the last section from the previous sections array
		var previous = this.state.previousSections;
		previous.pop();
		
		for (var i = 0; i < this.state.story.body.length; i++) {
			var body = this.state.story.body[i];
			if (body.id === id) {
				let state = {
					currentChapter: body.chpNum,
					currentChapterName: this.state.story.chpInfo[body.chpNum - 1],
					currentSection: body.id,
					currentText: body.text,
					previousSections: previous,
					nextSectionOptions: body.next
				};
				this.setState(state);
			}
		}
	}

	render() {
		var result = [];
		for (var i = 0; i < this.state.nextSectionOptions.length; i++) {
			const options = this.state.nextSectionOptions[i];
			result.push(
				<button 
					key={i}
					onClick={() => this.handleClick(options.id)}
				>
					{options.text}
				</button>
			)
		}

		const previous = this.state.previousSections;
		if (previous.length !== 0) {
			console.log("Current state of the previous sections array");
			console.log(previous);
			var previousButton = <button onClick={() => this.handlePrevious(previous[previous.length - 1])}>Previous</button>
		}

		return (
			<div className="Story-box">
				<StoryInfo 
					title={this.state.story.title} 
					author={this.state.story.author} 
				/>
				<StoryText 
					number={this.state.currentChapter} 
					name={this.state.currentChapterName} 
					text={this.state.currentText} 
				/>
				{previousButton}
				{result}
			</div>
		)
	}
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>My Story Game App Thingy</h1>
			</header>
			<main>
				<Story />
			</main>
		</div>
	);
}

export default App;
