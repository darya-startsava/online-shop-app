import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import { NavLink } from 'react-router-dom';
import './categories.scss';
import Loading from '../../reusableComponents/loading/loading';

export default class Categories extends React.PureComponent {
  async componentDidMount() {
    await this.props.fetchCategories();
  }

  render() {
    const { categories, status } = this.props;
    if (status === Status.PENDING) {
      return <Loading />;
    }
    if (status === Status.SUCCESS) {
      return (
        <div className="categories-wrapper">
          {categories.map((i) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'categories-nav-item active' : 'categories-nav-item'
              }
              key={i}
              to={`category/${i}`}
              aria-label="select category"
            >
              {i}
            </NavLink>
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
