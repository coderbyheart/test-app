const Web3 = require('web3');
const Web3HDWalletProvider = require('web3-hdwallet-provider');

const httpProvider = new Web3.providers.HttpProvider('http://volta-rpc.energyweb.org/');
const mnemonic = '31f5e9fa8bba0fc6dd1f4ee918456b97b1ee9ca5b6ec10f2f844afdd65ba194e';
// const httpProvider = new Web3.providers.HttpProvider('http://127.0.0.1:8545/');
// const mnemonic = '0ac02d6666a9cb46bed4f94fe7e11fc2513026f20f3734d8a278399322b1375a';

// networks
export default {
  EWECRemoteRPC: 'rpc.energyweb.org',
  IPFSPORT: '5001',
  IPFSPROTOCOL: 'http',
  IPFSURL: '127.0.0.1',
  LocalRPC: new Web3HDWalletProvider(mnemonic, httpProvider),
  VoltaRemoteRPC: 'volta-rpc.energyweb.org',
};
