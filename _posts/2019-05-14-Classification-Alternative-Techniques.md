---
layout: post
title:  Classification Alternative Techniques
date:  2019-05-15
categories: DateMining
tag: Note
---

* content
{:toc}

## **Rule-based Classifier**
### **1. Rule-Based Classifier** 
* 主要採用 `if-then` 的方式分類 
* e.g.（體溫＝溫血）且（卵生＝是）→ 鳥類  

![1](http://3.bp.blogspot.com/-aEckRzWCDUI/TrjY8_fg8-I/AAAAAAAADaQ/QgrhHxH0hwE/s400/Rule.jpg)

我們設一個規則 `Rule : Marital Status = Single → Class = No`
* **Coverage** = 4/10 (40%) 
> 10 筆有 4 筆是 single
* **Accuracy** = 2/4 (50%) 
> 4 筆有 2 筆是 No

![2](http://1.bp.blogspot.com/-reDOgDXHBWQ/TrjbfJCERDI/AAAAAAAADaY/vsYa1MMVIJA/s640/Rule02.jpg)

假設為了上面的 Dateset 設 Rules  
* R1: (Give Birth = no) 且 (Can Fly = yes) → Birds
* R2: (Give Birth = no) 且 (Live in Water = yes) → Fishes
* R3: (Give Birth = yes) 且 (Blood Type = warm) → Mammals
* R4: (Give Birth = no) 且 (Can Fly = no) → Reptiles
* R5: (Live in Water = sometimes) → Amphibians

利用上面的 Rules 來進行分類
* `LemurR3` 符合 R3 → Class = Mammals  
* `Turtle` 同時符合 R4 與 R5 → Class = ？  
* `Dogfish shark` 沒有符合任何 Rule → Class = ？

為了防止上述情況發生，增加兩個規則
1. Mutually exclusive : 每個 Date 只能符合一條 Rule.
2. Exhaustive rules : 每個 Date 都一定要有符合的 Rule.   

**Decision List** : 決定 Rules 的順序，依序分類，當沒有符合的 Rules 時，就分到 `Default`.
> 上述的 `Turtle`先符合 R4 → Reptiles

### **2. Rule-Based Classifier Ordering**
* Rule-based ordering : 根據 Rules 的 quality 排序
* Class-based ordering : 同 class 一起排序，在依資訊排序

![3](http://2.bp.blogspot.com/-hI9fy-FVF5Y/Trj5-dRuANI/AAAAAAAADag/MDy0oppIqHQ/s640/Rule03.jpg)

### **3. Building Classification Rules**
主要有 2 種方法
1. **直接（Direct Method)** : 直接從資料集中使用 `連續覆蓋（sequential covering）` 找尋規則並以 `貪婪（Greedy）` 方式成長，像是RIPPER,CN2
2. **間接（Indirect Method)** : 從其他的分類方式 `（決策樹、類神經網路）` ，像是C4.5Rules

#### **3.1 Sequential covering**
1. Start from an empty rule
2. Grow a rule using the `Learn-One-Rule` function
> Learn-One-Rule : 目的是萃取 Rules,而且這個 Rule 含很多 `+ (正例)` , 沒有(很少) `- (負例)`.
3. Remove training records covered by the rule
4. Repeat Step (2) and (3) until stopping criterion is met 

![4](http://2.bp.blogspot.com/-bjVzUkf3Uv4/TrkqQenP85I/AAAAAAAADao/hF5Fgo5kVtw/s400/Rule04.jpg)

![5](http://2.bp.blogspot.com/-yGtDwGks968/TrkqQ1nPW5I/AAAAAAAADas/TwAS3pjUhSg/s400/Rule05.jpg)

### **4. Direct Method: Sequential Covering**
1. 規則的生長（Rule Growing）
2. 記錄的削減（Instance Elimination）
3. 規則的評估（Rule Evaluation）
4. 生長停止的標準（Stopping Criterion）
5. 規則的修剪（Rule Pruning）

#### **4.1 規則的生長（Rule Growing）**
* 演繹法（general-to-specific）: 採用一個空集合，在慢慢改善選取目標
* 歸納法（specific-to-general）: 隨機挑選一個目標 Class 的資料作為基礎，在慢慢修正

![6](http://3.bp.blogspot.com/-80KFdcQf4FA/Trkr1b-wqpI/AAAAAAAADa4/cnOX9Zw3Arw/s640/Rule06.jpg)

**Rule Growing Example**
* **CN2 演算法**
    1. 先建立一個空的規則，r:{} → y
    2. 開始加入規則條件進入，挑選最小Entropy的條件
    3. 確定規則後，挑選能覆蓋最多目標 Class 的規則
* **PIPPER 演算法**
    1. 同樣建立一個空的規則，r:{} → y
    2. 開始加入規則條件進入，挑選最大 `FOIL's Information Gain` 的。  
    R0:  {} => class   (initial rule)  
    R1:  {A} => class (rule after adding conjunct)  
    Gain(R0, R1) = t [  log (p1/(p1+n1)) – log (p0/(p0 + n0)) ]  
    where  t: number of positive instances covered by both R0 and R1  
    p0: number of positive instances covered by R0  
    n0: number of negative instances covered by R0  
    p1: number of positive instances covered by R1  
    n1: number of negative instances covered by R1

#### **4.2 記錄的削減（Instance Elimination）**

1. 在做連續覆蓋時為什麼要把記錄給消除掉呢？  
> 因為如果不刪除的話，下一個規則會重複覆蓋到。  
2. 為什麼要刪除目標 Class（Positive）的記錄？  
> 確保下一個規則是不同一個的。（還是跟上面理由差不多）  
3. 為什麼也要刪除不是目標 Class（Negative）的記錄？  
> 防止規則被低估了精確性。

![7](http://3.bp.blogspot.com/-fK07jOKaqeg/Trljgl8YiII/AAAAAAAADbA/Dsn3cYF2tpY/s400/Rule08.jpg)

＋ : 29 , － : 21  
R1，初始正確率：12/15（80％）  
R2，初始正確率：7/10（70％）  
R3，初始正確率：8/12（66.7％）

Step1 : R1 最好，挑 R1，再將 R1 cover 的 Data 移除。    
Step2 : 挑下個 Rule，R3 因為 R1 資料的移除，R3 的正確率變成 6/8（75％），高於R2，選 R3。  

> 1. 如果不刪除 R1 cover 的 Data，R3 就會重複 cover R1 已經 cover 的 Data。  
> 2. 如果不移除 R1 cover 的 ＋，可能會高估了 R3 的正確性，或者不移除 R1 cover 的 －，也可能會低估了 R3 的正確性。

#### **4.3 規則的評估（Rule Evaluation）**
1. 正確性（Accuracy）：$$\frac{n^{c}}{n}$$
2. Laplace法： $$\frac{n^{c}+1}{n+k}$$
3. M-estimate法： $$\frac{n^{c}+kp}{n+k}$$

* $$n$$ 是規則能夠覆蓋多少記錄
* $$n^{c}$$ 是規則能夠覆蓋多少目標 Class 記錄
* $$k$$ 是總共有多少的組數
* $$p$$ 是事前機率（Prior probability）

#### **4.4 & 4.5 生長停止的標準（Stopping Criterion）與 規則的修剪（Rule Pruning）**
* 停止生長的標準在於 `Gain值` 有沒有改善，如果沒有改善就停止

* 而規則的修剪，很像決策樹的減少錯誤修剪（Reduced Error Pruning）
    1. 先移除一個規則中的條件
    2. 套入驗證資料計算移除前與移除後的比率
    3. 如果移除後有改善則移除，則修剪這個規則

### **5. Direct Method: RIPPER**

* RIPPER 演算法，屬於`演繹法（general-to-specific）` 的成長策略，基於`連續覆蓋（Sequential Covering）`且利用`FOIL's Information Gain` 來挑選最好的組合。

* 用在二元分類問題上：先選擇一個目標類別做為「正面（Positive）」，其他類別就是「負面（Negative）」，學習的規則就依照類別 Positive 的紀錄，Negative 記錄就當做預設類別。

* 用在多元分類問題上：學習的規則開始於 Class 數量最少的開始，會有較好的精準度，其餘的為 Negative。接著，最少的選擇完後，在找第二少的開始，依此類推。

RIPPER演算法 規則的成長：
1. 開始於一個空的規則 R{} → y
2. 開始加入條件，只要能夠改善 FOIL's Information Gain
3. 停止條件在於條件開始覆蓋 Negative 的資料
4. 接著立即將驗證案例導入做 `REP（Reduced Error Pruning）`測試
5. 以下面的公式來決定規則是否要進行修剪：$$V= (p-n) / (p+n)$$  
$$p$$ 是規則能夠覆蓋多少個驗證資料集的 Positive 資料  
$$n$$ 是規則能夠覆蓋多少個驗證資料集的 Negative 資料
6. 如果有所改善，則刪除規則中最後一個加入的條件
比方說有一規則 R{A,B,C,D}→ y，則先考慮刪除 D、再來是 CD、再來 BCD，依此類推

### **6. Indirect Method**
不是直接拿資料去跑出規則集，而是換其他方式來生出規則集，比方說決策樹（Decision Tree）、類神經網路（Neural networks）  
e.g. 由 Decision Tree 轉 Rule-Based

![8](http://2.bp.blogspot.com/-R4KndvfCPMU/TryrxkOjUSI/AAAAAAAADcg/DGfaMVzZRx8/s640/Rule12.jpg)

像 `C4.5 Rules` 就是一種間接的方法，先利用 C4.5 建立出完整未修剪的決策樹，在利用規則分類的修剪方式進行修剪動作。

而 C4.5Rules 規則產生的步驟如下：
1. 假設每個規則都是 r: A → y
2. 經過條件篩檢後的規則為，r':A'→ y
3. 比較修剪前後的悲觀估計
4. 如果有比較低的悲觀估計誤差的話，則修剪掉
5. 重複上述步驟，直到不再改善悲觀估計誤差。

而 C4.5Rules 的規則生成後，再來就要考慮規則的排序了。主要以規則為排序（Rule-based ordering）的方式，相同分類的規則會放在同一個規則子集合中，在分別計算每個子集合的總描述長度（Description length），以遞增方式做排序。

$$
Description Length=L_{exception}+g\times L_{model}
$$

* $$L_{exception}$$ 是指錯誤分類的資料（Misclassified example）所需的編碼長度
* $$g$$ 是一個調整參數（Tuning parameter），一般預設是0.5
* $$L_{model}$$ 整個模型的編碼長度。

### **7. Rule-Based Classifier Advantages**
1. 規則分類與決策樹有差不多水準的高表現性
2. 很容易詮釋與解釋
3. 很容易的去產生
4. 可以用來作預測新案例或記錄
5. 效率可以媲美決策樹

## **Instance Based Classifiers 案例式分類**
案例式分類，就是採用案例的資料集做分類的意思。當今天有一個新的 Record 進來，接著比較他跟案例資料集中哪個案例相同，就將其分類在相同案例的一類。

舉例說明：

![9](http://4.bp.blogspot.com/-hOe1lXrQhk8/Tr0Bhy_RTmI/AAAAAAAADcw/oeD3tR5dyrU/s640/Rule14.jpg)

今天這個新案例進來，因為他的屬性與鴨子的相似度最高，故我們就將他分類到鴨子。

案例式分類，是一種 `懶惰` 的學習方式，他總是等到資料進來後才會開始進行分析的動作，規則分類或是決策樹分類，都是 `積極型` 的學習方式，在資料進來之前，就已經進行所謂的建模。因此，懶惰學習方式起初並不會花費太多的時間，只有等到資料進入時才會開始動作，所以當資料有相當多比的時候，就會花費相當多的時間了。

### **1. 第k個最鄰近法（k-Nearest-Neighbor）**

最近鄰居法，是指在資料集裡頭與新資料最相近的那筆資料，而第 k 個最鄰近法是指，在資料集裡頭與新資料最接近的 k 筆資料。

![10](http://1.bp.blogspot.com/-FN8bxk7OLps/Tr0ar01Zl_I/AAAAAAAADc4/4SJtxe5qVN4/s320/Rule15.jpg)

這是一個 `k＝3` 的最鄰近法，而鄰不鄰近最主要就是看與距離，距離越近就越鄰近。
一般可採用歐式距離：

$$
d(p,q)=\sqrt{\sum_{i}(p_{i}-q_{i})^2}
$$

而新案例的分類，就是看最鄰近的幾個點是什麼分類，通常以多數為決定。故上述案例就是 3 個＋，沒有 －，所以分類為＋。

![11](http://2.bp.blogspot.com/-VFZb2sOGanY/Tr0bjcTFlnI/AAAAAAAADdA/MrHkZzEQhNE/s640/Rule16.jpg)

而上面這張圖，分別為 K=1 鄰近、K=2 鄰近、K＝3 鄰近，但未知的 X 要怎麼分類呢？K＝1的時候很明顯是「－」，K＝3是「+」，但 K＝2的 時候通常會採用 `隨機方式` 決定。

再來，上圖中，未知案例 X 明明離"－"比較近，就算你有兩個"＋"，還是會讓人產生疑慮，因此除了多數決定的方法外，還有對距離下權重的方式。通常來說權重會是 $$weight factor ,w=\frac{1}{d^2}$$

但是，當我們的案例庫如果太多雜訊的時候，K 太小時分類的決定就容易受到雜訊影響。可是 K 太大時，又容易包含太多雜點產生誤判問題（如下圖）

![12](http://4.bp.blogspot.com/-5rfZp03GTX8/Tr0j-9T-7VI/AAAAAAAADdY/Cy1tJmHle_g/s320/Rule18.jpg)

關於 K-NN 最鄰近法的屬性縮放問題，因為有些屬性資料差距相當大，會導致原本相近的案例，因為一個不起眼的屬性而造成相當大的差異。  
比方說：  
身高的差異大致上是，140～185公分  
體重的差異就有可能是，45公斤～120公斤  
換到收入來說，就會變成，1萬元～100萬元的差異  
因此，`正規化屬性值`，也是 K-NN 最鄰近法一個相當重要的前處理步驟。

### **2. PEBLS（Parallel Exemplar Based Learning System）**

最鄰近法的改版，這也是已案例為學習方式的演算法，加入平行運算可以更快速的完成。
較為特別的地方是，他可以用來處理 `連續型資料（Continuous）` 與 `名義（Nominal）尺度` 的資料，其中名義尺度的資料採用 `MVDM（Modified value difference metric）` 方式處理，也就是修正後再比較的方式。

另外，每筆資料都會給相似度權重，因為是最鄰近法，所以預設 K=1。

**MVDM（Modified value difference metric）**使用的公式

$$
d(V_{1},V_{2})=\sum_{i}\left | \frac{n_{1i}}{n_{1}}-\frac{n_{2i}}{n_{2}} \right |
$$

* $$i$$ : 為 Class Level。
> 如果 Class 為 Yes 與 No 的話就是 0、1，若為是、否與不一定，的話就是0、1、2，依此類推。
* $$n$$ : 為目標屬性的資料數量。

![13](http://3.bp.blogspot.com/-YrkkXxtZN4Q/TsnKaCv3azI/AAAAAAAADuc/HBxm0jGa7Ro/s320/PEBLS.jpg)
![14](http://2.bp.blogspot.com/-Nbu90qvnmqA/TsnKwGqRknI/AAAAAAAADuk/IWt514UnDjM/s320/PEBLS02.jpg)

若我們想要算三個婚姻狀況 Marital Status 的分類之間的差異，我們的算法為分三個階段

1. $$d(Single,Married)= \left| \frac{2}{4}-\frac{0}{4} \right|+ \left| \frac{2}{4}-\frac{4}{4} \right|=1$$  
> 上述式子為，我們要計算未婚與已婚之間的差異，其中未婚共有 4 筆資料，已婚有 2 筆資料，分類為 Yes 的情況下差異為未婚 4 個之中有 2 個減去已婚 4 個之中有 0 個。分類為 No 的情況下差異為未婚 4 個之中有 2 減去已婚 4 個之中有 4 個。最後兩者相加的到差異為 1
2. $$d(Single,Divorced)= \left| \frac{2}{4}-\frac{1}{2} \right|+ \left| \frac{2}{4}-\frac{1}{2} \right|=0$$
> 算法同上
3. $$d(Married,Divorced)= \left| \frac{0}{4}-\frac{1}{2} \right|+ \left| \frac{4}{4}-\frac{1}{2} \right|=1$$ 
> 一樣

![15](http://4.bp.blogspot.com/-mTLCjPM4lCQ/TsnOuRzCJtI/AAAAAAAADu0/Nt1dOsiZ5IE/s1600/PEBLS03.jpg)

若要改計算償還屬性類別的差異算法：
$$d(Refund = Yes,Refund = No)= \left| \frac{0}{3}-\frac{3}{7} \right|+ \left| \frac{3}{3}-\frac{4}{7} \right|=\frac{6}{7}$$

最後，要計算記錄之間的差異的話，就要考慮到所謂權重的問題

![16](http://4.bp.blogspot.com/-L7q319dAYh4/TsnPuSusunI/AAAAAAAADu8/I6H6C_tu934/s320/PEBLS04.jpg)

採用的公式如下：  

$$
\bigtriangleup (X,Y)=w_{x}w_{y}\sum_{i=1}^{d}d(X_{i},Y_{i})^2  
$$

其中後半段公式為前面敘述的 MVDM，算出距離與距離間的差異，接著在算兩個資料的權重。

其中，權重的算法為：
![17](http://3.bp.blogspot.com/-3wUGGD092go/TsnUTpBLC_I/AAAAAAAADvM/llPSV8WYHlA/s400/PEBLS06.jpg)

所以可以看得出來，當 $$W_{x}$$ 越接近 1 表示 $$x$$ 這筆資料預測的正確越高，表示每次用來預測都能夠正確預測成功。

## **Bayes Classifier**

### **1. 貝氏定理**

![18](http://4.bp.blogspot.com/-8H_t2WQnoU8/Tsnd2X7toZI/AAAAAAAADvU/-SxpgyGYZxo/s320/Bayes01.png)

假設Z為沒有生病機率51％，事件A為得了感冒機率25％，事件B為得了腸胃炎機率24％，事件C為感冒又腸胃炎機率5％。

在 A 事件發生的情況下，又發生 B 事件的機率 ＝ 5％ / 25％ ＝ 20％

![19](http://3.bp.blogspot.com/-lYCarsdjS9A/TsnhOe6QYqI/AAAAAAAADvc/FWFB9QmB4EA/s1600/Bayes03.png)

在 B 事件發生的情況下，又發生 A 事件的機率 ＝ 5％ / 24％ ＝ 20.8％

![20](http://4.bp.blogspot.com/-iTCEIgnsqQY/TsnheC_-BBI/AAAAAAAADvk/Ob7MWJVxIhY/s1600/Bayes02.png)

整合兩個式子，可以得到

Ｐ（Ａ｜Ｂ）．Ｐ（Ｂ）＝Ｐ（Ａ∩Ｂ）＝Ｐ（Ｂ｜Ａ）．Ｐ（Ａ）  
20.8％ * 24％ ＝ 5％ ＝ 20％ * 25％  

最後，在使用機率的乘法定理左右同除上 Ｐ（Ｂ）得到

![21](http://4.bp.blogspot.com/-jjpnsUYj3UY/Tsnj33idl-I/AAAAAAAADv0/nZ34PGgur18/s1600/Bayes05.png)

也就是 20.8％＝（20％*25％）/ 24％


### **2. 貝氏分類（Bayes Classifier）**
設每個屬性為（A1,A2,A3,....An）
設屬性分類為 C1,C2,....Cn，（假設分類是Yes與No，那 C 就是 C1 與 C2）
今天一筆未知的資料近來，要怎樣分類屬性呢？

方法如下：
1. 假設目標分類是 Yes 與 No，分別為 Class1 與 Class2
2. 假設屬性有三個，分別為 A1、A2、A3
3. 接著計算 Ｐ（C1｜A1,A2,A3）與 Ｐ（C2｜A1,A2,A3）
根據貝氏定理可以得到
![22](http://1.bp.blogspot.com/-KHAib5FRwoM/Tsny8Y1VDiI/AAAAAAAADv8/uhM9ObKCW18/s1600/Bayes06.png)

4. 最後，挑選 Ｐ（C1｜A1,A2,A3）與 Ｐ（C2｜A1,A2,A3）中最大的，作為屬性分類。  
雖然步驟是上面這樣，但要怎麼計算Ｐ（A1,A2,A3｜C）* Ｐ（C）呢？

## **Naive Bayes Classifier 單純貝氏分類**


根據上節最後提到的要怎麼計算Ｐ（A1,A2,A3｜C）* Ｐ（C），這邊先介紹單純貝氏分類（Naive Bayes Classifier）的方法。

單純貝氏分類，有個重要的假設前題就是 `「屬性間是互相獨立的」`，
因此可以將 Ｐ（A1,A2,A3｜C）拆解成 Ｐ（A1｜C）、 Ｐ（A2｜C）、 Ｐ（A3｜C）

因為 C 有 Class1 與 Class2，所以要計算共六次，分別為  
Class1：Ｐ（A1｜C1）、 Ｐ（A2｜C1）、 Ｐ（A3｜C1）  
Class2：Ｐ（A1｜C2）、 Ｐ（A2｜C2）、 Ｐ（A3｜C2）

然後再把計算的結果相乘，在乘上 P（C）的機率  

Class1：Ｐ（A1｜C1）* Ｐ（A2｜C1）* Ｐ（A3｜C1）* Ｐ（C1）  
Class2：Ｐ（A1｜C2）* Ｐ（A2｜C2）* Ｐ（A3｜C2）* Ｐ（C2）

最後取最大的機率來代表未知記錄的分類

舉例說明：

![23](http://2.bp.blogspot.com/-H3il9zGTrvY/TsoCz4aXTCI/AAAAAAAADwo/KHBjDR5qfKA/s320/Bayes07.png)

目標 Class 為 Evade，其分類為 Yes 與 No
* P（Yes）＝ 3/10
* P（No）＝7/10

屬性的機率，則為 P（A｜C）＝ Ak / Nk，Nk 為 C 分類下有多少數量，Ak 為屬性 A 於 C 分類底下的數量，比方說 P（Refund＝Yes｜Evade＝No）＝ ３/7

前面提到了，遇到連續行的屬性值（如上表中的Taxable Income），除了離散化（Discretize）與二元化（Two-Way Split）兩個方法外，這裡邊在介紹一個新的方法，利用機率密度估計（Probability density estimation）。

若要使用機率密度來估計的話，首先要假定屬性的值屬於常態分配。在用數據來算機率分布（如平均數與標準差），接著就可用來估計連續型態的 P（A｜C），其機率分布公式如下：

$$
P(A_{i}\mid c_{j})=\frac{1}{\sqrt{2\pi \sigma_{ij}^{2}}}e^\frac{-(A_{i}-\mu_{ij})^2}{2\sigma_{ij}^{2}}
$$

假設我們要求 P（Income＝120｜Evade＝No），其中假如 Class＝No，其平均數為 110，變異數為 2975，標準差為 54.54。

$$
P(Income = 120\mid No)=\frac{1}{\sqrt{2\pi(54.54)}}e^\frac{-(120-110)^2}{2(2975)}=0.0072
$$

套用一個未知屬性的資料 X 其 Refund＝No，Married，Income＝120K，求實際分配在哪個類別。  
因為有兩個目標屬性 Yes 與No，故必須計算 P（X｜Class＝No）與 P（X｜Class＝Yes）  

* P（X｜Class＝No）  
＝ P(Refund=No｜Class＝No) * P(Married｜Class＝No) * P(Income＝120K｜Class＝No) 
＝ 4/7 * 4/7 * 0.0072  
＝0.0024

* P（X｜Class＝Yes）  
＝ P(Refund=Yes｜Class＝Yes) * P(Married｜Class＝Yes) * P(Income＝120K｜Class＝Yes)   
＝ 1 * 0 * 1.2 * 10 的 -9 次方   
＝ 0

因為 P（X｜Class＝No）＞ P（X｜Class＝Yes），所以 X 屬於No

因此總結單純貝氏分類的特性：
1. 對於雜訊能有想當好的處理能力（因為其機率分配很低）
2. 對於遺漏值可以忽略不計
3. 能夠處理屬性不相關的資料（因為假設屬性間互相獨立）
4. 若屬性間有相關，會提高誤判的機率（就要改用其他方式如貝氏信念網路BBN）

## **Ensemble Methods 群體學習法**

群體學習法（或稱作全體學習法），其建構的基礎是從「訓練資料（Training Data）」來的。

在預測未知的資料前，先分類多組的資料集，接著建立多組的分類模型

然後丟入未知資料，最後從多個模型中找出最佳解（一般採用多數決定）。

`原始資料 > 拆成很多組 > 變出很多模型 > 最後推估結果`

![24](http://2.bp.blogspot.com/-DYOvs-hB6hk/Tt-XRAHeqUI/AAAAAAAAELQ/el1mJW_rSDM/s320/ANN3.jpg)

假設今天做了25個分類模型，每個模型的錯誤率是35%

這樣透過25個模型所跑出來的資料，錯誤率就會只剩下 6％

$$
\sum_{i=13}^{25}\binom{25}{i}\varepsilon^i(1-\varepsilon)^{25-i}=0.06
$$

那要怎麼做到群體學習勒？一般採用方法有下面兩種

1. Bagging : 也就是抽後放回，今天假設有10筆資料的話，可以抽出下面結果

![25](http://1.bp.blogspot.com/-Fw6HO2NCNaI/Tt-ZM22hBYI/AAAAAAAAELg/1UbjiyD1Emc/s640/ANN5.jpg)

每個資料有 $$（1- 1/n）^n$$ 機率被抽出

2. Boosting : 不只抽後放回，還會對每筆資料給予權重值，來提高抽樣機率  
第一輪抽樣，每個資料的機率是都一樣的  
第二輪開始，被分類錯誤的資料，會給予較高的權重，這樣就容易被抽出來

![26](http://3.bp.blogspot.com/-FPOQlQLkQHs/Tt-aM-hkQgI/AAAAAAAAELo/-YLFcBv1PC0/s640/ANN6.jpg)

如圖，因為第四筆資料常常被分類錯誤，所以要經常抽出來訓練

## **AdaBoost**
接著，介紹一個Boost的分類演算法，叫做「AdaBoost」

假設我們有T個分類模型，分別為 C1、C2、C3、.....、CT

其每個分類模型 `錯誤率` 的計算方式為 

$$
\varepsilon_{i}=\frac{1}{N}\sum_{j=1}^{N}w_{j}\delta(C_{i}(x_{j})\neq y_{j} )
$$

每個分類模型的 `重要程度` 計算方式為

$$
\alpha_{i}=\frac{1}{2}ln(\frac{1-\varepsilon_{i}}{\varepsilon_{i}})
$$


每一輪分類後，我們都要對 `權重更新`（錯誤的權重要拉高，正確的要降低）
因此，每一輪後權重的計算公式為

$$
W_{i}^{j+1}=\frac{W_{i}^{j}}{Z_{j}}\left\{\begin{matrix}exp^{-\alpha_{j}}\, \, \, if\,\,C_{j}=y_{i}
\\exp^{\alpha_{j}}\, \, \,\,\,\, if\,\,C_{j}\neq y_{i}
\end{matrix}\right.
$$ where $$Z_{i}$$ is the normalization factor

接著，AdaBoost的重點就是，當 `錯誤率高達50%` 以上的話，權重將打回 1/n
並且 `重新做一次抽樣`。

最後，分類的結果就是`「多數決」`，哪個結果分類器決定的多，就已哪個結果為主

$$
C^*(x)=\underset{y}{arg\,max}\sum_{j=1}^{T}\alpha_{j}\delta(C_{j}(x)=y)
$$








