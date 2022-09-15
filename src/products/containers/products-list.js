import { connect } from 'react-redux';
import ProductsList from '../components/products-list';
import withRouter from '../../utils/withRouter';
import { fetchProducts } from '../actions-creators.js';

const mapStateToProps = (state, { category }) => ({
  status: state.products.status,
  products: Object.values(state.products.data),
});
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (category) => dispatch(fetchProducts(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductsList));