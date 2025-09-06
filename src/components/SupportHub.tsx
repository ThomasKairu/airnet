import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ChatBubbleOutlined,
  HelpOutlined,
  ExpandMoreOutlined,
  WhatsApp,
  CallOutlined,
  EmailOutlined,
  SmartToyOutlined,
  SupportAgentOutlined
} from '@mui/icons-material';

const SupportContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.background.default} 0%, 
    ${theme.palette.grey[50]} 100%)`,
  position: 'relative'
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
  }
}));

const ChatWidget = styled(GlassCard)(() => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 350,
  maxHeight: 500,
  zIndex: 1000,
  display: 'none',
  '&.open': {
    display: 'block'
  }
}));

const faqs = [
  {
    question: "How do I activate my new plan?",
    answer: "Simply contact our WhatsApp support or call our activation line. Our agents will guide you through the quick 5-minute process."
  },
  {
    question: "What's included with the free router?",
    answer: "You get a premium 4G/5G router with WiFi 6 support, covering up to 2,000 sq ft. Just pay a KES 2,000 refundable deposit."
  },
  {
    question: "Can I change my plan anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
  },
  {
    question: "What happens if I exceed my data limit?",
    answer: "Your speed will be reduced to 1Mbps, but you can still browse. You can also purchase data top-ups anytime."
  },
  {
    question: "Is there a contract commitment?",
    answer: "No long-term contracts! You can cancel anytime with 30 days notice. We believe in earning your loyalty, not locking you in."
  }
];

const supportChannels = [
  {
    icon: <WhatsApp />,
    title: "WhatsApp Support",
    description: "Get instant help via WhatsApp",
    action: "Chat Now",
    color: "#25D366",
    href: "https://wa.me/254752688954"
  },
  {
    icon: <CallOutlined />,
    title: "Phone Support",
    description: "Speak directly with our experts",
    action: "Call Now",
    color: "#E60000",
    href: "tel:+254752688954"
  },
  {
    icon: <EmailOutlined />,
    title: "Email Support",
    description: "Send us detailed questions",
    action: "Email Us",
    color: "#0052CC",
    href: "mailto:waithy155@gmail.com"
  }
];

const SupportHub: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: "Hi! I'm your AI assistant. How can I help you today?",
      time: new Date().toLocaleTimeString()
    }
  ]);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (message: string) => {
    setChatMessages(prev => [...prev, {
      type: 'user',
      message,
      time: new Date().toLocaleTimeString()
    }]);

    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: "Thanks for your message! Our support team will get back to you shortly. For immediate assistance, please use WhatsApp or call us.",
        time: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  return (
    <SupportContainer sx={{ py: 10 }}>
      <Container maxWidth="xl">
        <Stack spacing={8}>
          {/* Header */}
          <Box textAlign="center">
            <Typography variant="h2" gutterBottom>
              We're Here to Help
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Get instant support through multiple channels or find answers in our comprehensive help center
            </Typography>
          </Box>

          {/* Support Channels */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {supportChannels.map((channel, index) => (
              <GlassCard key={index}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `${channel.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: channel.color
                    }}
                  >
                    {React.cloneElement(channel.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {channel.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {channel.description}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: channel.color,
                      '&:hover': {
                        background: channel.color,
                        opacity: 0.9
                      }
                    }}
                    href={channel.href}
                    target="_blank"
                  >
                    {channel.action}
                  </Button>
                </CardContent>
              </GlassCard>
            ))}
          </Box>

          {/* FAQ Section */}
          <GlassCard sx={{ p: 4 }}>
            <Stack spacing={4}>
              <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                  Frequently Asked Questions
                </Typography>
                <TextField
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ maxWidth: 400, width: '100%' }}
                />
              </Box>

              <Stack spacing={2}>
                {filteredFaqs.map((faq, index) => (
                  <Accordion key={index} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                      <Typography variant="h6">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>

              {filteredFaqs.length === 0 && (
                <Box textAlign="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No FAQs found matching your search. Try contacting our support team directly.
                  </Typography>
                </Box>
              )}
            </Stack>
          </GlassCard>

          {/* Quick Actions */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)'
              },
              gap: 2
            }}
          >
            <Button
              variant="outlined"
              startIcon={<SupportAgentOutlined />}
              sx={{ py: 2, borderRadius: 2 }}
            >
              Book Callback
            </Button>
            <Button
              variant="outlined"
              startIcon={<HelpOutlined />}
              sx={{ py: 2, borderRadius: 2 }}
            >
              Troubleshoot
            </Button>
            <Button
              variant="outlined"
              startIcon={<ChatBubbleOutlined />}
              sx={{ py: 2, borderRadius: 2 }}
              onClick={() => setChatOpen(true)}
            >
              Live Chat
            </Button>
            <Button
              variant="outlined"
              startIcon={<SmartToyOutlined />}
              sx={{ py: 2, borderRadius: 2 }}
            >
              AI Assistant
            </Button>
          </Box>

          {/* Service Status */}
          <GlassCard sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Typography variant="h5" textAlign="center">
                Service Status
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">Network Status</Typography>
                  <Chip label="All Systems Operational" color="success" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">Customer Portal</Typography>
                  <Chip label="Online" color="success" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">Payment Gateway</Typography>
                  <Chip label="Online" color="success" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">Support Systems</Typography>
                  <Chip label="Online" color="success" />
                </Stack>
              </Stack>
            </Stack>
          </GlassCard>
        </Stack>
      </Container>

      {/* Floating Chat Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #E60000, #CC0000)'
        }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        <ChatBubbleOutlined />
      </Fab>

      {/* Chat Widget */}
      <ChatWidget className={chatOpen ? 'open' : ''}>
        <CardContent sx={{ p: 0 }}>
          {/* Chat Header */}
          <Box sx={{ p: 2, background: 'linear-gradient(135deg, #E60000, #CC0000)', color: 'white' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)' }}>
                <SmartToyOutlined />
              </Avatar>
              <Box>
                <Typography variant="subtitle1">AI Assistant</Typography>
                <Typography variant="caption">Online now</Typography>
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <Button
                  size="small"
                  onClick={() => setChatOpen(false)}
                  sx={{ color: 'white', minWidth: 'auto' }}
                >
                  ×
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Chat Messages */}
          <Box sx={{ height: 300, overflowY: 'auto', p: 2 }}>
            <Stack spacing={2}>
              {chatMessages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: msg.type === 'user' ? 'primary.main' : 'grey.100',
                      color: msg.type === 'user' ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography variant="body2">{msg.message}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {msg.time}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Chat Input */}
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <TextField
              placeholder="Type your message..."
              fullWidth
              size="small"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  if (target.value.trim()) {
                    handleSendMessage(target.value);
                    target.value = '';
                  }
                }
              }}
            />
          </Box>
        </CardContent>
      </ChatWidget>
    </SupportContainer>
  );
};

export default SupportHub;