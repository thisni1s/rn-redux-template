const objectReducerSnippet = `import { ACTION_TYPE } from '../actions/actionTypes';
  
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

const arrayReducerSnippet = `import { ACTION_TYPE } from '../actions/actionTypes';
  
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

const actionSnippet = `import { ACTION_TYPE } from './actionTypes';
export const ACTION_NAME = obj => ({
  type: ACTION_TYPE,
  obj,
});

`;

const thunkSnippet = `import { ACTION_NAME } from './actions';
export const THUNK_NAME = ( parameter ) => (dispatch, getState) => {
  //your async code here
  //.then(dispatch(REDUCER_NAME(data)))
};

`;

const storeMethodSnippet = `  REDUCER_NAME,
});
`;

const storeImportSnippet = `import REDUCER_NAME from 'REDUCER_PATH';
//END_IMPORTS
`;

module.exports = {
  objectReducerSnippet,
  arrayReducerSnippet,
  actionSnippet,
  thunkSnippet,
  storeImportSnippet,
  storeMethodSnippet,
};