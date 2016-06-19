# react-routee [![Build Status](https://travis-ci.org/taoyuan/react-routee.svg?branch=master)](https://travis-ci.org/taoyuan/react-routee)

A react router component that support stateful routes. Forked from [React Router Component](https://github.com/strml/react-router-component)

## Installing

```bash
$ npm install react-routee --save
```

## Example

```js
var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route} = require('react-routee');

class App extends React.Component {

  render: function () {
    return (
      <Router stateful>
        <Route path="/" handler={MainPage} />
        <Route path="/users/:username" handler={UserPage} />
        <Route path="/search/*" handler={SearchPage} />
        <Route path={/\/product\/([0-9]*)/} handler={ProductPage} />
      </Router>
    )
  }
};

ReactDOM.render(<App/>, document.getElementById('container'));

```

## License

MIT
