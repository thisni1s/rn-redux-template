export const objectReducerSnippet = `import { ACTION_TYPE } from '../actions/actionTypes';
  
const REDUCER_NAME = (state = {}, action) => {
  switch (action.type) {
  case ACTION_TYPE:
    return action.payload;
  default:
    return state;
  }
};
export default REDUCER_NAME;  
`;

export const arrayReducerSnippet = `import { ACTION_TYPE } from '../actions/actionTypes';
  
const REDUCER_NAME = (state = [], action) => {
  switch (action.type) {
  case ACTION_TYPE:
    return action.payload;
  default:
    return state;
  }
};
export default REDUCER_NAME;  
`;

export const actionSnippet = `
import { ACTION_TYPE } from './actionTypes';
export const ACTION_NAME = obj => ({
	type: ACTION_TYPE,
	obj,
});

`;