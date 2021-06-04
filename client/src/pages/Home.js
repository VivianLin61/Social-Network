import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql'
import { Grid, Transition } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import PostCard from '../components/PostCard'

function Home() {
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {/* {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )} */}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home
