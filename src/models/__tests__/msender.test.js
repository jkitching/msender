import Msender, { FILTER_RECIPIENT_ALL,
                  FILTER_RECIPIENT_MANUAL,
                  FILTER_RECIPIENT_DEPARTMENT,
                  FILTER_RECIPIENT_NONE } from '../msender'
import { getDepartments,
         DEPARTMENT_MODE_DEFAULT,
         DEPARTMENT_MODE_METROPOLITAN,
         DEPARTMENT_MODE_LEGISLATIVE } from '../department'
import { makeRecipientList } from '../recipient'


describe('getSelectDepartmentMode', () => {
  test('true', () => {
    expect(new Msender({
      select_department: true
    }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_DEFAULT)
  })

  test('false', () => {
    expect(new Msender({
      select_department: false
    }).getSelectDepartmentMode()).toBeNull()
  })

  test('null', () => {
    expect(new Msender({
      select_department: null
    }).getSelectDepartmentMode()).toBeNull()
  })

  test('default', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_DEFAULT
    }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_DEFAULT)
  })

  test('metropolitan', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_METROPOLITAN
    }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_METROPOLITAN)
  })

  test('legislative', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_LEGISLATIVE
    }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_LEGISLATIVE)
  })
})


describe('getDepartments', () => {
  test('default', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_DEFAULT
    }).getDepartments().count()).toEqual(101)
  })

  test('metropolitan', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_METROPOLITAN
    }).getDepartments().count()).toEqual(96)
  })

  test('legislative', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_LEGISLATIVE
    }).getDepartments().count()).toEqual(108)
  })
})


describe('getToRecipients', () => {
  const to = makeRecipientList([
    {
      "organization": "E.Leclerc",
      "email": "service.conso@e-leclerc.com",
      "format": "org",
      "department": "75",
    },
    {
      "organization": "Intermarch??",
      "email": "intermarche@mousquetaires.com",
      "format": "org",
      "department": "01",
    }
  ])
  const department = getDepartments().find(dep => dep.get('code') === '01')

  test('all', () => {
    expect(new Msender({
      message_to: to,
      department: department,
    }).getToRecipients().toArray()).toEqual(to.toArray())
  })

  test('department', () => {
    expect(new Msender({
      message_to: to,
      department: department,
      filter_recipient: FILTER_RECIPIENT_DEPARTMENT,
    }).getToRecipients().toArray()).toEqual([to.get(1)])
  })

  test('manual one', () => {
    expect(new Msender({
      message_to: to,
      department: department,
      filter_recipient: FILTER_RECIPIENT_MANUAL,
      message_to_current: to.first(),
    }).getToRecipients().toArray()).toEqual([to.first()])
  })

  test('manual null', () => {
    expect(new Msender({
      message_to: to,
      department: department,
      filter_recipient: FILTER_RECIPIENT_MANUAL,
      message_to_current: null,
    }).getToRecipients().toArray()).toEqual([])
  })

  test('none', () => {
    expect(new Msender({
      message_to: to,
      department: department,
      filter_recipient: FILTER_RECIPIENT_NONE,
      message_to_current: null,
    }).getToRecipients().toArray()).toEqual([])
  })
})


describe('getToString', () => {
  const to = makeRecipientList([
    {
      "organization": "E.Leclerc",
      "email": "service.conso@e-leclerc.com",
      "format": "org",
    },
    {
      "organization": "Intermarch??",
      "email": "intermarche@mousquetaires.com",
      "format": "org",
    }
  ])

  test('all', () => {
    expect(new Msender({
      message_to: to,
    }).getToString()).toEqual('E.Leclerc <service.conso@e-leclerc.com>, Intermarch?? <intermarche@mousquetaires.com>')
  })
})


describe('getToEmailsString', () => {
  const to = makeRecipientList([
    {
      "organization": "E.Leclerc",
      "email": "service.conso@e-leclerc.com",
      "format": "org",
    },
    {
      "organization": "Intermarch??",
      "email": "intermarche@mousquetaires.com",
      "format": "org",
    }
  ])

  test('all', () => {
    expect(new Msender({
      message_to: to,
    }).getToEmailsString()).toEqual('service.conso@e-leclerc.com, intermarche@mousquetaires.com')
  })

  test('all with separator', () => {
    expect(new Msender({
      message_to: to,
    }).getToEmailsString(';')).toEqual('service.conso@e-leclerc.com;intermarche@mousquetaires.com')
  })
})


describe('enableDepartmentSelect', () => {
  test('department default', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_DEFAULT,
    }).enableDepartmentSelect()).toBeTruthy()
  })

  test('department metropolitan', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_METROPOLITAN,
    }).enableDepartmentSelect()).toBeTruthy()
  })

  test('department legislative', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_LEGISLATIVE,
    }).enableDepartmentSelect()).toBeTruthy()
  })

  test('department null', () => {
    expect(new Msender({
      select_department: null,
    }).enableDepartmentSelect()).toBeFalsy()
  })

  test('department default filter', () => {
    expect(new Msender({
      select_department: DEPARTMENT_MODE_DEFAULT,
      filter_recipient: FILTER_RECIPIENT_DEPARTMENT
    }).enableDepartmentSelect()).toBeTruthy()
  })

  test('department null filter', () => {
    expect(new Msender({
      select_department: null,
      filter_recipient: FILTER_RECIPIENT_DEPARTMENT,
    }).enableDepartmentSelect()).toBeTruthy()
  })
})


describe('enableRecipientSelect', () => {
  test('filter by all', () => {
    expect(new Msender({
      filter_recipient: FILTER_RECIPIENT_ALL,
    }).enableRecipientSelect()).toBeFalsy()
  })

  test('filter by manual', () => {
    expect(new Msender({
      filter_recipient: FILTER_RECIPIENT_MANUAL,
    }).enableRecipientSelect()).toBeTruthy()
  })

  test('filter by department', () => {
    expect(new Msender({
      filter_recipient: FILTER_RECIPIENT_DEPARTMENT,
    }).enableRecipientSelect()).toBeFalsy()
  })
})


describe('isInfosValid', () => {
  test('valid', () => {
    expect(new Msender({
      first_name: 'John',
      last_name: 'Appleseed',
      email: 'john@apple.com',
    }).isInfosValid()).toBeTruthy()
  })

  test('email invalid', () => {
    expect(new Msender({
      first_name: 'John',
      last_name: 'Appleseed',
      email: 'john@apple',
    }).isInfosValid()).toBeFalsy()
  })

  test('email empty', () => {
    expect(new Msender({
      first_name: 'John',
      last_name: 'Appleseed',
      email: '',
    }).isInfosValid()).toBeFalsy()
  })

  test('email null', () => {
    expect(new Msender({
      first_name: null,
      last_name: null,
      email: null,
    }).isInfosValid()).toBeFalsy()
  })

  test('undefined', () => {
    expect(new Msender({
      first_name: undefined,
      last_name: undefined,
      email: undefined,
    }).isInfosValid()).toBeFalsy()
  })

  test('empty strings', () => {
    expect(new Msender({
      first_name: '',
      last_name: '',
      email: '',
    }).isInfosValid()).toBeFalsy()
  })
})
