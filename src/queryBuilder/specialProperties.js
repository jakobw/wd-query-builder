export default [
  {
    description: 'include subclasses',
    longDescription: '(e.g. include instances of "painting" when filtering for instance of "work of art")',
    triggerId: 'P31',
    specialId: 'P31/wdt:P279*'
  },
  {
    description: 'include subclasses of subclasses',
    longDescription: '(e.g. when filtering for "animal" include "cat" which is a subclass of "domesticated animal")',
    triggerId: 'P279',
    specialId: 'P279|wdt:P279*'
  },
  {
    description: 'include subclasses of occupations',
    longDescription: '(e.g. include people with occupation "football player", "marathon runner", "archer" when looking for occupation "sportsperson")',
    triggerId: 'P106',
    specialId: 'P106/wdt:P279*'
  },
]
