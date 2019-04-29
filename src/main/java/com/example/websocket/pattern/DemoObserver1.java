package com.example.websocket.pattern;

import java.util.Observable;
import java.util.Observer;

public class DemoObserver1 implements Observer {

    @Override
    public void update(Observable o, Object arg) {
       System.out.println("我是观察者");
       System.out.println(arg);
    }
}
