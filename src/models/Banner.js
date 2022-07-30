const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    imgBanner: String,
});

const BannerModel = mongoose.model('banner', BannerSchema);

module.exports = BannerModel;