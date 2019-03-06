package com.example.websocket.ws;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

public class SpringWebSocketHandler extends TextWebSocketHandler {

    private static final ArrayList<WebSocketSession> users;//这个会出现性能问题，最好用Map来存储，key用userid
    static {
        users = new ArrayList<WebSocketSession>();
    }

    public SpringWebSocketHandler() {

    }

    /**
     * 连接成功时候，会触发页面上onopen方法
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // TODO Auto-generated method stub
        System.out.println("connect to the websocket success......当前数量:"+users.size());
        users.add(session);
        //这块会实现自己业务，比如，当用户登录后，会把离线消息推送给用户
        /*int i=0;
        while (i<1){
            i++;
            TimeUnit.MILLISECONDS.sleep(500);
            TextMessage returnMessage = new TextMessage("已处理"+i+"条数据");
            session.sendMessage(returnMessage);
        }*/
        /*TimeUnit.SECONDS.sleep(3);
        Object websocket_username = session.getAttributes().get("WEBSOCKET_USERNAME");
        TextMessage returnMessage = new TextMessage("就是发给你的："+websocket_username);
        TimeUnit.SECONDS.sleep(10);
        sendMessageToUser((String)websocket_username,returnMessage);
        sendMessageToUsers(new TextMessage("你好everyone"));*/
        TimeUnit.SECONDS.sleep(10);
        TextMessage returnMessage = new TextMessage("你好");
        session.sendMessage(returnMessage);

        System.out.println("#######################");
    }

    /**
     * 关闭连接时触发
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        String username= (String) session.getAttributes().get("WEBSOCKET_USERNAME");
        System.out.println("用户"+username+"已退出！");
        users.remove(session);
        System.out.println("剩余在线用户"+users.size());
    }

    /**
     * js调用websocket.send时候，会调用该方法
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        String s = message.getPayload();
        TextMessage returnMessage = new TextMessage("服务器返回："+s);
        session.sendMessage(returnMessage);
    }
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if(session.isOpen()){session.close();}
        users.remove(session);
    }
    @Override
    public boolean supportsPartialMessages() {
        return false;
    }


    /**
     * 给某个用户发送消息
     *
     * @param userName
     * @param message
     */
    public void sendMessageToUser(String userName, TextMessage message) {
        for (WebSocketSession user : users) {
            if (user.getAttributes().get("WEBSOCKET_USERNAME").equals(userName)) {
                try {
                    if (user.isOpen()) {

                        user.sendMessage(message);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }

    /**
     * 给所有在线用户发送消息
     *
     * @param message
     */
    public void sendMessageToUsers(TextMessage message) {
        for (WebSocketSession user : users) {
            try {
                if (user.isOpen()) {
                    String  username = (String)user.getAttributes().get("WEBSOCKET_USERNAME");
                    TextMessage returnMessage = new TextMessage(message.getPayload()+username);
                    user.sendMessage(returnMessage);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
