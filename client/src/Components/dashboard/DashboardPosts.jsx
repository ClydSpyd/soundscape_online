import React from 'react';
import { dummyPosts } from '../../dummy_data/posts';
import PostRowCompact from '../posts/PostRowCompact';

import styles from './DashboardPosts.module.scss';

const DashboardPosts = () => {

  return (
    <div className={styles.dashPosts}>
      <div className={styles.topBar}>
        <div className={styles.pill}>Top-Rated</div>
        <div className={styles.pill}>Newest</div>
        <div className={styles.pill}>All categories <i className="fas fa-sort-down"></i></div>
      </div>

      <div className={styles.posts}>
        {
          dummyPosts.map((post, idx) => <PostRowCompact key={idx} post={post}  /> )
        }
      </div>
    </div>
  )

}

export default DashboardPosts;