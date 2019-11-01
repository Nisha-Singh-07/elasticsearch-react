//Clean Code

import React, { PureComponent } from 'react';
import './Autosuggest.css';
import * as _ from "lodash";
import elasticsearch from 'elasticsearch';


var splitText = []
var splitTexthandleKeyDown = []
var eVal
var eval1
var sent
var prevString
var filteredArrayHelper
var filteredArray
var splitValue = []

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

export default class MyComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.test = this.test.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

    this.state = {
      suggestions: [],
      text: '',
      cursor: 0,
      helperVisible: true,
      selection: 0,
      region_suggestions: [],
      div_suggestions: [],
      market_suggestions: [],
      store_suggestions: [],
      s12: ''
    };
  }

  search(index, body) {
    return esClient.search({ index: index, body: body });
  };

  test(e) {
    eVal = e.target.value
    const arr = eVal.split(' ')
    const en = arr[arr.length - 1]

    let body = {
      size: 20,
      from: 0,
      query: {
        query_string: {
          default_field: "title",
          query: "*" + en + "*",
          // fuzziness: "AUTO"
        }
      }
    };
    let regionBody = {
      size: 20,
      from: 0,
      query: {
        query_string: {
          default_field: "region",
          query: "*" + en + "*"
        }
      }
    };
    let divisionBody = {
      size: 20,
      from: 0,
      query: {
        query_string: {
          default_field: "division",
          query: "*" + en + "*"
        }
      }
    };
    let marketBody = {
      size: 20,
      from: 0,
      query: {
        query_string: {
          default_field: "market",
          query: "*" + en + "*"
        }
      }
    };
    let storeBody = {
      size: 20,
      from: 0,
      query: {
        query_string: {
          default_field: "store",
          query: "*" + en + "*"
        }
      }
    };
    
    const bodySuggestions = [];
    const metricsSuggestions = [];
    const value = eVal.toLowerCase();
    var options = splitValue[splitValue.length - 1];
    // console.log("Backspace:", this.state.text, ",", this.state.text.length)
    if (options === "region" || splitText[splitText.length - 2] === "region") {
      this.search('aiassistregion', regionBody)
        .then(results => {
          if (results.hits.total > 0) console.log(`returned article titles:`);
          results.hits.hits.forEach((hit, index) =>
            metricsSuggestions.push(hit._source.region)
          );
          this.setState({
            region_suggestions: metricsSuggestions,
            text: value,
            cursor: 0,
          })
        }).catch(console.error);
    }
    else if (options === "division" || splitText[splitText.length - 2] === "division") {
      this.search('aiassist', divisionBody)
        .then(results => {
          if (results.hits.total > 0) console.log(`returned article titles:`);
          results.hits.hits.forEach((hit, index) =>
            metricsSuggestions.push(hit._source.division)
          );
          this.setState({
            div_suggestions: metricsSuggestions,
            text: value,
            cursor: 0
          })
        }).catch(console.error);
    }
    else if (options === "market" || splitText[splitText.length - 2] === "market") {
      this.search('aiassist', marketBody)
        .then(results => {
          if (results.hits.total > 0) console.log(`returned article titles:`);
          results.hits.hits.forEach((hit, index) =>
            metricsSuggestions.push(hit._source.market)
          );
          this.setState({
            market_suggestions: metricsSuggestions,
            text: value,
            cursor: 0
          })
        }).catch(console.error);
    }
    else if (options === "store" || splitText[splitText.length - 2] === "store") {
      this.search('aiassist', storeBody)
        .then(results => {
          if (results.hits.total > 0) console.log(`returned article titles:`);
          results.hits.hits.forEach((hit, index) =>
            metricsSuggestions.push(hit._source.store)
          );
          this.setState({
            store_suggestions: metricsSuggestions,
            text: value,
            cursor: 0
          })
        }).catch(console.error);
    }
    else {
      this.search('aiassist', body)
        .then(results => {
          if (results.hits.total > 0) console.log(`returned article titles:`);
          results.hits.hits.forEach((hit, index) =>
            bodySuggestions.push(hit._source.title)
          );
          this.setState(() => ({
            cursor: 0,
            suggestions: bodySuggestions,
            text: value,//whatever is type goes to the text search bar
          }))
        })
        .catch(console.error);
    }
  }

  /************************************************************/
  // metricsRegion(e) {
  //   // console.log("metrics region", s11)
  //   eval1 = e.target.value
  //   const arr = eval1.split(' ')
  //   const en = arr[arr.length - 1]
  //   // console.log("en:",en)
  //   let region_body1 = {
  //     size: 20,
  //     from: 0,
  //     query: {
  //       query_string: {
  //         default_field: "region",
  //         query: "*" + en + "*"
  //       }
  //     }
  //   };
  //   const test3options = [];
  //   const value = eval1.toLowerCase();
  //   this.search('aiassistregion', region_body1)
  //     .then(results => {
  //       if (results.hits.total > 0) console.log(`returned article titles:`);
  //       results.hits.hits.forEach((hit, index) =>
  //         // console.log("hit:", hit._source.region)
  //         test3options.push(hit._source.region)
  //       );
  //       this.setState({
  //         region_suggestions: test3options,
  //         text: value,
  //       })
  //     }).catch(console.error);
  //   // console.log("suggestions in metric region:", test3options)

  // }

  /*************************************************************************/
//   backspaceFunc(backspaceString){
//     for(var i = 0; i < this.state.text.length ; i++){
//       console.log("index:", document.NOTATION_NODE )
//   }
// }


  handleKeyDown(e) {
    const { cursor, suggestions } = this.state

    prevString = filteredArray.join(" ")
    prevString.trim()
    splitTexthandleKeyDown = this.state.text.split(" ")

    var res = this.state.text
    res = res.toString()
    splitValue = res.split(' ')
    sent = splitValue.slice(0, splitValue.length - 1).join(" ")
    // console.log("Backspace:", e.key.split(","))

    if (e.key === "ArrowUp" && cursor > 1) {
      e.preventDefault()
      this.setState(prevState => ({
        cursor: prevState.cursor - 1,
        text: prevString + ' ' + this.state.suggestions[cursor - 2]
      }))
      // } else if (e.key === "ArrowDown" && cursor < suggestions.length - 1) {
    } 
    else if (e.key === "ArrowDown" && cursor < suggestions.length) {
      // console.log("Cursor ArrowDown:", cursor)
      this.setState(prevState => ({
        cursor: prevState.cursor + 1,
        text: prevString + ' ' + this.state.suggestions[cursor]
      }))
    }
    else if (e.key === 'Escape') {
      this.setState({
        text: e.target.value,
        suggestions: []
      })
    }
    else if (e.key === 'Enter') {
      this.setState({
        text: e.target.value, 
        cursor: 0
      })
    }
    else if(e.key === 'Backspace'){
      // console.log("Backspace:", this.state.text, ",", this.state.text.length)
      this.getInputSelection(this.state.text)
      

    }
  }

  suggestionSelected(value) {
    prevString = filteredArray.join(" ")
    prevString.trim()
    this.setState(() => ({
      text: prevString + ' ' + value,
      suggestions: []
    }))
    document.getElementById("text1").focus();
  }

  renderSuggestion() {
    const { suggestions } = this.state;
    const { cursor } = this.state

    this.suggestions = []
    var t = this.state.text

    for (var j = 0; j < suggestions.length; j++) {
      if (filteredArray.join(" ").includes(suggestions[j])) {
        suggestions.splice(j, 1);
      }
    }
    var options = splitValue[splitValue.length - 1];

    // if (suggestions.length === 0) {
    //   return null;
    // }
    if ((options === "region" || splitText[splitText.length - 2] === "region") && t.includes("region")) {
      this.setState(() => ({
        suggestions: this.state.region_suggestions
      }))
      return (
        <ul className="Autosuggest">
          {suggestions.map((items, i) =>
            <li key={items._id}
              onChange={(e) => this.metricsRegion(e)}
              className={cursor - 1 === i ? 'active' : null}
              onClick={() => this.suggestionSelected(items)}
              onKeyDown={this.handleKeyDown}>
              {items}
            </li>)}
        </ul>
      )
    }
    else if ((options === "division" || splitText[splitText.length - 2] === "division") && t.includes("division")) {
      this.setState(() => ({
        suggestions: this.state.div_suggestions
      }))
      return (
        <ul className="Autosuggest" >
          {suggestions.map((items, i) =>
            <li key={items._id}
              className={cursor - 1 === i ? 'active' : null} onClick={() => this.suggestionSelected(items)}>
              {items}
            </li>)}
        </ul>
      )
    }
    else if ((options === "market" || splitText[splitText.length - 2] === "market") && t.includes("market")) {
      this.setState(() => ({
        suggestions: this.state.market_suggestions
      }))
      return (
        <ul className="Autosuggest" >
          {suggestions.map((items, i) =>
            <li key={items._id}
              className={cursor - 1 === i ? 'active' : null} onClick={() => this.suggestionSelected(items)}>
              {items}
            </li>)}
        </ul>
      )
    }
    else if ((options === "store" || splitText[splitText.length - 2] === "store") && t.includes("store")) {
      this.setState(() => ({
        suggestions: this.state.store_suggestions
      }))
      return (
        <ul className="Autosuggest" >
          {suggestions.map((items, i) =>
            <li key={items._id}
              className={cursor - 1 === i ? 'active' : null} onClick={() => this.suggestionSelected(items)}>
              {items}
            </li>)}
        </ul>
      )
    }
    else {
      return (
        <ul className="Autosuggest" >
          {suggestions.map((items, i) =>
            <li key={items._id}
              className={cursor - 1 === i ? 'active' : null} onClick={() => this.suggestionSelected(items)}>
              {items}
            </li>)}
        </ul>
      )
    }
  }

  render() {
    const { text } = this.state;
    splitText = text.split(" ")
    filteredArrayHelper = _.difference(splitText, splitTexthandleKeyDown)
    filteredArray = _.difference(splitText, filteredArrayHelper)
    return (
      <div className="Autosuggest">
        {/* <form onSubmit={(e) => this.handlesubmit(e)} autoComplete="off"> */}
        <input
          autoComplete="off"
          id="text1"
          onChange={(e) => this.test(e)}
          value={text}
          onKeyDown={this.handleKeyDown}
          
        />
        {this.renderSuggestion()}
        {/* </form> */}
      </div>
    )
  }
}