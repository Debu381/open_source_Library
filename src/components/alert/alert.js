export default function Alert({ msg, err=false}) {
  return (
    <p className={`msg ${err ? 'msg--error' : ''}`}>
      {msg}
    </p>
  )
}