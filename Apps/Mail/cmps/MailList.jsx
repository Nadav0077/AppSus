
import { MailPreview } from './MailPreview.jsx'
export function MailList({ mails ,loadMails}) {
    return (
        <div className="mail-list">
           { mails.map(mail => {
               return <MailPreview mail={mail} loadMails={loadMails} key={mail.id}/>
           }
           )}
        </div>
    )
}