---
title: Java Cheatsheet
---

Conversions
{% highlight java %}
String.valueOf();
{% endhighlight %}

Strings
{% highlight java %}
StringBuilder x =new StringBuilder("");
x.append()
x.insert()
x.replace()
x.reverse()
x.delete()
x.capacity()
{% endhighlight %}

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
x.containsKey();
{% endhighlight %}


HashSet

{% highlight java %}

Set<String> x = new HashSet<>();
x.add();
x.get();
x.contains();
{% endhighlight %}

Characters
{% highlight java %}

char x = \0

{% endhighlight %}

Queue
{% highlight java %}
Queue x = new LinkedList();
Queue y = new PriorityQueue();
x.add()
x.offer()

x.remove()
x.poll()

x.element()
x.peek();

x.contains()

x.clear()
x.size()
x.isEmpty()
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

