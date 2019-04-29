package com.example.websocket.sort;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.Arrays;

public class MergeSort {
    public static void main(String[] args) {


//        String typeName = new MergeSort().getClass().getTypeName();
        Type genericSuperclass = new MergeSort().getClass().getDeclaringClass();
        System.out.println(Object.class);

        BigDecimal precent = new BigDecimal(100);
        BigDecimal a1 = new BigDecimal(20);
        BigDecimal b1 = new BigDecimal(45);
        BigDecimal c1 = new BigDecimal(30);
        int size = 345;
        BigDecimal total = new BigDecimal(size);
        int a, b, c;
        a = total.multiply(a1).divide(precent).setScale(0, BigDecimal.ROUND_UP).intValue();
        b = total.multiply(a1.add(b1)).divide(precent).setScale(0, BigDecimal.ROUND_UP).intValue()-a;
        c = total.multiply(a1.add(b1).add(c1)).divide(precent).
                setScale(0, BigDecimal.ROUND_UP).intValue()-a-b;

        int d = size-a-b-c;
        System.out.println(a+"   "+b+"   "+c +"   "+d);
        /*Integer[] arr = SortUtil.generateRandomArray(5, 0, 30);
        System.out.println(Arrays.toString(arr));
        sort2(arr);
        System.out.println(Arrays.toString(arr));*/
    }

    public static void sort(Integer[] arr) {
        sort(arr, 0, arr.length - 1);
    }

    public static void sort(Integer[] arr, int l, int r) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;
        sort(arr, l, mid);
        sort(arr, mid + 1, r);
        merge(arr, l, mid, r);
    }

    private static void merge(Integer[] arr, int l, int mid, int r) {
        Integer[] aux = Arrays.copyOfRange(arr, l, r + 1);
        int i = l, j = mid + 1;
        for (int k = l; k <= r; k++) {
            if (i > mid) {
                arr[k] = aux[j - l];
                j++;
            } else if (j > r) {   // 如果右半部分元素已经全部处理完毕
                arr[k] = aux[i - l];
                i++;
            } else if (aux[i - l] < aux[j - l]) {
                arr[k] = aux[i - l];
                i++;
            } else {  // 左半部分所指元素 >= 右半部分所指元素
                arr[k] = aux[j - l];
                j++;
            }
        }

    }


    public static void sort2(Integer[] arr) {
        Integer[] aux = new Integer[arr.length];
        sort2(arr, 0, arr.length - 1,aux);
    }
     public static void sort2(Integer[] arr, int l, int r,Integer[] aux) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;
        sort2(arr, l, mid,aux);
        sort2(arr, mid + 1, r,aux);
        merge2(arr, l, mid, r,aux);
    }

    private static void merge2(Integer[] arr, int l, int mid, int r,Integer[] aux) {
        int i = l, j = mid + 1 ;
        for (int k = l; k <= r; k++) {
            if (i>mid){
                aux[k] = arr[j++];
            }else if (j>r){
                aux[k] = arr[i++];
            }else if (arr[i] < arr[j]) {
                aux[k] = arr[i++];
            } else {  // 左半部分所指元素 >= 右半部分所指元素
                aux[k] = arr[j++];
            }
        }
        while (l <= r)
            arr[l]=aux[l++];

        /*while (i<=mid && j<=r){
            if(arr[i]<=arr[j]){
                aux[t++] = arr[i++];
            }else {
                aux[t++] = arr[j++];
            }
        }
        while(i<=mid){//将左边剩余元素填充进aux中
            aux[t++] = arr[i++];
        }
        while(j<=r){//将右序列剩余元素填充进aux中
            aux[t++] = arr[j++];
        }
        t = 0;
        //将aux中的元素全部拷贝到原数组中
        while(l <= r){
            arr[l++] = aux[t++];
        }*/

    }





}
