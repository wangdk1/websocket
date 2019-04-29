package com.example.websocket.loader;

import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class Test1 {
    public static void main(String[] args) throws Exception{

        String path1 = Test1.class.getResource("").getPath();
        String path2 = Test1.class.getResource("/").getPath();
        System.out.println(path1);
        System.out.println(path2);
       /* File f = new File("E:\\test.factories");
        FileInputStream is= new FileInputStream(f);
        Properties p = new Properties();
        p.load(is);
        String name = p.getProperty("name");
        System.out.println(name);*/

        JarFile jarFile = new JarFile("E:\\loadagent.jar");
        Enumeration<JarEntry> enu = jarFile.entries();

        while (enu.hasMoreElements()) {
            JarEntry element = (JarEntry) enu.nextElement();
            String name = element.getName();
            if (name.equals("META-INF/test.factories")){
                InputStream input = jarFile.getInputStream(element);
                Properties p = new Properties();
                p.load(input);
                String name1 = p.getProperty("name");
                System.out.println(name1+"-----------");
            }

        }

//        Unsafe.getUnsafe();


        /*BeanInfo beanInfo = Introspector.getBeanInfo(User.class);
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        for(int i=0;i<propertyDescriptors.length;i++){
             System.out.println(propertyDescriptors[i]);
        }*/

//        System.out.println(property);
        /*Runtime runtime = Runtime.getRuntime();
        runtime.addShutdownHook();*/

        /*MyClassLoader mClassLoader = new MyClassLoader();
        MyClassLoader mClassLoader2 = new MyClassLoader();
//        Thread.currentThread().setContextClassLoader(mClassLoader);
        Class<?> aClass = mClassLoader.loadClass("com.example.websocket.loader.Test2");
        Class<?> aClass2 = mClassLoader2.loadClass("com.example.websocket.loader.Test2");
        Object o = aClass.newInstance();
        Object o2 = aClass2.newInstance();
        Method say = aClass.getMethod("say");
        Method say2 = aClass2.getMethod("say");
        say.invoke(o);
        say2.invoke(o2);
        ClassLoader classLoader = o.getClass().getClassLoader();
        ClassLoader classLoader2 = o2.getClass().getClassLoader();*/

    }
   /*public void aa(Test2 t ){
        System.out.println("111111");
       t.say();
   }*/

    public static byte[] int2Bytes(int integer)  {
        byte[] bytes=new byte[4];
        bytes[3]=(byte) (integer>>24);
        bytes[2]=(byte) (integer>>16);
        bytes[1]=(byte) (integer>>8);
        bytes[0]=(byte) integer;
        return bytes;
    }

    public static int bytes2Int(byte[] bytes ) {
          //如果不与0xff进行按位与操作，转换结果将出错，有兴趣的同学可以试一下。
        int int1=bytes[0]&0xff;
        int int2=(bytes[1]&0xff)<<8;
        int int3=(bytes[2]&0xff)<<16;
        int int4=(bytes[3]&0xff)<<24;
        return int1|int2|int3|int4;
    }
}

class A{
    private String name;

    /*public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }*/
}