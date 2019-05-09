package bsu.fpmi.task10.servlets;

import bsu.fpmi.task9.logic.PhotoPosts;
import bsu.fpmi.task9.logic.Post;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ServletIndex extends HttpServlet {

    private PhotoPosts posts = new PhotoPosts();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JSONObject jo = new JSONObject();
        jo.put("posts", posts.getList());
        resp.getWriter().write(jo.toJSONString() + "\n");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (posts.delete(req.getHeader("id")))
            resp.setStatus(200);
        else
            resp.setStatus(500);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
