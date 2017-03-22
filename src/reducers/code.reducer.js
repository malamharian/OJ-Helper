import CodeActions from '../actions/code.actions';

const reducer = (state = defaults, action) => {
	switch(action.type)
	{
		case CodeActions.CODE_SET: {
			state = Object.assign({}, state, {code: action.payload});
			break;
		}
		case CodeActions.LANGUAGE_SET: {
			state = Object.assign({}, state, {language: action.payload});
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
	},
	language: 'c++'
}

export default reducer;