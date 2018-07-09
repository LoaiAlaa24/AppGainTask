var mongoose = require('mongoose');
var renameIdPlugin = require('mongoose-rename-id');
 

var shortLinkSchema = mongoose.Schema({
  slug: {
    type: Object,
    unique:true,
    trim: true
  },
  iosPrimary: {
    type: String,
    required: true,
    trim: true
  },
  iosFallback: {
    type: String,
    required: true,
    trim: true
  },
  androidPrimary: {
    type: String,
    required: true,
    trim: true
  },
  androidFallback: {
    type: String,
    required: true,
    trim: true
  },
 web: {
    type: String,
    required: true,
    trim: true
  },
});
mongoose.model('ShortLink', shortLinkSchema);
