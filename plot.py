import csv
import matplotlib.pyplot as plt
import numpy as np

timestamp = []
acc_x, acc_y, acc_z = [], [], []
gyro_x, gyro_y, gyro_z = [], [], []
pitch, roll = [], []
flag = 0

with open('info.csv') as csvfile:
    reader = csv.reader(csvfile, delimiter = ' ')
    for row in reader:
        if(row != []):
            if(row[0] == 'C-Filter'):
                flag = 1
                continue
            if(flag == 0):
                timestamp.append(row[0])
                acc_x.append(float(row[1]))
                acc_y.append(float(row[2]))
                acc_z.append(float(row[3]))
                gyro_x.append(float(row[4]))
                gyro_y.append(float(row[5]))
                gyro_z.append(float(row[6]))
            else:
                pitch.append(float(row[0]))
                roll.append(float(row[1]))

fig, axs = plt.subplots(3)

axs[0].plot(acc_x, label = 'x-line', linewidth = 1)
axs[0].plot(acc_y, label = 'y-line', linewidth = 1)
axs[0].plot(acc_z, label = 'z-line', linewidth = 1)

axs[1].plot(gyro_x, label = 'x-line', linewidth = 1)
axs[1].plot(gyro_y, label = 'y-line', linewidth = 1)
axs[1].plot(gyro_z, label = 'z-line', linewidth = 1)

axs[2].plot(pitch, label = 'pitch', linewidth = 1)
axs[2].plot(roll, label = 'roll', linewidth = 1)

plt.show()
