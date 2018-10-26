import os 
import requests
import json
import csv

# source
# https://docs.google.com/spreadsheets/d/10KSZ4wJpk_Lp_2QuT4-MzAyV495jFP_h4J3Wj2w8fIc/edit#gid=0

dir_path = os.path.dirname(os.path.realpath(__file__))

d = []

def clean_department(dep):
  dep = dep.strip()
  if len(dep) == 0:
    raise ValueError('Empty department value')
  elif len(dep) == 1:
    return '0' + dep
  return dep

with open(os.path.join(dir_path, '../src/stories/stubs/deputies-france.csv'), newline='') as f:
  reader = csv.reader(f, delimiter=',', quotechar='|')
  next(reader, None) # headers
  for row in reader:
    d.append({
      'first_name': row[2].strip(),
      'last_name': row[3].strip(),
      'email': row[5].strip(),
      'gender': ('f' if 'mme' in row[1].strip().lower() else 'm'),
      'format': 'titlefull',
      'department': clean_department(row[0]),
    })

with open(os.path.join(dir_path, '../src/stories/stubs/deputies-france.json'), 'w') as f:
  json.dump(d, f, indent=2, ensure_ascii=False)
