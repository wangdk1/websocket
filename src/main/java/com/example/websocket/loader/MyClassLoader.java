package com.example.websocket.loader;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class MyClassLoader extends ClassLoader {
    @Override
    public Class<?> findClass(String name) throws ClassNotFoundException {
        String path = "F:\\code\\idea\\websocket\\src\\main\\java\\com\\example\\websocket\\loader\\Test2.class";
        byte[] bs =null;
        try {
            File f = new File(path);
            bs = new byte[(int)f.length()];
            FileInputStream fis = new FileInputStream(f);
            int available = fis.available();
            fis.read(bs,0,bs.length);
            /*int n = 0;
            int read = fis.read();
            while ((n=fis.read())!=-1){

            }*/
            fis.close();
           return defineClass(name,bs,0,bs.length);
//            Files.readAllBytes();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        }



        return null;
    }
}
