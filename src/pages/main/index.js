import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo } = response.data;

        this.setState({ products:docs, productInfo, page });
    };

    prevPage = () => {
        const { page } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {
        const { products,page, productInfo } = this.state;

        return (
            <div className="bg-light page-section" id="portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Produtos</h2>
                        </div>
                    </div>
                    <div className="row">
                        {products.map(product => (
                            <div className="col-md-4 col-sm-6 portfolio-item"  key={product._id}>
                                <Link to={`/products/${product._id}`} className="portfolio-link"><img className="img-fluid" src={product.imgUrl} alt="img"/></Link>
                                <div className="portfolio-caption">
                                    <h4>{product.name}</h4>
                                    <p className="text-muted">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="actions">
                        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                    </div>
                </div>
            </div>
        )
    }
}