import React, { Component } from 'react';
import './Loader.css';




class Loader extends Component {
	state = {
		text: 'Добавление информации в блокчейн',
		id: 1,
		texts: ['Добавление информации в блокчейн', 'Сеня пидор', 'Миша пидор']
	};
	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState((prev) => {
				const id = prev.id + 1 == prev.texts.length ? 0 : prev.id + 1;
				return ({
					id,
					text: prev.texts[id]
				});
			})
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render() {
		const text = this.state.text;
		return (
			<div class="loader">
			  <div class="logo">
			    <div class="white"></div>
			    <div class="orange"></div>
			    <div class="red"></div>
			  </div>
			  <p id="loader-text">{text}</p>
			</div>
		)
	}
}

export default Loader
