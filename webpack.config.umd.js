module.exports = function (umdConf) {
 // umdConf.devServer.host = '0.0.0.0';
 // umdConf.webpackFeatures.enableEntryHTML();

  if (umdConf.devMode) {
    // umdConf.webpackFeatures.enableEntryHot();
    umdConf.output.publicPath = '';
  } else {
    umdConf.webpackFeatures.enableUglifyJs({
      comments: false
    });
  }
};

