---
layout: post
title: Cluster Analysis：Advanced Concepts and Algorithms
date: 2019-05-29
categories: DataMining
---
## 使用狀況
* 集群分析是一種`精簡資料`的方法，依據樣本之間的共同屬性，將比較相似的樣本聚集在一起，形成`集群(cluster)`。通常以`距離`作為分類的依據，相對距離愈近，相似程度愈高，分群之後可以使得`群內差異小、群間差異大`。
* 判別分析 (discriminant analysis) V.S. 集群分析 (Cluster Analysis)
    * 判別分析 → 將`事先已分類好`的觀察值，選取有分類效果的樣本，求出其判別函數，再將觀察值進行適當分類。
    * 集群分析 → 不需事先將觀察值分類，直接以觀察值的屬性進行分析。


## 分析方式
### (一)階層式集群分析法(Hierarchical method)
#### [法一] 凝聚式層階分群法（Agglomerative Hierarchical Clustering）
將資料點當成個別群集開始，在每一步驟，合併最接近的一組群集。這需要定義群集鄰近值（cluster proximity）的概念 
1. **單一連結法 - single linkage method**  
    * 定義 : 兩群集間資料點中之`最小距離`來表示。

2. **完全連結法 - complete linkage method**  
    * 定義 : 是以兩群集間資料點之最大距離來表示兩群集的距離及兩群資料的鄰近程度。

3. **平均連結法 - average linkage method**  
    * 定義 : 衡量群集內所有點至另一群集內所有點的距離平均來表示兩群集的鄰近程度，以避免群集間的距離衡量受雜訊影響。

4. **中心點連結法 - centroid linked method**  
    * 定義 : 以兩群群`中心點距離`作為衡量兩群集的距離，以表示其鄰近程度。  可解決距離衡量對異常值過於敏感的問題，好進一步處理類別型的資料 

5. **華德法 - Ward's method**  
    * 定義 : 是衡量組內 within-cluster 變異做為衡量群集相似度的分群方法。  
    * 依序將所有群集合併，反覆計算與合併每階段最小群集的組內變異，直至所有資料均合併為一群為止。


6. **BIRCH 平衡式反覆化簡層級分群法 - balanced iterative reducing and clustering using hierarchies**  
    * 定義 : 根據定義的半徑或直徑範圍將欲分類的資料點劃分為數個相似的子群集，在透過反覆合併的過程，以得到分群的結果。

7. **CURE 多代表點分群法 - clusstering using representatives**  
    * 定義 : 選擇用群集中數筆分散且具有代表性的資料點來代表一個群集。  
    * 缺點 : CURE 無法處理具有不同密度的群集  

#### [法二] 分裂式層階分群法 （Divisive Hierarchical Clustering）
從包含所有群集開始，在每一步驟，分割一個群集直到個別資料點仍留在單獨的群集中為止。在這個情況下，需要決定在每一步驟中哪一個群集要被切割，以及如何做切割。

### (二)分割式群集分析














**Reference**  
https://www.yongxi-stat.com/cluster-analysis/

