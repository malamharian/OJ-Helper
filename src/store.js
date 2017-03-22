import { combineReducers, createStore } from 'redux';

import OutputReducer from './reducers/code-output.reducer';
import InputReducer from './reducers/code-input.reducer';
import CodeReducer from './reducers/code.reducer.js';

const reducers = combineReducers({
	codeOutput: OutputReducer,
	codeInput: InputReducer,
	code: CodeReducer
});

const store = createStore(reducers);
export default store;