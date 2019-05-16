package bsu.fpmi.task10.servlets;

import bsu.fpmi.task9.logic.PhotoPosts;
import bsu.fpmi.task9.logic.Post;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class ServletAddPost extends HttpServlet {

    PhotoPosts posts = new PhotoPosts();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/addPost.html").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect("/");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        String jsonPost = req.getHeader("post");
        Post post = gson.fromJson(jsonPost, Post.class);
        if (req.getHeader("edit").equals("false"))
        {
            post.setId(Integer.toString(PhotoPosts.getLastId() + 1));
            posts.add(post);
            System.out.println(posts.getList().size());
        }
        else
            posts.edit(post);
    }
}