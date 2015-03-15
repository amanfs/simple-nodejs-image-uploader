
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(__dirname);
  res.render('index', { title: 'Express' })
};