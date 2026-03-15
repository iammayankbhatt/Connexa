import React from 'react'

const CreatePost = ({ newPost, setNewPost, handleCreatePost }) => {
    return (
        <div>
            <div className="card create-post-card">
                <form className="create-post" onSubmit={handleCreatePost}>
                    <div className="create-post-header">
                        <div className="avatar avatar-you">YO</div>
                        <div className="create-post-body">
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Share something with the community..."
                                className="create-post-textarea"
                                rows={3}
                            />
                            <div className="create-post-actions">
                                <button type="button" className="photo-button">
                                    <span className="photo-button-text">Photo</span>
                                </button>
                                <button type="submit" className="post-button">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
