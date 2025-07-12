const WatchHistory = require('../models/WatchHistory');
const Video = require('../models/Video');



exports.getUserFeed = async (req, res) => {
  try {
    const profileId = req.user.activeProfile;
    const { genre } = req.query; // Filter from query param

    // Continue watching
    const continueWatching = await WatchHistory.find({
      profile: profileId,
      completed: false,
    }).sort({ updatedAt: -1 }).populate('video');

    // Latest videos (filtered by genre)
    const genreFilter = genre ? { genre } : {};
    const latestVideos = await Video.find(genreFilter)
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      continueWatching: continueWatching.map(entry => ({
        progress: entry.progress,
        video: entry.video,
      })),
      latestVideos,
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
};
