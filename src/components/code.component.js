import React from 'react';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';

import CodeActions from '../actions/code.actions';
require('codemirror/mode/clike/clike');

@connect(store => {
	return {
		codeInput: store.codeInput,
		code: store.code,
		codeOutput: store.codeOutput
	};
})
export default class Code extends React.Component {

	constructor(props)
	{
		super(props);

		this.state = {};

		this.initPaths();
		this.initCodeMirror();
	}

	initCodeMirror() {
		this.modes = [];
		this.modes['c++'] = 'text/x-c++src';
		this.modes['java'] = 'text/x-java';

		this.state.codeMirrorOptions = {
			lineNumbers: true,
			theme: 'monokai',
			mode: this.modes[this.props.code.language],
			extraKeys: {
				"Ctrl-Enter": this.compileAndRun.bind(this)
			},
			autofocus: true,
			lineWrapping: true,
			indentWithTabs: true
		};
	}

	initPaths() {
		this.folderPath = '';

		this.codeFiles = [];
		this.codeFiles['c++'] = 'cpp-code.cpp';
		this.codeFiles['java'] = 'Main.java';

		this.batchFiles = [];
		this.batchFiles['c++'] = 'cpp-batch.bat';
		this.batchFiles['java'] = 'java-batch.bat';
	}

	writeCodeToFile() {

		return new Promise((resolve, reject) => {
			fs.writeFile(this.folderPath + this.codeFiles[this.props.code.language], this.props.code.code, (err, data) => {
				if(err)
					reject(err);
				else
					resolve(data);
			});
		});
	}

	executeBatchFile() {

		let options = {
			cwd: this.folderPath
		};
		
		return new Promise((resolve, reject) => {
			exec(this.batchFiles[this.props.code.language], options, (error, stdout, stderr) => {
				if(error){
					reject(stderr);
				}
				else
					resolve(stdout);
			});
		});
	}

	readOutputFile() {
		return new Promise((resolve,reject) => {
			fs.readFile(this.folderPath + 'output.txt', 'utf-8', (err, data) => {
				if(err)
					reject(err);
				else
					resolve(data);
			});
		});
	}

	writeInputToFile() {
		return new Promise((resolve, reject) => {
			fs.writeFile(this.folderPath + 'input.txt', this.props.codeInput.input, (err, data) => {
				if(err)
					reject(err);
				else
					resolve(data);
			})
		});
	}

	compileAndRun() {
		if(this.compileButton.disabled)
			return;

		this.compileButton.disabled = true;
		let initialHTML = this.compileButton.innerHTML;
		let initialClassName = this.compileButton.className;

		this.compileButton.innerHTML = 'Writing Code';
		this.compileButton.className = 'btn btn-warning';

		this.folderPath = 'batches/' + this.props.code.language + '/';

		let promiseChain = this.writeCodeToFile()
		.then((data) => {
			this.compileButton.innerHTML = 'Writing Input';
			return this.writeInputToFile();
		})
		.then((data) => {
			this.compileButton.innerHTML = 'Executing Batch';
			return this.executeBatchFile();
		})
		.then((data) => {
			this.compileButton.innerHTML = 'Reading Output';
			return this.readOutputFile();
		})
		.then((data) => {
			this.props.dispatch({
				type: CodeActions.OUTPUT_SET,
				payload: {
					text: data,
					type: 'SUCCESS'
				}
			});
		})
		.catch((err) => {

			this.props.dispatch({
				type: CodeActions.OUTPUT_SET,
				payload: {
					text: err,
					type: 'ERROR'
				}
			});
		});

		Promise.all([promiseChain]).then(() => {
			this.compileButton.disabled = false;
			this.compileButton.innerHTML = initialHTML;
			this.compileButton.className = initialClassName;
		});
	}

	updateInputCode(e) {
		this.props.dispatch({
			type: CodeActions.CODE_SET,
			payload: e
		});
	}

	updateCodeLanguage(e) {
		this.props.dispatch({
			type: CodeActions.LANGUAGE_SET,
			payload: e.target.value
		});

		this.state.codeMirrorOptions.mode = this.modes[e.target.value];
	}

	toggleStdIn(e) {
		this.props.dispatch({
			type: CodeActions.USE_INPUT_SET,
			payload: !this.props.codeInput.useInput
		});
	}

	btnStyle = {
		width: '150px'
	};

	terminateProcess() {
		let options = {
			cwd: this.folderPath
		}

		exec('terminate.bat', options, (error, stdout, stderr) => {
			this.props.dispatch({
				type: CodeActions.OUTPUT_SET,
				payload: {
					text: 'ERR: Process terminated forcefully',
					type: 'ERROR'
				}
			});
		});
	}

	render() {
		return (
			<div>
				<div class="page-header">
					<h3>Your Code</h3>
				</div>
				<CodeMirror ref="editor" options={this.state.codeMirrorOptions} onChange={this.updateInputCode.bind(this)} />
				<div style={{marginTop: '15px'}}>
					<button style={ this.btnStyle } ref={(btn) => {
						this.compileButton = btn;
					}} className="btn btn-success" onClick={ this.compileAndRun.bind(this) }>
						Compile and Run
					</button>
					<button style={{marginLeft: '20px'}} className="btn btn-danger" onClick={this.terminateProcess.bind(this)}>
						Terminate Process
					</button>
					<select style={{marginLeft: '20px', color: 'black', height: '32px', width: '60px'}} onChange={ this.updateCodeLanguage.bind(this) }>
						<option value="c++">C++</option>
						<option value="java">Java</option>
					</select>
				</div>
			</div>
		);
	}
}