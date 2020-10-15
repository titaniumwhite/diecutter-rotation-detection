import csv
import matplotlib.pyplot as plt
from matplotlib.ticker import FormatStrFormatter
import numpy as np

acc_x, acc_y, acc_z = [], [], []
gyro_x, gyro_y, gyro_z = [], [], []
pitch, roll = [], []
flag = 0

with open('data.csv') as csvfile:
    reader = csv.reader(csvfile, delimiter = ' ')
    for row in reader:
        if(row != []):
            acc_x.append(float(row[0]))
            acc_y.append(float(row[1]))
            acc_z.append(float(row[2]))
            gyro_x.append(float(row[3]))
            gyro_y.append(float(row[4]))
            gyro_z.append(float(row[5]))
            pitch.append(float(row[6]))
            roll.append(float(row[7]))

fig, axs = plt.subplots(3)

axs[0].title.set_text("Acceleration")
axs[0].plot(acc_x, label = 'x-axis', linewidth = 1)
axs[0].plot(acc_y, label = 'y-axis', linewidth = 1)
axs[0].plot(acc_z, label = 'z-axis', linewidth = 1)
axs[0].yaxis.set_major_formatter(FormatStrFormatter('%d g'))
axs[0].legend()

axs[1].title.set_text("Angular Speed")
axs[1].plot(gyro_x, label = 'x-axis', linewidth = 1)
axs[1].plot(gyro_y, label = 'y-axis', linewidth = 1)
axs[1].plot(gyro_z, label = 'z-axis', linewidth = 1)
axs[1].yaxis.set_major_formatter(FormatStrFormatter('%d deg/s'))
axs[1].legend()

axs[2].title.set_text("Sensor Fusion")
axs[2].plot(pitch, label = 'x-axis', linewidth = 1)
axs[2].plot(roll, label = 'y-axis', linewidth = 1)
axs[2].yaxis.set_major_formatter(FormatStrFormatter('%d deg/s'))
axs[2].legend()


plt.show()
