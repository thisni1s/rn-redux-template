const { createThunk, createReducer } = require('./creator.js');

const type = process.argv[2];
const datatype = process.argv[3];
const name = process.argv[4];
const storageType = process.argv[5];

if (type === 'thunk') {
  // yarn new thunk object HelloWorld se
  createThunk(name, datatype, storageType);
} else if (type === 'reducer') {
  // yarn new reducer object HelloWorld as
  createReducer(name, datatype, storageType);
} 