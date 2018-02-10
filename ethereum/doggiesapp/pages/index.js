import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class DoggieIndex extends Component {
    static async getInitialProps() {
        // method from contract
        const doggies = await factory.methods.getCreatedDoggiesList().call();
    
        return { doggies };
    }
    
    renderDoggies() {
        const items = this.props.doggies.map(address => {
            return {
              header: address,
              description: (
                <Link route={`/doggies/${address}`}>
                  <a>View Doggie</a>
                </Link>
              ),
              fluid: true
            };
          });
      
          return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
              <div>
                <h3>List of  Doggies</h3>
      
                <Link route="/doggies/new">
                  <a>
                    <Button
                      floated="right"
                      content="Create Doggie"
                      icon="add circle"
                      primary
                    />
                  </a>
                </Link>
      
                {this.renderDoggies()}
              </div>
            </Layout>
          );
    }
}

export default DoggieIndex;