---
layout: post
title: "tensorflow tutorial"
date: 2019-05-11
excerpt: "install & implement tensorflow."
tags: [tensorflow]
feature: https://img.technews.tw/wp-content/uploads/2019/03/08115249/542452521.jpg
comments: true
---

本文翻自 <a href="https://www.tensorflow.org/tutorials/images/hub_with_keras" title="tensorflow">tensorflow</a> , 將學習過程紀錄於此.
{: .notice}

## 設定
{% highlight python %}
!pip install -q tensorflow_hub
{% endhighlight %}  

{% highlight python %}
from __future__ import absolute_import, division, print_function

import matplotlib.pylab as plt

import tensorflow as tf
import tensorflow_hub as hub

from tensorflow.keras import layers

tf.VERSION
{% endhighlight %}  