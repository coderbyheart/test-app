const { default: EthrDID } = require('ethr-did');

const fs = require('fs');
const path = require('path');

const resolve = require('did-resolver').default;
const registerResolver = require('ethr-did-resolver').default;
const { delegateTypes } = require('ethr-did-resolver');
const { createJWT, verifyJWT, decodeJWT, SimpleSigner, toEthereumAddress } = require('did-jwt');
const EthCrypto = require('eth-crypto');
const _ = require('lodash');
const { Secp256k1VerificationKey2018 } = delegateTypes;
const Web3 = require('web3');
const util = require('ethereumjs-util');

import RegistryContractABI from '../constants/ABI';
import RegistryContractAddress from '../constants/Addresses';
import RegistryContract from '../constants/Contracts';
import RemoteEndpoints from '../constants/RemoteEndpoints';

// did configuration
interface EWDIDConfig {
  address: string;
  provider?: string;
  registry?: string;
}

// EW Did class
export class EWDIDCore {
  public static registryAddress: string;
  private ipfs: any;
  private readonly config: EWDIDConfig;
  private ethrDid: any;
  private count: number = 1;
  private web3: any;
  private registryContract: any;
  constructor(config: EWDIDConfig) {
    this.config = config;

    if (config.registry === undefined) {
      this.config.registry = RegistryContractAddress.RegistryContractAddress;
    } else {
      EWDIDCore.registryAddress = config.registry;
    }

    if (config.provider === undefined) {
      this.config.provider = RemoteEndpoints.LocalRPC;
      this.web3 = new Web3(RemoteEndpoints.LocalRPC);
    } else {
      this.web3 = new Web3(this.config.provider);
    }

    this.registryContract = new this.web3.eth.Contract(RegistryContractABI.RegistryContractABI, this.config.registry);
    // user address
    this.config.address = config.address;
    // user DID
    this.ethrDid = this.createDID(config.address);
    // register resolver
    this.regResolver();
  }

  // create a new did
  public createDID(address: string) {
    try {
      return new EthrDID({
        address,
        provider: this.config.provider,
        registry: this.config.registry,
      });
    } catch (error) {
      throw new Error(`ERR-101: failed to create new DID, ${error}`);
    }
  }

  // register resolver
  public regResolver() {
    try {

      registerResolver({
        provider: this.config.provider,
        registry: this.config.registry,
      });
    } catch (error) {
      throw new Error(`ERR-101: failed to register the resolver, ${error}`);
    }
  }
       
}
