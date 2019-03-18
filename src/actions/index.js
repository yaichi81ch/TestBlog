import _ from "lodash";

import jsonPlaceholder from "../APIs/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  console.log(getState());

  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(userId => dispatch(fetchUser(userId)))
  // ↓↓

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(userId => dispatch(fetchUser(userId)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};

// export const fetchUser = id => async dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data
//   });
// });
