---
layout: post
title: Calculate GPA using Python
date: 2019-07-13
categories: Python
---


```python
import pandas as pd
excel_path = 'GPA.xlsx'
d = pd.read_excel(excel_path, sheetname=None)
```

    D:\anacorda\lib\site-packages\pandas\io\excel.py:329: FutureWarning: The `sheetname` keyword is deprecated, use `sheet_name` instead
      **kwds)
    


```python
df = pd.DataFrame(d['Sheet1'],columns=['學年度學期','選別', '科目名稱', '學分','成績','GPA 4.3','GPA 4.0'])
df.head(5)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>學年度學期</th>
      <th>選別</th>
      <th>科目名稱</th>
      <th>學分</th>
      <th>成績</th>
      <th>GPA 4.3</th>
      <th>GPA 4.0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1072</td>
      <td>選修</td>
      <td>機器學習</td>
      <td>3</td>
      <td>80</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1072</td>
      <td>選修</td>
      <td>進階資料結構</td>
      <td>3</td>
      <td>99</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1072</td>
      <td>選修</td>
      <td>金融交易系統</td>
      <td>3</td>
      <td>96</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1071</td>
      <td>必修</td>
      <td>專題(二)</td>
      <td>1</td>
      <td>90</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1071</td>
      <td>必修</td>
      <td>專業倫理-科技倫理</td>
      <td>2</td>
      <td>90</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



# 換算成積至4.3/4.0


```python
def four_point_three(grade):
    if grade>=90:
        return 4.3
    elif grade<=89 and grade>=85:
        return 4
    elif grade<=84 and grade>=80:
        return 3.7
    elif grade<=79 and grade>=77:
        return 3.3
    elif grade<=76 and grade>=73:
        return 3.0
    elif grade<=72 and grade>=70:
        return 2.7
    elif grade<=69 and grade>=67:
        return 2.3
    elif grade<=66 and grade>=63:
        return 2.0
    elif grade<=62 and grade>=60:
        return 1.7
    else:
        return 0.0
    
def four(grade):
    if grade>=80:
        return 4.0
    elif grade<=79 and grade>=70:
        return 3.0
    elif grade<=69 and grade>=60:
        return 2.0
    else:
        return 0.0
```


```python
gpa_four_point_three = []
for i in df['成績'][0:len(df)]:
    gpa_four_point_three.append(four_point_three(i))
    
gpa_four = []
for i in df['成績'][0:len(df)]:
    gpa_four.append(four(i))
```


```python
df['GPA 4.3'] = gpa_four_point_three
df['GPA 4.0'] = gpa_four
df.head(5) 
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>學年度學期</th>
      <th>選別</th>
      <th>科目名稱</th>
      <th>學分</th>
      <th>成績</th>
      <th>GPA 4.3</th>
      <th>GPA 4.0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1072</td>
      <td>選修</td>
      <td>機器學習</td>
      <td>3</td>
      <td>80</td>
      <td>3.7</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1072</td>
      <td>選修</td>
      <td>進階資料結構</td>
      <td>3</td>
      <td>99</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1072</td>
      <td>選修</td>
      <td>金融交易系統</td>
      <td>3</td>
      <td>96</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1071</td>
      <td>必修</td>
      <td>專題(二)</td>
      <td>1</td>
      <td>90</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1071</td>
      <td>必修</td>
      <td>專業倫理-科技倫理</td>
      <td>2</td>
      <td>90</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
#算總學分
def sum_credit(df):
    credit = 0
    for i in df['學分']:
        credit += i
    return credit

#算成績的
def calculate_grade(df,grade_mode):
    grade = 0
    for i in range(len(df)):
        grade += ( df['學分'][i] * df[grade_mode][i])
    grade /= sum_credit(df)
    return grade

#印出 100 , 4.3 , 4.0 版本
def print_grade(df,grade):
    print("%s" %(grade))
    print("成績總平均 = %.2f" %(calculate_grade(df,'成績')))
    print("GPA 4.3 = %.2f"  %(calculate_grade(df,'GPA 4.3')))
    print("GPA 4.0 = %.2f"  %(calculate_grade(df,'GPA 4.0')))
```

# MAJOR


```python
fliter = (df['選別'] == "必修\u3000")
major = df[fliter] #major's df
major.reset_index(drop=True,inplace=True)
major.head(5)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>學年度學期</th>
      <th>選別</th>
      <th>科目名稱</th>
      <th>學分</th>
      <th>成績</th>
      <th>GPA 4.3</th>
      <th>GPA 4.0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1071</td>
      <td>必修</td>
      <td>專題(二)</td>
      <td>1</td>
      <td>90</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1071</td>
      <td>必修</td>
      <td>專業倫理-科技倫理</td>
      <td>2</td>
      <td>90</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1062</td>
      <td>必修</td>
      <td>專題(一)</td>
      <td>1</td>
      <td>90</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1062</td>
      <td>必修</td>
      <td>數值方法</td>
      <td>3</td>
      <td>94</td>
      <td>4.3</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1062</td>
      <td>必修</td>
      <td>編譯器設計</td>
      <td>3</td>
      <td>86</td>
      <td>4.0</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>
</div>



# Last 60


```python
def last60(df):
    limit = 0 # 計算是否會超過 60 的上限
    count = 0 # 計算總共幾個科目

    for i in range(len(df)):
        limit+= df['學分'][i]
        count+=1
        if limit >= 60:
            break
    return df[0:count]

Last60 = last60(df) #last60's df
```


```python
#df=overall , major , Last60
print_grade(df,'Overall')
print_grade(major,'Major')
print_grade(Last60,'Last 60')
```

    Overall
    成績總平均 = 85.43
    GPA 4.3 = 3.84
    GPA 4.0 = 3.71
    Major
    成績總平均 = 83.36
    GPA 4.3 = 3.65
    GPA 4.0 = 3.57
    Last 60
    成績總平均 = 88.64
    GPA 4.3 = 3.97
    GPA 4.0 = 3.85
    


