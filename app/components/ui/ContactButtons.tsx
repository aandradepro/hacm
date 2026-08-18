'use client';

interface Contact {
    email: string;
    linkedin: string;
    calendar?: string;
}

interface ContactButtonsProps {
    contact: Contact;
    className?: string;
}

export default function ContactButtons({ contact, className = '' }: ContactButtonsProps) {
    if (!contact) return null;

    return (
        <div className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}>
            <a
                href={`mailto:${contact.email}`}
                className="px-6 py-2.5 bg-[#0F4C8A]/90 text-white rounded-lg text-sm font-medium hover:bg-[#0F4C8A] transition-colors shadow-sm hover:shadow-md"
            >
                📧 {contact.email}
            </a>
            <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#E8EEF4]/80 text-[#0F4C8A] rounded-lg text-sm font-medium hover:bg-[#E8EEF4] transition-colors"
            >
                🔗 LinkedIn
            </a>
            {contact.calendar && (
                <a
                    href={contact.calendar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-[#00B4A0]/90 text-white rounded-lg text-sm font-medium hover:bg-[#00B4A0] transition-colors shadow-sm hover:shadow-md"
                >
                    📅 Schedule a Conversation
                </a>
            )}
        </div>
    );
}