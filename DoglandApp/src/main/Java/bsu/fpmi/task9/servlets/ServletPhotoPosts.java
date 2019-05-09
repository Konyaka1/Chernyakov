package bsu.fpmi.task9.servlets;

import bsu.fpmi.task9.logic.PhotoPosts;
import bsu.fpmi.task9.logic.Post;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

public class ServletPhotoPosts extends HttpServlet {

    private static PhotoPosts postsList = new PhotoPosts();
    private Map<String, String[]> filter;

    @Override
    public void init() throws ServletException {
        filter = new HashMap<>();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        int skip = 0;
        int top = 10;
        if (parameters.get("skip") != null)
            skip = Integer.parseInt(parameters.get("skip")[0]);
        if (parameters.get("top") != null)
            top = Integer.parseInt(parameters.get("top")[0]);

        filter.clear();

        if (parameters.containsKey("author"))
            filter.put("author", parameters.get("author"));

        if (parameters.containsKey("date"))
            filter.put("date", parameters.get("date"));

        if (parameters.containsKey("tags"))
            filter.put("tags", parameters.get("tags"));

        try {
            for (Post it : postsList.getPage(skip, top, filter))
                resp.getWriter().write(it.toString() + "\n");
        } catch (ParseException e) {
            System.out.println("error");
        }
    }
}