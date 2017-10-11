import { combineReducers, createStore } from 'redux';
import V4 from 'uuid/v4';

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE_TODO':
			if(state.id !== action.id) {
				return state;
			}
			return {
				...state,
				completed: !state.completed
			};
		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(t =>
				todo(t, action)
			);
		default:
			return state;
	}
};


const todoApp = combineReducers({
	todos
});

const persistentState = {
	todos: [{
		text: 'welcome',
		id: V4(),
		completed: false
	}],
	visibilityFilter: 'all'
}

export const store = createStore(todoApp, persistentState);