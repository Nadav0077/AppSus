
import { MailPreview } from './MailPreview.jsx'
export function MailList({ mails ,loadMails}) {
    return (
        <div className="mail-list">
            {mails.length === 0 && <h1>No Mails For Display</h1> }
           { mails.map(mail => {
               return <MailPreview mail={mail} loadMails={loadMails} key={mail.id}/>
           }
           )}
        </div>
    )
}