package bsu.fpmi.task10.servlets;

import bsu.fpmi.task9.logic.PhotoPosts;
import bsu.fpmi.task9.logic.Post;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@MultipartConfig
public class ServletPosting extends HttpServlet {

    String editPost = "";

    PhotoPosts posts = new PhotoPosts();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write(editPost + '\n');
        editPost = "";
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        editPost = req.getHeader("postEdit");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String appPath = req.getServletContext().getRealPath("");
        System.out.println("HERE");
        appPath = appPath.replace('\\', '/');
        String fullSavePath;

        if (appPath.endsWith("/"))
            fullSavePath = appPath + "upload";
        else
            fullSavePath = appPath + "/" + "upload";

        File fileSaveDir = new File(fullSavePath);
        if (!fileSaveDir.exists())
            fileSaveDir.mkdir();

        Part part = req.getPart("fileName");

        if (part.getSize() != 0) {
            String fileName = Integer.toString(Math.abs(new Random().nextInt()));
            String filePath = fullSavePath + File.separator + fileName + ".jpg";
            Path path = Paths.get(filePath);

            while (Files.exists(path)) {
                fileName = Integer.toString(new Random().nextInt());
                filePath = fullSavePath + File.separator + fileName + ".jpg";
                path = Paths.get(filePath);
            }

            part.write(filePath);

            System.out.println("here");

            resp.getWriter().write("/upload/" + fileName + '\n');
        }
    }
}