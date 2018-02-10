import web3 from './web3';
import Doggie from './build/Doggie.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Doggie.interface), address);
};