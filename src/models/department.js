import Immutable, { Record } from 'immutable'

import Region from './region'

import departments from './departements.json'

export default class Department extends Record({
  name: null,
  code: null,
  region: null,
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

export const getDepartments = () => {
  return Immutable.Map(departments)
                  .toSeq()
                  .sortBy(d => d.code)
                  .map(d => new Department({
                    name: d.name,
                    code: d.code,
                    region: new Region({
                      name: d.region.name,
                      code: d.region.code,
                    })
                  }))
                  .toList()
}
