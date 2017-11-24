import { h, Component } from 'preact';
import style from './style';

export default class CurrentConfig extends Component {
	constructor(props){
		super(props);
	}
	_location(location) {
		switch(location) {
			case "WF": return "Whinfell Forest, Cumbria";
			case "SF": return "Sherwood Forest, Nottinghamshire";
			case "EF": return "Elveden Forest, Suffolk";
			case "WO": return "Woburn Forest, Bedfordshire";
			case "LF": return "Longleat Forest, Wiltshire";
		}
	}
	render() {
		return (
			<div>
				<p>The last known price for a lodge was £{ this.props.currentPrice }.</p>
				<h2>Current configuration</h2>
				<ul>
					<li>Price paid: £{ this.props.pricePaid }</li>
					<li>Location: { this._location(this.props.location) }</li>
					<li>Start Date: { this.props.date }</li>
					<li>Duration: { this.props.nights } nights</li>
					<li>Number of...</li>
						<ul>
							<li>Adults: { this.props.adults }</li>
							<li>Children: { this.props.children }</li>
							<li>Toddlers: { this.props.toddlers }</li>
							<li>Infants: { this.props.infants }</li>
							<li>Dogs: { this.props.dogs }</li>
						</ul>
					<li>Accessible: { this.props.accessible === 'N' ? 'No' : 'Yes'}</li>

				</ul>
			</div>
		);
	}
}
