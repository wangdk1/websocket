package com.example.websocket.redis;


import com.example.websocket.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext
public class RedisTemplateTest {
    @Autowired
    private RedisTemplate<Object,Object> template;

    @Test
    public void savereids() {
        User u=new User("1","王伟",21);
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        u.setList(list);
        template.opsForValue().set(u.getId(),u);
//        template.opsForValue().set(u.getId(),u,30, TimeUnit.MINUTES);
        User result = (User) template.opsForValue().get(u.getId());
        template.delete(u.getId());
        /*try {
            TimeUnit.SECONDS.sleep(12);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
        User result2 = (User) template.opsForValue().get(u.getId());
        System.out.println(result.getName());
//        System.out.println(result2.getName());
    }

    @Test
    public void saveHashReids(){
        for(int i=1;i<10;i++){
            User u=new User(i+"","王伟",21);
            template.opsForHash().put("myCache",u.getId(),u);
        }
        ArrayList<User> list = (ArrayList)template.opsForHash().values("myCache");
        System.out.println(list.size());
    }



}

