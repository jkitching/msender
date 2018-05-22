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
    },
    'type': ('drom' if len(dep.get('code')) == 3 else 'metropolitan'),
  } for dep in d
}

d.update({
  '975': {
    'name': 'Saint-Pierre-et-Miquelon',
    'code': '975',
    'region': None,
    'type': 'com',
  },
  '977': {
    'name': 'Saint-Barthélemy',
    'code': '977',
    'region': None,
    'type': 'com',
  },
  '978': {
    'name': 'Saint-Martin',
    'code': '978',
    'region': None,
    'type': 'com',
  },
  '986': {
    'name': 'Wallis-et-Futuna',
    'code': '986',
    'region': None,
    'type': 'com',
  },
  '987': {
    'name': 'Polynésie française',
    'code': '987',
    'region': None,
    'type': 'com',
  },
  '988': {
    'name': 'Nouvelle-Calédonie',
    'code': '988',
    'region': None,
    'type': 'nc',
  },
  '999': {
    'name': 'Français établis hors de France',
    'code': '999',
    'region': None,
    'type': 'foreign',
  },
})

with open(os.path.join(dir_path, '../src/models/departements.json'), 'w') as f:
  json.dump(d, f, indent=2, ensure_ascii=False)
