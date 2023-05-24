import React from 'react';
import { observer } from 'mobx-react';

import Posts from './components/Posts';
import { postsStore } from './stores/store';

const App = observer(() => {
  return (
    <div className='App'>
      <Posts />
      {postsStore?.isLoading ? <p>Loading...</p> : null}
      {postsStore?.error?.message ? (
        <p>Error: {postsStore.error.message}</p>
      ) : null}
    </div>
  );
});

export default App;
