import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // Subscribe to redux store. *Change in state -> redux store knows this, so subscribe to store -> emit socket event
  // anytime a change occurs...
  store.subscribe(
    // ...publsihing the entire state as the 'state' event on the socket.io server
    () => io.emit('state', store.getState().toJS())
  );

  // each time a client connects -> emit current state on socket.io server
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
  });
}
