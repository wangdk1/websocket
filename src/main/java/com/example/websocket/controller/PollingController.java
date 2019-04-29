package com.example.websocket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Controller
public class PollingController {
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;
    /**
     * websocket
     * @return
     */
    @RequestMapping("/index")
    public String index() {
//        redisTemplate.
        return "login";
    }
    @RequestMapping("/login")
    public String login(String username, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
//        session.setAttribute("WEBSOCKET_USERNAME",username);
        return "poll";
    }
    /**
     * websocket
     * @return
     */
    @RequestMapping("/pollPage")
    public String pollPage() {
        return "poll";
    }
    @RequestMapping("/poll")
    @ResponseBody
    public Map<String,Object> poll(HttpServletRequest request) {
//        HttpSession session = request.getSession();
        Map<String,Object> map = new HashMap<>();
//        Integer progress =(Integer) session.getAttribute("progress");
        Integer progress =(Integer)redisTemplate.opsForValue().get("progress");
        if (progress==null)progress=0;
        map.put("progress",progress);
        return map;
    }
    @RequestMapping("/sub")
    @ResponseBody
    public String sub(HttpServletRequest request) throws Exception{
        /*HttpSession session = request.getSession();
        session.removeAttribute("progress");
        int i=0;
        while (i<10){
            session.setAttribute("progress",(++i)*10);
            TimeUnit.SECONDS.sleep(1);
        }
        session.setAttribute("progress",100);*/
        int i=0;
        while (i<10){
            redisTemplate.opsForValue().set("progress",(++i)*10);
            TimeUnit.SECONDS.sleep(1);
        }
        redisTemplate.opsForValue().set("progress",100);

        return "succ";
    }
    @RequestMapping("/sub1")
    @ResponseBody
    public String sub1(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String id = session.getId();
        return id;
    }


    public static void main(String[] args) {
        /*BigDecimal n = new BigDecimal(10.7);
        System.out.println(n.setScale(0, BigDecimal.ROUND_DOWN).intValue());*/
        int a=9,b=16;
        int c = (a+b)/2;
        int c1 = a+(b-a)/2;
        int c2 = b - (b-a)/2;
        System.out.println(c);
        System.out.println(c1);
        System.out.println(c2);

    }
}
