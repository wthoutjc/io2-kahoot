import '../../styles/notification/notification.css'
const Notification = ({ notification }) => {
  return (
    <div className={notification.ok ? 'notification-ok' : 'notification-error'}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification
