package task9.post.com;

import org.json.simple.JsonObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Post {
    private String id;
    private String description;
    private Date date;
    private String user;
    private String photoLink;
    private Set<String> likes;
    private Set<String> hashtags;

    public Post(String id, String description, String user, String photoLink, Date date, Set<String> likes, Set<String> hashtags) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.user = user;
        this.photoLink = photoLink;
        this.likes = new HashSet<>(likes);
        this.hashtags = new HashSet<>(hashtags);
    }

    public String getUser() {
        return user;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setLikes(Set<String> likes) {
        this.likes.addAll(likes);
    }

    public void setHashtags(Set<String> hashtags) {
        this.hashtags.addAll(hashtags);
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public Set<String> getHashtags() {
        return hashtags;
    }

    public Set<String> getLikes() {
        return likes;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void changeLike(String user) {
        if (likes.contains(user))
            likes.remove(user);
        else
            likes.add(user);
    }

    @Override
    public String toString() {
        JsonObject str = new JsonObject();
        str.put("id", id);
        str.put("date", date.toString());
        str.put("description", description);
        str.put("user", user);
        str.put("photoLink", photoLink);
        str.put("likes", likes.toString());
        str.put("hashtags", hashtags.toString());
        return str.toString();
    }
}
