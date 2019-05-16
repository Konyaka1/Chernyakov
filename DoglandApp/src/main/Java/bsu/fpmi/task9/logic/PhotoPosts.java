package bsu.fpmi.task9.logic;

import bsu.fpmi.task9.test.PostTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class PhotoPosts {
    private static List<Post> postsList;

    public PhotoPosts() {
        if (postsList == null) {
            postsList = PostTest.init();                    //for test
            Collections.sort(postsList, sortByDate());
        }
        //postsList = new ArrayList<>();
    }

    public PhotoPosts(List<Post> List) {
        postsList = new ArrayList<>();
        postsList.addAll(List);
        Collections.sort(postsList, sortByDate());
    }

    private Comparator<Post> sortByDate() {
        return new Comparator<Post>() {
            @Override
            public int compare(Post o1, Post o2) {
                return o2.getDate().compareTo(o1.getDate());
            }
        };
    }

    public Post getPost(String id) {
        for (Post it : postsList)
            if (it.getId().equals(id))
                return it;
        return null;
    }

    public void clear() {
        postsList.clear();
    }

    public boolean add(Post post) {
        if (validate(post, false)) {
            if (getPost(post.getId()) == null) {
                postsList.add(0, post);
                return true;
            } else
                return false;
        } else
            return false;
    }

    private boolean validate(Post post, boolean isEdit) {
        if (post == null)
            return false;
        else {
            if (getPost(post.getId()) != null && !isEdit)
                return false;
            if (post.getDescription().trim().length() == 0)
                return false;
            if (post.getPhotoLink().trim().length() == 0)
                return false;
            if (post.getUser().trim().length() == 0)
                return false;
            if (post.getDate() == null)
                return false;
        }
        return true;
    }

    public boolean edit(Post post) {
        if (validate(post, true)) {
            Post tmpPost = getPost(post.getId());
            if (tmpPost != null) {
                postsList.remove(tmpPost);
                postsList.add(0, post); //deleting & adding to not sort
                return true;
            } else
                return false;
        } else
            return false;
    }

    public boolean delete(String id) {
        Post tmpPost = getPost(id);
        if (tmpPost == null)
            return false;
        else {
            postsList.remove(tmpPost);
            return true;
        }
    }

    public boolean changeLike(String id, String user) {
        Post tmpPost = getPost(id);
        if (tmpPost == null)
            return false;
        else {
            tmpPost.changeLike(user);
            return true;
        }
    }

    private List<Post> getPostsAuthor(String author) {
        if (author == null)
            return new ArrayList<>();
        else {
            List<Post> tmp = new ArrayList<>();

            for (Post it : postsList)
                if (it.getUser().equals(author))
                    tmp.add(it);

            return tmp;
        }
    }

    private List<Post> getPostsTags(List<String> tags) {
        if (tags == null)
            return new ArrayList<>();
        else {
            List<Post> tmp = new ArrayList<>();

            for (Post it : postsList)
                if (it.getHashtags().containsAll(tags))
                    tmp.add(it);

            return tmp;
        }
    }

    private List<Post> getPostsDate(Date date) {
        if (date == null)
            return new ArrayList<>();
        else {
            List<Post> tmp = new ArrayList<>();

            SimpleDateFormat std = new SimpleDateFormat("dd.MM.yyyy");

            for (Post it : postsList)
                if (std.format(it.getDate()).equals(std.format(date)))
                    tmp.add(it);

            return tmp;
        }
    }

    public List<Post> getPage(int skip, int top, Map<String, String[]> filter) throws ParseException {
        List<Post> answer = new ArrayList<>();

        if (filter.size() == 0) {
            for (int i = skip; i < Math.min(postsList.size(), top + skip); i++)
                answer.add(postsList.get(i));

            return answer;
        } else {
            ArrayList<Post> tmp = new ArrayList<>();
            String[] check;

            check = filter.get("user");
            if (check != null) {
                tmp.addAll(getPostsAuthor(check[0]));
                if (tmp.size() == 0)
                    return answer;
            }

            check = filter.get("tags");
            if (check != null) {
                List<String> tags = new ArrayList<>(Arrays.asList(check));
                if (tmp.size() == 0)
                    tmp.addAll(getPostsTags(tags));
                else
                    tmp.retainAll(getPostsTags(tags));
            }

            check = filter.get("date");
            if (check != null) {
                SimpleDateFormat sdt = new SimpleDateFormat("dd.MM.yyyy");
                if (tmp.size() == 0)
                    tmp.addAll(getPostsDate(sdt.parse(check[0])));
                else
                    tmp.retainAll(getPostsDate(sdt.parse(check[0])));
            }

            for (int i = skip; i < Math.min(tmp.size(), top + skip); i++)
                answer.add(tmp.get(i));

            return answer;
        }
    }

    public List<Post> getList() {
        return postsList;
    }

    public static int getLastId() {
        int max = 0;
        for (Post it : postsList)
            max = Math.max(max, Integer.parseInt(it.getId()));
        return max;
    }
}