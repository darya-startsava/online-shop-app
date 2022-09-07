import { connect } from 'react-redux';
import Categories from '../components/categories.jsx';
import { fetchCategories } from '../actions-creators.js';

const mapStateToProps = (state) => ({
  categories: state.categories.data,
  status: state.categories.status,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
