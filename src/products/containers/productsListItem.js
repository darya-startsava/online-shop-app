import ProductsListItem from '../components/productsListIem';
import withRouter from '../../utils/withRouter';
import { connect } from 'react-redux';
import { ADD_PRODUCT_TO_CART } from '../../product/actions';

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (id, product, selectedAttributes, cartId) =>
    dispatch({ type: ADD_PRODUCT_TO_CART, id, product, selectedAttributes, cartId }),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductsListItem));
