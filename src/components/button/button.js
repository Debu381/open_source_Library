function Button({className = '', size, color, ...rest}) {
  const sizeClassName = size ? `btn--${size}` : '';
  const colorClassName = color ? `btn--${color}` : '';
  return <button className={`${className} ${sizeClassName} ${colorClassName}`} {...rest} />
}

export default Button;
