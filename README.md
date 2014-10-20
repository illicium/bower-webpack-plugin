# Bower Webpack Plugin

Use [Bower](http://bower.io/) with [Webpack](http://webpack.github.io/).

# Getting started

Install the plugin:

```
npm install --save-dev bower-webpack-plugin
```

Add the plugin to your Webpack configuration:

```javascript
var BowerWebpackPlugin = require("bower-webpack-plugin");
module.exports = {
  module:  {
    loaders: [
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [new BowerWebpackPlugin()]
};
```

# Configuration

The plugin takes options object as its single argument.

* `manifestFiles` {`string[]` or `string`} - the names of the bower manifest files. The plugin
will try them in the order they are mentioned. The first matching will be used.

* `includes` {`RegExp[]` or `RegExp`} - the plugin will match files contained in a manifest file, and will include only those which match any of the RegExp expressions.

* `excludes` {`RegExp[]` or `RegExp`} - the plugin will match files contained in a manifest, and will exclude all files, which match any of the expressions.

Using the plugin, without specifying the configuration is equivalent to following:

```javascript
plugins: [
  new BowerWebpackPlugin({
    manifestFiles:  "bower.json",
    includes:       /.*/
    excludes:       []
  })
]
```

# Usage

When the plugin is active, you can require bower modules using `require`.

# Example

This example shows how to use Twitter bootstrap installed by `bower` in your project.

Make sure, you have [bower installed](http://bower.io/#install-bower).
Create new project and install bower-webpack-plugin:

```
npm init
npm install --save-dev webpack file-loader style-loader css-loader bower-webpack-plugin
```

Install *bootstrap* bower component:

```
bower install bootstrap
```

Create an `index.html` file:

```html
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="bundle.js" charset="utf-8"></script>

    <div class="container-fluid main-page">
      <div class="message-wrapper">
        <div class="box">
          <p class="lead">Press the button, to see if Bowerk Webpack Plugin works...</p>
          <button type="button" class="btn btn-default btn-lg btn-center" data-toggle="modal" data-target="#myModal">
            <span class="glyphicon glyphicon-hand-right"></span> Try me
          </button>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">Bower Component Test</h4>
            </div>
            <div class="modal-body">
              If you see this dialog, it means that everything works <span class="glyphicon glyphicon-ok"></span> OK
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

Create a `demo.css` file:

```css
.main-page {
  display: table;
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-color: #26A65B;
}

.message-wrapper {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.box {
  width: 50%;
  margin: 0 auto;
  background: #F2F1EF;
  padding: 30px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
```

Create `entry.js`, where you require bootstrap.

```javascript
require("jquery");
require("bootstrap");
require("./demo.css");
```

Twitter bootstrap comes with CSS, JavaScript, Fonts and Less. Let's assume we want to use compiled CSS, and we don't need less files.

Create `webpack.config.js` with the following content:

```javascript
var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  entry:   "./entry.js",
  output:  {
    path:     __dirname,
    filename: "bundle.js"
  },
  module:  {
    loaders: [
      {test: /\.css$/, loader: "style!css"},
      {test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: "file-loader?name=[name].[ext]"}
    ]
  },
  plugins: [
    new BowerWebpackPlugin({
      excludes: /.*\.less/
    }),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery"
    })
  ]
};
```

Run `webpack` and open the `index.html` file.

# Release History

## 0.1.0 - 26 Oct 2014

Initial release