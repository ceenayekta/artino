import Navbar from './components/Navbar'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { HomePage, ProductsPage, ShoppingPage } from './pages'
import { adminSignInPage, adminDashboardPage, adminProductsPage, adminCategoriesPage, adminAddNewProduct } from './admin/pages'
import { ThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import theme from './theme'
import './theme/global.css'
import { useEffect, useState } from 'react'

const App = () => {
  const themes = createTheme(theme)
  const [shoppingCard, setShoppingCard] = useState(0)

  return (
    <ThemeProvider theme={themes}>
      <Router >
        <Switch>
          <Route path="/" exact><HomePage shoppingCard={shoppingCard} /></Route>
          <Route path="/products"><ProductsPage /></Route>
          <Route path="/shopping"><ShoppingPage /></Route>

          <Route path="/admin/sign-in" component={ adminSignInPage }/>
          <Route path="/admin/dashboard" exact component={ adminDashboardPage }/>
          <Route path="/admin/dashboard/categories" component={ adminCategoriesPage }/>
          <Route path="/admin/dashboard/products" component={ adminProductsPage }/>
          <Route path="/admin/dashboard/add-new-product" component={ adminAddNewProduct }/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
