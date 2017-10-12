import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import V4 from 'uuid/v4';
import {
	Router,
	Route,
	Link,
	browserHistory,
	withRouter
} from 'react-router';
import  store , * as fromStore from './reducers';
import logo from './logo.svg';
import './App.css';

/*
 * Actions
 */

const addTodo = (text) => ({
	type: 'ADD_TODO',
	id: V4(),
	text
});

const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	id
});

let AddTodo = ({ dispatch}) => {
	let input;
	return (
    <div>
      <input ref={node => input = node}/>
      <button onClick={() => {
				dispatch(addTodo(input.value));
			}}>Add new todo</button>
    </div>
	)
};

AddTodo = connect()(AddTodo);

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li onClick={onClick}
      style={{
		    textDecoration: completed ? 'line-through' : 'none'
	    }}>
		{ text }
  </li>
);


const TodoList = ({
  onTodoClick,
  todos
}) => (
  <ul>
		{todos.map(todo => (
      <Todo
        key={todo.id}
				{...todo}
        onClick={() => onTodoClick(todo.id)}/>
		))}
  </ul>
);

const mapStateToTodoListProps = (state, { params }) => {
	return {
		todos: fromStore.getVisibleTodos(
			state,
			params.filter || 'all'
		)
	}
};

const VisibleTodoList = withRouter(connect(
	mapStateToTodoListProps,
	{ onTodoClick: toggleTodo }
)(TodoList));

const FilterLink = ({ filter, children }) => (
	<Link
		to={filter === 'all' ? '/' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
	>
		{children}
	</Link>
);

const Footer = () => {
	return (
    <div>
      <p>
        Show:
				{' '}
        <FilterLink filter="all">All
        </FilterLink>{', '}
        <FilterLink filter="active">Active
        </FilterLink>{', '}
        <FilterLink filter="completed">Completed
        </FilterLink>
      </p>
    </div>
	)
};

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);


const App = () => (
  <Provider store={store}>
	  <Router history={browserHistory}>
		  <Route path="/(:filter)" component={TodoApp}/>
	  </Router>
  </Provider>
);

App.propTypes = {
	store: PropTypes.object.isRequired
};

export default App;
