import { h, Component } from 'preact';
import moment from 'moment';
import CurrentConfig from '../../components/currentConfig';
import DatePicker from '../../components/datePicker';
import style from './style';
import config from '../../config.json';

export default class Home extends Component {
	constructor(){
		super()
		this.state = {
			...config,
			form: {}
		}
		console.log('state', this.state)
		this.pricePaid = this.pricePaid.bind(this);
		this.location = this.location.bind(this);
		this.duration = this.duration.bind(this);
		this.startDate = this.startDate.bind(this);
		this.numAdults = this.numAdults.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		console.log('state', this.state);
	}

	componentDidUpdate() {
		console.log('updated state', this.state)
	}

	pricePaid(event) {
		console.log(event.target.value);
		this.setState({form: {
			...this.state.form,
			pricePaid: event.target.value
		}});
	}
	location(event) {
		console.log(event.target.value)
		this.setState({form: {
			...this.state.form,
			location: event.target.value
		}});
	}
	duration(event) {
		this.setState({form: {
			...this.state.form,
			duration: event.target.value
		}});
	}
	startDate(event) {
		console.log(event.value)
		const date = moment(event.value).format('DD MM YYYY');
		const day = moment(event.value).format('DD');
		const month = moment(event.value).format('MM YYYY');
		this.setState({form: {
			...this.state.form,
			startDate: date,
			month: month,
			day: day
		}});
		console.log(this.state)
	}
	numAdults(event) {
		this.setState({form: {
			...this.state.form,
			numAdults: event.target.value
		}});
	}
  handleSubmit(event) {
		event.preventDefault();
    this.setState({
			...this.state,
			pricePaid: this.state.form.pricePaid,
			location: this.state.form.location,
			duration: this.state.form.duration,
			startDate: this.state.form.startDate,
			month: this.state.form.month,
			day: this.state.form.day,
			numAdults: this.state.form.numAdults
		})
  }

	render() {
		return (
			<div class={style.home}>
				<CurrentConfig
					currentPrice = { this.state.currentPrice }
					pricePaid = { this.state.pricePaid }
					location = { this.state.location }
					duration = { this.state.duration }
					day = { this.state.day }
					month = { this.state.month }
					numAdults = { this.state.numAdults }
					/>
				<div>
					<h2>Edit configuration</h2>
					<form onSubmit={this.handleSubmit}>
					  <label>
					    Price paid:
					    <input type="number" name="pricePaid" onChange={this.pricePaid} />
					  </label>
						<label>
					    Location:
							<select value={this.state.form.location} onChange={this.location}>
		            <option value="whinfellForest">Whinfell Forest, Cumbria</option>
		            <option value="sherwoodForest">Sherwood Forest, Nottinghamshire</option>
		            <option value="elvedenForest">Elveden Forest, Suffolk</option>
		            <option value="woburnForest">Woburn Forest, Bedfordshire</option>
								<option value="longleatForest">Longleat Forest, Wiltshire</option>
	           	</select>
					  </label>
						<label>
					    Duration:
							<select value={this.state.form.duration} onChange={this.duration}>
		            <option value="midweekID">Mid week</option>
		            <option value="weekendID">Weekend</option>
		            <option value="1weekID">1 week</option>
	           	</select>
					  </label>
						<label>
					    Start Date:
							<DatePicker value={this.state.form.location} onChange={this.startDate} />
					  </label>
						<label>
					    Number of Adults:
					    <input type="number" name="numAdults" value={this.state.form.numAdults} onChange={this.numAdults} />
					  </label>
					  <input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}
