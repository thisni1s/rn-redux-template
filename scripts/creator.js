var fs = require('fs');
const { actionSnippet, objectReducerSnippet, arrayReducerSnippet } = require('./codeSnippets.js'); 

const createReducer = (name, datatype) => {
  if(datatype !== 'object' && datatype !== 'array'){console.log('wrong datatype!'); return;}  

  //add action type in actions/actionTypes
  let actionTypeName = 'CHANGE_'+name.toUpperCase();
  let actionType = `export const ${actionTypeName} = '${actionTypeName}';`;
  fs.appendFile(
    './src/Redux/actions/actionTypes.js',
    actionType,
    (err) => {err ? console.log(err) : null;},
  );

  //add action in actions/actions.js
  let actionName = 'change'+createCamelCase(name);
  let snippet = actionSnippet.replace(/ACTION_NAME/g, actionName).replace(/ACTION_TYPE/g, actionTypeName);
  fs.appendFile(
    './src/Redux/actions/actions.js',
    snippet,
    (err) => {err ? console.log(err) : null;},
  );

  //add reducer
  let reducer = datatype === 'object' ? objectReducerSnippet : arrayReducerSnippet;
  let reducerName = name.toLowerCase()+'Reducer';
  reducer = reducer.replace(/REDUCER_NAME/g, reducerName).replace(/ACTION_TYPE/g, actionTypeName);
  let filepath = './src/Redux/reducers/'+reducerName+'.js';
  fs.writeFile(filepath, reducer, (err) => {
    if (err) throw err;
    console.log('reducer created successfully!');
  });

};

const createThunk = (name, datatype) => {

};

const createCamelCase = (text) => {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

module.exports = {
  createReducer,
  createThunk,
}