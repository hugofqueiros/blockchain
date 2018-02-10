import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Doggie from '../../ethereum/doggie';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class DoggieShow extends Component {
    static async getInitialProps(props) {
        const doggie = Doggie(props.query.address);
        const summary = await doggie.methods.getSummary().call();
    
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            name: summary[1],
            balance: summary[2],
            manager: summary[3]
        };
    }
    
    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            name
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description:
                    'The manager created this Doggie',
                style: { overflowWrap: 'break-word' }
            }, {
                header: name,
                meta: 'Name of Doggie',
                description:
                    'This is the name that was given to the Doggie'
            }, {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description:
                    'You must contribute at least this much wei'
            }, {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description:
                    'The balance is how much money this doggie has left to spend.'
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Doggie Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default DoggieShow;