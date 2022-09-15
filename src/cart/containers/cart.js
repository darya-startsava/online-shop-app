import { connect } from 'react-redux';
import Cart from '../components/cart';

const mapStateToProps = (state) => ({
  products: state.cart,
});

export default connect(mapStateToProps)(Cart);
