package bsu.fpmi.task9.test;

import bsu.fpmi.task9.logic.PhotoPosts;
import bsu.fpmi.task9.logic.Post;

import java.util.*;

public class PostTest {
    public static List<Post> init() {
        List<Post> test = new ArrayList<>();
        for (int i = 1; i < 17; i++) {
            Random random = new Random();

            List<String> list = new ArrayList<>();
            list.add("#dog");
            list.add("#my");
            list.add("#rat");
            list.add("#hiMark");

            List<String> listLikes = new ArrayList<>();
            listLikes.add("ivan");

            int second = Math.abs(random.nextInt());

            Date date = new Date(second);

            Post elem = new Post(Integer.toString(i),
                    "DESCRIPTION " + Integer.toString(i),
                    "USER",
                    "/upload/134028676.jpg",
                    date,
                    listLikes,
                    list);
            test.add(elem);
        }
        return test;
    }

    public static Post makePost() {
        List<String> list = new ArrayList<>();
        list.add("#dog");
        list.add("#new");
        list.add("#hiMark");
        list.add("#happy");
        list.add("#nice");
        return new Post(Integer.toString(PhotoPosts.getLastId() + 1),
                "DESCRIPTION NEW POST " + Integer.toString(PhotoPosts.getLastId() + 1),
                "NEW USER",
                "/upload/134028676.jpg",
                new Date(), new ArrayList<String>(), list);
    }
}
