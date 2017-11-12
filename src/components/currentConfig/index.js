import { h, Component } from 'preact';
import style from './style';

export default class CurrentConfig extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div>
				<p>The last known price for a lodge was £{ this.props.currentPrice }.</p>
				<h2>Current configuration</h2>
				<ul>
					<li>Price paid: £{ this.props.pricePaid }</li>
					<li>Location: { this.props.location }</li>
					<li>Duration: { this.props.duration }</li>
					<li>Date: { this.props.day } { this.props.month }</li>
					<li>Number of adults: { this.props.numAdults }</li>
				</ul>
			</div>
		);
	}
}
