import Immutable, { Record } from 'immutable'
import memoize from 'memoize-immutable'

import Region from './region'

import departments from './departements.json'

//
// Department Types
//

// Metropolitan Departments (including Corsica)
export const DEPARTMENT_TYPE_METROPOLITAN = 'metropolitan'

// Overseas department / Département et région ultramarin (DROM)
export const DEPARTMENT_TYPE_DROM = 'drom'

// Overseas collectivity / Collectivité d'outre-mer (COM)
export const DEPARTMENT_TYPE_COM = 'com'

// New Caledonia (special status) / Nouvelle-Calédonie
export const DEPARTMENT_TYPE_NC = 'nc'

// Constituencies for French residents overseas (legislative only)
// (Circonscriptions législatives des Français établis hors de France)
export const DEPARTMENT_TYPE_FOREIGN = 'foreign'

//
// Filter Modes
//

// Only "real" departments (Metropolitan and DROM)
export const DEPARTMENT_MODE_DEFAULT = 'default'

// Only metropolitan departments
export const DEPARTMENT_MODE_METROPOLITAN = 'metropolitan'

// All legislative departments
export const DEPARTMENT_MODE_LEGISLATIVE = 'legislative'

export default class Department extends Record({
  name: null,
  code: null,
  region: null,
  type: DEPARTMENT_TYPE_METROPOLITAN,
}) {
  getDisplayName() {
    return `${this.get('code')} - ${this.get('name')}`
  }
  getSelectOption() {
    return {
      value: this.get('code'),
      text: this.getDisplayName(),
    }
  }
}

export const filterDepartmentsFn = (mode = DEPARTMENT_MODE_DEFAULT) => (department) => {
  const type = department.get('type')
  switch (mode) {
    case DEPARTMENT_MODE_DEFAULT:
      return (type === DEPARTMENT_TYPE_METROPOLITAN ||
              type === DEPARTMENT_TYPE_DROM)
    case DEPARTMENT_MODE_METROPOLITAN:
      return type === DEPARTMENT_TYPE_METROPOLITAN
    case DEPARTMENT_MODE_LEGISLATIVE:
      return true
    default:
      return false
  }
}

const sortByDepartmentsFn = (department) => {
  const code = department.get('code')
  if (code === '2A') {
    return 20
  }
  else if (code === '2B') {
    return 20.1
  }
  return parseInt(code)
}

const getDepartmentsFn = (mode = DEPARTMENT_MODE_DEFAULT) => {
  return Immutable.Map(departments)
                  .toSeq()
                  .map(d => new Department({
                    name: d.name,
                    code: d.code,
                    region: (d.region ? new Region({
                      name: d.region.name,
                      code: d.region.code,
                    }) : null),
                    type: d.type,
                  }))
                  .sortBy(sortByDepartmentsFn)
                  .filter(filterDepartmentsFn(mode))
                  .toList()
}

export const getDepartments = memoize(getDepartmentsFn)
