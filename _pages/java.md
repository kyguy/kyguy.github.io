---
title: Java Cheatsheet
---

ArrayList
{% highlight java %}

List<String> x = new ArrayList<String>();
x.add("a");
x.remove(int index);
{% endhighlight %}

LinkedList

{% highlight java %}
LinkedList<String> x = new LinkedList<String>();  
x.add("a");
x.addLast("b");
x.addFirst("c");
{% endhighlight %}

Stack

{% highlight java %}
Stack x = new Stack();
x.push()
x.pop()
x.peek()
x.size()
{% endhighlight %}

HashMap

{% highlight java %}
Map<String, String> x = new HashMap<String, String>();
x.put();
x.get();
x.contains();
{% endhighlight %}

Creating Objects

{% highlight java %}
public class Example {

  public class Node {
    int val;
    Node next;
  }

  public static void main(String [] args) {
    Node x = new Node(); 
    
}
{% endhighlight %}

