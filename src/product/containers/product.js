import { connect } from 'react-redux';
import Product from '../components/product';
import withRouter from '../../utils/withRouter';
import { fetchProduct } from '../actions-creators.js';

const mapStateToProps = (state, { params }) => ({
  product: state.products.data[params.product],
  status: state.products.status,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
