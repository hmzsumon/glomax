class WebSocketService {
	private websocket: WebSocket | null = null;
	private messageListeners: ((data: any) => void)[] = [];

	connect(url: string) {
		this.websocket = new WebSocket(url);

		this.websocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
			this.messageListeners.forEach((listener) => listener(data));
		};

		this.websocket.onclose = () => {
			// Handle WebSocket closed event if needed
		};
	}

	addMessageListener(listener: (data: any) => void) {
		this.messageListeners.push(listener);
	}

	disconnect() {
		if (this.websocket) {
			this.websocket.close();
		}
	}
}

export default WebSocketService;
