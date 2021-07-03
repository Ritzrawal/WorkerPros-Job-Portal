import io from 'socket.io-client'
import _ from 'lodash'
import { socketEndPoint, endpointpath } from './key'

export default function socketMiddleware() {
	const socket = io('http://3.140.255.38/', { path: endpointpath })

	return ({ dispatch }) => (next) => (action) => {
		if (typeof action === 'function') {
			return next(action)
		}
		const {
			event,
			leave,
			handle,
			secondHandle,
			emit,
			payload,
			condition,
			...rest
		} = action

		if (!event) {
			return next(action)
		}

		if (emit) {
			socket.emit(event, payload)
			return
		}

		let handleEvent = handle
		if (typeof handleEvent === 'string') {
			handleEvent = (result) => {
				if (result) {
					dispatch({ type: handle, payload: result, ...rest })
				}
			}
			return socket.on(event, handleEvent)
		}
		handleEvent = (result) => {
			if (result.success) {
				if (condition) {
					if (_.has(result, condition)) {
						dispatch(handle(result.delivery._conversationId))
					}
				} else dispatch(handle(result.delivery._conversationId))

				if (secondHandle) {
					dispatch({ type: secondHandle, payload: result, ...rest })
				}
			}
		}

		return socket.on(event, handleEvent)
	}
}
// _conversationId
