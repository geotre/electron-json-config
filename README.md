# electron-json-config

> Simply set and get configuration from a json file for your Electron app

The config file (`config.json`) is located in the path returned by `app.getPath('userData')`.  
This package can be used from **browser and renderer** process.

## Usage

```js
const config = require('electron-json-config');

config.set('foo', 'bar');
console.log(config.get('foo')); // shows 'bar'
```


## API

### `config.file()`
Returns the name of the file the config is stored in.

### `config.has(key)`
Returns `true` if the key exists, `false` otherwise.

### `config.set(key, value)`
Set a key with the specified value. If the key is already in use its value will be overwritten.

### `config.get(key)`
Returns the value associated with the key. If the key is not defined `undefined` is returned.

### `config.keys()`
Returns an array containing all keys in the config file.

### `config.all()`
Returns an object with all the data currently saved.

### `config.delete(key)`
Remove the key and its value from the config file.

### `config.purge()`
Remove all data from the config file.
