import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middelwares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middelwares))

const persistor = persistStore(store);

export { store, persistor };
