import web3 from './web3';
import DoggieFactory from './build/DoggieFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(DoggieFactory.interface),
  '0xf9f31dE5C4e239e438cD459F64fDADeE871cB2D9'
);

export default instance;