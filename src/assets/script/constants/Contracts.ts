import RegistryContractABI from './ABI';
import RegistryContractAddress from './Addresses';
import Web3Config from './Web3Config';

export default {
  RegistryContract: new Web3Config.web3.eth.Contract(
    RegistryContractABI.RegistryContractABI,
    RegistryContractAddress.RegistryContractAddress,
  ),
};
