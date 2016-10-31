import React from 'react'
import { TextField, Badge, Divider, FloatingActionButton, Slider } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default class Services extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isEdit: false,
            description: '',
            tax: 1,
            amount: '',
        }
        this.handleSlider = this.handleSlider.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    handleChange(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState)
	}

    handleSlider(event, value){
        this.setState({
            tax: value
        });
    }

    handleClick() {
        const services = {
            description: this.state.description,
            tax: this.state.tax,
            amount: this.state.amount,
        };
        this.props.onCreate(services);
        this.setState({
            description: '',
            tax: 1,
            amount: '',
        });
        this.descriptionInput.focus();
    }

    handleKeyPress(e) {
		if(e.charCode==13) {
			this.handleClick();
		}
	}

    handleToggle() {
        if(!this.state.Edit) {
            this.setState({
                description: this.props.serviceData.description,
                tax: this.props.serviceData.tax,
                amount: this.props.serviceData.amount,
            });
        } else {
            this.handleEdit();
        }
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleEdit() {
        this.props.onEdit(this.state.description, this.state.tax, this.state.amount);
    }

    render() {
        return(
            <div>
            <Badge style={{fontSize: 30, align: 'center'}} badgeContent="">Services</Badge><br/>
                <TextField
                    floatingLabelText="Description"
                    name="description"
                    style={styles.fullWidth}
                    underlineShow={false}
                    value={this.state.description}
                    onChange={this.handleChange}
                    onClick={this.props.onClick}
                    ref={(ref) => {this.descriptionInput = ref}}
                /><Divider />
            Tax
                <Slider
                    min={0}
                    max={15}
                    step={1}
                    style={{width: 200, marginLeft: 50,}}
                    name="tax"
                    defaultValue={1}
                    value={this.state.tax}
                    onChange={this.handleSlider}

                />

                <Divider/>
                <TextField
                    floatingLabelText="Amount"
                    name="amount"
                    style={styles.smallWidth}
                    underlineShow={false}
                    value={this.state.amount}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    style={styles.addButton}
                    onClick={this.handleClick}
                >
                    <ContentAdd />
                </FloatingActionButton>

            </div>

        );
    }
}

const styles={
    smallWidth: {
        width: 160,
        margin: 10,
    },
    mediumWidth: {
        width: 180,
        margin: 10,
    },
    fullWidth: {
        width: 250,
        margin: 10,
    },
    addButton: {
        marginLeft: 110,
    }
}

Services.defaultProps ={
    description: '',
    tax: 1,
    amount: '',
}
