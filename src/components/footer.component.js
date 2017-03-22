import React from 'react';

export default class Footer extends React.Component {

	footerStyle = {
		fontFamily: 'Verdana',
		fontSize: '12px',
		textAlign: 'center',
		marginTop: '20px',
		padding: '10px'
	};

	render() {
		return (
			<div style={this.footerStyle}>
				&copy; 2016 Denny Angkasa (DG14-0) All Rights Reserved
			</div>
		);
	}
}