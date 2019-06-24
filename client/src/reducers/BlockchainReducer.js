import {
  SOCKET_CREATED,
  CONNECT_TO_BLOCKCHAIN_SUCCESS,
  CONNECT_TO_BLOCKCHAIN_CLOSED,
  INCOMING_MESSAGE,
  CREATE_TRX,
} from '../actions/BlockchainActions';

const initialState = {
  socket: null,
  interval: null,
  blocks: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case SOCKET_CREATED:
      return {
        ...state,
        socket: payload,
      };
      
    case CONNECT_TO_BLOCKCHAIN_SUCCESS:
      return {
        ...state,
        interval: payload,
      };
    
    case CONNECT_TO_BLOCKCHAIN_CLOSED:
      console.log(payload);
      clearInterval(state.interval);
      return {
        ...state,
        interval: null,
      };

    case INCOMING_MESSAGE:
      console.log(payload);
      return {
        ...state,
        blocks: [...state.blocks, payload],
      };

    case CREATE_TRX:
      state.socket.send(
        JSON.stringify(payload)
      );
      return state;
    
    default: return state;
  }
};