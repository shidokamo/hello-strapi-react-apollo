/**
 *
 * MarkdownSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { get, isArray, isEmpty, startsWith } from 'lodash';
import { Link } from 'react-router-dom';

// import IcoContainer from 'components/IcoContainer';

import './styles.scss';

const MarkdownSection = props => {
  return (
    <div
      className="markdownSection"
      onClick={e => {
        // Handle navigation to EditPage container
        e.preventDefault();
        e.stopPropagation();
        props.onClick(props.data._id || props.data.id);
      }}
    >
      <Link to={`/form/product/${props.data.id || props.data._id}`}>
        {props.data.description}
      </Link>
    </div>
  );
};

MarkdownSection.defaultProps = {
  data: {},
  headers: [],
  onClick: e => {
    e.preventDefault();
    console.log('click');
  },
};

MarkdownSection.propTypes = {
  data: PropTypes.object,
  headers: PropTypes.array,
  onClick: PropTypes.func,
};
export default MarkdownSection;
