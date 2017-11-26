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
	_lodge(lodge) {
		switch(lodge) {
			case "HR1T": return "1 bedroom Executive twin hotel room";
			case "HR1D": return "1 bedroom Executive double hotel room";
			case "XS1T": return "1 bedroom Executive Apartment, twin";
			case "XS1": return "1 bedroom Executive Apartment, double";
			case "WL2": return "2 bedroom Woodland Lodge";
			case "XL2": return "2 bedroom Executive Lodge";
			case "WL3": return "3 bedroom woodland lodge";
			case "XL3": return "3 bedroom executive lodge";
			case "WL4": return "4 bedroom woodland lodge";
			case "XL42": return "4 bedroom executive lodge";
			case "XL4U": return "4 bedroom Executive Lodge with split-level layout";
			case "ZL4G": return "4 bedroom Exclusive Lodge with outdoor spa area";
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
					<li>Lodge: { this._lodge(this.props.lodge) }</li>
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
