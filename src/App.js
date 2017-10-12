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
import logo from './logo.svg';
import './App.css';

const getVisibleTodos = (todos=[], filter) => {
	console.log(filter);
	switch (filter) {
		case 'all':
			return todos;
		case 'completed':
			return todos.filter(t => t.completed);
		case 'active':
			return todos.filter(t => !t.completed);
	}
};

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
		todos: getVisibleTodos(
			state.todos,
			params.filter || 'all'
		)
	}
};

const mapDispatchToTodoListProps = (dispatch) => ({
	onTodoClick: id =>
		dispatch(toggleTodo(id))
});

const VisibleTodoList = withRouter(connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
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


const App = ({ store }) => (
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
