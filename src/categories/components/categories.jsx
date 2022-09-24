import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import { Link } from 'react-router-dom';
import './categories.scss';
import Loading from '../../reusableComponents/loading';

export default class Categories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentCategory: null };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    const categories = await this.props.fetchCategories();
    this.setState({ currentCategory: categories[0] });
  }

  handleClick(category) {
    this.setState({ currentCategory: category });
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
            <Link
              className={
                this.state.currentCategory === i
                  ? 'categories-nav-item active'
                  : 'categories-nav-item'
              }
              key={i}
              to={`category/${i}`}
              aria-label="select category"
              onClick={() => this.handleClick(i)}
            >
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
