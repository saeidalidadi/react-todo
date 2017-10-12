import { combineReducers, createStore } from 'redux';
import V4 from 'uuid/v4';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
	todos
});

const persistentState = {
	todos: [{
		text: 'welcome',
		id: V4(),
		completed: false
	}]
	/*visibilityFilter: 'all'*/
}

const store = createStore(todoApp, persistentState);
export default store;

export const getVisibleTodos = (state, filter) =>
	fromTodos.getVisibleTodos(state.todos, filter);