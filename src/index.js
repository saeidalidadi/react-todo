import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './reducers';
import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App store={store}/>,
	document.getElementById('root')
);


//store.subscribe(render);

registerServiceWorker();
