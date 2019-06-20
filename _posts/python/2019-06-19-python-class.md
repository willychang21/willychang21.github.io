---
layout: post
title: Python Class & Inheritance
date: 2019-06-19
categories: Python
---

## class
```python
class myclass:
  
  i = 12345
  
  def f(self):
    return 'willy is handsome'
  
#將 myclass 實例化
x = myclass()

#訪問 class 裡的屬性 & 方法
print(x.i)
print(x.f())

>>> 12345
>>> willy is handsome
```

> 這裡看到 f(self) 的 self 指的是 class 用來創建 instance 本身 (下面有詳細介紹)
> 然後將 x 物件化成 myclass 的樣子 

## __init__()

```python
class id:
  def __init__(self , name , age):
    self.n = name
    self.a = age

x = id('willy' , 21)
print(x.n , x.a)

>>> willy 21
```
> __init__(self , name , age) 這個構造函數的左右下劃線都是兩個，我只用了一個，導致錯誤 `TypeError: object() takes no parameters`。

## self
* self 代表 class 的 instance，而非 class

```python 
class test:
  def prt(self):
    print(self)
    print(self.__class__)
    
x = test()

print(x.prt())

>>> <__main__.test object at 0x7f1681830940>
>>> <class '__main__.test'>
```

> self 代表當前 instance x 的 address，而 self.class 是指向 class
> self 不是 python 的 keyword，所以隨便亂換個名字也可以

## class function

```python
class people:
  
  # 定義 basic attribute
  name = ''
  age = 0
  
  # 定義 private attribute , 外部無法直接訪問
  __phone = 0
  
  def __init__(self,n,a,p):
    self.name = n
    self.age = a
    self.__phone = p
    
  def ptr(self):
    print("%s is %d years old" %(self.name,self.age))
    
x = people('willy',21,'0988XXXXXX')
x.ptr()

>>> willy is 21 years old
```
>比如說 x.name 會得到 'willy' 而 x.age 會得到 21 ，但是 x.__phone 卻得到 `AttributeError: 'people' object has no attribute '__phone'`  
>private function 也一樣 e.g. `def ptr(self):` 變成 `def __ptr(self):`  
>但如果將 ptr function 改成 `print("%s is %d years old and phone %s" %(self.name,self.age,self.__phone))`  
>會得到 `willy is 21 years old and phone 0988XXXXX` ， 因為他是內部引用而不是外部引用

##  single inheritance

```python
class people:
  
  # 定義 basic attribute
  name = ''
  age = 0
  
  # 定義 private attribute
  __phone = 0
  
  def __init__(self,n,a,p):
    self.name = n
    self.age = a
    self.__phone = p
    
  def ptr(self):
    print("%s is %d years old" %(self.name,self.age))
    
# single inheritance

class student(people):
  
  grade = ''
  
  def __init__(self,n,a,p,g):
    
    # 調用 father class 的 constructor
    people.__init__(self , n , a , p)
    self.grade = g
    
  # rewrite father class function
  def ptr(self):
    print("%s is %d years old and study in %s" %(self.name,self.age,self.grade))
          
x = student('willy',21,'0988XXXXXX','Third grade')
x.ptr() 

>>> willy is 21 years old and study in Third grade3
```

## multiple inheritance

```python
# other class

class favorite:
  
  name = ''
  food = ''
  
  def __init__(self,n,f):
    self.name = n
    self.food = f
  def ptr(self):
    print("%s's favorite food is %s" %(self.name,self.food))
    
# multiple inheritance

class mix(favorite,student):
  
  def __init__(self,n,a,p,g,f):
    favorite.__init__(self,n,f)
    student.__init__(self,n,a,p,g)
  
x = mix('willy',21,'09XXXX','third grade','拉麵')
x.ptr()

>>> willy's favorite food is 拉麵
```
> 繼承 function 相同會優先引用左邊的(左到右)，在這 favorite 在左邊

## rewrite function 

```python
class father:
  def say(self):
    print("I'm your father")
  
class child(father):
  def say(self):
    print("I'm your child")
    
s = child()  # son instance
s.say()      # son rewrite function
super(child,s).say()  # 用 child 調用 father 已經被 override 的 say function

>>> I'm your child
>>> I'm your father
```





