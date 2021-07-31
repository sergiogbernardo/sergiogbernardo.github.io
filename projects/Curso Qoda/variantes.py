
import numpy as np
import pandas as pd 
import warnings
warnings.filterwarnings("ignore")
data_df = pd.read_csv("https://raw.githubusercontent.com/apenasweber/covid-19-variations-dataset/main/covid-variants.csv")

print(f"Columns: data_df.shape[1]: {list(data_df.columns)}")
print(f"Rows: {data_df.shape[0]}")
print(data_df.info())

data_df.head()

print(f"Países: {data_df.location.nunique()}")
print(f"Data: {data_df.date.nunique()}")
print(f"Variantes: {data_df.variant.nunique()}")

# DataViz