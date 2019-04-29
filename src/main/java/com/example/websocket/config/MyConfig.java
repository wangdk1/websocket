package com.example.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
public class MyConfig implements WebMvcConfigurer {
    private static final Integer MAX_NUMBER = 3;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    }
   /* @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        FreeMarkerViewResolver viewResolver =
                new FreeMarkerViewResolver("/templates",".html");
        registry.viewResolver(viewResolver);
    }*/

   public static void main(String[] args) {
       List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
       int limit = countStep(list.size());
       //方法一：使用流遍历操作
       List<List<Integer>> mglist = new ArrayList<>();
       Stream.iterate(0, n -> n + 1).limit(limit).forEach(i -> {
           mglist.add(list.stream().skip(i * MAX_NUMBER).limit(MAX_NUMBER).collect(Collectors.toList()));
       });

       System.out.println(mglist);

       //方法二：获取分割后的集合
       List<List<Integer>> splitList =
               Stream.iterate(0, n -> n + 1).
                       limit(limit).parallel().
                       map(
                          a -> list.stream().skip(a * MAX_NUMBER).limit(MAX_NUMBER).parallel().collect(Collectors.toList())
                       )
                       .collect(Collectors.toList());

       System.out.println(splitList);




   }
    private static Integer countStep(Integer size) {
        return (size + MAX_NUMBER - 1) / MAX_NUMBER;
    }
}
