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

  function subjectPreview() {
    if (mail.subject.length > 10) {
      return mail.subject.substring(0, 10) + '...'
    }
    return mail.subject
  }

  function onAddStar() {
    mailService.toggleStar(mail)
  }

  function onToggleReadMail() {
    mailService.toggleReadMail(mail)
  }

  return (
    <article onClick={() => {onOpenMail()}} className={mail.isRead ? "mail-preview" : 'mail-preview unread'}>
      <section className="mail-reduced-preview">
        <h1 onClick={(ev) => {
          ev.stopPropagation();
          onAddStar()
          loadMails()
            }} className={mail.isStared ? 'stared' : ''}>★</h1>
        {mail.isRead && <img onClick={(ev) => {
          ev.stopPropagation();
           onToggleReadMail()
           loadMails()
           }} className="icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_PNG 64/basic_mail_open_text.png" />}
        {!mail.isRead && <img onClick={(ev) => { 
          ev.stopPropagation();
          onToggleReadMail()
          loadMails() 
        }} className="icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_PNG 64/basic_mail_multiple.png
"/>}
        <h3>{mail.user}</h3>
        <h4>{subjectPreview()}</h4>
        <small>{Intl.DateTimeFormat('IL-il').format(mail.sentAt)}</small>
      </section>
      {mail.isOpen && <section className="mail-extended-preview">
        <div className="upper-preview">
          <h1>{mail.subject}</h1>
          <div className="preview-actions">
            <Link to={`/note/${mail.id}`}><img className="note-icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_SVG/basic_sheet_txt .svg" ></img></Link>
            <img className="icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_SVG/basic_trashcan.svg" onClick={() => { onDeleteMail() }}></img>
            <Link to={`/mail/details/${mail.id}`}><img className="fullscreen-icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_PNG 64/fullscreen.png" /></Link>
            <Link to={`/mail/compose/${mail.id}`}><img className="reply-icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/9a35bf2add52a4088fe0eb535d75ee6715864ce2/assets/_SVG/back-reply-svgrepo-com.svg" /></Link>
          </div>
        </div>
        <h6>{mail.user} <small>{mail.user}@gmail.com</small></h6>
        <div className="content-preview">
          {mail.type !== 'NoteImg' && mail.type !== 'NoteVideo' && mail.type !== 'NoteAudio' && <p>{mail.body}</p>}
          {mail.type === 'NoteImg' && <img className="note-img" src={mail.body} />}
          {mail.type === 'NoteAudio' && <audio controls>
            <source src={mail.body} type="audio/ogg" />
            <source src={mail.body} type="audio/mpeg" />
                    Your browser does not support the audio element.
      </audio>}
          {mail.type === 'NoteVideo' && <iframe height="400px" width="100%" frameBorder="0" allowFullScreen
            src={mailService.createEmbededLink(mail.body)}></iframe>}

        </div>
      </section>}
    </article>
  )
}