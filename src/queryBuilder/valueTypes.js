import AnyMatchingValue from './AnyMatchingValue'
import AnyValue from './AnyValue'

export default {
  SPECIFIC: {
    label: 'Specific item',
    description: 'Pick an item from an item selector',
    id: 'X0'
  },
  ANY_MATCHING: {
    label: 'any item matching...',
    description: 'The value should be any item that matches the statements below',
    id: 'X1',
    classConstructor: AnyMatchingValue
  },
  ANY: {
    label: 'any',
    description: 'The value does not matter as long as there is a statement for this property',
    id: 'X2',
    classConstructor: AnyValue
  },
  DOES_NOT_EXIST: {
    label: 'statement does not exist',
    description: 'A statement for this property does not exist on the item we are looking for',
    id: 'X3'
  }
}
