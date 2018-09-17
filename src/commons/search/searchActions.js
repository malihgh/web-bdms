export function setIdentifier(identifier) {
  return {
    type: 'SEARCH_INDENTIFIER_CHANGED',
    identifier: identifier
  }
}
export function setKind(id) {
  return {
    type: 'SEARCH_KIND_CHANGED',
    id: id
  }
}
export function setRestriction(id) {
  return {
    type: 'SEARCH_RESTRICTION_CHANGED',
    id: id
  }
}
export function setStatus(id) {
  return {
    type: 'SEARCH_STATUS_CHANGED',
    id: id
  }
}