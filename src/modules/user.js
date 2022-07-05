import { SUCCESS_SUFFIX } from "redux-axios-middleware";
import HttpService from "../services/HttpService";
// import UserService from "../services/UserService";

const ADD_USER = 'ADD_USER';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const GET_USER_FOLLOWERS = 'GET_USER_FOLLOWERS';
const GET_USER_FOLLOWED = 'GET_USER_FOLLOWED';
const DELETE_USER = 'DELETE_USER';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER + SUCCESS_SUFFIX:
      return action.payload.data;
    
    case GET_USER_FOLLOWED + SUCCESS_SUFFIX:
        return action.payload.data;
    
    case GET_USER_FOLLOWERS + SUCCESS_SUFFIX:
      return action.payload.data;

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload.user.id);

    default:
      return state;
  }
};

export default userReducer;

export const addUser = user => ({
  type: ADD_USER,
  payload: {
    request: {
      url: '/user',
      method: HttpService.HttpMethods.POST,
      data: user,
    },
  },
});

export const getUser = userId => {
  console.log(`Get user with id ${userId}`);
  return {
    type: GET_USER,
    payload: {
      request: {
        url: '/user/' + userId,
        method: HttpService.HttpMethods.GET,
      },
    },
  }
};

export const updateUser = user => {
  console.log(`Get user with id ${user.userId}`);
  return {
    type: UPDATE_USER,
    payload: {
      request: {
        url: '/user/',
        method: HttpService.HttpMethods.PUT,
        data: user,
      },
    },
  }
};

export const followUser = user => {
  console.log(`User ${user.userId} follows user ${user.userToFollowId}`);
  return {
    type: FOLLOW_USER,
    payload: {
      request: {
        url: '/user/follow',
        method: HttpService.HttpMethods.PUT,
        data: user,
      },
    },
  }
};

export const unfollowUser = user => {
  console.log(`User ${user.userId} unfollows user ${user.userToFollowId}`);
  return {
    type: UNFOLLOW_USER,
    payload: {
      request: {
        url: '/user/unfollow',
        method: HttpService.HttpMethods.PUT,
        data: user,
      },
    },
  }
};

export const getUserFollowers = (userId, page, size) => {
  console.log(`Get user ${userId} followers`);
  return {
    type: GET_USER_FOLLOWERS,
    payload: {
      request: {
        url: `/user/followers/${userId}?page=${page}&size=${size}`,
        method: HttpService.HttpMethods.GET,
      },
    },
  }
};

export const getUserFollows = (userId, page, size) => {
  console.log(`Get users following user with id ${userId}`);
  return {
    type: GET_USER_FOLLOWED,
    payload: {
      request: {
        url: `/user/follows/${userId}?page=${page}&size=${size}`,
        method: HttpService.HttpMethods.GET,
      },
    },
  }
};
export const deleteUser = userId => {
  console.log(`Delete ${userId}`);
  return {
    type: DELETE_USER,
    payload: {
      request: {
        url: `/user/${userId}`,
        method: HttpService.HttpMethods.DELETE,
      },
    },
  }
};
