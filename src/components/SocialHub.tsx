import React, { useState } from 'react';
import { Users, Heart, MessageCircle, Share, Camera, MapPin, Plus } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  image?: string;
  location?: string;
  likes: number;
  comments: number;
  time: string;
  isLiked: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
}

const SocialHub: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Sarah & Max',
      authorAvatar: 'SM',
      content: 'Beautiful morning walk in the park! Max is loving the sunshine ☀️',
      image: 'park-walk',
      location: 'Central Park',
      likes: 24,
      comments: 8,
      time: '2 hours ago',
      isLiked: false,
    },
    {
      id: '2',
      author: 'Mike & Luna',
      authorAvatar: 'ML',
      content: 'Luna finally learned to fetch! So proud of my little girl 🎾',
      image: 'fetch-game',
      location: 'Backyard',
      likes: 31,
      comments: 12,
      time: '4 hours ago',
      isLiked: true,
    },
    {
      id: '3',
      author: 'Emma & Buddy',
      authorAvatar: 'EB',
      content: 'Buddy\'s first day at the dog park. He made so many new friends! 🐕',
      image: 'dog-park',
      location: 'Riverside Dog Park',
      likes: 18,
      comments: 5,
      time: '6 hours ago',
      isLiked: false,
    },
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    location: '',
    image: '',
  });

  const nearbyOwners = [
    { name: 'Sarah & Max', distance: '0.2km', avatar: 'SM' },
    { name: 'Mike & Luna', distance: '0.5km', avatar: 'ML' },
    { name: 'Emma & Buddy', distance: '0.8km', avatar: 'EB' },
    { name: 'John & Daisy', distance: '1.2km', avatar: 'JD' },
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleAddPost = () => {
    if (newPost.content.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'You & Buddy',
        authorAvatar: 'YB',
        content: newPost.content,
        location: newPost.location,
        image: newPost.image,
        likes: 0,
        comments: 0,
        time: 'Just now',
        isLiked: false,
      };
      setPosts([post, ...posts]);
      setNewPost({ content: '', location: '', image: '' });
      setShowNewPost(false);
    }
  };

  const getImagePlaceholder = (imageName: string) => {
    const placeholders = {
      'park-walk': '🌳',
      'fetch-game': '🎾',
      'dog-park': '🐕',
      'default': '📸',
    };
    return placeholders[imageName as keyof typeof placeholders] || placeholders.default;
  };

  return (
    <div className="social-hub">
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Users />
          <h1 className="card-title">Social Hub</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Connect with other dog owners and share your adventures
        </p>
      </div>

      {/* Nearby Owners */}
      <div className="card">
        <div className="card-header">
          <MapPin />
          <h2 className="card-title">Nearby Dog Owners</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '8px 0' }}>
          {nearbyOwners.map((owner, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '80px',
              padding: '12px',
              background: 'var(--background-secondary)',
              borderRadius: 'var(--border-radius)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                {owner.avatar}
              </div>
              <div style={{ fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>
                {owner.name}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                {owner.distance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Button */}
      <div className="card">
        <button 
          className="btn btn-primary bone-btn" 
          style={{ width: '100%' }}
          onClick={() => setShowNewPost(true)}
        >
          <Plus size={16} />
          Share Update
        </button>
      </div>

      {/* Create Post Form */}
      {showNewPost && (
        <div className="card">
          <div className="card-header">
            <Camera />
            <h2 className="card-title">Share Your Update</h2>
          </div>
          <div className="form-group">
            <label className="form-label">What's your dog up to?</label>
            <textarea
              className="form-input"
              placeholder="Share your dog's latest adventure..."
              rows={4}
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location (optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Central Park"
              value={newPost.location}
              onChange={(e) => setNewPost({...newPost, location: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Add Photo (optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Photo description"
              value={newPost.image}
              onChange={(e) => setNewPost({...newPost, image: e.target.value})}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handleAddPost}>
              Share Post
            </button>
            <button className="btn btn-secondary" onClick={() => setShowNewPost(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Social Feed */}
      <div className="card">
        <div className="card-header">
          <Users />
          <h2 className="card-title">Community Feed</h2>
        </div>
        <div className="social-feed">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-avatar">
                  {post.authorAvatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {post.time}
                    {post.location && (
                      <span style={{ marginLeft: '8px' }}>
                        📍 {post.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="post-content">
                {post.content}
              </div>
              
              {post.image && (
                <div className="post-image">
                  <div style={{ fontSize: '48px' }}>
                    {getImagePlaceholder(post.image)}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Photo: {post.image}
                  </div>
                </div>
              )}
              
              <div className="post-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleLike(post.id)}
                  style={{ color: post.isLiked ? 'var(--danger-color)' : 'inherit' }}
                >
                  <Heart size={16} fill={post.isLiked ? 'var(--danger-color)' : 'none'} />
                  {post.likes}
                </button>
                <button className="action-btn">
                  <MessageCircle size={16} />
                  {post.comments}
                </button>
                <button className="action-btn">
                  <Share size={16} />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="card">
        <div className="card-header">
          <Users />
          <h2 className="card-title">Community Stats</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <Users size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">156</div>
            <div className="stat-label">Members</div>
          </div>
          <div className="stat-card">
            <Camera size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">89</div>
            <div className="stat-label">Photos Shared</div>
          </div>
          <div className="stat-card">
            <MapPin size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">12</div>
            <div className="stat-label">Nearby</div>
          </div>
          <div className="stat-card">
            <Heart size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">1.2k</div>
            <div className="stat-label">Likes</div>
          </div>
        </div>
      </div>

      {/* Community Tips */}
      <div className="card">
        <div className="card-header">
          <Users />
          <h2 className="card-title">Community Tips</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--primary-color)'
          }}>
            📸 Share photos of your dog's adventures
          </div>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--secondary-color)'
          }}>
            🤝 Connect with nearby dog owners
          </div>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--accent-color)'
          }}>
            💬 Engage with the community through comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHub;