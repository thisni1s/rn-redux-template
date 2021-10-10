var fs = require('fs');
const { actionSnippet, objectReducerSnippet, arrayReducerSnippet, thunkSnippet, storeImportSnippet, storeMethodSnippet } = require('./codeSnippets.js'); 

const createReducer = (name, datatype, storageType) => {
  if(datatype !== 'object' && datatype !== 'array'){console.log('wrong datatype!'); return;}  
  if(storageType !== 'as' && storageType !== 'se'){console.log('wrong storagetype!'); return;} 

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

  //add to combineReducers
  // Add in AppReducer.js
  let methodEnd = '});';
  let importEnd = '//END_IMPORTS';
  let file = storageType === 'as' ? './src/Redux/reducers/asyncStorageReducer.js' : './src/Redux/reducers/sensitiveReducer.js'; 
  fs.readFile(
    file,
    {encoding: 'utf8', flag: 'r'},
    (e, fileContent) => {
      let importStatement = storeImportSnippet.replace(/REDUCER_NAME/g, reducerName).replace(/REDUCER_PATH/g, filepath.slice(0, filepath.length-3));
      let methodSnippet = storeMethodSnippet.replace(/REDUCER_NAME/g, reducerName);
      let newFileContent = fileContent
        .replace(importEnd, importStatement)
        .replace(methodEnd, methodSnippet);
      const ACTIONS = fs.createWriteStream(file);
      ACTIONS.write(newFileContent);
      ACTIONS.end();
    }
  );

};

const createThunk = (name, datatype, storageType) => {
  if(datatype !== 'object' && datatype !== 'array'){console.log('wrong datatype!'); return;}
  if(storageType !== 'as' && storageType !== 'se'){console.log('wrong storagetype!'); return;}

  createReducer(name, datatype, storageType);

  //add thunk
  let actionName = 'change'+createCamelCase(name);
  let thunkName = name.toLowerCase()+'Thunk';
  let reducerName = name.toLowerCase()+'Reducer';
  let thunk = thunkSnippet.replace(/ACTION_NAME/g, actionName).replace(/THUNK_NAME/g, thunkName).replace(/REDUCER_NAME/g, reducerName);
  fs.appendFile(
    './src/Redux/actions/thunks.js',
    thunk,
    (err) => {err ? console.log(err) : null;},
  );

  console.log('\n \n Thunk added sucessfully, please add your middleware code to the ' + thunkName + 'in: src/Redux/actions/thunks.js \n');

};

const createCamelCase = (text) => {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

module.exports = {
  createReducer,
  createThunk,
}