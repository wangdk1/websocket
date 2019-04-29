package com.example.websocket.sort;

import com.example.websocket.util.SortUtil;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

public class DuiLie {
    public static void main(String[] args) {

//        PriorityQueue<Integer> queue = new PriorityQueue<>(5);
        int[] arr1 = {1,23,4,5,2};
        BoundPriorityQueue<Integer> queue = new BoundPriorityQueue<>(5);
        Integer[] arr = SortUtil.generateRandomArray(10, 0, 30);


        for (int i = 0; i < arr.length; i++) queue.add(arr[i]);
        System.out.println(Arrays.toString(arr));
        MergeSort.sort2(arr);
        System.out.println(Arrays.toString(arr));

        while (true) {
            Integer peek = queue.poll();
            if (peek == null) break;
            System.out.print(peek + ", ");
        }


    }
}

class BoundPriorityQueue<T> extends PriorityQueue<T> {

    private int limit = 0;
    private final Comparator<? super T> comparator;
    public BoundPriorityQueue(int limit) {
        this.limit = limit;
        this.comparator=null;
    }

    public boolean add(T t) {
        int size = size();
        if (size >= limit) {
            T e = peek();
            if(comparator!=null){
                if (comparator.compare(t, e) > 0){
                    remove();
                    return super.add(t);
                }
            }else  {
                Comparable key = (Comparable) t;
                if (key.compareTo( e) > 0){
                    remove();
                    return super.add(t);
                }
            }
        }else {
            return super.add(t);
        }
        return false;
    }
}