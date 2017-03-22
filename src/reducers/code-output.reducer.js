import CodeActions from '../actions/code.actions';

const reducer = (state = defaults, action) => {
	switch(action.type)
	{
		case CodeActions.OUTPUT_SET: {
			state = Object.assign(
				{},
				state,
				{
					text: action.payload.text,
					type: action.payload.type
				});
			break;
		}
	}

	return state;
}

const defaults = {
	text: null,
	type: null,
	style: {
		fontSize: '17px',
		backgroundColor: 'black',
		color: '#00DD00'
	}
}

export default reducer;