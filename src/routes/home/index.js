import { h, Component } from 'preact';
import moment from 'moment';
import CurrentConfig from '../../components/currentConfig';
import DatePicker from '../../components/datePicker';
import style from './style';
import config from '../../../config.json';

export default class Home extends Component {
	handleInputChange(event) {
		const target = event.target;
		if (target === undefined) {
			const date = moment(event.value).format('DD MM YYYY');
			const day = moment(event.value).format('DD');
			const month = moment(event.value).format('MM YYYY');
			this.setState({ form: {
				...this.state.form,
				startDate: date,
				month: month,
				day: day
			} });
		}
		else {
			const value = target.value;
			const name = target.name;
			this.setState({ form: {
				...this.state.form,
				[name]: value
			} });
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			...this.state,
			form: {},
			config: {
				...this.state.config,
				pricePaid: (this.state.form.pricePaid === undefined ? this.state.config.pricePaid : +this.state.form.pricePaid),
				location: (this.state.form.location === undefined ? this.state.config.location : this.state.form.location),
				duration: (this.state.form.duration === undefined ? this.state.config.duration : this.state.form.duration),
				startDate: (this.state.form.startDate === undefined ? this.state.config.startDate : this.state.form.startDate),
				month: (this.state.form.month === undefined ? this.state.config.month : this.state.form.month),
				day: (this.state.form.day === undefined ? this.state.config.day : this.state.form.day),
				numAdults: (this.state.form.numAdults === undefined ? this.state.config.numAdults : +this.state.form.numAdults)
			}
		});
		//Send data to JSON file
		fetch('http://localhost:3000/config', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'PUT',
			body: JSON.stringify(this.state.config)
		}).then(response => {
			if (!response.ok) {
				console.log(response)
				alert('Submit unsuccessful. Please see console for further details')
			};
		});
	}

	constructor(){
		super();
		this.state = {
			...config,
			form: {}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div class={style.home}>
				<CurrentConfig
					currentPrice={this.state.config.currentPrice}
					pricePaid={this.state.config.pricePaid}
					location={this.state.config.location}
					duration={this.state.config.duration}
					day={this.state.config.day}
					month={this.state.config.month}
					numAdults={this.state.config.numAdults}
				/>
				<div>
					<h2>Edit configuration</h2>
					<form onSubmit={this.handleSubmit}>
					  <label>
					    Price paid:
					    <input type="number" name="pricePaid" onChange={this.handleInputChange} />
					  </label>
						<label>
					    Location:
							<select value={this.state.form.location} name="location" onChange={this.handleInputChange}>
		            <option value="whinfellForest">Whinfell Forest, Cumbria</option>
		            <option value="sherwoodForest">Sherwood Forest, Nottinghamshire</option>
		            <option value="elvedenForest">Elveden Forest, Suffolk</option>
		            <option value="woburnForest">Woburn Forest, Bedfordshire</option>
								<option value="longleatForest">Longleat Forest, Wiltshire</option>
							</select>
					  </label>
						<label>
					    Duration:
							<select value={this.state.form.duration} name="duration" onChange={this.handleInputChange}>
		            <option value="midweekID">Mid week</option>
		            <option value="weekendID">Weekend</option>
		            <option value="1weekID">1 week</option>
	            </select>
					  </label>
						<label>
					    Start Date:
							<DatePicker value={this.state.form.location} onChange={this.handleInputChange} />
					  </label>
						<label>
					    Number of Adults:
					    <input type="number" name="numAdults" value={this.state.form.numAdults} onChange={this.handleInputChange} />
					  </label>
					  <input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}
