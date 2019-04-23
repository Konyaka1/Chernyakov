package bsu.fpmi.task8;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class ServletGet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String[]> mapParameters = req.getParameterMap();
        String[] parametersName = mapParameters.get("name");
        String answer = "Name is ";
        for(String it : parametersName){
            answer += it;
        }
        resp.getWriter().write(answer);
    }
}
