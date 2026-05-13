'use strict';

/**
 * Browser build: react-native-sound pulls native RN modules. This shim uses
 * the Web Audio API surface needed by the app (constructor + play).
 */

function resolveUrl(filename) {
  if (filename == null) {
    return null;
  }
  if (typeof filename === 'string') {
    return filename;
  }
  if (typeof filename === 'object') {
    if (filename.uri) {
      return filename.uri;
    }
    if (filename.default != null) {
      return resolveUrl(filename.default);
    }
  }
  return null;
}

function Sound(filename, basePath, onError) {
  var url = resolveUrl(filename);
  this._audio = url && typeof Audio !== 'undefined' ? new Audio(url) : null;
  this._loaded = !!this._audio;
  this._playing = false;
  this._duration = -1;
  this._numberOfChannels = 1;
  this._volume = 1;
  this._pan = 0;
  this._numberOfLoops = 0;
  this._speed = 1;
  this._pitch = 1;
  if (typeof basePath === 'function') {
    onError = basePath;
  }
  if (typeof onError === 'function' && !this._loaded) {
    onError(new Error('Web: could not resolve sound URL'));
  }
}

Sound.prototype.isLoaded = function () {
  return this._loaded;
};

Sound.prototype.play = function (onEnd) {
  if (!this._loaded || !this._audio) {
    if (onEnd) {
      onEnd(false);
    }
    return this;
  }
  var audio = this._audio;
  try {
    audio.currentTime = 0;
    var p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        if (onEnd) {
          onEnd(true);
        }
      }).catch(function () {
        if (onEnd) {
          onEnd(false);
        }
      });
    } else if (onEnd) {
      onEnd(true);
    }
  } catch (e) {
    if (onEnd) {
      onEnd(false);
    }
  }
  return this;
};

Sound.prototype.pause = function (callback) {
  if (this._audio) {
    this._audio.pause();
  }
  if (callback) {
    callback();
  }
  return this;
};

Sound.prototype.stop = function (callback) {
  if (this._audio) {
    this._audio.pause();
    this._audio.currentTime = 0;
  }
  if (callback) {
    callback();
  }
  return this;
};

Sound.prototype.release = function () {
  if (this._audio) {
    this._audio.src = '';
    this._audio = null;
  }
  this._loaded = false;
  return this;
};

Sound.setCategory = function () {};
Sound.setMode = function () {};
Sound.setActive = function () {};
Sound.setSpeakerPhone = function () {};
Sound.enableInSilenceMode = function () {};
Sound.MAIN_BUNDLE = '';
Sound.DOCUMENT = '';
Sound.LIBRARY = '';
Sound.CACHES = '';

module.exports = Sound;
