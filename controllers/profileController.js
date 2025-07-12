const Profile = require('../models/Profile');
const User = require('../models/User');


exports.createProfile = async (req, res) => {
  try {
    const { name, avatar, isKids } = req.body;

    const newProfile = await Profile.create({
      user: req.user._id,
      name,
      avatar,
      isKids,
    });

    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create profile' });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.user._id });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findOneAndDelete({ _id: id, user: req.user._id });

    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
};
exports.switchProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profileId = req.params.profileId;

    const profile = await Profile.findOne({ _id: profileId, user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found or unauthorized' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { activeProfile: profileId },
      { new: true }
    ).populate('activeProfile');

    res.json({ message: 'Active profile updated', activeProfile: user.activeProfile });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};