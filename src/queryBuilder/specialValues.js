import AnyMatchingValue from './AnyMatchingValue'

export default {
  ANY_MATCHING: {
    label: 'any item matching...',
    description: 'The value should be any item that matches the statements below',
    id: 'X1',
    classConstructor: AnyMatchingValue
  },
  ANY: {
    label: 'any item',
    description: 'It does not matter which item as long as there is a statement for this property',
    id: 'X2'
  },
  DOES_NOT_EXIST: {
    label: 'statement does not exist',
    description: 'A statement for this property does not exist on the item we are looking for',
    id: 'X3'
  }
}
