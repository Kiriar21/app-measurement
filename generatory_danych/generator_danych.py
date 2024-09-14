import pandas as pd
import random
from faker import Faker
from datetime import datetime, timedelta
import re

fake = Faker('pl_PL')

def generate_birth_date(age):
    today = datetime.today()
    start_date = today - timedelta(days=(age * 365))
    end_date = today - timedelta(days=((age + 1) * 365))
    return fake.date_of_birth(minimum_age=age, maximum_age=age).strftime('%Y-%m-%d')

def generate_phone_number():
    phone_number = fake.phone_number()
    phone_number = re.sub(r'\D', '', phone_number)
    if len(phone_number) > 9:
        phone_number = phone_number[:9]
    return phone_number

num_players = 120
classifications = ['8KM','10KM','21KM','42KM']

categories = ['K16-29', 'M16-29', 'K30-49', 'M30-49', 'K50-69', 'M50-69', 'K70-99', 'M70-99']

data = []
for i in range(1, num_players + 1):
    gender = random.choice(['M', 'K'])
    age = random.randint(16, 99)
    
    matching_categories = [c for c in categories if c.startswith(gender) and int(c[1:3]) <= age <= int(c[4:6])]
    category = matching_categories[0] if matching_categories else 'Brak kategorii'

    row = {
        'NrZawodnika': i,
        'NrChip': i,
        'Klasyfikacja': random.choice(classifications),
        'Kategoria': category,
        'Imie': fake.first_name_male() if gender == 'M' else fake.first_name_female(),
        'Nazwisko': fake.last_name(),
        'Plec': gender,
        'Wiek': age,
        'DataUrodzenia': generate_birth_date(age),
        'Panstwo': 'POL',
        'Miasto': fake.city(),
        'NazwaKlubu': fake.city() + ' Running Team',
        'Telefon': generate_phone_number(),
    }

    data.append(row)

df = pd.DataFrame(data)

df.to_csv('50competitors.csv', index=False, sep=',', encoding='1250')
print("Plik CSV został wygenerowany.")
