import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { HomePage, ProductsPage, ShoppingPage } from './pages'
import { adminSignInPage, adminDashboardPage, adminProductsPage, adminCategoriesPage } from './admin/pages'
import { ThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import theme from './theme'
import './theme/global.css'

const App = () => {
  const themes = createTheme(theme)

  return (
    <ThemeProvider theme={themes}>
      <Router >
        <Switch>
          <Route path="/" exact component={ HomePage } />
          <Route path="/products" component={ ProductsPage } />
          <Route path="/shopping" component={ ShoppingPage } />

          <Route path="/admin/sign-in" component={ adminSignInPage }/>
          <Route path="/admin/dashboard" exact component={ adminDashboardPage }/>
          <Route path="/admin/dashboard/categories" component={ adminCategoriesPage }/>
          <Route path="/admin/dashboard/products" component={ adminProductsPage }/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
