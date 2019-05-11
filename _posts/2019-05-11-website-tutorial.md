---
layout: post
title: "Website Tutorial"
date: 2019-05-11
excerpt: "teach you the syntax of this website."
tags: [markdown,syntax,jekyll]
feature: https://static1.squarespace.com/static/59e71dccf6576e2bd65ea29d/t/5a2a54c324a694e5fd1e492e/1512723777569/000069_R3.jpg
comments: true
---

## Tables

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: rules="groups"}


{% highlight markdown %}
| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: rules="groups"}
{% endhighlight %}  

## MathJax
先將`_config.yml`file 設定.
~~~
markdown: kramdown
mathjax: true
~~~
設定完後就可以 support 了，大致分成兩種
* block: `\[ ... \]`
* inline: `\( ... \)`

例子如下  
~~~
[ \frac{1}{n^{2}} \\]
~~~
\\[ \frac{1}{n^{2}} \\]
~~~
( 1/x^{2} \\)
~~~
\\( 1/x^{2} \\)



## Buttons

<div markdown="0"><a href="#" class="btn">Primary Button</a></div>
<div markdown="0"><a href="#" class="btn btn-success">Success Button</a></div>
<div markdown="0"><a href="#" class="btn btn-warning">Warning Button</a></div>
<div markdown="0"><a href="#" class="btn btn-danger">Danger Button</a></div>
<div markdown="0"><a href="#" class="btn btn-info">Info Button</a></div>

{% highlight html %}
<div markdown="0"><a href="#" class="btn">Primary Button</a></div>
<div markdown="0"><a href="#" class="btn btn-success">Success Button</a></div>
<div markdown="0"><a href="#" class="btn btn-warning">Warning Button</a></div>
<div markdown="0"><a href="#" class="btn btn-danger">Danger Button</a></div>
<div markdown="0"><a href="#" class="btn btn-info">Info Button</a></div>
{% endhighlight %}

## KBD

<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> 

{% highlight html %}
<kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
{% endhighlight %}

## Notices

**Watch out!** You can also add notices by appending `{: .notice}` to a paragraph.
{: .notice}

{% highlight markdown %}
**Watch out!** You can also add notices by appending `{: .notice}` to a paragraph.
{: .notice}
{% endhighlight %}

## image 
**[normal]**
![Smithsonian Image](https://i.ytimg.com/vi/FZQ74J_JDsU/hqdefault.jpg)
{: .image}

{% highlight html %}
![Smithsonian Image](https://i.ytimg.com/vi/FZQ74J_JDsU/hqdefault.jpg)
{: .image} //中間
{: .image-right} //右
{: .image-left}  //左
{% endhighlight %}

**[html]**
<figure>
	<a href="https://i.ytimg.com/vi/cgeijHtv0ic/sddefault.jpg#404_is_fine"><img src="https://i.ytimg.com/vi/cgeijHtv0ic/sddefault.jpg#404_is_fine"></a>
	<figcaption><a href="https://www.youtube.com/watch?v=cgeijHtv0ic" title="[MV] offonoff - gold (Feat. DEAN)">[MV] offonoff - gold (Feat. DEAN)</a>.</figcaption>
</figure>
{% highlight html %}
<figure>
	<a href="https://i.ytimg.com/vi/cgeijHtv0ic/sddefault.jpg#404_is_fine"><img src="https://i.ytimg.com/vi/cgeijHtv0ic/sddefault.jpg#404_is_fine"></a>
	<figcaption><a href="https://www.youtube.com/watch?v=cgeijHtv0ic" title="[MV] offonoff - gold (Feat. DEAN)">[MV] offonoff - gold (Feat. DEAN)</a>.</figcaption>
</figure>
{% endhighlight %}

**[two up]**
<figure class="half">
    <a href="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"><img src="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"></a>
    <a href="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"><img src="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"></a>
    <figcaption>兩張 loco album cover image.</figcaption>
</figure>

使用 `half` class,如果3張就是 `third` class 以此類推

{% highlight html %}
<figure class="half">
    <a href="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"><img src="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"></a>
    <a href="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"><img src="https://s.mxmcdn.net/images-storage/albums4/4/4/5/1/8/2/35281544_350_350.jpg"></a>
    <figcaption>兩張 loco album cover image.</figcaption>
</figure>
{% endhighlight %}

**[Alternative way]**

{% capture images %}
	https://i.pinimg.com/originals/44/1b/02/441b02811d3525601de7857527df3a1f.jpg
	https://is4-ssl.mzstatic.com/image/thumb/Music7/v4/ee/4c/ff/ee4cff26-b163-4230-bbf4-748fdb06f4f3/source/1200x1200bb.jpg
	https://scontent-frx5-1.cdninstagram.com/vp/3ade04e0e30c159309b039302372481e/5D24134E/t51.2885-15/e35/37989058_450583858778413_7972728842169090048_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&se=7&ig_cache_key=MTg0NTA5MjEyMDMxOTQ3Njc5MA%3D%3D.2
{% endcapture %}
{% include gallery images=images caption="jaypark / dean / sik-k" cols=3 %}

使用`gallery`Liquid template,就不用 html tag.
* `cpation`: 就是`figcaption`的意思
* `cols`: 設定一行可以放幾張圖片
{% highlight liquid %}
{% raw %}
{% capture images %}
	https://i.pinimg.com/originals/44/1b/02/441b02811d3525601de7857527df3a1f.jpg
	https://is4-ssl.mzstatic.com/image/thumb/Music7/v4/ee/4c/ff/ee4cff26-b163-4230-bbf4-748fdb06f4f3/source/1200x1200bb.jpg
	https://scontent-frx5-1.cdninstagram.com/vp/3ade04e0e30c159309b039302372481e/5D24134E/t51.2885-15/e35/37989058_450583858778413_7972728842169090048_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&se=7&ig_cache_key=MTg0NTA5MjEyMDMxOTQ3Njc5MA%3D%3D.2
{% endcapture %}
{% include gallery images=images caption="jaypark / dean / sik-k" cols=3 %}
{% endraw %}
{% endhighlight %}

## Video
<iframe width="560" height="315" src="//www.youtube.com/embed/Q8AK_wfGhkg" frameborder="0"> </iframe>
請記得將網址的`/watch..`改成`embed/..`
{% highlight html %}
<iframe width="560" height="315" src="//www.youtube.com/embed/Q8AK_wfGhkg" frameborder="0"> </iframe>
{% endhighlight %}
