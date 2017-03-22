import React from 'react';
import { connect } from 'react-redux';

import Code from './components/code.component';
import CodeOutput from './components/code-output.component';
import CodeInput from './components/code-input.component';
import Footer from './components/footer.component';

@connect((store) => {
	return {
		output: store.codeOutput,
		input: store.codeInput
	}
})
export default class App extends React.Component {

	showInputField() {
		if(this.props.input.useInput)
			return(<CodeInput />);
	}

	render() {

		return (
			<div>
				<div class="container">
					<Code/>
					<div class="row">
						<CodeOutput codeOutput={this.props.output} />
						{ this.showInputField()	}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}