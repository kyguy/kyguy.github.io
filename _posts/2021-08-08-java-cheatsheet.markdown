---
layout: post
title:  "Java Cheatsheet"
date:   2021-08-08 15:50:29 -0400
categories: java
---

ArrayList
{% highlight java %}

List<String> list = new ArrayList<String>();
list.add("a");
list.remove(int index);
{% endhighlight %}

LinkedList

{% highlight java %}
LinkedList<String> ll = new LinkedList<String>();  
ll.add("a");
ll.addLast("b");
ll.addFirst("c");
{% endhighlight %}

Stack

{% highlight java %}
Stack stack = new Stack();
stack.push()
stack.pop()
stack.peek()
stack.size()
{% endhighlight %}

HashMap

{% highlight java %}
Map<String, String> map = new HashMap<String, String>();
map.put();
map.get();
map.contains();
{% endhighlight %}

Creating Objects

{% highlight java %}
public class Example {

  public class Node {
    int val;
    Node next;
  }

  public static void main(String [] args) {
    Node n = new Node(); 
    
}
{% endhighlight %}

