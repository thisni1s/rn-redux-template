const { createThunk, createReducer } = require('./creator.js');

const type = process.argv[2];
const datatype = process.argv[3];
const name = process.argv[4];

if (type === 'thunk') {
  // yarn new thunk object HelloWorld
  createThunk(name, datatype);
} else if (type === 'reducer') {
  // yarn new reducer object HelloWorld
  createReducer(name, datatype);
} 