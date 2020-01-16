/**
 *
 * EditPage
 *
 */

import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import Button from '../../components/Button';

import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT, UPDATE_PRODUCT } from '../../queries';
// Markdown to HTML
import unified from 'unified';
import markdown from 'remark-parse';
import slug from 'remark-slug';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

import './styles.scss';

const md2html = md => {
  return unified()
    .use(markdown) // パーサー(文字列をremarkの構文木に変換)
    .use(slug) // トランスフォーマー(章にidをつける)
    .use(remark2rehype) // トランスフォーマー(マークダウンからHTMLに変換)
    .use(html) // コンパイラー(HTML構文木を文字列に変換)
    .processSync(md);
};

const EditPage = props => {
  // Hooks
  const { id } = useParams(); // Get router URI
  // Set page information
  const title = `Edit ${id}`;
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [markdown2html, setMarkdown2html] = useState('');
  const refMarkdown = useRef(null);

  // useLayoutEffect を使うと呼び出しが大量になりすぎてエラーになる。
  // useLayoutEffect(() => {
  //   console.log('Update HTML from markdown.');
  //   setMarkdown2html(md2html(newDescription));
  //   console.log('Markdown-to-html: ', newMarkdown2html);
  // });

  // Mutation
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  // Load existing data at initial mounting
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id },
    onCompleted: data => {
      // data で帰り値がとれる。公式ドキュメントに記述ない。
      console.log('onCompleted call.');
      console.log('Data : ', data);
      setName(data.product.name);
      setDescription(data.product.description);
      setMarkdown2html(md2html(data.product.description)); // description を渡すとうまくいかないので気をつける。
    },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>Failed to load product data.</p>;

  // useQuery の後に置くとうまくいかない。Hook の呼び出し順がおかしくなってエラーになる。
  // const [newDescription, setDescription] = useState(data.product.description);
  // const [newName, setName] = useState(data.product.name);

  // newXXX を直接コンポーネントに渡すと render がうまくいかない。（state の更新は、render の後だから？）

  const init_name = name;
  const init_description = description;

  const handleChange = e => {
    console.log('handleChange call');
    setDescription(e.target.value);
    setMarkdown2html(md2html(e.target.value)); // setDescription と setMarkdown の両方でレンダーされる？
    // setMarkdown2html(md2html(newDescription)); // これだと画面更新が一歩遅れる
    console.log('New Description: ', description);
    console.log('Markdown-to-html: ', markdown2html);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('New Name: ', name);
    console.log('New Description: ', description);
    if (description || name) {
      updateProduct({
        variables: {
          id: id,
          name: name,
          description: description,
        },
      });
    }
    // TODO:
    // catch -> finally ->
    //         this.props.history.push(`/${params.contentType}s`);
  };

  return (
    <div className="editPageWrapper">
      <div className="container-fluid">
        <h1>{title}</h1>
        <Link to={`/products`}>Back</Link>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <p>Name</p>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                defaultValue={init_name}
                onChange={e => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>Markdown</p>
            </div>
            <div className="col-md-8">
              <textarea
                rows="10"
                cols="50"
                defaultValue={init_description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>Output</p>
            </div>
            <div className="col-md-8">
              <div
                ref={refMarkdown}
                dangerouslySetInnerHTML={{
                  __html: markdown2html,
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Button type="submit" primary>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

EditPage.defaultProps = {};
EditPage.propTypes = {};

export default EditPage;
