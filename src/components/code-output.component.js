import React from 'react';

export default class CodeOutput extends React.Component {

	constructor(props) {
		super(props);
	}

	getOutput() {
		if(this.props.codeOutput.type == null)
		{
			return(
				<div>
					-- No Output --
				</div>
			);
		}

		return(
			<textarea style={ this.props.codeOutput.style } id="myarea" rows="15" className="form-control" value={ this.props.codeOutput.text } readOnly>
			</textarea>
		);
	}

	runResult() {
		if(this.props.codeOutput.type == null)
			return null;

		var cn = this.props.codeOutput.type == 'SUCCESS' ? 'alert alert-success' : 'alert alert-danger';

		return(
			<div class="row">
				<div className="col-sm-8">
					<div className={cn}>
						<b>{ this.props.codeOutput.type }</b>
					</div>
				</div>
				<div className="col-sm-4">
					{ this.copyButton() }
				</div>
			</div>
		);
	}

	copyButton() {

		return (
			<button style={{width: '100%', padding: '15px 0px 15px'}} className="btn btn-primary" onClick={this.copyCodeOutputToClipboard.bind(this)}>
				Copy Text
			</button>
		);
	}

	copyCodeOutputToClipboard() {
		var text = this.props.codeOutput.text;
		var textArea = document.createElement("textarea");
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;

		textArea.style.width = '2em';
		textArea.style.height = '2em';

		textArea.style.padding = 0;
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';

		textArea.style.background = 'transparent';
		textArea.value = text;

		document.body.appendChild(textArea);

		textArea.select();
		
		document.execCommand('copy');

		document.body.removeChild(textArea);
	}

	render() {
		return (
			<div className="col-sm-6">
				<div className="page-header">
					<h3>Code Output</h3>
				</div>
				{ this.runResult() }
				{ this.getOutput() }
			</div>
		);
	}
}