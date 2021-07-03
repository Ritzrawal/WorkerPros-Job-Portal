import { ON_SOCKET_INITIALIZE } from './chatListActions'

const initialState = {
	socketRoom: {},
	chatUsers: [],
	chatMessage: [],
	activeUser: {},
	error: false,
}

const socketReducer = (state = initialState, action) => {
	switch (action.type) {
		case ON_SOCKET_INITIALIZE:
			return {
				...state,
				socketRoom: action.payload,
			}

		default:
			return state
	}
}

export default socketReducer
