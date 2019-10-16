import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Product extends Component {
    state = {
        product: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState({ product: response.data });
    }

    back(){
        window.location.href="../";
    }

    async delete(id) {
        await api.delete(`/products/${id}`);

        this.back();
    }
    render() {
        const { product } = this.state;

        return (
            <div className='product-info'>
                <img src={product.imgUrl} alt="Produto" className="img"/>
                <h1>{product.name}</h1>
                <p>{product.description}</p>

                <p>
                    Preço: {product.price}
                </p>

                <button onClick={this.back} className="back">Voltar</button>
                <Link to={`/products/edit/${product._id}`} className="back edit">Editar</Link>
                <button onClick={() => this.delete(product._id)} className="back delete">Excluir</button>
            </div>
        );
    }
}