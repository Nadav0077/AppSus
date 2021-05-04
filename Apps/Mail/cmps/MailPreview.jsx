const { Link } = ReactRouterDOM
import { mailService } from './services/mail-service.js'


export function MailPreview({ mail, loadMails }) {
  function onReadMail() {
    mailService.readMail(mail);
    mailService.toggleMail(mail);
    loadMails()
  }

  function onDeleteMail() {
    mailService.deleteMail(mail.id);
    loadMails()
  }

  return (
    <article onClick={() => {
      onReadMail()
    }} className={mail.isRead ? "mail-preview" : 'mail-preview unread'}>
      <section className="mail-reduced-preview">
        <h3>{mail.user}</h3>
        <h4>{mail.subject}</h4>
        <small>{mail.sentAt}</small>
      </section>
      {mail.isOpen && <section className="mail-extended-preview">
        <div className="upper-preview">
          <h1>{mail.subject}</h1>
          <div className="preview-actions">
            <button onClick={() => {
              onDeleteMail()
            }}>Delete</button>
            <button>Full</button>
          </div>
        </div>
        <h6>{mail.user} <small>{mail.user}@gmail.com</small></h6>
        <div className="content-preview">
          <p>{mail.body}</p>
        </div>
      </section>}
    </article>
  )
}