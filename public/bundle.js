(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process,setImmediate){(function (){
/*! For license information please see index.min.js.LICENSE.txt */
}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":3,"timers":4}],2:[function(require,module,exports){
'use strict'

/**
 * Collects all values from an (async) iterable into an array and returns it.
 *
 * @template T
 * @param {AsyncIterable<T>|Iterable<T>} source
 * @returns {Promise<T[]>}
 */
const all = async (source) => {
  const arr = []

  for await (const entry of source) {
    arr.push(entry)
  }

  return arr
}

module.exports = all

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":3,"timers":4}],5:[function(require,module,exports){
'use strict'

/**
 * Returns a new Uint8Array created by concatenating the passed ArrayLikes
 *
 * @param {Array<ArrayLike<number>>} arrays
 * @param {Number} length
 * @returns {Uint8Array}
 */
function concat (arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0)
  }

  const output = new Uint8Array(length)
  let offset = 0

  for (const arr of arrays) {
    output.set(arr, offset)
    offset += arr.length
  }

  return output
}

module.exports = concat

},{}],6:[function(require,module,exports){
'use strict'

const IPFS = require('ipfs')
const uint8ArrayConcat = require('uint8arrays/concat')
const all = require('it-all')

const mainDeployer = require('./assets/MainDeployer.json');
const userToken = require('./assets/UserToken.json');

var node;
var photoMatrix = {};
var account;
var contractaddress = '0xb993D5191Dea3d0713BbBe10F1f670514e55B4Ee';

window.addEventListener('load', async () => {

  if (typeof window.ethereum !== 'undefined') {
    console.log("MetaMask is Available :) !");
  }

  // Modern DApp browsers
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);

    // To prevent the page reloading when the MetaMask network changes
    ethereum.autoRefreshOnNetworkChange = false;

    // To Capture the account details from MetaMask
    const accounts = await ethereum.enable();
    account = accounts[0];

  }
  // Legacy DApp browsers
  else if (window.web3) {
    //window.web3 = new Web3(web3.currentProvider);
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbd9dc11b30147e9a2cc974be655ef7c"));
  }
  // Non-DApp browsers
  else {
    console.log('Non-Ethereum browser detected. Please install MetaMask');
  }

});


function set_details() {
  var mainDeployerContract = new web3.eth.Contract(mainDeployer, contractaddress, { from: account, gasPrice: '5000000', gas: '5000000' });

  var name = document.getElementById("name").value;
  var dob = document.getElementById("birthday").value;
  var gender = document.getElementById("gender").value;
  var cnumber = document.getElementById("contact_no").value;
  var email = document.getElementById("email_id").value;
  var bgroup = document.getElementById("bloodgroup").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var photo = photoMatrix['image'] ? photoMatrix['image'] : "";
  var photo1 = photoMatrix['image1'] ? photoMatrix['image1'] : "";
  var photo2 = photoMatrix['image2'] ? photoMatrix['image2'] : "";
  var photo3 = photoMatrix['image3'] ? photoMatrix['image3'] : "";
  var photo4 = photoMatrix['image4'] ? photoMatrix['image4'] : "";

  mainDeployerContract.methods.createUserToken(name, dob, gender, cnumber, email, bgroup, city, state, photo, photo1, photo2, photo3, photo4).send(function (err, result) {
    if (err) { console.log(err); }
    if (result) {
      document.getElementById("result").innerHTML = result;
    }
  });
}

async function getUserTokenAddr() {
  return new Promise((resolve, reject) => {
    var mainDeployerContract = new web3.eth.Contract(mainDeployer, contractaddress, { from: account, gasPrice: '5000000', gas: '5000000' });
    mainDeployerContract.methods.getUserTokenAddr().call(function( err, result) {
      if (err) reject(err);
      if (result) resolve(result);
    });
  })
}

async function show_details() {
  var addr = await getUserTokenAddr();

  var myContract = new web3.eth.Contract(userToken, addr, { from: account, gasPrice: '5000000', gas: '500000' });
  var result = myContract.methods.getuserDetails().call(function (err, result) {

    if (err) { console.log(err); }
    if (result) {
      document.getElementById("get_name").innerHTML = result[0];
      document.getElementById("get_dob").innerHTML = result[1];
      document.getElementById("get_gender").innerHTML = result[2];
      document.getElementById("get_number").innerHTML = result[3];
      document.getElementById("get_email").innerHTML = result[4];
      document.getElementById("get_bloodgroup").innerHTML = result[5];
      document.getElementById("get_city").innerHTML = result[6];
    }
  });
  
  myContract.methods.getUserfileDetails().call(function (err,fileDetails) {

    if (err) { console.log(err); }
    if (fileDetails) {
      document.getElementById("get_state").innerHTML = fileDetails[0];
      document.getElementById("get_photo").innerHTML = getFile(fileDetails[1], 'get_photo');
      document.getElementById("get_leftThumb").innerHTML = getFile(fileDetails[2], 'get_leftThumb');
      document.getElementById("get_rightThumb").innerHTML = getFile(fileDetails[3], 'get_rightThumb');
      document.getElementById("get_leftEye").innerHTML = getFile(fileDetails[4], 'get_leftEye');
      document.getElementById("get_rightEye").innerHTML = getFile(fileDetails[5], 'get_rightEye');
    }
  });
}


async function uploadFile(file) {

  const fileAdded = await node.add({
    path: file.name,
    content: file
  }, {
    wrapWithDirectory: true
  })

  // As we are wrapping the content we use that hash to keep
  // the original file name when adding it to the table
  return (fileAdded.cid.toString());
}

async function getFile(cid, id) {

  for await (const file of node.get(cid)) {
    if (file.content) {
      const content = uint8ArrayConcat(await all(file.content))

      await appendFile(content, id)
    }
  }
}

function appendFile(data, id) {
  const file = new window.Blob([data], { type: 'application/octet-binary' })
  const url = window.URL.createObjectURL(file)
  document.getElementById(id).setAttribute('src', url);
}

async function catchFile(e, id) {
  photoMatrix[id] = await uploadFile(e.target.files[0]);
  console.log(photoMatrix);
}

async function start() {
  node = await IPFS.create();

  if (document.getElementById('image')) {
    document.getElementById("image").addEventListener("change", (e) => catchFile(e, 'image'));
    document.getElementById("image1").addEventListener("change", (e) => catchFile(e, 'image1'));
    document.getElementById("image2").addEventListener("change", (e) => catchFile(e, 'image2'));
    document.getElementById("image3").addEventListener("change", (e) => catchFile(e, 'image3'));
    document.getElementById("image4").addEventListener("change", (e) => catchFile(e, 'image4'));
    document.getElementById('submitBtnIndex').addEventListener("click", () => set_details());
  } else {
    document.getElementById('getDetailsBtn').addEventListener("click", () => show_details());
  }
}

start();
},{"./assets/MainDeployer.json":7,"./assets/UserToken.json":8,"ipfs":1,"it-all":2,"uint8arrays/concat":5}],7:[function(require,module,exports){
module.exports=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_contact_no",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_blood_group",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_photoHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ltHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rtHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_leHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_reHash",
				"type": "string"
			}
		],
		"name": "createUserToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserTokenAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userTokenMapping",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
},{}],8:[function(require,module,exports){
module.exports=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_contact_no",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_blood_group",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			}
		],
		"name": "ContractCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "key",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			}
		],
		"name": "DataChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_operation",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "Executed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_operation",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "execute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_key",
				"type": "bytes32"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "_value",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserfileDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getuserDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_key",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "_value",
				"type": "bytes"
			}
		],
		"name": "setData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_contact_no",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_blood_group",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_photoHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ltHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rtHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_leHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_reHash",
				"type": "string"
			}
		],
		"name": "setDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_state",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_photoHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ltHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rtHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_leHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_reHash",
				"type": "string"
			}
		],
		"name": "setFileDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
},{}]},{},[6]);