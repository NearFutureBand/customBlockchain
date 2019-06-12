export const webSocket = () => {
  let socket;
  let interval;
  const connect = (onOpen, onMessage) => {
    socket = new WebSocket('ws://localhost:8081');
    socket.onopen = onOpen;
    socket.onmessage = onMessage;

    socket.onerror = (event) => {
      console.log(`Error`, event);
    };
  
    socket.onclose = () => {
      console.log(`Connection with blockchain is closed`);
      clearInterval(this.interval);
    };
  };
  return connect;
};

export const connectToBlockchain = (onOpen, onMessage) => {
  const socket = new WebSocket('ws://localhost:8081');

  socket.onmessage = (event) => {
    /*const data = JSON.parse(event.data);
    //console.log(data);
    this.setState( (state) => {
      return {
        blocks: [data, ...this.state.blocks],
        trxs: this.countTransactions(data) + state.trxs,
      };
    });*/
  };

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        from: 'virtualchain',
        to: 'test',
        amout: 10,
      })
    );

    let i = 10;
    this.interval = setInterval( () => {
      const trx = {
        type: 'transfer',
        from: '04aa058ae182de249e2a19790679c85d8d5ab4abb668188dbe932f2be369c44419f64e5c01fe047515d091a3724326b9e90c0ead92c1b91c6aef191e58f69fdc52',
        to: '04b87b0b0b3fd09106b5e3af3c1e176c8b47dfb1b4f540f1d8c6df85507ec35c98e20c008ac2621132f042158535c4ffac5778a14bbe4134c19581932d6208eee8',
        amount: i++,
        privateKey: '1eefe1060cee7c88a5f19253b11075d1d42e1fea5c8c6b65ceda1a290fdc6e16',
      };
        //console.log(trx);
      this.socket.send( JSON.stringify( trx ) );
      if ( i === 100) {clearInterval( this.interval );}
    }, 1000);
    
  };

  

  return socket;
};

export const sendTransaction = (socket, from, to, amount) => {
  socket.send(
    JSON.stringify({
      from,
      to,
      amount,
    })
  );
};