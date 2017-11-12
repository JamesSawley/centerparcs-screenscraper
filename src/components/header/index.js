import { h, Component } from 'preact';
// import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Configure Center Parcs Price Checker</h1>
				<nav>
					<a href="http://www.centerparcs.co.uk/" target="_BLANK">Center Parcs</a>
				</nav>
			</header>
		);
	}
}
