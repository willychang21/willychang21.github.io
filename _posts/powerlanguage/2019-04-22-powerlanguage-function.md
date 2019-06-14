---
layout: post
title:  PowerLanguage 常用函式
date:  2019-04-22
categories: PowerLanguage
---

## Average(Price,Length)

 - 說明：計算平均值 參數
   - Price：要求平均值的標的，可以是Open、High、Low、Close、Volume等等。
   -  Length：幾抓近幾個值來計算平均，5就是算最近5個值來平均，以此類推。
 - 範例：畫簡單移動平均線
   ```c
      Value1 = Average(Close,9);           
      Plot1(Value1, "AvgClose");
   ```
- Average(Price,Length)也可以用AverageFC(Price,Length)取代，後者在演算上比較有效率。

## Xaverage(Price, Length)

 - 說明：計算加權移動平均值。給予越近期的值較高權重，以均線來講，會比簡單移動平均線來得敏感而貼近盤勢。 
 - 參數
   - Price：要求加權移動平均值的標的，可以是Open、High、Low、Close、Volume等等
   - Length：幾抓近幾個值來計算平均，5就是算最近5個值來平均，以此類推。 
 - 範例：畫加權移動平均線
   ```c
   Value1 = XAverage(Close,9);            
   Plot1(Value1, "XAvgClose");
    ```

## Summation(Price, Length)

 - 說明：加總，等於是EXCEL的SUM函式 
 - 參數：
   * Price：要加總計算的標的，可以是Open、High、Low、Close、Volume等等
   *  Length：幾抓近幾個值來加總，5就是算最近5個值來加總，以此類推。
 *  範例：加總最近5根K棒的成交量
    ```c
    Value1=Summation(Ticks,5);
    ```
 
 