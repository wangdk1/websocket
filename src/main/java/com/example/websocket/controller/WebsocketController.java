package com.example.websocket.controller;


import com.example.websocket.ws.SpringWebSocketHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/ws")
public class WebsocketController {
    @Bean//这个注解会从Spring容器拿出Bean
    public SpringWebSocketHandler infoHandler() {
        return new SpringWebSocketHandler();
    }

    /**
     * websocket
     * @return
     */
    @RequestMapping("/login")
    public String login(String username, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        session.setAttribute("WEBSOCKET_USERNAME",username);
        return "websocket";
    }
    /**
     * websocket
     * @return
     */
    @RequestMapping("/index")
    public String index() {
        return "login";
    }
    /**
     * websocket
     * @return
     */
    @RequestMapping("/websocket")
    public String websocket() {
        return "websocket";
    }
}
