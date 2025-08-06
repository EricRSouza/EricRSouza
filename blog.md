---
layout: page
title: Blog
---

# Posts do Blog

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%d/%m/%Y" }}
{% endfor %}
