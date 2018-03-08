import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import FontAwesome from 'react-fontawesome';
import shortid from 'shortid';

import CollectionsDropdown from './collections-dropdown';

export class FeaturedCollection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let featArticle;
    let featArticleList;

    if (this.props.collections[this.props.featuredCollectionIndex].collectionArticles.length !== 0) {

      const collectionId = this.props.collections[this.props.featuredCollectionIndex]._id;

      featArticle =
        <div className="featured-article">
          <h1>{this.props.collections[this.props.featuredCollectionIndex].collectionTitle}</h1>
          <img src={this.props.collections[this.props.featuredCollectionIndex].collectionArticles[this.props.featuredArticleIndex].image} alt={this.props.collections[this.props.featuredCollectionIndex].collectionArticles[this.props.featuredArticleIndex].title}/>
          <CollectionsDropdown dropDownType="collection"
            collectionId={collectionId}
            renameCollection={(collectionId) => this.props.renameCollection(collectionId)}
            removeCollection={(collectionId) => this.props.removeCollection(collectionId)}
          />
        </div>

      featArticleList = this.props.collections[this.props.featuredCollectionIndex].collectionArticles.map((data, index) => {

        const articleId = data._id;

        return (
          <div className={index === parseInt(this.props.featuredArticleIndex, 10)? 'selected-article-list-detail' : 'article-list-detail'} key={shortid.generate()}>
            <li onClick={() => this.props.changeFeaturedArticle(index)}>
            {data.title}
            </li>
            <a className='remove-article' onClick={() => this.props.removeArticle(collectionId, articleId)}>
                <FontAwesome name='minus-circle' />
            </a>
          </div>
        )
      })
    }
    if (this.props.collections[this.props.featuredCollectionIndex].collectionArticles.length === 0) {

      const collectionId = this.props.collections[this.props.featuredCollectionIndex]._id;

      featArticle =
        <div className="featured-article">
          <h1>{this.props.collections[this.props.featuredCollectionIndex].collectionTitle}</h1>
          <div className="edit-title" onClick={() => this.renameCollection(collectionId)}>
            <FontAwesome name='edit'/>
            <p>edit title</p>
          </div>
        </div>

      featArticleList =
        <div className="article-list-detail" key={shortid.generate()}>
          <li>
          No articles found in this collection. You should add some!
          </li>
        </div>
        
    }

    return (
      <div className="featured-collection">
        {featArticle}
        <div className="featured-article-list">
          {featArticleList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    collections: state.collections.collections
  }
}

export default requiresLogin()(connect(mapStateToProps)(FeaturedCollection));