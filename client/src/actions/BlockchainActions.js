export const SOCKET_CREATED = 'SOCKET_CREATED';
export const CONNECT_TO_BLOCKCHAIN_SUCCESS = 'CONNECT_TO_BLOCKCHAIN_SUCCESS';
export const INCOMING_MESSAGE = 'INCOMING_MESSAGE';
export const CONNECT_TO_BLOCKCHAIN_ERROR = 'CONNECT_TO_BLOCKCHAIN_ERROR';
export const CONNECT_TO_BLOCKCHAIN_CLOSED = 'CONNECT_TO_BLOCKCHAIN_CLOSED';
export const CREATE_TRX = 'CREATE_TRX';

export const socketCreated = socket => ({
  type: SOCKET_CREATED,
  payload: socket,
});
export const connectToBlockchainSuccess = (interval) => ({
  type: CONNECT_TO_BLOCKCHAIN_SUCCESS,
  payload: interval,
});
export const newMessage = message => ({ type: INCOMING_MESSAGE, payload: message });
export const connectToBlockchainError = (err) => ({
  type: CONNECT_TO_BLOCKCHAIN_ERROR,
  payload: err,
});
export const connectToBlockchainClosed = (event) => ({
  type: CONNECT_TO_BLOCKCHAIN_CLOSED,
  payload: event,
});
export const createTransaction = (from, to, amount) => ({
  type: CREATE_TRX,
  payload: { from, to, amount },
});


export const connectToBlockchain = () => {
  return (dispatch) => {
    const socket = new WebSocket('ws://localhost:8081');
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch( newMessage(data) );
    };
    
    socket.onopen = () => {
      let i = 1;
      const interval = setInterval( () => {
        dispatch( createTransaction('person', 'account', i++) );
        if ( i === 100) { clearInterval(interval); }
      }, 10000);
      dispatch( connectToBlockchainSuccess(interval) );
    };

    socket.onerror = (event) => {
      dispatch( connectToBlockchainError(event) );
    };

    socket.onclose = (event) => {
      dispatch( connectToBlockchainClosed(event) );
    };

    return dispatch( socketCreated(socket) );
  };
};