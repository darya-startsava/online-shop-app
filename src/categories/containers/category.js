import { connect } from 'react-redux';
import Category from '../components/category.jsx';
import withRouter from '../../utils/withRouter';

const mapStateToProps = (state) => ({
  defaultCategory: state.categories.data[0],
});

export default connect(mapStateToProps)(withRouter(Category));
