import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Product extends Component {
    state = {
        product: { name: "", description: "", price: ""},
    };


    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState({ product: response.data });
    }

    back(id){
        window.location.href=`../${id}`;
    }
    render() {
        const { product } = this.state;

        return (
            <div className='product-info'>
                <form>
                    <h2>Editar</h2>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    value={product.name}
                                    onChange={event => this.setState({name: event.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="description"
                                    type="text"
                                    value={product.description}
                                    onChange={event => this.setState({description: event.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="price"
                                    type="text"
                                    value={product.price}
                                    onChange={event => this.setState({price: event.target.value})}
                                />
                            </div>
                            <button onClick={() => this.back(product._id)} className="back" type="button">Voltar</button>
                            <button onClick={() => this.delete(product._id)} className="back save">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}