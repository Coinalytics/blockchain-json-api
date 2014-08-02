var blockchain = require('./lib/blockchain');
var fs = require('fs');

var bc = new blockchain();
var initial_block = '300000';

function retrieve_block(number) {
  // create block number string from incoming number
  block_number = number.toString();

  // create filename from block number string
  var filename = "./json/" + block_number + ".json";

  // check if file exists
  fs.readFile(filename, function(not_found, data) {

    // check for file existence
    if (not_found) {
    
      // retrieve the block, since it does not exist in the file system
      bc.API('rawblock', block_number, function (res, err) {
        if (err) {
          console.error('Error retrieving block information from blockchain.info: ', err);
        } else {
          fs.writeFile(filename, JSON.stringify(res), function(err) {
            if (err) {
              console.error('Error writing file ' + filename, err);
            } else {
              console.log('Block was saved to file ' + filename);
            }
            retrieve_block(++number);
          });
          console.log(block_number + ' received, saving to file..');
        }
      });
    } else {
      console.log('Skipping ' + filename + ', file already exists');
      retrieve_block(++number);
    }
  });
}

// kick off retrieval with initial block
retrieve_block(initial_block);


/* More methods are available on http://blockchain.info/api/blockchain_api */
