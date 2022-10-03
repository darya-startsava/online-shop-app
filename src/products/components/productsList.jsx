import React from 'react';
import PropTypes from 'prop-types';
import Status from '../../utils/status';
import ProductsListItem from '../containers/productsListItem';
import './productsList.scss';
import Loading from '../../reusableComponents/loading';
import { FixedSizeGrid as Grid } from 'react-window';
import outerElementType from '../../utils/withScroll';
import constants from '../../constants';

class ProductsList extends React.PureComponent {
  componentDidMount(prevProps) {
    const { category, fetchProducts } = this.props;
    if (category) {
      fetchProducts(category);
    }
  }

  componentDidUpdate(prevProps) {
    const { category, fetchProducts } = this.props;
    if (category && category !== prevProps.category) {
      fetchProducts(category);
    }
  }

  render() {
    const { products, status } = this.props;
    const productsMatrix = products.reduce(function (rows, key, index) {
      return (
        (index % constants.COLUMN_COUNT === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows
      );
    }, []);

    const rowCount = productsMatrix.length;
    if (status === Status.PENDING) {
      return <Loading />;
    }
    if (status === Status.SUCCESS) {
      return (
        <Grid
          itemData={productsMatrix}
          columnCount={constants.COLUMN_COUNT}
          columnWidth={constants.COLUMN_WIDTH + 2 * constants.COLUMN_GAP}
          height={window.innerHeight}
          rowCount={rowCount}
          rowHeight={constants.ROW_HEIGHT + constants.ROW_GAP}
          width={constants.GRID_WIDTH}
          outerElementType={outerElementType}
        >
          {ProductsListItem}
        </Grid>
      );
    }
  }
}

ProductsList.propTypes = {
  products: PropTypes.array,
  status: PropTypes.string,
  category: PropTypes.string,
  fetchProducts: PropTypes.func.isRequired,
  currentCurrency: PropTypes.shape({ label: PropTypes.string, symbol: PropTypes.string }),
};

export default ProductsList;
