import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';
import EditProduct from './pages/editProduct';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/products/:id" component={Product} />
            <Route  path="/products/edit/:id" component={EditProduct} />
        </Switch>
    </BrowserRouter>
);

export default Routes;