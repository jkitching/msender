import os 
import requests
import json

dir_path = os.path.dirname(os.path.realpath(__file__))
# https://api.gouv.fr/api/api-geo.html
d = requests.get('https://geo.api.gouv.fr/departements?fields=nom,code,region').json()

d = {
  dep.get('code'):{
    'name': dep.get('nom'),
    'code': dep.get('code'),
    'region': {
      'name': dep.get('region', {}).get('nom'),
      'code': dep.get('region', {}).get('code'),
    }
  } for dep in d
}

with open(os.path.join(dir_path, '../src/models/departements.json'), 'w') as f:
  json.dump(d, f, indent=2, ensure_ascii=False)
