package com.example.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyConfig implements WebMvcConfigurer {

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
}
