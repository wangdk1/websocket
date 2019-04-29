package com.example.websocket.pattern;

import java.util.Observable;

public class DemoObservable1 extends Observable {
   public void  say(){
       System.out.println("change");
       setChanged();
       notifyObservers("qq");
     }
}
