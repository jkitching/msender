import Department, { getDepartments,
                     DEPARTMENT_MODE_DEFAULT,
                     DEPARTMENT_MODE_METROPOLITAN,
                     DEPARTMENT_MODE_LEGISLATIVE,
                     DEPARTMENT_TYPE_METROPOLITAN,
                     DEPARTMENT_TYPE_DROM } from '../department'

test('getDepartments default', () => {
  const departments = getDepartments(DEPARTMENT_MODE_DEFAULT)
  const depCodes = departments.map(dep => dep.get('code'))
                              .toSet()
  // 101 count according to:
  // https://fr.wikipedia.org/wiki/Liste_des_d%C3%A9partements_fran%C3%A7ais
  expect(depCodes.count()).toBe(101);

  // they should all be metropolitan or drom
  expect(departments.toList().reduce((acc, dep) => {
    return acc && (dep.get('type') === DEPARTMENT_TYPE_METROPOLITAN ||
                   dep.get('type') === DEPARTMENT_TYPE_DROM)
  }, true)).toBeTruthy();

  // test some departments
  expect(departments.filter(dep => dep.get('code') === '75').first().get('name')).toEqual('Paris');
  expect(departments.filter(dep => dep.get('code') === '75').first().get('code')).toEqual('75');
  expect(departments.filter(dep => dep.get('code') === '75').first().getIn(['region', 'name'])).toEqual('Île-de-France');

  // test sorting
  expect(departments.map(dep => dep.get('code')).slice(0, 23).toArray()).toEqual(
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2A', '2B', '21', '22']
  )

  expect(depCodes.contains('01')).toBeTruthy(); // Ain
  expect(depCodes.contains('75')).toBeTruthy(); // Paris
  expect(depCodes.contains('2A')).toBeTruthy(); // Corsica
  expect(depCodes.contains('2B')).toBeTruthy(); // Corsica
  expect(depCodes.contains('971')).toBeTruthy(); // Guadeloupe
  expect(depCodes.contains('972')).toBeTruthy(); // Martinique
  expect(depCodes.contains('973')).toBeTruthy(); // Guyane
  expect(depCodes.contains('974')).toBeTruthy(); // Réunion
  expect(depCodes.contains('975')).toBeFalsy(); // Saint-Pierre-et-Miquelon
  expect(depCodes.contains('976')).toBeTruthy(); // Mayotte
  expect(depCodes.contains('977')).toBeFalsy(); // Saint-Barthélemy
  expect(depCodes.contains('978')).toBeFalsy(); // Saint-Martin
  expect(depCodes.contains('986')).toBeFalsy(); // Wallis-et-Futuna
  expect(depCodes.contains('987')).toBeFalsy(); // Polynésie Française
  expect(depCodes.contains('988')).toBeFalsy(); // Nouvelle-Calédonie
  expect(depCodes.contains('999')).toBeFalsy(); // Français établis hors de France
});

test('getDepartments metropolitan', () => {
  const departments = getDepartments(DEPARTMENT_MODE_METROPOLITAN)
  const depCodes = departments.map(dep => dep.get('code'))
                              .toSet()
  // 96 count according to:
  // https://fr.wikipedia.org/wiki/Liste_des_d%C3%A9partements_fran%C3%A7ais
  expect(depCodes.count()).toBe(96);

  // they should all be metropolitan
  expect(departments.toList().reduce((acc, dep) => {
    return acc && dep.get('type') === DEPARTMENT_TYPE_METROPOLITAN
  }, true)).toBeTruthy();

  // test sorting
  expect(departments.map(dep => dep.get('code')).slice(0, 23).toArray()).toEqual(
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2A', '2B', '21', '22']
  )

  expect(depCodes.contains('01')).toBeTruthy(); // Ain
  expect(depCodes.contains('75')).toBeTruthy(); // Paris
  expect(depCodes.contains('2A')).toBeTruthy(); // Corsica
  expect(depCodes.contains('2B')).toBeTruthy(); // Corsica
  expect(depCodes.contains('971')).toBeFalsy(); // Guadeloupe
  expect(depCodes.contains('972')).toBeFalsy(); // Martinique
  expect(depCodes.contains('973')).toBeFalsy(); // Guyane
  expect(depCodes.contains('974')).toBeFalsy(); // Réunion
  expect(depCodes.contains('975')).toBeFalsy(); // Saint-Pierre-et-Miquelon
  expect(depCodes.contains('976')).toBeFalsy(); // Mayotte
  expect(depCodes.contains('977')).toBeFalsy(); // Saint-Barthélemy
  expect(depCodes.contains('978')).toBeFalsy(); // Saint-Martin
  expect(depCodes.contains('986')).toBeFalsy(); // Wallis-et-Futuna
  expect(depCodes.contains('987')).toBeFalsy(); // Polynésie Française
  expect(depCodes.contains('988')).toBeFalsy(); // Nouvelle-Calédonie
  expect(depCodes.contains('999')).toBeFalsy(); // Français établis hors de France
});

test('getDepartments legislative', () => {
  const departments = getDepartments(DEPARTMENT_MODE_LEGISLATIVE)
  const depCodes = departments.map(dep => dep.get('code'))
                              .toSet()
  // 101 departments + 5 (COM) + 1 (New Caledonia) + 1 (French living abroad)
  expect(depCodes.count()).toBe(108);

  // test some departments
  expect(departments.filter(dep => dep.get('code') === '75').first().get('name')).toEqual('Paris');
  expect(departments.filter(dep => dep.get('code') === '75').first().get('code')).toEqual('75');
  expect(departments.filter(dep => dep.get('code') === '75').first().getIn(['region', 'name'])).toEqual('Île-de-France');
  expect(departments.filter(dep => dep.get('code') === '975').first().get('name')).toEqual('Saint-Pierre-et-Miquelon');
  expect(departments.filter(dep => dep.get('code') === '975').first().get('code')).toEqual('975');
  expect(departments.filter(dep => dep.get('code') === '975').first().get('region')).toBeNull();

  // test sorting
  expect(departments.map(dep => dep.get('code')).slice(0, 23).toArray()).toEqual(
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2A', '2B', '21', '22']
  )
  expect(departments.map(dep => dep.get('code')).reverse().slice(0, 3).toArray()).toEqual(
    ['999', '988', '987']
  )

  expect(depCodes.contains('01')).toBeTruthy(); // Ain
  expect(depCodes.contains('75')).toBeTruthy(); // Paris
  expect(depCodes.contains('2A')).toBeTruthy(); // Corsica
  expect(depCodes.contains('2B')).toBeTruthy(); // Corsica
  expect(depCodes.contains('971')).toBeTruthy(); // Guadeloupe
  expect(depCodes.contains('972')).toBeTruthy(); // Martinique
  expect(depCodes.contains('973')).toBeTruthy(); // Guyane
  expect(depCodes.contains('974')).toBeTruthy(); // Réunion
  expect(depCodes.contains('975')).toBeTruthy(); // Saint-Pierre-et-Miquelon
  expect(depCodes.contains('976')).toBeTruthy(); // Mayotte
  expect(depCodes.contains('977')).toBeTruthy(); // Saint-Barthélemy
  expect(depCodes.contains('978')).toBeTruthy(); // Saint-Martin
  expect(depCodes.contains('986')).toBeTruthy(); // Wallis-et-Futuna
  expect(depCodes.contains('987')).toBeTruthy(); // Polynésie Française
  expect(depCodes.contains('988')).toBeTruthy(); // Nouvelle-Calédonie
  expect(depCodes.contains('999')).toBeTruthy(); // Français établis hors de France
});
