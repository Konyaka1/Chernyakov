package bsu.fpmi.task9.logic;

import org.json.simple.JSONObject;

import java.util.*;

public class Post {
    private String id;
    private String description;
    private Date createdAt;
    private String author;
    private String photoLink;
    private List<String> likes;
    private List<String> hashtags;

    public Post(String id, String description, String user, String photoLink, Date date, List<String> likes, List<String> hashtags) {
        this.id = id;
        this.description = description;
        this.createdAt = date;
        this.author = user;
        this.photoLink = photoLink;
        this.likes = new ArrayList<>(likes);
        this.hashtags = new ArrayList<>(hashtags);
    }

    public String getUser() {
        return author;
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
        this.author = user;
    }

    public void setLikes(List<String> likes) {
        this.likes.addAll(likes);
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags.addAll(hashtags);
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(Date date) {
        this.createdAt = date;
    }

    public Date getDate() {
        return createdAt;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public List<String> getLikes() {
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
        JSONObject str = new JSONObject();
        str.put("id", id);
        str.put("description", description);
        str.put("createdAt", createdAt.toGMTString());
        str.put("author", author);
        str.put("photoLink", photoLink);
        str.put("likes", likes);
        str.put("hashtags", hashtags);
        return str.toString();
    }
}
