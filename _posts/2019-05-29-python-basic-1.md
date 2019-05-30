---
layout: post
title:  Python 3.7 常用內建函數
date:  2019-05-29
categories: Python
---

## abs（x）
返回數字的絕對值。參數可以是整數或浮點數。如果參數是一個複數，則返回其大小。如果x定義_abs_()，則 abs(x)返回x.\_abs_()。
```python
int x = -5
abs.(x)    #5
x._abs_()  #5
```
<br>

## all（可迭代的） 
如果 `iterable` 的所有元素為真（或迭代器為空），返回`True`。等價於:

```python
def all(iterable):
    for element in iterable:
        if not element:
            return False
    return True
```
<br>

```python
x = [1,2,3]
all(x) #True
```
<br>

>iterable : 可迭代的  e.g. list , dictionary 等都是可迭代的     
>iterator : 迭代器
<br>

##  any（可迭代的）

如果`iterable`的任一元素為真則返回`True`。如果迭代器為空，返回`False`。等價於:

```python
def any(iterable):
    for element in iterable:
        if element:
            return True
    return False
```
<br>

## ascii( object )
就像函數 `repr()` ，返回一個對象可打印的字符串，但是 `repr()` 返回的字符串中 `非ASCII` 編碼的字符，會使用 `\x` 、 `\u` 和 `\U` 來轉義。生成的字符串和Python 2 的 `repr()` 返回的結果相似。

```python
x = 5
ascii(x) #'5' str
```

<br>

## bin( x )

```python
>>> bin(3)
'0b11'
>>> bin(-10)
'-0b1010'
```

不需要 `0b` ，可以使用 `format` 。

```python
>>> format(14, '#b'), format(14, 'b')
('0b1110', '1110')
>>> f'{14:#b}', f'{14:b}'
('0b1110', '1110')
```
<br>

## class bool([x])
* 返回布林值 `True` 或 `False`。
* bool 類是 `int的子類`。其他類不能繼承自它。

## chr( i )
* 返回 Unicode 碼位為整數i的字符的字符串格式。
* `ord()` 的逆函數。
* 實參的合法範圍是 `0 ~1,114,111（16進製表示是0x10FFFF）`。如果 i 超過這個範圍，會觸發 `ValueError` 異常。

## divmod( a , b )
返回 `商` 和 `餘數`

```python
>>> divmod(15,4)
(3,3)
```
<br>

## enumerate
enumerate( iterable , start=0 )

```python
>>> seasons = ['Spring', 'Summer', 'Fall', 'Winter']
>>> list(enumerate(seasons))
[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
>>> list(enumerate(seasons, start=1))
[(1, 'Spring'), (2, 'Summer'), (3, 'Fall'), (4, 'Winter')]
```
<br>

## eval
`eval( expression , globals=None , locals=None )`
* 實參是一個字符串，以及可選的 `globals` 和 `locals`。globals實參必須是一個 `字典`。locals可以是 `任何映射對象`。

```python
>>> x = 1
>>> eval('x+1')
2
```

<br>

## globals( ) 
返回表示當前全局符號表的字典。這總是當前模塊的字典（在函數或方法中，不是調用它的模塊，而是定義它的模塊）。

## help( [ object ] ) 
啟動內置的幫助系統（此函數主要在交互式中使用）。如果沒有實參，解釋器控制台裡會啟動交互式幫助系統。如果實參是一個字符串，則在模塊、函數、類、方法、關鍵字或文檔主題中搜索該字符串，並在控制台上打印幫助信息。如果實參是其他任意對象，則會生成該對象的幫助頁。

## hex( x )

```python
>>> hex(255)
'0xff'
>>> hex(-42)
'-0x2a'
>>> '%#x' % 255, '%x' % 255, '%X' % 255
('0xff', 'ff', 'FF')
>>> format(255, '#x'), format(255, 'x'), format(255, 'X')
('0xff', 'ff', 'FF')
>>> f'{255:#x}', f'{255:x}', f'{255:X}'
('0xff', 'ff', 'FF')
```
<br>

## input( [ prompt ] )
```python
>>> s = input('--> ')  
--> Monty Python's Flying Circus
>>> s  
"Monty Python's Flying Circus"
```
<br>

## len( s ) 
返回對象的長度（元素個數）。實參可以是序列（如string、bytes、tuple、list 或range 等）或集合（如dictionary、set 或frozen set 等）。

## locals( ) 
更新並返回表示當前本地符號表的字典。在函數代碼塊但不是類代碼塊中調用locals()時將返回自由變量。請注意在模塊層級上，locals()和globals()是同一個字典。

## max/min
* max/min( iterable , * [ , key , default ] )   
* max/min( arg1 , arg2 , *args [ , key ] )

返回可迭代對像中最大的元素，或者返回兩個及以上實參中最大的。

如果只提供了一個位置參數，它必須是非空iterable，返回可迭代對像中最大的元素；如果提供了兩個及以上的位置參數，則返回最大的位置參數。

## next( iterator [ , default ] ) 
通過調用iterator的__next__()方法獲取下一個元素。如果迭代器耗盡，則返回給定的default，如果沒有默認值則觸發StopIteration。

## oct( x )
同 bin , hex

## open
`open( file , mode='r' , buffering=-1 , encoding=None , errors=None , newline=None , closefd=True , opener=None )`

* `r` : 讀取（默認）
* `w` : 寫入，並先截斷文件
* `x` : 排它性創建，如果文件已存在則失敗
* `a` : 寫入，如果文件存在則在末尾追加
* `b` : 二進制模式
* `t` : 文本模式（默認）
* `+` : 更新磁盤文件（讀取並寫入）

## pow( x , y [ , z ] )

```python
pow(2,10) #1024
```
<br>

## repr( object )
```python
>>> repr(1+2)
'3'
```
<br>

## reversed( seq )
返回一個反向的iterator。

## round(number[,ndigits]) 
返回number舍入到小數點後ndigits位精度的值。如果ndigits被省略或為None，則返回最接近輸入值的整數。

```python
>>> round(12.3456 , 2)
12.34
```
<br>

## sorted
`round( iterable , * , key=None , reverse=False ) `   
根據iterable中的項返回一個新的已排序列表。
* `key` 指定帶有單個參數的函數，用於從iterable的每個元素中提取用於比較的鍵(例如 `key=str.lower`)。默認值為None(直接比較元素)。
* `reverse` 為一個布林值。如果設為True，則每個列表元素將按反向順序比較進行排序。

```python
>>> X = [5,27,81,9,10,2,3,50,31,22]
>>> sorted(X,key=None,reverse=False)
[2, 3, 5, 9, 10, 22, 27, 31, 50, 81]

>>> X = [5,27,81,9,10,2,3,50,31,22]
>>> sorted(X,key=None,reverse=True)
[81, 50, 31, 27, 22, 10, 9, 5, 3, 2]

>>> X = ['G','d','p','C','U','w']
>>> sorted(X,key=None,reverse=False)
['C', 'G', 'U', 'd', 'p', 'w']

>>> X = ['G','d','p','C','U','w']
>>> sorted(X,key=str.lower,reverse=False)
['C', 'd', 'G', 'p', 'U', 'w']
```

<br>

## sum(iterable[ , start ])
* 從start開始自左向右對iterable中的項求和並返回總計值。start默認為0。iterable的項通常為數字，開始值則不允許為字符串。
* 對某些用例來說，存在sum()的更好替代。拼接字符串序列的更好更快方式是調用`''.join(sequence)`。要以擴展精度對浮點值求和，請參閱 `math.fsum()`。要拼接一系列可迭代對象，請考慮使用 `itertools.chain()`。

## zip( *iterables ) 

```python
>>> x = [1, 2, 3]
>>> y = [4, 5, 6]
>>> zipped = zip(x, y)
>>> list(zipped)
[(1, 4), (2, 5), (3, 6)]
>>> x2, y2 = zip(*zip(x, y))
>>> x == list(x2) and y == list(y2)
True
```







 








