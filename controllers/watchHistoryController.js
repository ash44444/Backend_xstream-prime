const WatchHistory = require('../models/WatchHistory');

exports.updateProgress = async (req, res) => {
  try {
    const { videoId, progress, completed } = req.body;
    const profileId = req.user.activeProfile; // Must be set in middleware

    const history = await WatchHistory.findOneAndUpdate(
      { profile: profileId, video: videoId },
      { progress, completed },
      { upsert: true, new: true }
    );

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update watch progress' });
  }
};



exports.getContinueWatching = async (req, res) => {
  try {
    const profileId = req.user.activeProfile;

    const results = await WatchHistory.find({
      profile: profileId,
      progress: { $gt: 0 },
      completed: false
    }).populate('video');

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch continue watching feed' });
  }
};

exports.getWatchHistory = async (req, res) => {
  try {
    const profileId = req.user.activeProfile;
    const limit = parseInt(req.query.limit) || 10;

    const history = await WatchHistory.find({ profile: profileId })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .populate('video');

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
