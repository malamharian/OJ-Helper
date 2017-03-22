import CodeActions from '../actions/code.actions';

const reducer = (state = defaults, action) => {
	switch(action.type)
	{
		case CodeActions.CODE_SET: {
			state = Object.assign({}, state, {code: action.payload});
			break;
		}
	}

	return state;
}

const defaults = {
	code: '',
	style: {
		fontSize: '17px',
		backgroundColor: 'black',
		color: '#00DD00'
	}
}

export default reducer;