import "./Contact.css";
import Accordion from "./Accordion";
import Phone from "./svg/Call";

interface ContactItem {
  name: string;
  phone: string;
  role: string;
}

interface ContactProps {
  title?: string;
  items: {
    title: string;
    contact: ContactItem[];
  }[];
}

function Contact({ title = "축하 연락처", items }: ContactProps) {
  return (
    <div className="contact-section">
      <h1 className="contact-title">{title}</h1>
      {items.map((item) => (
        <ContactItem
          key={item.title}
          title={item.title}
          contact={item.contact}
        />
      ))}
    </div>
  );
}

interface ContactItemProps {
  title: string;
  contact: ContactItem[];
}

function ContactItem({ title, contact }: ContactItemProps) {
  return (
    <Accordion title={title}>
      <ul className="contact-list">
        {contact.map((item, index) => (
          <li key={index} className="contact-row">
            <div className="contact-info">
              <span className="contact-role">{item.role}</span>
              <span className="contact-name">{item.name}</span>
            </div>
            <a
              href={`tel:${item.phone}`}
              className="call-button"
              aria-label={`Call ${item.name}`}
            >
              <Phone />
            </a>
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

export default Contact;
