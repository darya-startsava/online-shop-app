import { connect } from 'react-redux';
import Product from '../components/product';
import withRouter from '../../utils/withRouter';
import { fetchProduct } from '../actions-creators.js';
import { ADD_PRODUCT_TO_CART } from '../actions';

const mapStateToProps = (state, { params }) => ({
  product: state.products.data[params.product],
  status: state.products.status,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  addProductToCart: (id, product, selectedAttributes, cartId) =>
    dispatch({ type: ADD_PRODUCT_TO_CART, id, product, selectedAttributes, cartId }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
