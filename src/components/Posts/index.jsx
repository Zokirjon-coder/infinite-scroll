import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { postsStore } from '../../stores/store';

const Posts = observer(() => {
  const { posts, fetchPosts, isLoading } = postsStore;
  const observerTarget = useRef(null);

  useEffect(() => {
    let current = posts?.length
      ? observerTarget.current?.querySelector('.observer_element')
      : observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting || !posts.length) {
          fetchPosts();
        }
      },
      { threshold: 1 }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [observerTarget, isLoading, fetchPosts, posts]);

  return (
    <div ref={observerTarget} className='posts'>
      {posts?.map((post, i) => (
        <div
          key={post.id}
          className={posts?.length === i + 1 ? 'observer_element' : null}
        >
          <img src={post.url} alt={post.title} width='300' height='300' />
          <h6>{post.title}</h6>
        </div>
      ))}
    </div>
  );
});

export default Posts;
