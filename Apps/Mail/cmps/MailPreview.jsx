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

  function subjectPreview(){
    if(mail.subject.length > 13){
      return mail.subject.substring(0,13) + '...'
    }
    return mail.subject
  }

  function onAddStar(){

    mailService.toggleStar(mail)
  }

  return (
    <article onClick={() => {
      onReadMail()
    }} className={mail.isRead ? "mail-preview" : 'mail-preview unread'}>
      <section className="mail-reduced-preview">
        <h1 onClick={() => {
          onAddStar()
        }} className={mail.isStared ? 'stared' : ''}>★</h1>
        <h3>{mail.user}</h3>
        <h4>{subjectPreview()}</h4>
        <small>{Intl.DateTimeFormat('IL-il').format(mail.sentAt)}</small>
      </section>
      {mail.isOpen && <section className="mail-extended-preview">
        <div className="upper-preview">
          <h1>{mail.subject}</h1>
          <div className="preview-actions">
            <img className="icon" src='../../../assets/_SVG/basic_trashcan.svg' onClick={() => {
              onDeleteMail()
            }}></img>
            <Link to={`/mail/${mail.id}`}><img className="fullscreen-icon" src="../../../assets/_PNG 64/fullscreen.png"/></Link>
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