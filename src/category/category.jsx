import React from 'react';
import withRouter from '../utils/withRouter';
import PropTypes from 'prop-types';

class Category extends React.PureComponent {
  render() {
    const { params } = this.props;
    const { category } = params;
    console.log('Props:', this.props);
    return <div>Category: {category}</div>;
  }
}
export default withRouter(Category);

Category.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string,
  }),
};
