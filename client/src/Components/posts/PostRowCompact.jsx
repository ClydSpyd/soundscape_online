import React from 'react';
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import styles from './PostRowCompact.module.scss';

const PostRowCompact = ({ post: { title, category, date, _id, user, likes, comments, user:{avatar, name }}}) => {

  return (
    <div className={styles.postRowCompact}>
      <div className={styles.left}>
        <img className={'round-img'} src={avatar} alt="avatar"/>
        <div className={styles.text}>
          <Link to={`/post/${_id}`}>

            <h4>{title}</h4>
          </Link>
          <p><span className={styles.category}>{category}</span> posted by <Link to={`/profile/${user._id}`}>{name}</Link> on {format(date, 'EEEE MMM dd, yyyy')} </p>
        </div>
      </div>
      <Link to={`/post/${_id}`} className={styles.icons}>
      <i className="far fa-comment-alt"></i><p>{comments}</p>
      <i className="far fa-thumbs-up"></i><p>{likes}</p>
      </Link>
    </div>
  )

}

export default PostRowCompact;