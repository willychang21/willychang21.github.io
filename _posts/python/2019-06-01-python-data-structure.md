---
layout: post
title: Python list
date: 2019-06-01
categories: Python
---

## list.append( x )

```python
list = ['willy','chang','FJU','Handsome','code','PC','iphone']
list.append('genius')
list
# ['willy', 'chang', 'FJU', 'Handsome', 'code', 'PC', 'iphone', 'genius']
```

## del list[]

```python
del list[1]
list
#['willy', 'FJU', 'Handsome', 'code', 'PC', 'iphone', 'genius']
del list[2:4]
list
#['willy', 'FJU', 'genius']
del list[:]
list
#[]
```
## list.extend( iterable )

```python
list2 = ['dundun','haha','showbo']
list.extend(list2)
list
#['willy','asus','chang','FJU','Handsome','code','PC','iphone','genius','dundun','haha','showbo']
```

## list.insert( i , x )

```python
list.insert(1,'asus')
list
# ['willy', 'asus', 'chang', 'FJU', 'Handsome', 'code', 'PC', 'iphone', 'genius']
list2 = ['dundun','haha','showbo']
list.insert(3,list2)
list
#['willy','asus','chang', ['dundun', 'haha', 'showbo'],'FJU','Handsome','code','PC','iphone','genius']
```





