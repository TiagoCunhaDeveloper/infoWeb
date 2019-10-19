import React from 'react';
import api from '../../services/api';

import './styles.css';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product: { _id: "", name: "", description: "", price: ""}};

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState({ product: response.data });
    }

    handleChangeName(event) {
        const product = this.state.product;
        product.name= event.target.value;
        this.setState({product:product});
    }

    handleChangeDescription(event) {
        const product = this.state.product;
        product.description= event.target.value;
        this.setState({product:product});
    }

    handleChangePrice(event) {
        const product = this.state.product;
        product.price= event.target.value;
        this.setState({product:product});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { id } = this.props.match.params;

        const response = await api.put(`/products/${id}`,this.state.product);

        window.location.href=`../${response.data._id}`;
    }

    back(id){
        window.location.href=`../${id}`;
    }
    render() {

        return (
            <div className='product-info'>
                <form onSubmit={this.handleSubmit}>
                    <h2>Editar</h2>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    value={this.state.product.name}
                                    onChange={this.handleChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="description"
                                    type="text"
                                    value={this.state.product.description}
                                    onChange={this.handleChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    id="price"
                                    type="text"
                                    value={this.state.product.price}
                                    onChange={this.handleChangePrice}
                                />
                            </div>
                            <button onClick={() => this.back(this.state.product._id)} className="back" type="button">Voltar</button>
                            <button type="submit" className="back save">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}