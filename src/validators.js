export const required = value => value ? undefined : 'Required';
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const matches = field => (value, allValues) =>
    value.trim() === allValues[field].trim() ? undefined : 'Does not match';
