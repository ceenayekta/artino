import Navbar from './components/Navbar'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { homePage, productsPage, shoppingPage } from './pages'
import { adminSignInPage, adminDashboardPage, adminProductsPage, adminCategoriesPage, adminAddNewProduct } from './admin/pages'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

const App = () => {
  return (
    <ThemeProvider theme={createMuiTheme({ direction: "rtl" })}>
      <Router >
        {window.location.pathname.includes('admin') ? null : <Navbar />}
        <Switch>
          <Route path="/" exact component={homePage}/>
          <Route path="/products" component={productsPage}/>
          <Route path="/shopping" component={shoppingPage}/>

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
