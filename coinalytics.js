var blockchain = require('./lib/blockchain');
var fs = require('fs');

var bc = new blockchain();
var initial_block = '300000';

function retrieve_block(number) {
  block_number = number.toString();
  bc.API('rawblock', block_number, function (res, err) {
    if (err)
      console.log('Error! ', err)
    else
      var filename = "./json/" + block_number + ".json";
      fs.writeFile(filename, res, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Block was saved to file " + filename);
	  retrieve_block(++number);
        }
      });
      console.log(block_number + ' received, saving to file..');
  });
}

// kick off retrieval with initial block
retrieve_block(initial_block);


/* More methods are available on http://blockchain.info/api/blockchain_api */
