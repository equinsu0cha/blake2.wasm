// Generated by LiveScript 1.5.0
/**
 * @package blake2.wasm
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  function Wrapper(lib){
    var allocate, free;
    lib = lib();
    allocate = lib.allocateBytes;
    free = lib.freeBytes;
    /**
     * @constructor
     *
     * @param {number}		output_length	In bytes
     * @param {Uint8Array}	key
     *
     * @return {!Uint8Array}
     */
    function Blake2b(output_length, key){
      output_length == null && (output_length = 64);
      key == null && (key = null);
      if (!(this instanceof Blake2b)) {
        return new Blake2b(output_length, key);
      }
      this._output_length = output_length;
      this._state = allocate(240);
      if (key && key.length) {
        key = allocate(0, key);
        lib._blake2b_init_key(this._state, output_length, key, key.length);
        return key.free();
      } else {
        return lib._blake2b_init(this._state, output_length);
      }
    }
    Blake2b.prototype = {
      /**
       * @param {!Uint8Array} input
       *
       * @return {!Blake2b}
       */
      update: function(input){
        input = allocate(0, input);
        lib._blake2b_update(this._state, input, input.length);
        input.free();
        return this;
      }
      /**
       * @return {!Uint8Array}
       */,
      final: function(){
        var output, result;
        output = allocate(this._output_length);
        lib._blake2b_final(this._state, output, output.length);
        result = output.get();
        output.free();
        this._state.free();
        return result;
      }
    };
    Object.defineProperty(Blake2b.prototype, 'constructor', {
      value: Blake2b
    });
    /**
     * @constructor
     *
     * @param {number}		output_length	In bytes
     * @param {Uint8Array}	key
     *
     * @return {!Uint8Array}
     */
    function Blake2s(output_length, key){
      output_length == null && (output_length = 32);
      key == null && (key = null);
      if (!(this instanceof Blake2s)) {
        return new Blake2s(output_length, key);
      }
      this._output_length = output_length;
      this._state = allocate(176);
      if (key && key.length) {
        key = allocate(0, key);
        lib._blake2s_init_key(this._state, output_length, key, key.length);
        return key.free();
      } else {
        return lib._blake2s_init(this._state, output_length);
      }
    }
    Blake2s.prototype = {
      /**
       * @param {!Uint8Array} input
       *
       * @return {!Blake2s}
       */
      update: function(input){
        input = allocate(0, input);
        lib._blake2s_update(this._state, input, input.length);
        input.free();
        return this;
      }
      /**
       * @return {!Uint8Array}
       */,
      final: function(){
        var output, result;
        output = allocate(this._output_length);
        lib._blake2s_final(this._state, output, output.length);
        result = output.get();
        output.free();
        this._state.free();
        return result;
      }
    };
    Object.defineProperty(Blake2s.prototype, 'constructor', {
      value: Blake2s
    });
    return {
      ready: lib.then,
      Blake2b: Blake2b,
      Blake2s: Blake2s
    };
  }
  if (typeof define === 'function' && define['amd']) {
    define(['./blake2'], Wrapper);
  } else if (typeof exports === 'object') {
    module.exports = Wrapper(require('./blake2'));
  } else {
    this['blake2_wasm'] = Wrapper(this['__blake2_wasm']);
  }
}).call(this);
