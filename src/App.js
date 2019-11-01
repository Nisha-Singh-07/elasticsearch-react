import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Autosuggest from './Autosuggest'
// import metricsvals from './metrics.js'
// import dimensions from './dimensions.js'
// import regionvals from './regionValues'
// import divisionvals from './divisionValues'
// import marketvals from './marketValues'
// import storevals from './storeValues'
// import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";

function App() {
  // const Item = ({ entity: { name, char } }) => <div>{`${name}:${char}`}</div>;
  return (
    <div className="App">
      <div className="App-Component">
        <div className="App-Component">
      <Autosuggest 
      // items = {metricsvals} 
                  //  triggeritems = {dimensions} 
                  //  regionvalues = {regionvals}
                  //  divisionvalues = {divisionvals}
                  //  marketvalues = {marketvals}
                  //  storevalues = {storevals}
                    />
      {/* <ReactTextareaAutocomplete
          className="my-textarea"
          onChange={e => console.log(e.target.value)}
          loadingComponent={() => <span>Loading</span>}
          trigger={{
            "@": {
              dataProvider: token => {
                return [
                  { name: "region", char: "11" },
                  { name: "store", char: "8064" }
                ];
              },
              component: Item,
              output: (item, trigger) => item.char
            }
          }}
        /> */}
    </div>
    </div>
    </div>
    );
}
export default App;
