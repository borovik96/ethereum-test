import React, { Component } from 'react';
import './Loader.css';




class Loader extends Component {
	state = {
		text: 'Добавление информации в блокчейн',
		id: 0,
		texts: [
			'Добавление информации в блокчейн', 
			'Это может занять больше минуты', 
			'Зато на блокчейне',
			'Продам гараж',
			'Следующая надпись будет последняя',
			'Все говорят: "АКа, а как поднять бабла??"',
			'Сейчас бы сайт на петушинном JavaScript сделать..',
			'Bitcoin, TOR, Blockchain',
			'Пока вы читаете эти сообщения, майнеры трудятся над вашей транзакцией',
			'Den enkleste sætning',
			'Это уже несмешно',
			'Мы начинаем волноваться'
		]
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
		}, 3000);
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
