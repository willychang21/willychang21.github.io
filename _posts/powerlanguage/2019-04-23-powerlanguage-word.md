---
layout: post
title:  PowerLanguage K棒的基本資訊 / 常用保留字
date:  2019-04-23
categories: PowerLanguage
---

## K棒的基本資訊

  | 保留字  | 簡寫 | 說明        |備注|
  |---------|------|-------------|--|
  | Open    | O    | K線開盤價   ||
  | Close   | C    | K線收盤價   ||
  | High    | H    | K線最高價   ||
  | Low     | L    | K線最低價   ||
  | Volume  | V    | K線成交量  |日線以上使用「Volume」 |
  | Ticks   |  | K線成交量   |分線使用「Ticks」|
  | OpenInt | OI   | K線未平倉量| |
    | Barnumber|    | K棒編號| |


  * **研判K線是紅K(開低走高)**

      ```cpp
      If close>open then…
    ```
  * **收盤過前高**
    ```cpp
    If close>high[1] then…
    ```

	* **強力陰陽線**(寰宇出版)有許多K線組合

		雙鴉躍空定義：
	1. 第一根為長陽線，第二根為跳空向上的陰線，並留下缺口。
	2. 第三根陰線也跳空向上開盤，其收盤價低於前一根陰線的收盤價，將第二根陰線實體完全吞噬了，但收盤價仍然高於第一根長陽線的收盤價，未將缺口封閉，為見頂訊號，後市看跌。

		```cpp
		If close[2]>open[2] and close[1]<open[1] and open[1]>close[2] and close<open and open>close[1] and 					close<close[1] and close>close[2] then….
		```

## 時間/日期保留字

| 保留字 | 功用          | 備註                                                    |
|--------|---------------|---------------------------------------------------------|
|  Date  | 當根K棒日期   | 2016/1/5=1160105 (千禧年問題2006=106、2017=117以此類推) |
| Time   | 當根K棒的時間 | 935=9:35am ; 17:00=5:00pm                                              |

## 交易相關保留字

| 保留字                          | 功用                             | 備註                                                                                                                 |
|---------------------------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Buy                             | 多單進場                         | =TS2000i的「Buy」                                                                                                    |
| SellShort                       | 空單進場                         | =TS2000i的「Sell」                                                                                                   |
| Sell                            | 多單出場                         | =TS2000i的「ExitLong」                                                                                               |
| BuytoCover                      | 空單出場                         | =TS2000i的「ExitShort」                                                                                              |
| Stop                            | 停損單                           |                                                                                                                      |
| Limit                           | 限價單                           |                                                                                                                      |
| Market                          | 市價單                           |                                                                                                                      |
| Contract Contracts Share Shares | 交易口數，這四個保留字意思一樣。 | 不特別寫的話，依MC中訊號屬性設定，預設值為1口。 另外實際下單口數也會要視下單機下單倍數設定而定。進一步說明請看此篇。 |


## 部位相關保留字

| 保留字                            | 功用                                                       | 備註                                                                                              |
|-----------------------------------|------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| MarketPosition  MarketPosition(N) | 目前策略部位  MarketPosition(N)，回傳前第N個進場策略部位。 | MarketPosition=1，目前多單在倉。  MarketPosition=-1，目前空單在倉。  MarketPosition=0，目前空手。 |
| EntryPrice                        | 目前部位進場價                                             |                                                                                                   |
| BarSinceEntry                     | 目前部位進場後已經過K棒數                                  |                                                                                                   |
| CurrentContracts                  | 目前持倉口數                                               |                                                                                                   |
| OpenPositionProfit                | 未平倉浮動損益                                             |                                                                                                   |


## 繪製指標保留字

| 保留字            | 功用       | 
|-------|------------|
| Plot1、Plot2…     | 繪圖(指標) |     
| Red、Blue、Green… | 設定顏色   |   

## 其他重要保留字

| 保留字                   | 功用     | 
|--------------------------|----------|
| Cross Over  Cross Above  | 向上穿越 |     
| Cross Below  Cross Under | 下向穿越 |     
