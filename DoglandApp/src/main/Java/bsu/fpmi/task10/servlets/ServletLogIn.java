package bsu.fpmi.task10.servlets;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Map;

public class ServletLogIn extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/logIn.html").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> parameters = req.getParameterMap();
        String user = parameters.get("name")[0];
        String password = parameters.get("password")[0];
        if (user.length() != 0) //nice authorize
        {
            HttpSession session = req.getSession();
            session.setAttribute("user", user);
            resp.sendRedirect("/");
        } else
            doGet(req, resp);
    }
}
