import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducer from './reducers';

// function in charge of creating and returning the store of the app
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // the store is created with a reducer param and the saga middleware
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );
  // rootSaga starts all sagas in parallel
  sagaMiddleware.run(rootSaga);
  return store; // returns state
}

export default configureStore;
