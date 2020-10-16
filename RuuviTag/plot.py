import csv
import matplotlib.pyplot as plt
from matplotlib.ticker import FormatStrFormatter
import numpy as np

acc_x, acc_y, acc_z = [], [], []

with open('data.csv') as csvfile:
    reader = csv.reader(csvfile, delimiter = ' ')
    for row in reader:
        if(row != []):
            acc_x.append(float(row[0]))
            acc_y.append(float(row[1]))
            acc_z.append(float(row[2]))

plt.title("Acceleration")
plt.plot(acc_x, label = 'x-axis', linewidth = 1)
plt.plot(acc_y, label = 'y-axis', linewidth = 1)
plt.plot(acc_z, label = 'z-axis', linewidth = 1)
plt.gca().yaxis.set_major_formatter(FormatStrFormatter('%d g'))
plt.legend()

plt.show()
