import { h, Component } from 'preact';
import moment from 'moment';
import CurrentConfig from '../../components/currentConfig';
import style from './style';
import config from '../../../config.json';

export default class Home extends Component {
	constructor(){
		super();
		this.state = {
			...config,
			form: {}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	_date(date) {
		return moment(date).format('DD-MM-YYYY');
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({ form: {
			...this.state.form,
			[name]: value
		} });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			...this.state,
			ui: { edit: false },
			form: {},
			config: {
				...this.state.config,
				pricePaid: (this.state.form.pricePaid === undefined ? this.state.config.pricePaid : +this.state.form.pricePaid),
				location: (this.state.form.location === undefined ? this.state.config.location : this.state.form.location),
				date: (this.state.form.date === undefined ? this.state.config.date : this._date(this.state.form.date)),
				nights: (this.state.form.nights === undefined ? this.state.config.nights : +this.state.form.nights),
				lodge: (this.state.form.lodge === undefined ? this.state.config.lodge : this.state.form.lodge),
				adults: (this.state.form.adults === undefined ? this.state.config.adults : +this.state.form.adults),
				children: (this.state.form.children === undefined ? this.state.config.children : +this.state.form.children),
				toddlers: (this.state.form.toddlers === undefined ? this.state.config.toddlers : +this.state.form.toddlers),
				infants: (this.state.form.infants === undefined ? this.state.config.infants : +this.state.form.infants),
				dogs: (this.state.form.dogs === undefined ? this.state.config.dogs : +this.state.form.dogs),
				accessible: (this.state.form.accessible === undefined ? this.state.config.accessible : this.state.form.accessible)
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

	handleClick(){
		this.setState({ui: {
			edit: true
		} });
	}

	componentDidUpdate() {
		console.log(this.state)
	}

	render() {
		return (
			<div class={style.home}>
				<CurrentConfig
					currentPrice={this.state.config.currentPrice}
					pricePaid={this.state.config.pricePaid}
					location={this.state.config.location}
					date={this.state.config.date}
					nights={this.state.config.nights}
					lodge={this.state.config.lodge}
					adults={this.state.config.adults}
					children={this.state.config.children}
					toddlers={this.state.config.toddlers}
					infants={this.state.config.infants}
					dogs={this.state.config.dogs}
					accessible={this.state.config.accessible}
				/>
				<div>
					<p><a href="#" onClick={this.handleClick}>... edit</a></p>
					{this.state.ui.edit &&
						<div>
							<h2>Edit configuration</h2>
							<form onSubmit={this.handleSubmit}>
							  <label className="formfield">
							    Price paid:
							    <input type="number" name="pricePaid" onChange={this.handleInputChange} />
							  </label>
								<label>
							    Location:
									<select value={this.state.form.location} name="location" onChange={this.handleInputChange}>
				            <option value="WF">Whinfell Forest, Cumbria</option>
				            <option value="SF">Sherwood Forest, Nottinghamshire</option>
				            <option value="EF">Elveden Forest, Suffolk</option>
				            <option value="WO">Woburn Forest, Bedfordshire</option>
										<option value="LF">Longleat Forest, Wiltshire</option>
									</select>
							  </label>
								<label>
							    Start Date:
									<input type="date" name="date" value={this.state.form.date} onChange={this.handleInputChange} />
							  </label>
								<label>
							    Number of nights:
									<select value={this.state.form.nights} name="nights" onChange={this.handleInputChange}>
				            <option value="3">3</option>
				            <option value="4">4</option>
				            <option value="7">7</option>
			            </select>
							  </label>
								<label>
							    Lodge type:
									<select value={this.state.form.lodge} name="lodge" onChange={this.handleInputChange}>
				            <option value="HR1T">1 bedroom Executive twin hotel room</option>
				            <option value="HR1D">1 bedroom Executive double hotel room</option>
										<option value="XS1T">1 bedroom Executive Apartment, twin</option>
										<option value="XS1">1 bedroom Executive Apartment, double</option>
										<option value="WL2">2 bedroom Woodland Lodge</option>
										<option value="XL2">2 bedroom Executive Lodge</option>
										<option value="WL3">3 bedroom woodland lodge</option>
										<option value="XL3">3 bedroom executive lodge</option>
										<option value="WL4">4 bedroom woodland lodge</option>
										<option value="XL42">4 bedroom executive lodge</option>
										<option value="XL4U">4 bedroom Executive Lodge with split-level layout</option>
										<option value="ZL4G">4 bedroom Exclusive Lodge with outdoor spa area</option>
									</select>
							  </label>
								<label>
							    Number of Adults:
							    <input type="number" name="adults" value={this.state.form.adults} onChange={this.handleInputChange} />
							  </label>
								<label>
							    Number of Children:
							    <input type="number" name="children" value={this.state.form.children} onChange={this.handleInputChange} />
							  </label>
								<label>
							    Number of Toddlers:
							    <input type="number" name="toddlers" value={this.state.form.toddlers} onChange={this.handleInputChange} />
							  </label>
								<label>
							    Number of Infants:
							    <input type="number" name="infants" value={this.state.form.infants} onChange={this.handleInputChange} />
							  </label>
								<label>
							    Number of Dogs:
							    <input type="number" name="dogs" value={this.state.form.dogs} onChange={this.handleInputChange} />
							  </label>
								<label>
							    Accessible:
									<select value={this.state.form.accessible} name="accessible" onChange={this.handleInputChange}>
				            <option value="N">No</option>
										<option value="Y">Yes</option>
			            </select>
							  </label>
							  <input type="submit" value="Submit" />
							</form>
						</div>
					}
				</div>
			</div>
		);
	}
}
