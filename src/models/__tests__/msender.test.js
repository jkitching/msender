import Msender, { msenderFromProps } from '../msender'
import { DEPARTMENT_MODE_DEFAULT,
         DEPARTMENT_MODE_METROPOLITAN,
         DEPARTMENT_MODE_LEGISLATIVE } from '../department'

test('getSelectDepartmentMode true', () => {
  expect(new Msender({
    select_department: true
  }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_DEFAULT)
})

test('getSelectDepartmentMode false', () => {
  expect(new Msender({
    select_department: false
  }).getSelectDepartmentMode()).toBeNull()
})

test('getSelectDepartmentMode default', () => {
  expect(new Msender({
    select_department: DEPARTMENT_MODE_DEFAULT
  }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_DEFAULT)
})

test('getSelectDepartmentMode metropolitan', () => {
  expect(new Msender({
    select_department: DEPARTMENT_MODE_METROPOLITAN
  }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_METROPOLITAN)
})

test('getSelectDepartmentMode legislative', () => {
  expect(new Msender({
    select_department: DEPARTMENT_MODE_LEGISLATIVE
  }).getSelectDepartmentMode()).toEqual(DEPARTMENT_MODE_LEGISLATIVE)
})

test('getDepartments default', () => {
  expect(new Msender({
    select_department: DEPARTMENT_MODE_DEFAULT
  }).getDepartments().count()).toEqual(101)
})

test('getDepartments metropolitan', () => {
  expect(new Msender({
    select_department: DEPARTMENT_MODE_METROPOLITAN
  }).getDepartments().count()).toEqual(96)
})

test('getDepartments legislative', () => {
  expect(new Msender({
    select_department: DEPARTMENT_MODE_LEGISLATIVE
  }).getDepartments().count()).toEqual(108)
})
