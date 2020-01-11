/**
 *
 * MarkdownSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import unified from 'unified';
import markdown from 'remark-parse';
import slug from 'remark-slug';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

import './styles.scss';

const MarkdownSection = props => {
  const { contents } = unified()
    .use(markdown) // パーサー(文字列をremarkの構文木に変換)
    .use(slug) // トランスフォーマー(章にidをつける)
    .use(remark2rehype) // トランスフォーマー(マークダウンからHTMLに変換)
    .use(html) // コンパイラー(HTML構文木を文字列に変換)
    .processSync(props.data.description);

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
        <div dangerouslySetInnerHTML={{ __html: contents }} />
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
