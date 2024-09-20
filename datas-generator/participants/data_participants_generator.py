import pandas as pd
import random
from faker import Faker
from datetime import datetime, timedelta
import re

fake = Faker('pl_PL')

def generate_birth_date(age):
    return fake.date_of_birth(minimum_age=age, maximum_age=age).strftime('%Y-%m-%d')

def generate_phone_number():
    phone_number = fake.phone_number()
    phone_number = re.sub(r'\D', '', phone_number)
    if len(phone_number) > 9:
        phone_number = phone_number[:9]
    return phone_number

classifications = ['5KM','10KM','21KM','42KM','8KM','15KM']
categories_advanced = ['K16-29', 'M16-29', 'K30-49', 'M30-49', 'K50-69', 'M50-69', 'K70-99', 'M70-99']
categories_simple = ['K16-99', 'M16-99']

def generate_data(num_players=1, num_classifications=1, categories=categories_simple, name=""):
    
    name = str(num_players) + "competitors.csv" if name == "" else name
    
    data = []
    
    num_players = 1000 if num_players > 1000 else num_players
    num_players = 1 if num_players < 1 else num_players
    
    num_classifications = len(classifications) if num_classifications > len(classifications) else num_classifications
    num_classifications = 1 if num_classifications < 1 else num_classifications
    
    for i in range(1, num_players + 1):
        gender = random.choice(['M', 'K'])
        age = random.randint(16, 99)
        
        matching_categories = [c for c in categories if c.startswith(gender) and int(c[1:3]) <= age <= int(c[4:6])]
        category = matching_categories[0] if matching_categories else 'Brak kategorii'

        row = {
            'NrZawodnika': i,
            'NrChip': i,
            'Klasyfikacja': random.choice(classifications[0:num_classifications]),
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
    df.to_csv(name, index=False, sep=';', encoding='1250')


generate_data(num_players=100, num_classifications=1, categories=categories_simple)
# generate_data(num_players=200, num_classifications=4, categories=categories_advanced, name="competitors_advanced.csv")

# num_players - how many players will be generated
# num_classifications - how many classifications will be generated (default 1, max 6)
# categories = categories_simple (2 basic categories) or categories_advanced (8 advanced categories)
# name - name of the file to save the data