# AQUISIÇÃO DE DADOS
# CARREGANDO LIBRARIES
#!pip install sklearn
from sklearn import datasets
iris = datasets.load_iris()
# https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html

help(datasets.load_iris)

# PRÉ-PROCESSAMENTO (PREPROCESSING) / ANÁLISE EXPLORATÓRIA
iris.feature_names

# DADOS QUE TEMOS
iris.data 

# O QUE DEVEMOS PREVER? SEMPRE SEPARAR OS DADOS DAS RESPOSTAS!
iris.target

# GERALMENTE...
import pandas as pd
dataset = pd.read_csv('https://gist.githubusercontent.com/netj/8836201/raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/iris.csv')
dataset.head()

# DATAVIZ
from matplotlib import pyplot as plt

# Índices das nossas features x/y
x_index = 0 
y_index = 1

# Barra colorida de acordo com a target
formatter = plt.FuncFormatter(lambda i, *args: iris.target_names[int(i)])

# Preparamos infos sobre o gráfico
plt.figure(figsize=(10, 6)) # tamanho da figura
plt.scatter(iris.data[:, x_index], iris.data[:, y_index], c=iris.target) # tipo de gráfico
plt.colorbar(ticks=[0, 1, 2], format=formatter) # cores
plt.xlabel(iris.feature_names[x_index]) # eixo X (horizontal)
plt.ylabel(iris.feature_names[y_index]) # eixo Y (vertical)

# extraia insights/compartilhe com o mundo!
plt.tight_layout()
plt.show()

x = iris.data
y = iris.target


from sklearn.model_selection import train_test_split
# x_train contém os recursos de treinamento 
# x_test contém os recursos de teste 
# y_train contém o rótulo de treinamento 
# y_test contém os rótulos de teste

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=.5)


from sklearn import tree
classifier=tree.DecisionTreeClassifier()

classifier.fit(x_train,y_train)


predictions=classifier.predict(x_test)

from sklearn.metrics import accuracy_score
print(accuracy_score(y_test,predictions))

from sklearn import neighbors
classifier2=neighbors.KNeighborsClassifier()

classifier2.fit(x_train,y_train)

predictions2=classifier2.predict(x_test)

from sklearn.metrics import accuracy_score
print(accuracy_score(y_test,predictions2))