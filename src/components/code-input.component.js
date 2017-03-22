import React from 'react';
import { connect } from 'react-redux';

import CodeActions from '../actions/code.actions';

@connect((store) => {
	return {
		codeInput: store.codeInput
	};
})
export default class CodeInput extends React.Component {

	handleInputChange(e) {
		this.props.dispatch({
			type: CodeActions.INPUT_SET,
			payload: e.target.value
		});
	}

	render() {
		return(
			<div className="col-sm-6">
				<div className="page-header">
					<h3>Std Input</h3>
				</div>
				<textarea style={ this.props.codeInput.style } rows="15" className="form-control" value={ this.props.codeInput.input } onChange={ this.handleInputChange.bind(this) }>
				</textarea>
			</div>
		);
	}
}