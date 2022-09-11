import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import { Link } from 'react-router-dom';

export default class Categories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories, status } = this.props;
    if (status === Status.PENDING) {
      return <div>Loading...</div>;
    }
    if (status === Status.SUCCESS) {
      return (
        <div>
          <h1>{status}</h1>
          {categories.map((i) => (
            <Link key={i} to={`category/${i}`}>
              {i}
            </Link>
          ))}
        </div>
      );
    }
  }
}

Categories.propTypes = {
  status: PropTypes.oneOf(Object.values(Status)),
  categories: PropTypes.array,
  fetchCategories: PropTypes.func.isRequired,
};
