package bsu.fpmi.task8.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class ServletFilter implements Filter {

    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        filterChain.doFilter(servletRequest, servletResponse);
        long time = start - System.currentTimeMillis();

        HttpServletRequest req = (HttpServletRequest) servletRequest;
        String methodName = req.getMethod();
        String URL = req.getRequestURL().toString();
        String answer = String.format("%s - \"%s\" - %dms", methodName, URL, time);

        System.out.println(answer);
    }

    @Override
    public void destroy() {

    }
}
