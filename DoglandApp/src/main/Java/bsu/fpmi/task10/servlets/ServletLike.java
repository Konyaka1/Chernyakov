package bsu.fpmi.task10.servlets;

import bsu.fpmi.task9.logic.PhotoPosts;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ServletLike extends HttpServlet {

    private PhotoPosts posts = new PhotoPosts();

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        posts.changeLike(req.getHeader("id"), req.getHeader("user"));
    }
}
