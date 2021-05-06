const { Link } = ReactRouterDOM
import { mailService } from './services/mail-service.js'
import { showUserMsg } from '../../../services/event-bus-service.js'


export function MailPreview({ mail, loadMails }) {
  function onOpenMail() {
    // mailService.readMail(mail);
    mailService.toggleMail(mail);
    loadMails()
  }

  function onDeleteMail() {
    mailService.deleteMail(mail.id);
    loadMails()
    showUserMsg('Mail deleted successfully', 'error')
  }

  function subjectPreview(){
    if(mail.subject.length > 10){
      return mail.subject.substring(0,10) + '...'
    }
    return mail.subject
  }

  function onAddStar(){
    mailService.toggleStar(mail)
  }

  function onToggleReadMail(){
    mailService.toggleReadMail(mail)
  }

  function onSaveAsNote(){
    
  }

  return (
    <article onClick={() => {
      onOpenMail()
    }} className={mail.isRead ? "mail-preview" : 'mail-preview unread'}>
      <section className="mail-reduced-preview">
        <h1 onClick={() => {onAddStar()}} className={mail.isStared ? 'stared' : ''}>★</h1>
        {mail.isRead && <img onClick={() => {onToggleReadMail()}} className="icon"  src="../../../assets/_PNG 64/basic_mail_open_text.png"/> }
        {!mail.isRead && <img onClick={() => {onToggleReadMail()}} className="icon"  src="../../../assets/_PNG 64/basic_mail_multiple.png
"/> }
        <h3>{mail.user}</h3>
        <h4>{subjectPreview()}</h4>
        <small>{Intl.DateTimeFormat('IL-il').format(mail.sentAt)}</small>
      </section>
      {mail.isOpen && <section className="mail-extended-preview">
        <div className="upper-preview">
          <h1>{mail.subject}</h1>
          <div className="preview-actions">
          <Link to={`/note/${mail.id}`}><img className="icon" src="../../../assets/_PNG 64/basic_sheet_txt .png" onClick={() => {}}></img></Link>
            <img className="icon" src="../../../assets/_SVG/basic_trashcan.svg" onClick={() => {onDeleteMail()}}></img>
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