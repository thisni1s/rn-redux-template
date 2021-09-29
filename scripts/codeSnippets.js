export const objectReducerSnippet = `import { ACTION_NAME } from '../actions/actionTypes';
  
const REDUCER_NAME = (state = {}, action) => {
  switch (action.type) {
  case ACTION_NAME:
    return action.payload;
  default:
    return state;
  }
};
export default REDUCER_NAME;  
`;

export const arrayReducerSnippet = `import { ACTION_NAME } from '../actions/actionTypes';
  
const REDUCER_NAME = (state = [], action) => {
  switch (action.type) {
  case ACTION_NAME:
    return action.payload;
  default:
    return state;
  }
};
export default REDUCER_NAME;  
`;

export const actionSnippet = `export const ACTION_NAME = obj => ({
	type: ACTION_TYPE,
	obj,
});
`;