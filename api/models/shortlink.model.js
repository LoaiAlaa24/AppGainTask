var mongoose = require('mongoose');
var renameIdPlugin = require('mongoose-rename-id');
 

var shortLinkSchema = mongoose.Schema({
  slug: {
    type: Object,
    unique:true,
    trim: true
  },
  ios: {
    type: JSON,
    required: true,
    trim: true
  },
  android: {
    type: JSON,
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
