package bsu.fpmi.task10.servlets;

import bsu.fpmi.task9.logic.PhotoPosts;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

public class ServletIndex extends HttpServlet {

    private PhotoPosts posts = new PhotoPosts();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JSONObject jo = new JSONObject();
        Map<String, String[]> filter = new HashMap<>();

        String header = req.getHeader("user");
        String[] forFilter = new String[1];
        if (header != null) {
            forFilter[0] = header;
            filter.put("user", forFilter);
        }

        header = req.getHeader("createdAt");
        if (header != null) {
            forFilter[0] = header;
            filter.put("date", forFilter);
        }

        header = req.getHeader("tags");
        if (header != null) {
            filter.put("tags", header.split(" "));
        }

        int IntOld = 0;
        String StringOld = req.getHeader("oldSize");
        if (StringOld != null)
            IntOld = Integer.parseInt(StringOld);
        try {
            jo.put("posts", posts.getPage(IntOld, 10, filter));
        } catch (ParseException e) {
            //ignored
        }
        resp.getWriter().write(jo.toJSONString() + "\n");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (posts.delete(req.getHeader("id")))
            resp.setStatus(200);
        else
            resp.setStatus(500);
    }
}
