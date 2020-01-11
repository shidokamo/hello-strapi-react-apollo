/**
 *
 * ProductDetailsPage
 */

import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PRODUCT } from '../../queries';
import unified from 'unified';
import markdown from 'remark-parse';
import slug from 'remark-slug';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

const ProductDetailsPage = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>GraphQL error</p>;

  const { contents } = unified()
    .use(markdown) // パーサー(文字列をremarkの構文木に変換)
    .use(slug) // トランスフォーマー(章にidをつける)
    .use(remark2rehype) // トランスフォーマー(マークダウンからHTMLに変換)
    .use(html) // コンパイラー(HTML構文木を文字列に変換)
    .processSync(data.product.description);

  return (
    <div>
      {Object.keys(data).map((value, key) => (
        <div key={key}>
          <div style={styles.linkWrapper}>
            <Link to="/products">Go back to products page</Link>
          </div>
          <div style={styles.border}></div>
          <div dangerouslySetInnerHTML={{ __html: contents }} />
          <div style={styles.border}></div>
          {Object.keys(data[value]).map((child, key) => {
            // Display all the informations
            return (
              <div key={key}>
                <ul>
                  <li>
                    {child}: {data[value][child]}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const styles = {
  linkWrapper: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  border: {
    borderTop: 'solid',
    borderWidth: '5px',
    borderColor: 'red',
  },
};

export default ProductDetailsPage;
