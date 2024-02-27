import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import InvoiceProcessing from './InvoiceProcessing';
import TaskDraft from './TaskDraft';

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Switch>
              
            <Route exact path="/" component={InvoiceProcessing} />
            <Route path="/taskdraft/:taskId" component={TaskDraft} />
            </Switch>
          </Router>
       </Provider>
    );
  }
}

export default App;
