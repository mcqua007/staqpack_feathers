import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
//import rest from '@feathersjs/rest-client' //used for rest
//import axios from 'axios' //used for rest 

//const restClient = rest('http://localhost:3030'); //used for rest api 
const socket = io('http://localhost:3030');
const feathersClient = feathers();

// Available options are listed in the "Options" section
feathersClient.configure(auth({
  storageKey: 'auth'
}));

// Setup the transport (Rest, Socket, etc.) here
feathersClient.configure(socketio(socket));
//feathersClient.configure(restClient.axios(axios)); //used for rest client 
export default feathersClient;
export { socket };