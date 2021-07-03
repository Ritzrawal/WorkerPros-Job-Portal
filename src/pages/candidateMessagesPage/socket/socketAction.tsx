import {
	ON_SOCKET_INITIALIZE,
	INCOMING_CHAT,
	ERROR_MESSAGE,
	NOTIFICATION_LIVE_CHAT,
	MSG_DELIVERY,
} from './chatListActions'

// Action creator with received function:
export function socketAuth(pageID) {
	return {
		event: 'AUTH_PAGE',
		emit: true,
		payload: {
			room: pageID,
			message: 'message test',
		},
	}
}

export function socketAck() {
	return {
		event: 'JOIN_ACK',
		handle: ON_SOCKET_INITIALIZE,
	}
}

export function socketIncomingMessage(liveChatBehaviour: any) {
	return {
		event: 'INCOMING_FB_MSG',
		handle: INCOMING_CHAT,
		liveChatBehaviour,
	}
}

export function socketNotificationLivechat() {
	return {
		event: 'NOTIFICATION_LIVECHAT',
		handle: NOTIFICATION_LIVE_CHAT,
	}
}

export function socketMessageDelivered() {
	return {
		event: 'MSG_DELIVERY',
		handle: MSG_DELIVERY,
		condition: 'delivery.body.attachment',
	}
}

export function socketMessageError() {
	return {
		event: 'ERROR_MESSAGE',
		handle: ERROR_MESSAGE,
	}
}

export function stopSocketIncomingMessage() {
	return {
		event: 'INCOMING_FB_MSG',
		handle: INCOMING_CHAT,
		leave: true,
	}
}

export function stopSocketAck() {
	return {
		event: 'JOIN_ACK',
		handle: ON_SOCKET_INITIALIZE,
		leave: true,
	}
}

export const socketSendMessage = (emitMessage: any) => ({
	event: 'OUTGOING_FB_MSG',
	emit: true,
	payload: emitMessage,
})

export const socketLeaveRoom = (accountId: any) => ({
	event: 'LEAVE_ROOM',
	emit: true,
	payload: { room: accountId },
})
