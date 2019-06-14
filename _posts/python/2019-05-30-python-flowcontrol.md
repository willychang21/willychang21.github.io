---
layout: post
title:  Python 流程控制
date:  2019-05-30
categories: Python
---

# 補充額外流程控制語法
## range 函數

* class range( stop )
* class range( start , stop [ , step ] )

```python
>>> list(range(10))
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> list(range(1, 11))
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
>>> list(range(0, 30, 5))
[0, 5, 10, 15, 20, 25]
>>> list(range(0, 10, 3))
[0, 3, 6, 9]
>>> list(range(0, -10, -1))
[0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
>>> list(range(0))
[]
>>> list(range(1, 0))
[]
```
`range 類型` 相比常規 `list` 或 `tuple` 的優勢在於一個 range 對象總是佔用`固定數量`的（較小）內存，不論其所表示的範圍有多大（因為它只保存了`start`, `stop` 和 `step值` ，並會根據需要計算具體單項或子範圍的值）。

```python
>>> r = range(0, 20, 2)
>>> r
range(0, 20, 2)
>>> 11 in r
False
>>> 10 in r
True
>>> r.index(10)
5
>>> r[5]
10
>>> r[:5]
range(0, 10, 2)
>>> r[-1]
18
```

## pass語句
pass語句什麼也不做。當語法上需要一個語句，但程序需要什麼動作也不做時，可以使用它。例如:

```python
while True:
    pass  # Busy-wait for keyboard interrupt (Ctrl+C)
```

這通常用於創建最小的類:

```python
class MyEmptyClass:
    pass
```

pass 的另一個可以使用的場合是在你編寫新的代碼時作為一個 `函數`或`條件子句體` 的佔位符，允許你保持在更抽象的層次上進行思考。pass 會被靜默地忽略:

```python
def initlog(*args):
    pass   # Remember to implement this!
```
<br>

## 定義函數

```python
def fib(n):    
    # write Fibonacci series up to n
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

fib(2000) 
# 0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 
```

# 函數定義的更多形式
## 1. 參數默認值
最有用的形式是對一個或多個參數指定一個默認值。這樣創建的函數，可以用 `比定義時允許的更少的參數` 調用，比如:

```python
def ask_ok(prompt, retries=4, reminder='Please try again!'):
    while True:
        ok = input(prompt)
        if ok in ('y', 'ye', 'yes'):
            return True
        if ok in ('n', 'no', 'nop', 'nope'):
            return False
        retries = retries - 1
        if retries < 0:
            raise ValueError('invalid user response')
        print(reminder)
```
這個函數可以通過幾種方式調用:

* 只給出必需的參數：ask_ok('Do you really want to quit?')
* 給出一個可選的參數：ask_ok('OK to overwrite the file?', `2`)
* 或者給出所有的參數：ask_ok('OK to overwrite the file?', `2, 'Come on, only yes or no!'`)

這個示例還介紹了 `in` 關鍵字。它可以測試一個序列是否包含某個值。

默認值是在定義過程中在函數定義處計算的，所以

```python
i = 5

def f(arg=i):
    print(arg)

i = 6
f()
```
會打印 `5` 。

## 2. 關鍵字參數

也可以使用形如 `kwarg=value` 的關鍵字參數來調用函數。例如下面的函數:

```python
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.")
    print("-- Lovely plumage, the", type)
    print("-- It's", state, "!")
```

接受一個必需的參數（`voltage`）和三個可選的參數（`state`, `action`，和`type`）。這個函數可以通過下面的任何一種方式調用:

但下面的函數調用都是 `無效的`:

```python
parrot()                     # required argument missing
parrot(voltage=5.0, 'dead')  # non-keyword argument after a keyword argument
parrot(110, voltage=220)     # duplicate value for the same argument
parrot(actor='John Cleese')  # unknown keyword argument
```

在函數調用中，關鍵字參數必須跟隨在位置參數的後面。傳遞的所有關鍵字參數必須與函數接受的其中一個參數匹配（比如 `actor` 不是函數 `parrot` 的有效參數），它們的順序並不重要。這也包括非可選參數，（比如 `parrot(voltage=1000)` 也是有效的）。不能對同一個參數多次賦值。下面是一個因為此限製而失敗的例子:

```python
>>> def function(a):
...     pass
...
>>> function(0, a=0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: function() got multiple values for keyword argument 'a'
```

When a final formal parameter of the form `**name` is present, it receives a dictionary (see 映射類型--- dict ) containing all keyword arguments except for those corresponding to a formal parameter. This may be combined with a formal parameter of the form `*name` (described in the next subsection) which receives a `tuple` containing the positional arguments beyond the formal parameter list. ( `*name` must occur before `**name`.) For example, if we define a function like this:

> 這段其實我也看得有點模糊，看下面實作比較快哈哈

```python
def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?")
    print("-- I'm sorry, we're all out of", kind)
    for arg in arguments:
        print(arg)
    print("-" * 40)
    for kw in keywords:
        print(kw, ":", keywords[kw])
```

它可以像這樣調用:

```python
cheeseshop("Limburger", "It's very runny, sir.",
           "It's really very, VERY runny, sir.",
           shopkeeper="Michael Palin",
           client="John Cleese",
           sketch="Cheese Shop Sketch")
```

到函式裡大概是這個樣子

```python
kind = "Limburger"
argument = ["It's very runny, sir.","It's really very, VERY runny, sir."]
keyword = {
    shopkeeper="Michael Palin",
    client="John Cleese",
    sketch="Cheese Shop Sketch"
}
```
當然它會打印:

```
-- Do you have any Limburger ?
-- I'm sorry, we're all out of Limburger
It's very runny, sir.
It's really very, VERY runny, sir.
----------------------------------------
shopkeeper : Michael Palin
client : John Cleese
sketch : Cheese Shop Sketch
```

## 3. 任意的參數列表
最後，最不常用的選項是可以使用`任意數量的參數調用函數`。這些參數會被包含在一個`元組`裡（參見元組和序列）。在可變數量的參數之前，可能會出現零個或多個普通參數。:

```python
def write_multiple_items(file, separator, *args):
    file.write(separator.join(args))
```

一般來說，這些 `可變参数` 將在形式參數列表後面，因為收集傳遞給函數的所有剩餘輸入參數。出現在 `*args` 參數之後的任何形式參數都是 `僅關鍵字參數`，也就是說它們只能作為關鍵字參數而不能是位置參數。:

```python
>>> def concat(*args, sep="/"):
...     return sep.join(args)
...
>>> concat("earth", "mars", "venus")
'earth/mars/venus'
>>> concat("earth", "mars", "venus", sep=".")
'earth.mars.venus'
```

## 4. 解包參數

利用 `*` 來解包 `args` 這個 list

```python
>>> list(range(3, 6))            # normal call with separate arguments
[3, 4, 5]
>>> args = [3, 6]
>>> list(range(*args))            # call with arguments unpacked from a list
[3, 4, 5]
```

字典可以使用 `**` 運算符來提供關鍵字參數

```python
>>> def parrot(voltage, state='a stiff', action='voom'):
...     print("-- This parrot wouldn't", action, end=' ')
...     print("if you put", voltage, "volts through it.", end=' ')
...     print("E's", state, "!")
...
>>> d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
>>> parrot(**d)
# -- This parrot wouldn't VOOM if you put four million volts through it. E's bleedin' demised !
```
## 5. Lambda表達式
可以用 `lambda` 關鍵字來創建一個小的`匿名函數`。  
這個函數返回兩個參數的和：。Lambda函數可以在需要函數對象的任何地方使用。它們在語法上限於單個表達式。從語義上來說，它們只是正常函數定義的語法糖。與嵌套函數定義一樣，lambda 函數可以引用包含範圍的變量 : `lambda a, b: a+b`

> 白話來說就像是客制化函數

```python
def make_incrementor(n):
     return lambda x: x + n

f = make_incrementor(42) # f(x) = x + 42
f(0) #f(0) = 0 + 42 = 42
f(1) #f(1) = 1 + 42 = 43
```
上面的例子使用一個 `lambda` 表達式來返回一個函數。另一個用法是傳遞一個小函數作為參數:

```python
pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]
pairs.sort(key=lambda pair: pair[1])
pairs
# [(4, 'four'), (1, 'one'), (3, 'three'), (2, 'two')]
```

## 6. 文檔字符串

取出函數裡的註解

```python
def my_function():
     """
     Do nothing, but document it.

     No, really, it doesn't do anything.
     """
     pass

print(my_function.__doc__)
#Do nothing, but document it.

#No, really, it doesn't do anything.
```



