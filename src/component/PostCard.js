import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import { Grid, Row, Col } from 'react-flexbox-grid';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Vote from './Vote';

const PostCardContainer = glamorous.div({
  marginTop: 20,
  padding: 16,
  background: '#fff',
  boxShadow:
    '0 10px 40px 0 rgba(62,57,107,0.07), 0 2px 9px 0 rgba(62,57,107,0.06)',
  textAlign: 'left',
  color: 'rgba(0,0,0,0.8)',
  '& a': {
    fontSize: 20,
    color: 'rgba(0,0,0,0.8)'
  }
});

const PostCardFooter = glamorous.div({
  marginTop: 20
});

const FooterContainer = glamorous.div({
  textAlign: 'center'
});

const PostCard = ({
  id,
  category,
  title,
  author,
  timestamp,
  body,
  voteScore,
  onVote
}) => {
  return (
    <PostCardContainer>
      <Link to={`/${category}/${id}`}>{title}</Link>
      <p>Category: {category}</p>
      <p>Author: {author}</p>
      <p>Date: {new Date(timestamp).toLocaleDateString()}</p>
      <p>{body}</p>
      <PostCardFooter>
        <Grid fluid>
          <Row>
            <Col xs={4}>
              <FooterContainer>
                <DeleteButton />
              </FooterContainer>
            </Col>
            <Col xs={4}>
              <FooterContainer>
                <EditButton />
              </FooterContainer>
            </Col>
            <Col xs={4}>
              <Vote
                voteScore={voteScore}
                onUpVote={() => onVote(id, 'upVote')}
                onDownVote={() => onVote(id, 'downVote')}
              />
            </Col>
          </Row>
        </Grid>
      </PostCardFooter>
    </PostCardContainer>
  );
};

PostCard.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  timestamp: PropTypes.number,
  body: PropTypes.string,
  voteScore: PropTypes.number,
  onVote: PropTypes.func
};

export default PostCard;