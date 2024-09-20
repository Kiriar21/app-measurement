import csv
from datetime import datetime, timedelta
import time
import random
import os

def start_data_generator(filename="start.001", chip_start=1, chip_end=1, time_start="00:00:00.000000", real_measurement_time=False, impuls = 1, duration=0.1):
    
    current_directory = os.path.dirname(os.path.abspath(__file__))  
    target_directory = os.path.abspath(os.path.join(current_directory, "..", "..", "backend", "uploads")) 
    if not os.path.exists(target_directory):
        return
    
    filename = filename.split(".")[0] + ".001" if filename.split(".")[len(filename.split(".")) - 1] != "001" else filename
    
    chip_start = 1 if chip_start < 1 else chip_start
    chip_start = 1000 if chip_start > 1000 else chip_start
    
    chip_end = 1 if chip_end < 1 else chip_end
    chip_end = 1000 if chip_end > 1000 else chip_end
    
    chip_start = chip_end if chip_start > chip_end else chip_start
    
    time_start = "00:00:00.000000" if datetime.strptime(time_start, "%H:%M:%S.%f") < datetime.strptime("00:00:00.000000", "%H:%M:%S.%f") else time_start
    time_start = "00:00:00.000000" if datetime.strptime(time_start, "%H:%M:%S.%f") > datetime.strptime("23:59:59.999999", "%H:%M:%S.%f") else time_start    
    
    impuls = 1 if impuls < 1 else impuls
    impuls = 5 if impuls > 5 else impuls
    
    duration = 0.1 if duration < 0.1 else duration
    duration = 3 if duration > 3 else duration
    
    current_time = datetime.strptime(time_start, "%H:%M:%S.%f")
    
    filepath = os.path.join(target_directory, filename)
    
    with open(filepath, 'w', newline='') as csvfile:
        
        csvwriter = csv.writer(csvfile)
        number = 1
        
        for imp in range(1, impuls+1):
            for nr_chip in range(chip_start, chip_end + 1):
                record_time = current_time + timedelta(seconds=number * (duration**2) + random.randint(0, 30))
                record = [
                    "NAME",
                    number,
                    filename.split(".")[0],
                    nr_chip,
                    record_time.strftime("%H:%M:%S.%f")[:-3],
                    imp,
                    "NAME",
                    4
                ]
                csvwriter.writerow(record)
                csvfile.flush()
                number += 1

                if real_measurement_time:
                    sleep_time = random.randint(1, 3)
                    time.sleep(sleep_time)


def meta_data_generator(filename="meta.001", chip_start=1, chip_end=1, time_end_start="00:00:00.000000", real_measurement_time=False, impuls = 1, duration=0.1):
    
    current_directory = os.path.dirname(os.path.abspath(__file__))  
    target_directory = os.path.abspath(os.path.join(current_directory, "..", "..", "backend", "uploads")) 
    if not os.path.exists(target_directory):
        return
    
    filename = filename.split(".")[0] + ".001" if filename.split(".")[len(filename.split(".")) - 1] != "001" else filename
    
    chip_start = 1 if chip_start < 1 else chip_start
    chip_start = 1000 if chip_start > 1000 else chip_start
    
    chip_end = 1 if chip_end < 1 else chip_end
    chip_end = 1000 if chip_end > 1000 else chip_end
    
    chip_start = chip_end if chip_start > chip_end else chip_start
    
    time_end_start = "00:00:00.000000" if datetime.strptime(time_end_start, "%H:%M:%S.%f") < datetime.strptime("00:00:00.000000", "%H:%M:%S.%f") else time_end_start
    time_end_start = "00:00:00.000000" if datetime.strptime(time_end_start, "%H:%M:%S.%f") > datetime.strptime("23:59:59.999999", "%H:%M:%S.%f") else time_end_start    
    
    impuls = 1 if impuls < 1 else impuls
    impuls = 5 if impuls > 5 else impuls
    
    duration = 0.1 if duration < 0.1 else duration
    duration = 3 if duration > 3 else duration
    
    current_time = datetime.strptime(time_end_start, "%H:%M:%S.%f")
    
    filepath = os.path.join(target_directory, filename)
    
    with open(filepath, 'w', newline='') as csvfile:
        
        csvwriter = csv.writer(csvfile)
        number = 1
        
        for imp in range(1, impuls+1):
            for nr_chip in range(chip_start, chip_end + 1):
                record_time = current_time + timedelta(seconds=number * (duration**2) + random.randint(0, 3600))
                record = [
                    "NAME",
                    number,
                    filename.split(".")[0],
                    nr_chip,
                    record_time.strftime("%H:%M:%S.%f")[:-3],
                    imp,
                    "NAME",
                    4
                ]
                csvwriter.writerow(record)
                csvfile.flush()
                number += 1

                if real_measurement_time:
                    sleep_time = random.randint(1, 3)
                    time.sleep(sleep_time)
                    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# filename - name of the file
# chip_start - number of the first chip
# chip_end - number of the last chip
# time_start - time of the start of the measurement in the format HH:MM:SS.ffffff
# real_measurement_time - if True, the measurement time is "real", because we have time break with generation data in range 1 to 3 seconds, if False, the measurement time is generated instantly
# impuls - number of impulses, how many impulses must be generated for each chip
# duration - duration of the measurement in seconds




def start_simple_data():
    start_data_generator(filename="Start_5KM_50.001",chip_start=1,chip_end=100,time_start="6:00:00.000000", real_measurement_time=False, impuls=1, duration=0.1)

def start_advanced_data():
    start_data_generator(filename="Start_5KM_100.001",chip_start=1,chip_end=200,time_start="6:00:00.000000", real_measurement_time=False, impuls=1, duration=1)
    start_data_generator(filename="Start_10KM_100.001",chip_start=1,chip_end=200,time_start="7:00:00.000000", real_measurement_time=False, impuls=1, duration=0.2)
    start_data_generator(filename="Start_21KM_100.001",chip_start=1,chip_end=200,time_start="8:00:00.000000", real_measurement_time=False, impuls=1, duration=0.5)
    start_data_generator(filename="Start_42KM_100.001",chip_start=1,chip_end=200,time_start="9:00:00.000000", real_measurement_time=False, impuls=1, duration=0.8)
    start_data_generator(filename="Start_8KM_100.001",chip_start=1,chip_end=200,time_start="10:00:00.000000", real_measurement_time=False, impuls=1, duration=0.4)
    start_data_generator(filename="Start_15KM_100.001",chip_start=1,chip_end=200,time_start="11:00:00.000000", real_measurement_time=False, impuls=1, duration=0.3)




def meta_simple_data():
    meta_data_generator(filename="Meta_5KM_50.001", chip_start=1, chip_end=100, time_end_start="6:15:00.000000", real_measurement_time=True, impuls = 1, duration=0.1)

def meta_advanced_data():
    meta_data_generator(filename="Meta_5KM_100.001", chip_start=1, chip_end=200, time_end_start="6:15:00.000000", real_measurement_time=False, impuls = 1, duration=1)
    meta_data_generator(filename="Meta_10KM_100.001", chip_start=1, chip_end=200, time_end_start="7:30:00.000000", real_measurement_time=False, impuls = 1, duration=0.2)
    meta_data_generator(filename="Meta_21KM_100.001", chip_start=1, chip_end=200, time_end_start="9:03:00.000000", real_measurement_time=False, impuls = 1, duration=0.5)
    meta_data_generator(filename="Meta_42KM_100.001", chip_start=1, chip_end=200, time_end_start="11:06:00.000000", real_measurement_time=False, impuls = 1, duration=0.8)
    meta_data_generator(filename="Meta_8KM_100.001", chip_start=1, chip_end=200, time_end_start="10:24:00.000000", real_measurement_time=False, impuls = 1, duration=1.2)
    meta_data_generator(filename="Meta_15KM_100.001", chip_start=1, chip_end=200, time_end_start="11:45:00.000000", real_measurement_time=False, impuls = 1, duration=2)
    



# Ready data start generator for simple classification 
start_simple_data()
meta_simple_data()

# Ready data start generator for advanced classifications
# start_advanced_data()
# meta_advanced_data()



