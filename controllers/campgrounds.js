const Campground = require("../models/campground");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken})
const { cloudinary } = require('../cloudinary');

//main page
const mainCampground = (req,res) => {
  res.render("home");
}

//campground page
const indexCampground = async (req, res) => {
  const campgrounds = await Campground.find({}).populate("author").populate("reviews");
  const pagenum = Math.ceil(campgrounds.length / 6);
  const page = req.query.page * 6 || 6;

  res.render("campground", { campgrounds,  currentPage: pagenum, page });
};

//show page
const showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate({path:"reviews", populate: {path:'author'}}).populate("author", "username");
  if(!campground) {
    req.flash('error', '캠프를 찾을 수 없습니다.')
    return res.redirect('/campgrounds')
  }
  res.render("campgrounds/show", { campground });
}

//new page
const newCampground = (req, res) => {
  res.render("campgrounds/new");
}

//tag page

const tagCampground = async (req,res) => {
  res.render("campgrounds/camptag");
}

//tag detail page

const tagDetailCampground = async (req,res) => {
  const checkName = req.query.page;
  const campground = await Campground.find({ check: { $in: [`${checkName}`]}})
  let moreNum = Number(req.query.more) + 12 || 12;
  let totalCamp = campground.length
  res.render('campgrounds/camptagdetail', {campground, checkName, moreNum, totalCamp})
}

// CRUD

const createNewCampground = async (req, res) => {
  const geoData = await geocoder.forwardGeocode({
    query: req.body.campground.location,
    limit:1
  }).send();
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "made it");
  res.redirect("/campgrounds");
}

const editCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
}

const updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  await Campground.findByIdAndUpdate(id, {...req.body.campground});
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
  campground.images.push(...imgs);
  await campground.save();
  if(req.body.deleteImages){
    for(let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({ $pull: { images: {filename: { $in: req.body.deleteImages}}}})
  } 
  res.redirect(`/campgrounds/${campground._id}`);
}

const deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
}

module.exports = {
  mainCampground,
  indexCampground,
  showCampground,
  newCampground,
  tagCampground,
  tagDetailCampground,
  createNewCampground,
  editCampground,
  updateCampground,
  deleteCampground
};