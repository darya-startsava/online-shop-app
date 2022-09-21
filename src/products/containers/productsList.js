import { connect } from 'react-redux';
import ProductsList from '../components/productsList';
import withRouter from '../../utils/withRouter';
import { fetchProducts } from '../actions-creators.js';

const mapStateToProps = (state, { category }) => ({
  status: state.products.status,
  products: Object.values(state.products.data),
  currentCurrency: state.currency.currentValue,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (category) => dispatch(fetchProducts(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductsList));
