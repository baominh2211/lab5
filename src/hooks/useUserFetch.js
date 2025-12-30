/**
 * useUserFetch Hook - Exercise 1.1: The Fetch Machine
 * Implements useReducer with Finite State Machine pattern
 * Prevents invalid state transitions
 * Author: Hoang Bao Minh
 */

import { useReducer, useCallback } from 'react';

// State types for Finite State Machine
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

// Action types
const ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  RESET: 'RESET'
};

// Initial state
const initialState = {
  status: STATUS.IDLE,
  data: null,
  error: null
};

/**
 * Valid state transitions (Finite State Machine)
 * Defines which transitions are allowed from each state
 */
const validTransitions = {
  [STATUS.IDLE]: [ACTIONS.FETCH_INIT],
  [STATUS.LOADING]: [ACTIONS.FETCH_SUCCESS, ACTIONS.FETCH_FAILURE],
  [STATUS.RESOLVED]: [ACTIONS.FETCH_INIT, ACTIONS.RESET],
  [STATUS.REJECTED]: [ACTIONS.FETCH_INIT, ACTIONS.RESET]
};

/**
 * Reducer function with FSM validation
 * Prevents invalid state transitions
 */
function fetchReducer(state, action) {
  // Check if transition is valid
  const allowedActions = validTransitions[state.status];
  
  if (!allowedActions.includes(action.type)) {
    console.warn(
      `Invalid transition: Cannot dispatch ${action.type} from ${state.status} state`
    );
    return state;
  }

  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return {
        ...state,
        status: STATUS.LOADING,
        error: null
      };

    case ACTIONS.FETCH_SUCCESS:
      return {
        status: STATUS.RESOLVED,
        data: action.payload,
        error: null
      };

    case ACTIONS.FETCH_FAILURE:
      return {
        status: STATUS.REJECTED,
        data: null,
        error: action.payload
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}

/**
 * Custom hook for fetching user data with FSM pattern
 * @returns {Object} - state and fetch functions
 */
export function useUserFetch() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchUser = useCallback(async (userId) => {
    dispatch({ type: ACTIONS.FETCH_INIT });

    try {
      // Simulated API call
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Simulate network delay for demo
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACTIONS.FETCH_FAILURE,
        payload: error.message || 'An error occurred while fetching user data'
      });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  return {
    ...state,
    isIdle: state.status === STATUS.IDLE,
    isLoading: state.status === STATUS.LOADING,
    isResolved: state.status === STATUS.RESOLVED,
    isRejected: state.status === STATUS.REJECTED,
    fetchUser,
    reset
  };
}

/**
 * Generic fetch hook that can be used for any API endpoint
 * @param {string} url - API endpoint
 * @returns {Object} - state and fetch function
 */
export function useFetch(initialUrl = null) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const execute = useCallback(async (url, options = {}) => {
    dispatch({ type: ACTIONS.FETCH_INIT });

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: ACTIONS.FETCH_FAILURE,
        payload: error.message || 'An error occurred'
      });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  return {
    ...state,
    isIdle: state.status === STATUS.IDLE,
    isLoading: state.status === STATUS.LOADING,
    isResolved: state.status === STATUS.RESOLVED,
    isRejected: state.status === STATUS.REJECTED,
    execute,
    reset
  };
}

export { STATUS, ACTIONS };
export default useUserFetch;
