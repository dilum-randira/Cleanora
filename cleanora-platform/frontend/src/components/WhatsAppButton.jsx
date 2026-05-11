import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button.jsx';

const whatsappUrl =
  'https://wa.me/94771234567?text=Hello%20Cleanora%2C%20I%20would%20like%20to%20ask%20about%20your%20cleaning%20services.';

function WhatsAppButton() {
  return (
    <Button
      asChild
      variant="whatsapp"
      size="icon"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 shadow-soft hover:-translate-y-1"
    >
      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Cleanora on WhatsApp" title="Chat on WhatsApp">
        <MessageCircle className="h-6 w-6" />
      </a>
    </Button>
  );
}

export default WhatsAppButton;
