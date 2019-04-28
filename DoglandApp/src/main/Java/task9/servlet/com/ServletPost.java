package task9.servlet.com;

import task9.post.com.PhotoPosts;
import task9.post.com.Post;
import task9.post.com.PostTest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

public class ServletPost extends HttpServlet {
    private static PhotoPosts postsList;

    @Override
    public void init() throws ServletException {
        postsList = new PhotoPosts(PostTest.init()); //for test
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        String[] doDelete = parameters.get("delete");
        String[] doPut = parameters.get("put");
        String[] doEdit = parameters.get("edit");
        if (doDelete != null) {
            doDelete(req, resp);
            return;
        }
        if (doPut != null){
            doPut(req, resp);
            return;
        }
        if (doEdit != null){
            for (String it : doEdit){
                Post tmp = postsList.getPost(it);
                if (tmp!=null) {
                    tmp.setDate(new Date());     //idk where it must be; just keep it here
                    tmp.setDescription("EDIT DESCRIPTION");
                    tmp.setPhotoLink("EDIT PHOTO LINK");
                    postsList.edit(tmp);
                }
            }
            return;
        }
        String[] id = parameters.get("id");
        for (String it : id)
            resp.getWriter().write(postsList.getPost(it).toString() + "\n");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        String[] doDelete = parameters.get("delete");
        for (String it : doDelete)
            postsList.delete(it);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        String[] doPut = parameters.get("put");
        int k = Integer.parseInt(doPut[0]);
        for (int i = 0; i < k; i++)
            postsList.add(PostTest.makePost());
    }
}