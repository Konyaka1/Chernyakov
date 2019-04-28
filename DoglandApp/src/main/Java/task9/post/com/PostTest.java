package task9.post.com;

import java.util.*;

public class PostTest {
    public static List<Post> init(){
        List<Post> test = new ArrayList<>();
        for (int i = 1; i < 17; i++){
            Random random = new Random();

            int second = Math.abs(random.nextInt());

            Date date = new Date(second);

            Post elem = new Post(Integer.toString(i),
                    "DESCRIPTION " + Integer.toString(i),
                    "USER " + Integer.toString(i),
                    "PHOTOLINK " + Integer.toString(i),
                    date, new HashSet<String>(), new HashSet<String>());
            test.add(elem);
        }
        return test;
    }

    public static Post makePost(){
        return new Post(Integer.toString(PhotoPosts.getLastId() + 1),
                "DESCRIPTION NEW POST " + Integer.toString(PhotoPosts.getLastId() + 1),
                "NEW USER",
                "NEW PHOTOLINK " + Integer.toString(PhotoPosts.getLastId() + 1),
                new Date(), new HashSet<String>(), new HashSet<String>());
    }
}
