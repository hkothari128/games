const classList = (className, modifiers) => (
  [className]
    .concat(Object.keys(modifiers).map((key) => (
      modifiers[key] && `${ className }--${ key }`
    )))
    .filter(modifier => modifier)
    .join(' ')
)
export default classList;
