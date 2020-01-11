import React from 'react';
import PropTypes from 'prop-types';

import MarkdownSection from '../MarkdownSection';

import './styles.scss';

const Markdown = props => {
  return (
    props.data.length !== 0 &&
    props.data.map((value, key) => (
      <MarkdownSection
        data={value}
        key={key}
        headers={props.headers}
        onClick={props.onClick}
      />
    ))
  );
};

Markdown.defaultProps = {
  data: [],
  header: [],
  onClick: () => {},
};

Markdown.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  onClick: PropTypes.func,
};

export default Markdown;
