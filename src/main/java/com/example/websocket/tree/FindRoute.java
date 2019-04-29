package com.example.websocket.tree;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: wangdk
 * @create: 2019-04-29 09:43
 * @description: 根据子节点查找树结构的路径
 **/
public class FindRoute {
    public static void main(String[] args) throws NoSuchMethodException {
        Tree root = new Tree();
        Tree sbu1 = new Tree();
        sbu1.name = "sbu1";
        Tree sbu1_1 = new Tree();
        sbu1_1.name = "sbu1_1";

        Tree sbu1_1_1 = new Tree();
        sbu1_1_1.name = "sbu1_1_1";

        Tree sbu1_2 = new Tree();
        sbu1_2.name = "sbu1_2";
        Tree sbu2 = new Tree();
        sbu2.name = "sbu2";
        Tree sbu2_1 = new Tree();
        sbu2_1.name = "sbu2_1";
        Tree sbu2_2 = new Tree();
        sbu2_2.name = "sbu2_2";
        Tree sbu3 = new Tree();
        sbu3.name = "sbu3";
        root.name = "root";

        root.children = new ArrayList<Tree>() {{
            add(sbu1);
            add(sbu2);
            add(sbu3);
        }};
        sbu1.children = new ArrayList<Tree>() {{
            add(sbu1_1);
            add(sbu1_2);
        }};
        sbu2.children = new ArrayList<Tree>() {{
            add(sbu2_1);
            add(sbu2_2);
        }};
        sbu1_1.children = new ArrayList<Tree>() {{
            add(sbu1_1_1);
        }};

        Tree root2 = new Tree();
        root2.name = "root2";
        Tree sbu21 = new Tree();
        sbu21.name = "sbu21";
        Tree sbu21_1 = new Tree();
        sbu21_1.name = "sbu21_1";
        root2.children = new ArrayList<Tree>() {{
            add(sbu21);
            add(sbu21_1);
        }};

        List<Tree> rootList = new ArrayList<>();
        rootList.add(root);
        rootList.add(root2);
        String name = "sbu1_1_1";
        List<String> route = new ArrayList<>();
        findRoute(name, route, rootList);
        route.forEach(item -> System.out.println(item));


    }

    public static boolean findRoute(String name, List<String> route, List<Tree> rootList) {
        boolean flag = false;
        for (Tree item : rootList) {
            if (item.name.equals(name)) {
                flag = true;
                route.add(item.name);
                return flag;
            }
        }
        for (Tree item : rootList) {
            if (item.children.size() > 0) {
                route.add(item.name);
                flag = findRoute(name, route, item.children);
                if (!flag)
                    route.remove(item.name);
                else return flag;
            }
        }
        return flag;
    }
}

class Tree {
    public String name;
    public List<Tree> children = new ArrayList<>();
}