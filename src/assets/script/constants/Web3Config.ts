const Web3 = require('web3');
import RemoteEndpoints from './RemoteEndpoints';
// setting the provider
export default {
  web3: new Web3(RemoteEndpoints.LocalRPC),
};
