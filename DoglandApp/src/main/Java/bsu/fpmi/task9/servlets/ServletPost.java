package bsu.fpmi.task9.servlets;

import bsu.fpmi.task9.logic.PhotoPosts;
import bsu.fpmi.task9.logic.Post;
import bsu.fpmi.task9.test.PostTest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

public class ServletPost extends HttpServlet {
    private static PhotoPosts postsList = new PhotoPosts();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        String[] id = parameters.get("id");
        try {
            for (String it : id)
                resp.getWriter().write(postsList.getPost(it).toString() + "\n");
        } catch (NullPointerException e) {
            resp.getWriter().write("No such post");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        String[] doDelete = parameters.get("id");
        for (String it : doDelete)
            postsList.delete(it);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int amount = 0;
        Map<String, String[]> parameters = req.getParameterMap();
        String[] doPut = parameters.get("id");
        if (doPut == null)
            postsList.add(PostTest.makePost());
        else {
            amount = Integer.parseInt(doPut[0]);
            for (int i = 0; i < amount; i++)
                postsList.add(PostTest.makePost());
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        String[] doEdit = parameters.get("id");
        if (doEdit != null) {
            for (String it : doEdit) {
                Post tmp = postsList.getPost(it);
                if (tmp != null) {
                    tmp.setDate(new Date());
                    tmp.setDescription("EDIT DESCRIPTION");
                    tmp.setPhotoLink("EDIT PHOTO LINK");
                    postsList.edit(tmp);
                }
            }
        }
    }
}
