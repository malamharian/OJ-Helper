import CodeActions from '../actions/code.actions';

const reducer = (state = defaults, action) => {
	
	switch(action.type)
	{
		case CodeActions.INPUT_SET: {
			state = Object.assign({}, state, {input: action.payload});
			break;
		}
		case CodeActions.USE_INPUT_SET: {
			state = Object.assign({}, state, {useInput: action.payload});
			break;
		}
	}

	return state;
}

const defaults = {
	input: '',
	useInput: true,
	style: {
		fontSize: '17px',
		backgroundColor: 'black',
		color: '#00DD00'
	}
}

export default reducer;