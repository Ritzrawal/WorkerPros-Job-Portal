import { createStore, applyMiddleware, Store } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
// interface Props {}
const allMiddlewares = [thunk, createLogger()]
const store: Store & {
	dispatch: DispatchType
} = createStore(rootReducer, applyMiddleware(...allMiddlewares))

export default store
